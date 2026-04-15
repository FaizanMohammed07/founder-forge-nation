import type { DashboardRegistration } from "./googleSheets.js";
import { buildTicketAttachment, getPassBenefits } from "./tickets.js";

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
  const ticketAttachment = buildTicketAttachment(registration);

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
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
          <h2>Registration Confirmed 🎉</h2>
          <p>Your registration has been successfully approved by our admin team.</p>
          <p><strong>Name:</strong> ${registration.name}</p>
          <p><strong>Registration ID:</strong> ${registration.id}</p>
          <p><strong>Pass Type:</strong> ${passName}</p>
          <p><strong>Event:</strong> ${eventTitle}</p>
          <p><strong>Date & Time:</strong> ${eventDate}, ${eventTime}</p>
          <p><strong>Venue:</strong> ${eventVenue}</p>
          <p><strong>Ticket Link:</strong> <a href="${ticketUrl}">${ticketUrl}</a></p>
          <p><strong>Pass Benefits:</strong></p>
          <ul>${passBenefits}</ul>
          <p>We have also attached your ticket as an SVG file.</p>
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
