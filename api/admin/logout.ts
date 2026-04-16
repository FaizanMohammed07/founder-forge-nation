import type { VercelRequest, VercelResponse } from "@vercel/node";
import { clearAdminSessionCookie } from "../../server/lib/adminAuth.js";

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

  clearAdminSessionCookie(res);
  return sendJson(res, 200, { success: true, message: "Logged out." });
}
