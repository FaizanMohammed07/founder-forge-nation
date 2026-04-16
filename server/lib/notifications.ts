import type { DashboardRegistration } from "./googleSheets.js";
import { buildTicketPdfAttachment, getPassBenefits } from "./tickets.js";

type NotificationResult = {
  success: boolean;
  message: string;
};

export async function sendApprovalEmail(
  registration: DashboardRegistration,
  ticketUrl: string,
): Promise<NotificationResult> {
  const resendApiKey = process.env.RESEND_API_KEY;
  // Use Resend's default sender for sandbox/testing when no domain is verified.
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  if (!resendApiKey) {
    return {
      success: false,
      message: "Email not sent because RESEND_API_KEY is missing.",
    };
  }

  const eventTitle = process.env.EVENT_TITLE || "Founders Meet 2026";
  const eventDate = process.env.EVENT_DATE || "18 April 2026";
  const eventVenue = process.env.EVENT_VENUE || "T-HUB, Hyderabad";
  const eventTime = process.env.EVENT_TIME || "4:00 PM";
  const passName = registration.passType === "premium" ? "Premium Pass" : "Normal Pass";
  const passBenefits = getPassBenefits(registration.passType)
    .map((item) => `<li>${item}</li>`)
    .join("");
  const ticketAttachment = await buildTicketPdfAttachment(registration);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [registration.email],
      subject: "Registration Confirmed 🎉",
      html: `
        <div style="margin:0;padding:0;background:#05060a;color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
          <div style="max-width:680px;margin:0 auto;padding:28px 16px;">
            <div style="border:1px solid rgba(255,255,255,0.12);background:linear-gradient(145deg,#0d1017,#171b25);border-radius:16px;overflow:hidden;">
              <div style="height:6px;background:linear-gradient(90deg,#ef4444,#22c55e);"></div>
              <div style="padding:28px 24px 20px 24px;">
                <div style="display:inline-block;padding:6px 10px;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.35);border-radius:999px;font-size:11px;letter-spacing:1.3px;font-weight:700;color:#fecaca;text-transform:uppercase;">Founders Meet - Approved</div>
                <h1 style="margin:14px 0 8px 0;font-size:30px;line-height:1.2;color:#ffffff;">Your pass is confirmed</h1>
                <p style="margin:0;color:#c4c8d1;font-size:15px;line-height:1.7;">Your payment has been verified by our team. Your official event ticket PDF is attached below for entry and onboarding verification.</p>

                <div style="margin-top:18px;border:1px solid rgba(255,255,255,0.12);border-radius:12px;background:rgba(255,255,255,0.03);padding:16px;">
                  <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;">
                    <tr>
                      <td style="padding:6px 0;color:#8f97a7;">Attendee</td>
                      <td style="padding:6px 0;color:#ffffff;font-weight:700;text-align:right;">${registration.name}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#8f97a7;">Registration ID</td>
                      <td style="padding:6px 0;color:#ffffff;font-weight:700;text-align:right;">${registration.id}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#8f97a7;">Pass Type</td>
                      <td style="padding:6px 0;color:#ffffff;font-weight:700;text-align:right;">${passName}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#8f97a7;">Event</td>
                      <td style="padding:6px 0;color:#ffffff;font-weight:700;text-align:right;">${eventTitle}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#8f97a7;">Date & Time</td>
                      <td style="padding:6px 0;color:#ffffff;font-weight:700;text-align:right;">${eventDate}, ${eventTime}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#8f97a7;">Venue</td>
                      <td style="padding:6px 0;color:#ffffff;font-weight:700;text-align:right;">${eventVenue}</td>
                    </tr>
                  </table>
                </div>

                <div style="margin-top:16px;padding:14px 16px;border:1px solid rgba(34,197,94,0.35);background:rgba(34,197,94,0.1);border-radius:12px;color:#d9fde7;font-size:13px;line-height:1.6;">
                  Entry flow: carry the attached ticket PDF on your phone or as a printout. QR is mandatory for onboarding check-in.
                </div>

                <div style="margin-top:18px;">
                  <a href="${ticketUrl}" style="display:inline-block;padding:11px 18px;background:#ef4444;color:#0a0a0a;text-decoration:none;border-radius:10px;font-weight:700;font-size:13px;letter-spacing:0.3px;">View Ticket Online</a>
                </div>

                <div style="margin-top:20px;color:#c4c8d1;font-size:13px;">
                  <p style="margin:0 0 8px 0;color:#ffffff;font-weight:700;">Pass benefits</p>
                  <ul style="margin:0;padding-left:18px;line-height:1.8;">${passBenefits}</ul>
                </div>

                <div style="margin-top:22px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.08);color:#8f97a7;font-size:12px;line-height:1.6;">
                  Need help? Reply to this email or contact the organizers.
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: ticketAttachment.fileName,
          content: ticketAttachment.base64Content,
        },
      ],
    }),
  });

  if (!response.ok) {
    const raw = await response.text();

    // Resend sandbox allows only sending to the account owner's email
    // until a sending domain is verified.
    if (response.status === 403 && raw.includes("You can only send testing emails to your own email address")) {
      return {
        success: false,
        message:
          "Email skipped: Resend is in testing mode and can only send to your own email. Verify a domain to send attendee confirmations.",
      };
    }

    return {
      success: false,
      message: "Email could not be sent right now. Please check Resend settings and try again.",
    };
  }

  return {
    success: true,
    message: "Approval email sent successfully.",
  };
}

export async function sendRejectionEmail(
  registration: DashboardRegistration,
): Promise<NotificationResult> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  if (!resendApiKey) {
    return {
      success: false,
      message: "Rejection email not sent because RESEND_API_KEY is missing.",
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [registration.email],
      subject: "Founders Meet registration update",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
          <h2>Registration update</h2>
          <p>Hello ${registration.name},</p>
          <p>Thank you for registering. We are sorry to inform you that your current submission could not be approved.</p>
          <p>If this seems incorrect, please contact the organizers with your transaction ID: <strong>${registration.transactionId || "N/A"}</strong>.</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    return {
      success: false,
      message: "Rejection email could not be sent.",
    };
  }

  return {
    success: true,
    message: "Rejection email sent successfully.",
  };
}
