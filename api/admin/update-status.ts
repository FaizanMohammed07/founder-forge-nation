import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAdminAuthenticated } from "../lib/adminAuth.js";
import {
  updateRegistrationStatusInSheets,
} from "../lib/googleSheets.js";
import { sendApprovalEmail } from "../lib/notifications.js";

type ApiResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};

type Payload = {
  registrationId?: string;
  paymentStatus?: "approved" | "rejected" | "pending";
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
    const paymentStatus = body.paymentStatus;

    if (!registrationId) {
      return sendJson(res, 400, { success: false, message: "registrationId is required." });
    }

    if (!paymentStatus || !["approved", "rejected", "pending"].includes(paymentStatus)) {
      return sendJson(res, 400, {
        success: false,
        message: "paymentStatus must be one of approved, rejected, pending.",
      });
    }

    const registration = await updateRegistrationStatusInSheets(
      registrationId,
      paymentStatus,
    );

    let emailResultMessage = "";
    if (paymentStatus === "approved") {
      const emailResult = await sendApprovalEmail(registration);
      emailResultMessage = emailResult.success ? " Email confirmation sent." : ` ${emailResult.message}`;
    }

    return sendJson(res, 200, {
      success: true,
      message: `Status updated to ${paymentStatus}.${emailResultMessage}`,
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
