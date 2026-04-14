import { randomUUID } from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  findRegistrationInSheets,
  isConfigured,
  syncRegistrationToSheets,
} from "../lib/googleSheets";

type ApiResponse<T = Record<string, unknown>> = {
  success: boolean;
  message: string;
  data?: T;
};

type RegistrationRequestBody = {
  event_slug: string;
  lead_name: string;
  lead_email: string;
  lead_phone: string;
  lead_college: string;
  designation?: string;
  payment_transaction_id?: string;
  payment_amount?: number;
};

const DEFAULT_FOUNDERS_MEET_PAYMENT_AMOUNT = Number(
  process.env.FOUNDERS_MEET_PAYMENT_AMOUNT || 1000,
);

function sendJson<T>(
  res: VercelResponse,
  statusCode: number,
  payload: ApiResponse<T>,
) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  return res.status(statusCode).json(payload);
}

function parseRequestBody(body: unknown): RegistrationRequestBody | null {
  if (!body) return null;

  if (typeof body === "string") {
    try {
      return JSON.parse(body) as RegistrationRequestBody;
    } catch {
      return null;
    }
  }

  return body as RegistrationRequestBody;
}

function sanitizeInput(str: string): string {
  if (typeof str !== "string") return str as unknown as string;
  return str.trim().replace(/[<>]/g, "");
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ""));
}

