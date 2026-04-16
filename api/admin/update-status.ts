import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAdminAuthenticated } from "../lib/adminAuth.js";
import { updateRegistrationStatusInSupabase } from "../lib/registrationsSupabase.js";
import { sendApprovalEmail, sendRejectionEmail } from "../lib/notifications.js";
import { getTicketUrl } from "../lib/tickets.js";

type ApiResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};

type Payload = {
  registrationId?: string;
  status?: "approved" | "rejected" | "pending";
};

function sendJson(res: VercelResponse, statusCode: number, payload: ApiResponse) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  return res.status(statusCode).json(payload);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { success: false, message: "Method not allowed." });
  }

  if (!isAdminAuthenticated(req)) {
    return sendJson(res, 401, { success: false, message: "Unauthorized." });
  }

  try {
    let body: Payload;
    try {
      body =
        typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    } catch {
      return sendJson(res, 400, { success: false, message: "Invalid JSON body." });
    }

    const registrationId = String(body.registrationId || "").trim();
  const status = body.status;

    if (!registrationId) {
      return sendJson(res, 400, { success: false, message: "registrationId is required." });
    }

    if (!status || !["approved", "rejected", "pending"].includes(status)) {
      return sendJson(res, 400, {
        success: false,
        message: "status must be one of approved, rejected, pending.",
      });
    }

    const ticketUrl = status === "approved" ? getTicketUrl(registrationId) : undefined;

    const registration = await updateRegistrationStatusInSupabase(
      registrationId,
      status,
      ticketUrl,
    );

    let emailResultMessage = "";
    if (status === "approved") {
      const emailResult = await sendApprovalEmail(registration, ticketUrl || "");
      emailResultMessage = emailResult.success ? " Email confirmation sent." : ` ${emailResult.message}`;
    } else if (status === "rejected" && process.env.SEND_REJECTION_EMAIL === "true") {
      const emailResult = await sendRejectionEmail(registration);
      emailResultMessage = emailResult.success
        ? " Rejection email sent."
        : ` ${emailResult.message}`;
    }

    return sendJson(res, 200, {
      success: true,
      message: `Status updated to ${status}.${emailResultMessage}`,
      data: {
        registration,
      },
    });
  } catch (error) {
    return sendJson(res, 500, {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update registration status.",
    });
  }
}
