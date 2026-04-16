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
  void ticketUrl;

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
        <div style="margin:0;padding:0;background:#f3f4f6;color:#111827;font-family:Arial,Helvetica,sans-serif;">
          <div style="max-width:680px;margin:0 auto;padding:28px 16px;">
            <div style="border:1px solid #e5e7eb;background:#ffffff;border-radius:14px;overflow:hidden;">
              <div style="height:6px;background:#111827;"></div>
              <div style="padding:26px 24px 22px 24px;">
                <p style="margin:0;color:#6b7280;font-size:12px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase;">Founders Meet 2026</p>
                <h1 style="margin:10px 0 8px 0;font-size:30px;line-height:1.2;color:#111827;">Your registration is confirmed</h1>
                <p style="margin:0;color:#374151;font-size:15px;line-height:1.7;">Your payment has been verified. Your official event ticket is attached as a PDF with QR verification.</p>

                <div style="margin-top:18px;border:1px solid #e5e7eb;border-radius:12px;background:#f9fafb;padding:16px;">
                  <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;">
                    <tr>
                      <td style="padding:6px 0;color:#6b7280;">Attendee</td>
                      <td style="padding:6px 0;color:#111827;font-weight:700;text-align:right;">${registration.name}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#6b7280;">Registration ID</td>
                      <td style="padding:6px 0;color:#111827;font-weight:700;text-align:right;">${registration.id}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#6b7280;">Pass Type</td>
                      <td style="padding:6px 0;color:#111827;font-weight:700;text-align:right;">${passName}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#6b7280;">Event</td>
                      <td style="padding:6px 0;color:#111827;font-weight:700;text-align:right;">${eventTitle}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#6b7280;">Date & Time</td>
                      <td style="padding:6px 0;color:#111827;font-weight:700;text-align:right;">${eventDate}, ${eventTime}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;color:#6b7280;">Venue</td>
                      <td style="padding:6px 0;color:#111827;font-weight:700;text-align:right;">${eventVenue}</td>
                    </tr>
                  </table>
                </div>

                <div style="margin-top:16px;padding:12px 14px;border:1px solid #d1fae5;background:#ecfdf5;border-radius:12px;color:#065f46;font-size:13px;line-height:1.6;">
                  Please carry the attached PDF ticket on your phone or as a printout. QR verification is required at check-in.
                </div>

                <div style="margin-top:20px;color:#374151;font-size:13px;">
                  <p style="margin:0 0 8px 0;color:#111827;font-weight:700;">Pass benefits</p>
                  <ul style="margin:0;padding-left:18px;line-height:1.8;">${passBenefits}</ul>
                </div>

                <div style="margin-top:22px;padding-top:14px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;line-height:1.6;">
                  Need help? Reply to this email and our team will assist you.
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