function validateTransactionId(transactionId: string): boolean {
  return /^[a-zA-Z0-9\-]{8,40}$/.test(transactionId.trim());
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const startTime = Date.now();

  if (req.method !== "POST") {
    return sendJson(res, 405, {
      success: false,
      message: "Method not allowed. Use POST.",
    });
  }

  try {
    const parsedBody = parseRequestBody(req.body);
    if (!parsedBody) {
      return sendJson(res, 400, {
        success: false,
        message: "Invalid JSON body.",
      });
    }

    const {
      event_slug,
      lead_name,
      lead_email,
      lead_phone,
      lead_college,
      designation,
      payment_transaction_id,
      payment_amount,
    } = parsedBody;

    if (!event_slug || !lead_name || !lead_email || !lead_phone || !lead_college) {
      return sendJson(res, 400, {
        success: false,
        message: "Missing required fields.",
      });
    }

    if (event_slug === "founders-meet-2026" && !designation) {
      return sendJson(res, 400, {
        success: false,
        message: "Designation / year is required for Founders Meet.",
      });
    }

    if (!validateEmail(lead_email)) {
      return sendJson(res, 400, {
        success: false,
        message: "Invalid email format.",
      });
    }

    const cleanPhone = String(lead_phone).replace(/\s/g, "");
    if (!validatePhone(cleanPhone)) {
      return sendJson(res, 400, {
        success: false,
        message: "Invalid phone number. Must be a 10-digit Indian mobile number.",
      });
    }

    if (
      !payment_transaction_id ||
      !validateTransactionId(String(payment_transaction_id))
    ) {
      return sendJson(res, 400, {
        success: false,
        message: "Valid payment transaction ID is required.",
      });
    }

    const paymentAmount = Number(payment_amount);
    if (!Number.isFinite(paymentAmount) || paymentAmount <= 0) {
      return sendJson(res, 400, {
        success: false,
        message: "Valid payment amount is required.",
      });
    }

    if (
      event_slug === "founders-meet-2026" &&
      paymentAmount !== DEFAULT_FOUNDERS_MEET_PAYMENT_AMOUNT
    ) {
      return sendJson(res, 400, {
        success: false,
        message: `Payment amount mismatch. Required amount is INR ${DEFAULT_FOUNDERS_MEET_PAYMENT_AMOUNT}.`,
      });
    }

    const sanitizedData = {
      event_slug: sanitizeInput(event_slug),
      lead_name: sanitizeInput(lead_name),
      lead_email: String(lead_email).toLowerCase().trim(),
      lead_phone: cleanPhone,
      lead_college: sanitizeInput(lead_college),
      designation: designation ? sanitizeInput(designation) : null,
      payment_transaction_id: sanitizeInput(String(payment_transaction_id)).trim(),
      payment_amount: paymentAmount,
    };

    const existing = await findRegistrationInSheets(
      sanitizedData.event_slug,
      sanitizedData.lead_email,
      sanitizedData.lead_phone,
    );

    if (existing.found) {
      const totalDuration = Date.now() - startTime;
      console.log(
        `[register] Duplicate-safe return for existing registration: ${existing.id} (${totalDuration}ms)`,
      );

      return sendJson(res, 200, {
        success: true,
        message: "Registration already exists and is confirmed.",
        data: {
          registrationId: existing.id,
          leadName: sanitizedData.lead_name,
          leadEmail: sanitizedData.lead_email,
          leadPhone: sanitizedData.lead_phone,
          leadCollege: sanitizedData.lead_college,
          designation: sanitizedData.designation,
          paymentTransactionId: sanitizedData.payment_transaction_id,
          paymentAmount: sanitizedData.payment_amount,
        },
      });
    }

    const registrationId = randomUUID();

    const registrationInsert: Record<string, unknown> = {
      id: registrationId,
      event_slug: sanitizedData.event_slug,
      lead_name: sanitizedData.lead_name,
      lead_email: sanitizedData.lead_email,
      lead_phone: sanitizedData.lead_phone,
      lead_college: sanitizedData.lead_college,
      status: "payment_submitted",
      payment_transaction_id: sanitizedData.payment_transaction_id,
      payment_amount: sanitizedData.payment_amount,
      payment_status: "submitted",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (sanitizedData.designation) {
      registrationInsert.lead_designation = sanitizedData.designation;
    }

    if (!isConfigured()) {
      return sendJson(res, 500, {
        success: false,
        message:
          "Google Sheets is not configured. Set GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, and GOOGLE_PRIVATE_KEY.",
      });
    }

    const syncResult = await syncRegistrationToSheets(
      registrationInsert as {
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
      },
      [],
    );

    if (!syncResult.success) {
      const postFailureCheck = await findRegistrationInSheets(
        sanitizedData.event_slug,
        sanitizedData.lead_email,
        sanitizedData.lead_phone,
      );

      if (postFailureCheck.found) {
        const totalDuration = Date.now() - startTime;
        console.log(
          `[register] Recovered as success after uncertain write: ${postFailureCheck.id} (${totalDuration}ms)`,
        );

        return sendJson(res, 200, {
          success: true,
          message: "Registration submitted successfully.",
          data: {
            registrationId: postFailureCheck.id,
            leadName: sanitizedData.lead_name,
            leadEmail: sanitizedData.lead_email,
            leadPhone: sanitizedData.lead_phone,
            leadCollege: sanitizedData.lead_college,
            designation: sanitizedData.designation,
            paymentTransactionId: sanitizedData.payment_transaction_id,
            paymentAmount: sanitizedData.payment_amount,
          },
        });
      }

      return sendJson(res, 500, {
        success: false,
        message: syncResult.error || "Failed to save registration in Google Sheets.",
      });
    }

    const totalDuration = Date.now() - startTime;
    console.log(`[register] Registration complete: ${registrationId} (${totalDuration}ms)`);

    return sendJson(res, 200, {
      success: true,
      message: "Registration submitted successfully.",
      data: {
        registrationId,
        leadName: sanitizedData.lead_name,
        leadEmail: sanitizedData.lead_email,
        leadPhone: sanitizedData.lead_phone,
        leadCollege: sanitizedData.lead_college,
        designation: sanitizedData.designation,
        paymentTransactionId: sanitizedData.payment_transaction_id,
        paymentAmount: sanitizedData.payment_amount,
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[register] Error after ${duration}ms:`, error);

    if (duration >= 9000) {
      return sendJson(res, 504, {
        success: false,
        message: "Request timeout. Registration is processing. Please check your email shortly.",
      });
    }

    return sendJson(res, 500, {
      success: false,
      message:
        error instanceof Error
          ? `Registration failed: ${error.message}`
          : "An error occurred. Please try again or contact support.",
    });
  }
}
