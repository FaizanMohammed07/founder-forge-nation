import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getRegistrationByIdFromSupabase } from "../../server/lib/registrationsSupabase.js";
import { buildTicketHtml } from "../../server/lib/tickets.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  try {
    const registrationId = String(req.query.id || "").trim();
    if (!registrationId) {
      return res.status(400).json({ success: false, message: "id query is required." });
    }

    const registration = await getRegistrationByIdFromSupabase(registrationId);
    if (!registration) {
      return res.status(404).json({ success: false, message: "Ticket not found." });
    }

    if (registration.status !== "approved") {
      return res.status(403).json({
        success: false,
        message: "Ticket is available only after admin approval.",
      });
    }

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(buildTicketHtml(registration));
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to generate ticket.",
    });
  }
}
