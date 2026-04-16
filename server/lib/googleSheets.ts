type RegistrationRecord = {
  id: string;
  event_slug: string;
  lead_name: string;
  lead_email: string;
  lead_phone: string;
  lead_college: string;
  lead_designation?: string;
  status: "pending" | "approved" | "rejected";
  payment_transaction_id?: string;
  payment_amount?: number;
  payment_status?: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
  pass_type?: "normal" | "premium";
  ticket_url?: string;
};

type WorkflowStatus = "pending" | "approved" | "rejected";

export type DashboardRegistration = {
  id: string;
  eventSlug: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  status: "pending" | "approved" | "rejected";
  transactionId: string;
  amount: number;
  paymentStatus: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  passType: "normal" | "premium";
  ticketUrl: string;
};

function isLikelyIsoDate(value: string): boolean {
  if (!value) return false;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed);
}

function mapLegacyStatusToPaymentStatus(status: string): WorkflowStatus {
  const normalized = status.toLowerCase();
  if (normalized.includes("approved")) return "approved";
  if (normalized.includes("rejected")) return "rejected";
  return "pending";
}

function normalizeWorkflowStatus(status: string): WorkflowStatus {
  return mapLegacyStatusToPaymentStatus(status || "pending");
}

const SHEET_NAME = process.env.GOOGLE_SHEETS_SHEET_NAME || "registrations";
const MAX_RETRIES = 3;
const OPERATION_TIMEOUT_MS = 2500;
let googleClientPromise: Promise<(typeof import("googleapis"))["google"]> | null =
  null;

const DEFAULT_HEADERS = [
  "id",
  "event_slug",
  "lead_name",
  "lead_email",
  "lead_phone",
  "lead_college",
  "lead_designation",
  "status",
  "payment_transaction_id",
  "payment_amount",
  "payment_status",
  "created_at",
  "updated_at",
  "pass_type",
  "ticket_url",
];

function normalizePrivateKey(key: string): string {
  const envValue = process.env.GOOGLE_PRIVATE_KEY || key;
  const trimmed = envValue.trim();
  const unwrapped =
    trimmed.startsWith('"') && trimmed.endsWith('"')
      ? trimmed.slice(1, -1)
      : trimmed;

  return unwrapped.replaceAll(String.raw`\n`, "\n");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withTimeout<T>(
  operation: Promise<T>,
  timeoutMs: number,
  context: string,
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`${context} timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([operation, timeoutPromise]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function normalizePhone(value: string): string {
  return value.replaceAll(/\D/g, "");
}

function toDashboardRegistration(row: string[]): DashboardRegistration {
  const legacyRowDetected = row.length < 14;

  if (legacyRowDetected) {
    const legacyStatus = row[7] || "submitted";
    const normalizedStatus = mapLegacyStatusToPaymentStatus(legacyStatus);
    return {
      id: row[0] || "",
      eventSlug: row[1] || "",
      name: row[2] || "",
      email: row[3] || "",
      phone: row[4] || "",
      organization: row[5] || "",
      designation: row[6] || "",
      status: normalizedStatus,
      transactionId: "",
      amount: Number(process.env.FOUNDERS_MEET_PAYMENT_AMOUNT || 1000),
      paymentStatus: normalizedStatus,
      createdAt: row[8] || "",
      updatedAt: row[9] || "",
      passType: "normal",
      ticketUrl: "",
    };
  }

  const status = normalizeWorkflowStatus(row[10] || row[7] || "pending");
  const passType = (row[13] || "normal").toLowerCase() === "premium" ? "premium" : "normal";

  return {
    id: row[0] || "",
    eventSlug: row[1] || "",
    name: row[2] || "",
    email: row[3] || "",
    phone: row[4] || "",
    organization: row[5] || "",
    designation: row[6] || "",
    status,
    transactionId: row[8] || "",
    amount: Number(row[9] || 0),
    paymentStatus: status,
    createdAt: row[11] || "",
    updatedAt: row[12] || "",
    passType,
    ticketUrl: row[14] || "",
  };
}

function padRowToLength(row: string[], targetLength: number): string[] {
  const cloned = [...row];
  while (cloned.length < targetLength) {
    cloned.push("");
  }
  return cloned.slice(0, targetLength);
}

export function isConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY,
  );
}

function getSpreadsheetId(): string {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is missing.");
  }
  return spreadsheetId;
}

async function getGoogleClient() {
  if (!googleClientPromise) {
    googleClientPromise = import("googleapis").then((module) => module.google);
  }

  return googleClientPromise;
}

async function getSheetsClient() {
  if (!isConfigured()) {
    throw new Error("Google Sheets credentials are missing.");
  }

  const google = await getGoogleClient();
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY ?? "";
  const privateKeyWithNewlines = privateKeyRaw.replaceAll(String.raw`\n`, "\n");
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: normalizePrivateKey(privateKeyWithNewlines),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

async function withRetry<T>(fn: () => Promise<T>, context: string): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      return await withTimeout(
        fn(),
        OPERATION_TIMEOUT_MS,
        `${context} attempt ${attempt}`,
      );
    } catch (error) {
      lastError = error;
      console.error(`[sheets] ${context} attempt ${attempt} failed`, error);
      if (attempt < MAX_RETRIES) {
        await sleep(500 * attempt);
      }
    }
  }

  throw lastError;
}

async function ensureHeaderRow(): Promise<void> {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  await withRetry(async () => {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_NAME}!1:1`,
      majorDimension: "ROWS",
    });

    const existing = response.data.values?.[0] || [];
    const missingHeader =
      existing.length === 0 ||
      DEFAULT_HEADERS.some((header, idx) => existing[idx] !== header);

    if (!missingHeader) {
      return;
    }

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_NAME}!A1:O1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [DEFAULT_HEADERS],
      },
    });
  }, "ensure-header-row");
}

