import { randomUUID } from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  findRegistrationInSheets,
  isConfigured,
  syncRegistrationToSheets,
} from "../lib/googleSheets";

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const startTime = Date.now();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      event_slug,
      lead_name,
      lead_email,
      lead_phone,
      lead_college,
      designation,
    } = req.body || {};

    if (!event_slug || !lead_name || !lead_email || !lead_phone || !lead_college) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (event_slug === "founders-meet-2026" && !designation) {
      return res
        .status(400)
        .json({ error: "Designation / year is required for Founders Meet" });
    }

    if (!validateEmail(lead_email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const cleanPhone = String(lead_phone).replace(/\s/g, "");
    if (!validatePhone(cleanPhone)) {
      return res.status(400).json({
        error: "Invalid phone number. Must be a 10-digit Indian mobile number.",
      });
    }

    const sanitizedData = {
      event_slug: sanitizeInput(event_slug),
      lead_name: sanitizeInput(lead_name),
      lead_email: String(lead_email).toLowerCase().trim(),
      lead_phone: cleanPhone,
      lead_college: sanitizeInput(lead_college),
      designation: designation ? sanitizeInput(designation) : null,
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

      return res.status(200).json({
        success: true,
        registrationId: existing.id,
        leadName: sanitizedData.lead_name,
        leadEmail: sanitizedData.lead_email,
        leadPhone: sanitizedData.lead_phone,
        leadCollege: sanitizedData.lead_college,
        designation: sanitizedData.designation,
        message: "Registration already exists and is confirmed.",
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
      status: "submitted",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (sanitizedData.designation) {
      registrationInsert.lead_designation = sanitizedData.designation;
    }

    if (!isConfigured()) {
      return res.status(500).json({
        error: "Google Sheets is not configured",
        message:
          "Set GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, and GOOGLE_PRIVATE_KEY.",
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

        return res.status(200).json({
          success: true,
          registrationId: postFailureCheck.id,
          leadName: sanitizedData.lead_name,
          leadEmail: sanitizedData.lead_email,
          leadPhone: sanitizedData.lead_phone,
          leadCollege: sanitizedData.lead_college,
          designation: sanitizedData.designation,
          message: "Registration submitted successfully.",
        });
      }

      return res.status(500).json({
        error: "Failed to save registration",
        message: syncResult.error || "Google Sheets sync failed",
      });
    }

    const totalDuration = Date.now() - startTime;
    console.log(`[register] Registration complete: ${registrationId} (${totalDuration}ms)`);

    return res.status(200).json({
      success: true,
      registrationId,
      leadName: sanitizedData.lead_name,
      leadEmail: sanitizedData.lead_email,
      leadPhone: sanitizedData.lead_phone,
      leadCollege: sanitizedData.lead_college,
      designation: sanitizedData.designation,
      message: "Registration submitted successfully.",
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[register] Error after ${duration}ms:`, error);

    if (duration >= 9000) {
      return res.status(504).json({
        error: "Request timeout",
        message: "Registration is processing. Please check your email shortly.",
      });
    }

    return res.status(500).json({
      error: "Registration failed",
      message:
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again or contact support.",
    });
  }
}
