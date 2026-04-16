import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAdminAuthenticated } from "../../server/lib/adminAuth.js";
import { getAllRegistrationsFromSheets } from "../../server/lib/googleSheets.js";

type ApiResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};

function sendJson(res: VercelResponse, statusCode: number, payload: ApiResponse) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  return res.status(statusCode).json(payload);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { success: false, message: "Method not allowed." });
  }

  if (!isAdminAuthenticated(req)) {
    return sendJson(res, 401, { success: false, message: "Unauthorized." });
  }

  try {
    const registrations = await getAllRegistrationsFromSheets();
    registrations.sort((a, b) => {
      const left = new Date(a.createdAt).getTime();
      const right = new Date(b.createdAt).getTime();
      return right - left;
    });

    return sendJson(res, 200, {
      success: true,
      message: "Registrations fetched successfully.",
      data: { registrations },
    });
  } catch (error) {
    return sendJson(res, 500, {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch registrations.",
    });
  }
}
