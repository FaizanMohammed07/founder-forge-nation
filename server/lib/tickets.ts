import type { DashboardRegistration } from "./googleSheets.js";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export type WorkflowStatus = "pending" | "approved" | "rejected";

const STARTUP_INDIA_LOGO_URL =
  "https://res.cloudinary.com/dmrp1d1tv/image/upload/q_auto/f_auto/v1770106897/Startups_India_Logo_ba8vml.png";
const DEVUP_LOGO_URL =
  "https://res.cloudinary.com/dmrp1d1tv/image/upload/q_auto/f_auto/v1776086729/favicon_sox9m8.png";
const THUB_LOGO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/4/40/T-Hub_Logo-PNG.png";

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
  const largeQrCodeUrl = `https://quickchart.io/qr?text=${qrPayload}&size=360`;
  const smallQrCodeUrl = `https://quickchart.io/qr?text=${qrPayload}&size=140`;

  const eventName = process.env.EVENT_TITLE || "Founders Meet";
  const eventDate = process.env.EVENT_DATE || "18 April 2026";
  const eventTime = process.env.EVENT_TIME || "2:00 PM - 8:00 PM";
  const eventVenue = process.env.EVENT_VENUE || "T-HUB, Hyderabad";

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="1050" viewBox="0 0 1500 1050" role="img" aria-label="Founders Meet Ticket">
  <defs>
    <linearGradient id="ticketBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#05060a" />
      <stop offset="100%" stop-color="#121621" />
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ef4444" />
      <stop offset="100%" stop-color="#22c55e" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="1500" height="1050" rx="44" fill="url(#ticketBg)" />
  <rect x="30" y="30" width="1440" height="990" rx="34" fill="none" stroke="rgba(255,255,255,0.12)" />

  <rect x="70" y="70" width="1050" height="910" rx="30" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
  <rect x="1120" y="70" width="310" height="910" rx="30" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
  <line x1="1120" y1="90" x2="1120" y2="960" stroke="rgba(255,255,255,0.45)" stroke-width="2" stroke-dasharray="7 10" />

  <rect x="70" y="70" width="1050" height="10" rx="5" fill="url(#accent)" />

  <text x="120" y="132" fill="#fca5a5" font-size="24" font-family="Arial, Helvetica, sans-serif" letter-spacing="4">STARTUPS INDIA PRESENTS</text>
  <text x="120" y="194" fill="#ffffff" font-size="70" font-weight="700" font-family="Arial, Helvetica, sans-serif">Founders Meet</text>

  <text x="120" y="250" fill="#9ca3af" font-size="18" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">VENUE</text>
  <text x="120" y="286" fill="#ffffff" font-size="36" font-family="Arial, Helvetica, sans-serif">${escapeXml(eventVenue)}</text>

  <text x="470" y="250" fill="#9ca3af" font-size="18" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">DATE</text>
  <text x="470" y="286" fill="#ffffff" font-size="36" font-family="Arial, Helvetica, sans-serif">${escapeXml(eventDate)}</text>

  <text x="760" y="250" fill="#9ca3af" font-size="18" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">TIME</text>
  <text x="760" y="286" fill="#ffffff" font-size="36" font-family="Arial, Helvetica, sans-serif">${escapeXml(eventTime)}</text>

  <text x="120" y="358" fill="#9ca3af" font-size="16" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">ATTENDEE NAME</text>
  <text x="120" y="404" fill="#ffffff" font-size="48" font-weight="700" font-family="Arial, Helvetica, sans-serif">${escapeXml(registration.name)}</text>
  <text x="120" y="446" fill="#d4d4d8" font-size="24" font-family="Arial, Helvetica, sans-serif">${escapeXml(registration.email)}</text>
  <text x="120" y="482" fill="#d4d4d8" font-size="24" font-family="Arial, Helvetica, sans-serif">${escapeXml(registration.phone)}</text>

  <rect x="120" y="528" width="350" height="96" rx="18" fill="rgba(239,68,68,0.12)" stroke="rgba(239,68,68,0.35)" />
  <text x="148" y="564" fill="#fecaca" font-size="15" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">PASS TYPE</text>
  <text x="148" y="603" fill="#ffffff" font-size="38" font-weight="700" font-family="Arial, Helvetica, sans-serif">${escapeXml(passName)}</text>

  <text x="120" y="684" fill="#9ca3af" font-size="16" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">TRANSACTION ID</text>
  <text x="120" y="724" fill="#ffffff" font-size="30" font-family="Arial, Helvetica, sans-serif">${escapeXml(registration.transactionId || "N/A")}</text>

  <text x="120" y="792" fill="#9ca3af" font-size="16" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">TICKET ID</text>
  <text x="120" y="832" fill="#ffffff" font-size="34" font-weight="700" font-family="Arial, Helvetica, sans-serif">${escapeXml(ticketId)}</text>

  <image href="${largeQrCodeUrl}" x="760" y="500" width="300" height="300" preserveAspectRatio="xMidYMid meet" />
  <text x="910" y="838" fill="#d4d4d8" font-size="18" text-anchor="middle" font-family="Arial, Helvetica, sans-serif">Scan for onboarding and entry verification</text>

  <text x="120" y="906" fill="#9ca3af" font-size="15" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">PARTNERS</text>
  <rect x="120" y="918" width="210" height="48" rx="10" fill="rgba(255,255,255,0.95)" />
  <image href="${STARTUP_INDIA_LOGO_URL}" x="132" y="926" width="186" height="32" preserveAspectRatio="xMidYMid meet" />
  <rect x="346" y="918" width="140" height="48" rx="10" fill="rgba(255,255,255,0.95)" />
  <image href="${THUB_LOGO_URL}" x="368" y="928" width="96" height="28" preserveAspectRatio="xMidYMid meet" />
  <rect x="500" y="918" width="150" height="48" rx="10" fill="rgba(255,255,255,0.95)" />
  <image href="${DEVUP_LOGO_URL}" x="548" y="927" width="54" height="30" preserveAspectRatio="xMidYMid meet" />
  <text x="670" y="949" fill="#ffffff" font-size="21" font-weight="700" font-family="Arial, Helvetica, sans-serif">I&amp;E   ·   ISI</text>

  <text x="1160" y="132" fill="#fca5a5" font-size="18" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">TEAR-OFF STUB</text>
  <text x="1160" y="188" fill="#ffffff" font-size="36" font-weight="700" font-family="Arial, Helvetica, sans-serif">Founders Meet</text>
  <text x="1160" y="230" fill="#d4d4d8" font-size="24" font-family="Arial, Helvetica, sans-serif">18 April</text>
  <text x="1160" y="278" fill="#9ca3af" font-size="15" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">TICKET ID</text>
  <text x="1160" y="316" fill="#ffffff" font-size="30" font-weight="700" font-family="Arial, Helvetica, sans-serif">${escapeXml(ticketId)}</text>
  <image href="${smallQrCodeUrl}" x="1172" y="364" width="210" height="210" preserveAspectRatio="xMidYMid meet" />
  <text x="1276" y="606" fill="#d4d4d8" font-size="16" text-anchor="middle" font-family="Arial, Helvetica, sans-serif">Quick verify scan</text>
  <text x="1160" y="708" fill="#9ca3af" font-size="15" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">PASS</text>
  <text x="1160" y="744" fill="#ffffff" font-size="28" font-family="Arial, Helvetica, sans-serif">${escapeXml(passName)}</text>
  <text x="1160" y="804" fill="#9ca3af" font-size="15" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">TXN ID</text>
  <text x="1160" y="842" fill="#ffffff" font-size="22" font-family="Arial, Helvetica, sans-serif">${escapeXml(registration.transactionId || "N/A")}</text>
  <text x="1160" y="918" fill="#9ca3af" font-size="14" font-family="Arial, Helvetica, sans-serif">Keep this stub until entry validation.</text>