export async function findRegistrationInSheets(
  eventSlug: string,
  leadEmail: string,
  leadPhone: string,
): Promise<{ found: boolean; id?: string }> {
  if (!isConfigured()) {
    return { found: false };
  }

  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  const emailNeedle = normalizeEmail(leadEmail);
  const phoneNeedle = normalizePhone(leadPhone);

  const rows = await withRetry(async () => {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_NAME}!A2:O`,
      majorDimension: "ROWS",
    });
    return response.data.values || [];
  }, "find-registration");

  for (const row of rows) {
    const id = row[0] || "";
    const rowEventSlug = row[1] || "";
    const rowEmail = normalizeEmail(row[3] || "");
    const rowPhone = normalizePhone(row[4] || "");

    if (
      rowEventSlug === eventSlug &&
      rowEmail === emailNeedle &&
      rowPhone === phoneNeedle
    ) {
      return { found: true, id };
    }
  }

  return { found: false };
}

export async function syncRegistrationToSheets(
  registration: RegistrationRecord,
  additionalColumns: string[] = [],
): Promise<{ success: boolean; error?: string }> {
  try {
    await ensureHeaderRow();

    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    const row = [
      registration.id,
      registration.event_slug,
      registration.lead_name,
      registration.lead_email,
      registration.lead_phone,
      registration.lead_college,
      registration.lead_designation || "",
      registration.status,
      registration.payment_transaction_id || "",
      registration.payment_amount ? String(registration.payment_amount) : "",
      registration.payment_status || "",
      registration.created_at,
      registration.updated_at,
      registration.pass_type || "normal",
      registration.ticket_url || "",
      ...additionalColumns,
    ];

    await withRetry(async () => {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${SHEET_NAME}!A:O`,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [row],
        },
      });
    }, "append-registration");

    const verification = await findRegistrationInSheets(
      registration.event_slug,
      registration.lead_email,
      registration.lead_phone,
    );

    if (!verification.found) {
      return {
        success: false,
        error: "Append did not verify in Google Sheets.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("[sheets] syncRegistrationToSheets failed", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown Sheets error",
    };
  }
}

export async function getAllRegistrationsFromSheets(): Promise<DashboardRegistration[]> {
  if (!isConfigured()) {
    throw new Error("Google Sheets credentials are missing.");
  }

  await ensureHeaderRow();

  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  const rows = await withRetry(async () => {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_NAME}!A2:O`,
      majorDimension: "ROWS",
    });
    return response.data.values || [];
  }, "get-all-registrations");

  return rows
    .map((row) => padRowToLength(row, DEFAULT_HEADERS.length))
    .map((row) => toDashboardRegistration(row));
}

export async function updateRegistrationStatusInSheets(
  registrationId: string,
  paymentStatus: "approved" | "rejected" | "pending",
  ticketUrl?: string,
): Promise<DashboardRegistration> {
  if (!isConfigured()) {
    throw new Error("Google Sheets credentials are missing.");
  }

  await ensureHeaderRow();

  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  const rows = await withRetry(async () => {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_NAME}!A2:O`,
      majorDimension: "ROWS",
    });
    return response.data.values || [];
  }, "update-registration-status-read");

  const rowIndex = rows.findIndex((row) => (row[0] || "") === registrationId);
  if (rowIndex === -1) {
    throw new Error("Registration not found.");
  }

  const sheetRowNumber = rowIndex + 2;
  const row = padRowToLength(rows[rowIndex], DEFAULT_HEADERS.length);
  row[7] = paymentStatus;
  row[10] = paymentStatus;
  row[12] = new Date().toISOString();
  row[14] = paymentStatus === "approved" ? ticketUrl || row[14] || "" : "";

  await withRetry(async () => {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_NAME}!A${sheetRowNumber}:O${sheetRowNumber}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });
  }, "update-registration-status-write");

  return toDashboardRegistration(row);
}

export async function getRegistrationByIdFromSheets(
  registrationId: string,
): Promise<DashboardRegistration | null> {
  if (!isConfigured()) {
    throw new Error("Google Sheets credentials are missing.");
  }

  await ensureHeaderRow();

  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  const rows = await withRetry(async () => {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_NAME}!A2:O`,
      majorDimension: "ROWS",
    });
    return response.data.values || [];
  }, "get-registration-by-id");

  const found = rows.find((row) => (row[0] || "") === registrationId);
  if (!found) {
    return null;
  }

  return toDashboardRegistration(padRowToLength(found, DEFAULT_HEADERS.length));
}
