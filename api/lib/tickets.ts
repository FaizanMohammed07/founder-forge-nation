import type { DashboardRegistration } from "./googleSheets.js";

export type WorkflowStatus = "pending" | "approved" | "rejected";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function formatTicketId(registrationId: string): string {
  return registrationId.slice(0, 8).toUpperCase();
}

export function getAppBaseUrl(): string {
  if (process.env.APP_BASE_URL) {
    return process.env.APP_BASE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:8080";
}

export function getTicketUrl(registrationId: string): string {
  const base = getAppBaseUrl();
  return `${base}/api/tickets/get?id=${encodeURIComponent(registrationId)}`;
}

export function getPassBenefits(passType: "normal" | "premium"): string[] {
  if (passType === "premium") {
    return [
      "Welcome kit",
      "Founders Meet certification",
      "Refreshments",
      "Priority seating and premium networking access",
    ];
  }

  return ["Refreshments", "General event access", "Community networking"];
}

export function buildTicketSvg(registration: DashboardRegistration): string {
  const ticketId = formatTicketId(registration.id);
  const passName = registration.passType === "premium" ? "Premium Pass" : "Normal Pass";
  const qrPayload = encodeURIComponent(
    `FOUNDERS-MEET|${ticketId}|${registration.name}|${registration.passType}`,
  );
  const qrCodeUrl = `https://quickchart.io/qr?text=${qrPayload}&size=240`;

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720" role="img" aria-label="Founders Meet Ticket">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#070707" />
      <stop offset="100%" stop-color="#191919" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="1200" height="720" rx="34" fill="url(#bg)" />
  <rect x="40" y="40" width="1120" height="640" rx="28" fill="none" stroke="rgba(255,255,255,0.14)" />
  <text x="90" y="120" fill="#fca5a5" font-size="22" font-family="Arial" letter-spacing="4">FOUNDERS MEET</text>
  <text x="90" y="180" fill="#fff" font-size="54" font-weight="700" font-family="Arial">Registration Confirmed</text>
  <text x="90" y="225" fill="#d4d4d8" font-size="24" font-family="Arial">T-Hub, Hyderabad · April 18 · 4:00 PM</text>

  <text x="90" y="300" fill="#a1a1aa" font-size="16" font-family="Arial" letter-spacing="3">ATTENDEE</text>
  <text x="90" y="340" fill="#fff" font-size="38" font-weight="700" font-family="Arial">${escapeXml(registration.name)}</text>
  <text x="90" y="378" fill="#d4d4d8" font-size="22" font-family="Arial">${escapeXml(registration.email)}</text>
  <text x="90" y="410" fill="#d4d4d8" font-size="22" font-family="Arial">${escapeXml(registration.phone)}</text>

  <text x="90" y="472" fill="#a1a1aa" font-size="16" font-family="Arial" letter-spacing="3">PASS TYPE</text>
  <text x="90" y="510" fill="#fff" font-size="34" font-weight="700" font-family="Arial">${passName}</text>

  <text x="90" y="566" fill="#a1a1aa" font-size="16" font-family="Arial" letter-spacing="3">TRANSACTION ID</text>
  <text x="90" y="604" fill="#fff" font-size="24" font-family="Arial">${escapeXml(registration.transactionId || "N/A")}</text>

  <text x="840" y="120" fill="#a1a1aa" font-size="16" font-family="Arial" letter-spacing="3">TICKET ID</text>
  <text x="840" y="160" fill="#fff" font-size="38" font-weight="700" font-family="Arial">${ticketId}</text>
  <image href="${qrCodeUrl}" x="860" y="210" width="220" height="220" preserveAspectRatio="xMidYMid meet" />
  <text x="970" y="458" fill="#d4d4d8" font-size="16" text-anchor="middle" font-family="Arial">Scan for verification</text>

  <text x="840" y="520" fill="#a1a1aa" font-size="16" font-family="Arial" letter-spacing="3">NOTE</text>
  <text x="840" y="560" fill="#fff" font-size="22" font-family="Arial">Carry this ticket at entry.</text>
  <text x="840" y="592" fill="#d4d4d8" font-size="20" font-family="Arial">Refreshments included for all passes.</text>
</svg>
`.trim();
}

export function buildTicketHtml(registration: DashboardRegistration): string {
  const ticketSvg = buildTicketSvg(registration);
  const ticketDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(ticketSvg)}`;
  const passName = registration.passType === "premium" ? "Premium Pass" : "Normal Pass";
  const benefits = getPassBenefits(registration.passType)
    .map((item) => `<li>${escapeXml(item)}</li>`)
    .join("");

  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Founders Meet Ticket</title>
    <style>
      body { background:#070707; color:#fff; margin:0; padding:20px; font-family:Arial,sans-serif; }
      .wrap { max-width:1080px; margin:0 auto; }
      img { width:100%; border-radius:20px; border:1px solid rgba(255,255,255,.14); }
      .meta { margin-top:16px; display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; }
      .card { border:1px solid rgba(255,255,255,.12); border-radius:12px; padding:12px; background:rgba(255,255,255,.03); }
      ul { margin:8px 0 0; padding-left:18px; }
      a { color:#f87171; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <img src="${ticketDataUrl}" alt="Founders Meet ticket" />
      <div class="meta">
        <div class="card"><strong>Name:</strong> ${escapeXml(registration.name)}</div>
        <div class="card"><strong>Pass:</strong> ${passName}</div>
        <div class="card"><strong>Amount:</strong> INR ${registration.amount || 0}</div>
        <div class="card"><strong>Status:</strong> ${registration.status}</div>
      </div>
      <div class="card" style="margin-top:12px;">
        <strong>Included benefits</strong>
        <ul>${benefits}</ul>
      </div>
    </div>
  </body>
</html>
`.trim();
}

export function buildTicketAttachment(registration: DashboardRegistration): {
  fileName: string;
  base64Content: string;
} {
  const svg = buildTicketSvg(registration);
  const base64Content = Buffer.from(svg, "utf-8").toString("base64");
  return {
    fileName: `founders-meet-ticket-${formatTicketId(registration.id)}.svg`,
    base64Content,
  };
}