</svg>
`.trim();
}

function scaleToFit(
  sourceWidth: number,
  sourceHeight: number,
  maxWidth: number,
  maxHeight: number,
): { width: number; height: number } {
  const ratio = Math.min(maxWidth / sourceWidth, maxHeight / sourceHeight);
  return {
    width: sourceWidth * ratio,
    height: sourceHeight * ratio,
  };
}

async function fetchImageBytes(url: string): Promise<Uint8Array> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${url}`);
  }

  const buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
}

export async function buildTicketPdfAttachment(registration: DashboardRegistration): Promise<{
  fileName: string;
  base64Content: string;
}> {
  const ticketId = formatTicketId(registration.id);
  const passName = registration.passType === "premium" ? "Premium" : "Normal";
  const eventDate = process.env.EVENT_DATE || "18 April 2026";
  const eventTime = process.env.EVENT_TIME || "2:00 PM - 8:00 PM";
  const eventVenue = process.env.EVENT_VENUE || "T-HUB, Hyderabad";
  const qrPayload = encodeURIComponent(
    `FOUNDERS-MEET|${ticketId}|${registration.name}|${registration.passType}`,
  );
  const qrUrl = `https://quickchart.io/qr?text=${qrPayload}&size=480`;
  const stubQrUrl = `https://quickchart.io/qr?text=${qrPayload}&size=220`;

  const [startupIndiaLogoBytes, thubLogoBytes, devupLogoBytes, qrBytes, stubQrBytes] =
    await Promise.all([
      fetchImageBytes(STARTUP_INDIA_LOGO_URL),
      fetchImageBytes(THUB_LOGO_URL),
      fetchImageBytes(DEVUP_LOGO_URL),
      fetchImageBytes(qrUrl),
      fetchImageBytes(stubQrUrl),
    ]);

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([360, 252]); // 5in x 3.5in at 72pt/in
  const fontRegular = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const startupIndiaLogo = await pdf.embedPng(startupIndiaLogoBytes);
  const thubLogo = await pdf.embedPng(thubLogoBytes);
  const devupLogo = await pdf.embedPng(devupLogoBytes);
  const qrImage = await pdf.embedPng(qrBytes);
  const stubQrImage = await pdf.embedPng(stubQrBytes);

  const leftWidth = 270;
  const rightX = leftWidth;

  page.drawRectangle({ x: 0, y: 0, width: 360, height: 252, color: rgb(0.03, 0.04, 0.07) });
  page.drawRectangle({
    x: 6,
    y: 6,
    width: 348,
    height: 240,
    borderColor: rgb(0.35, 0.38, 0.45),
    borderWidth: 0.8,
    color: rgb(0.04, 0.05, 0.09),
  });

  page.drawRectangle({
    x: 8,
    y: 8,
    width: leftWidth - 10,
    height: 236,
    borderColor: rgb(0.26, 0.3, 0.38),
    borderWidth: 0.7,
    color: rgb(0.05, 0.06, 0.11),
  });
  page.drawRectangle({
    x: rightX,
    y: 8,
    width: 82,
    height: 236,
    borderColor: rgb(0.26, 0.3, 0.38),
    borderWidth: 0.7,
    color: rgb(0.07, 0.08, 0.13),
  });

  for (let y = 14; y < 236; y += 7) {
    page.drawLine({
      start: { x: rightX, y },
      end: { x: rightX, y: y + 3 },
      color: rgb(0.8, 0.82, 0.86),
      thickness: 0.9,
    });
  }

  page.drawRectangle({ x: 8, y: 238, width: leftWidth - 10, height: 3, color: rgb(0.91, 0.27, 0.29) });

  page.drawText("STARTUPS INDIA PRESENTS", {
    x: 14,
    y: 225,
    size: 7.5,
    font: fontBold,
    color: rgb(0.97, 0.68, 0.7),
  });
  page.drawText("Founders Meet", {
    x: 14,
    y: 208,
    size: 18,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  page.drawText("Venue", { x: 14, y: 191, size: 7, font: fontRegular, color: rgb(0.62, 0.66, 0.73) });
  page.drawText(eventVenue, { x: 14, y: 182, size: 9, font: fontBold, color: rgb(1, 1, 1) });
  page.drawText("Date", { x: 122, y: 191, size: 7, font: fontRegular, color: rgb(0.62, 0.66, 0.73) });
  page.drawText(eventDate, { x: 122, y: 182, size: 9, font: fontBold, color: rgb(1, 1, 1) });
  page.drawText("Time", { x: 198, y: 191, size: 7, font: fontRegular, color: rgb(0.62, 0.66, 0.73) });
  page.drawText(eventTime, { x: 198, y: 182, size: 9, font: fontBold, color: rgb(1, 1, 1) });

  page.drawText("ATTENDEE", { x: 14, y: 166, size: 6.5, font: fontRegular, color: rgb(0.62, 0.66, 0.73) });
  page.drawText(registration.name.slice(0, 28), { x: 14, y: 154, size: 12, font: fontBold, color: rgb(1, 1, 1) });

  page.drawRectangle({
    x: 14,
    y: 132,
    width: 88,
    height: 18,
    color: rgb(0.26, 0.1, 0.13),
    borderColor: rgb(0.8, 0.28, 0.34),
    borderWidth: 0.6,
  });
  page.drawText("PASS", { x: 18, y: 142, size: 6, font: fontRegular, color: rgb(0.98, 0.78, 0.8) });
  page.drawText(passName, { x: 18, y: 135, size: 9, font: fontBold, color: rgb(1, 1, 1) });

  page.drawText("TRANSACTION ID", { x: 14, y: 121, size: 6.5, font: fontRegular, color: rgb(0.62, 0.66, 0.73) });
  page.drawText((registration.transactionId || "N/A").slice(0, 26), { x: 14, y: 111, size: 8.5, font: fontBold, color: rgb(1, 1, 1) });

  page.drawText("TICKET ID", { x: 14, y: 100, size: 6.5, font: fontRegular, color: rgb(0.62, 0.66, 0.73) });
  page.drawText(ticketId, { x: 14, y: 88, size: 11, font: fontBold, color: rgb(1, 1, 1) });

  const qrLargeSize = 78;
  page.drawImage(qrImage, { x: 175, y: 86, width: qrLargeSize, height: qrLargeSize });
  page.drawText("Scan for onboarding", {
    x: 170,
    y: 77,
    size: 6.5,
    font: fontRegular,
    color: rgb(0.83, 0.85, 0.9),
  });

  const startupIndiaLogoScaled = scaleToFit(
    startupIndiaLogo.width,
    startupIndiaLogo.height,
    58,
    12,
  );
  const thubLogoScaled = scaleToFit(thubLogo.width, thubLogo.height, 34, 11);
  const devupLogoScaled = scaleToFit(devupLogo.width, devupLogo.height, 20, 11);

  page.drawRectangle({ x: 14, y: 16, width: 72, height: 16, color: rgb(0.95, 0.95, 0.95) });
  page.drawImage(startupIndiaLogo, {
    x: 14 + (72 - startupIndiaLogoScaled.width) / 2,
    y: 16 + (16 - startupIndiaLogoScaled.height) / 2,
    width: startupIndiaLogoScaled.width,
    height: startupIndiaLogoScaled.height,
  });

  page.drawRectangle({ x: 90, y: 16, width: 46, height: 16, color: rgb(0.95, 0.95, 0.95) });
  page.drawImage(thubLogo, {
    x: 90 + (46 - thubLogoScaled.width) / 2,
    y: 16 + (16 - thubLogoScaled.height) / 2,
    width: thubLogoScaled.width,
    height: thubLogoScaled.height,
  });

  page.drawRectangle({ x: 140, y: 16, width: 28, height: 16, color: rgb(0.95, 0.95, 0.95) });
  page.drawImage(devupLogo, {
    x: 140 + (28 - devupLogoScaled.width) / 2,
    y: 16 + (16 - devupLogoScaled.height) / 2,
    width: devupLogoScaled.width,
    height: devupLogoScaled.height,
  });
  page.drawText("I&E · ISI", {
    x: 174,
    y: 21,
    size: 8,
    font: fontBold,
    color: rgb(0.95, 0.95, 0.95),
  });

  page.drawText("FOUNDERS MEET", { x: 278, y: 226, size: 6.5, font: fontBold, color: rgb(0.97, 0.68, 0.7) });
  page.drawText("18 APR", { x: 278, y: 214, size: 10, font: fontBold, color: rgb(1, 1, 1) });
  page.drawText("TICKET", { x: 278, y: 202, size: 6.5, font: fontRegular, color: rgb(0.62, 0.66, 0.73) });
  page.drawText(ticketId, { x: 278, y: 192, size: 9, font: fontBold, color: rgb(1, 1, 1) });

  page.drawImage(stubQrImage, { x: 277, y: 132, width: 56, height: 56 });
  page.drawText("VERIFY", { x: 289, y: 124, size: 6.5, font: fontRegular, color: rgb(0.83, 0.85, 0.9) });
  page.drawText(passName.toUpperCase(), { x: 278, y: 107, size: 8, font: fontBold, color: rgb(1, 1, 1) });

  const pdfBytes = await pdf.save();
  const base64Content = Buffer.from(pdfBytes).toString("base64");
  return {
    fileName: `founders-meet-ticket-${ticketId}.pdf`,
    base64Content,
  };
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
