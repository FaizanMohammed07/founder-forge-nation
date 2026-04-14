import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  isAdminEnvConfigured,
  setAdminSessionCookie,
  verifyAdminPassword,
} from "../lib/adminAuth.js";

type ApiResponse = {
  success: boolean;
  message: string;
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

  if (!isAdminEnvConfigured()) {
    return sendJson(res, 500, {
      success: false,
      message: "Admin environment is not configured.",
    });
  }

  let body: Record<string, unknown> = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch {
    return sendJson(res, 400, { success: false, message: "Invalid JSON body." });
  }

  const password = String(body.password || "");

  if (!verifyAdminPassword(password)) {
    return sendJson(res, 401, { success: false, message: "Invalid admin password." });
  }

  setAdminSessionCookie(res);
  return sendJson(res, 200, { success: true, message: "Admin login successful." });
}
