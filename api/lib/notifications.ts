import type { DashboardRegistration } from "./googleSheets.js";

type NotificationResult = {
  success: boolean;
  message: string;
};

export async function sendApprovalEmail(
  registration: DashboardRegistration,
): Promise<NotificationResult> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!resendApiKey || !fromEmail) {
    return {
      success: false,
      message: "Email not sent because RESEND_API_KEY or RESEND_FROM_EMAIL is missing.",
    };
  }

  const eventTitle = process.env.EVENT_TITLE || "Founders Meet 2026";
  const eventDate = process.env.EVENT_DATE || "18 April 2026";
  const eventVenue = process.env.EVENT_VENUE || "T-HUB, Hyderabad";

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
          <p>Your registration has been successfully confirmed.</p>
          <p><strong>Name:</strong> ${registration.name}</p>
          <p><strong>Registration ID:</strong> ${registration.id}</p>
          <p><strong>Event:</strong> ${eventTitle}</p>
          <p><strong>Date:</strong> ${eventDate}</p>
          <p><strong>Venue:</strong> ${eventVenue}</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const raw = await response.text();
    return {
      success: false,
      message: `Email send failed: ${raw || response.statusText}`,
    };
  }

  return {
    success: true,
    message: "Approval email sent successfully.",
  };
}
