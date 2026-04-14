type RegistrationRecord = {
  id: string;
  event_slug: string;
  lead_name: string;
  lead_email: string;
  lead_phone: string;
  lead_college: string;
  lead_designation?: string;
  status: string;
  payment_transaction_id?: string;
  payment_amount?: number;
  payment_status?: string;
  created_at: string;
  updated_at: string;
};

const SHEET_NAME = process.env.GOOGLE_SHEETS_SHEET_NAME || "registrations";
const MAX_RETRIES = 3;
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
];

function normalizePrivateKey(key: string): string {
  const envValue = process.env.GOOGLE_PRIVATE_KEY || key;
  const trimmed = envValue.trim();
  const unwrapped =
    trimmed.startsWith('"') && trimmed.endsWith('"')
      ? trimmed.slice(1, -1)
      : trimmed;

  return unwrapped.replace(/\\n/g, "\n");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

export function isConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY,
  );
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
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY as string),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

async function withRetry<T>(fn: () => Promise<T>, context: string): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      return await fn();
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
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID as string;

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
      range: `${SHEET_NAME}!A1:M1`,
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
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID as string;
  const emailNeedle = normalizeEmail(leadEmail);
  const phoneNeedle = normalizePhone(leadPhone);

  const rows = await withRetry(async () => {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_NAME}!A2:M`,
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
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID as string;

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
      ...additionalColumns,
    ];

    await withRetry(async () => {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${SHEET_NAME}!A:M`,
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
