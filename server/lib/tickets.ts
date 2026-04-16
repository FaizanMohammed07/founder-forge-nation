import type { DashboardRegistration } from "./googleSheets.js";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export type WorkflowStatus = "pending" | "approved" | "rejected";

const STARTUP_INDIA_LOGO_URL =
  "https://res.cloudinary.com/dmrp1d1tv/image/upload/q_auto/f_auto/v1770106897/Startups_India_Logo_ba8vml.png";
const DEVUP_LOGO_URL =
  "https://res.cloudinary.com/dmrp1d1tv/image/upload/q_auto/f_auto/v1776086729/favicon_sox9m8.png";
const THUB_LOGO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/4/40/T-Hub_Logo-PNG.png";

type RemoteImageData = {
  bytes: Uint8Array;
  contentType: string;
};

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
  const largeQrCodeUrl = `https://quickchart.io/qr?text=${qrPayload}&size=340`;

  const eventName = process.env.EVENT_TITLE || "Founders Meet";
  const eventDate = process.env.EVENT_DATE || "18 April 2026";
  const eventTime = process.env.EVENT_TIME || "2:00 PM - 8:00 PM";
  const eventVenue = process.env.EVENT_VENUE || "T-HUB, Hyderabad";

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="930" viewBox="0 0 1500 930" role="img" aria-label="Founders Meet Ticket">
  <rect x="0" y="0" width="1500" height="930" fill="#f3f4f6" />
  <rect x="68" y="52" width="1364" height="826" rx="26" fill="#ffffff" stroke="#e5e7eb" stroke-width="2" />
  <rect x="68" y="52" width="1364" height="16" rx="8" fill="#111827" />

  <text x="118" y="120" fill="#6b7280" font-size="18" font-family="Arial, Helvetica, sans-serif" letter-spacing="2">STARTUPS INDIA PRESENTS</text>
  <text x="118" y="170" fill="#111827" font-size="54" font-weight="700" font-family="Arial, Helvetica, sans-serif">Founders Meet</text>

  <rect x="118" y="196" width="920" height="132" rx="14" fill="#f9fafb" stroke="#e5e7eb" />
  <text x="146" y="234" fill="#6b7280" font-size="14" font-family="Arial, Helvetica, sans-serif">VENUE</text>
  <text x="146" y="264" fill="#111827" font-size="30" font-family="Arial, Helvetica, sans-serif">${escapeXml(eventVenue)}</text>
  <text x="554" y="234" fill="#6b7280" font-size="14" font-family="Arial, Helvetica, sans-serif">DATE</text>
  <text x="554" y="264" fill="#111827" font-size="30" font-family="Arial, Helvetica, sans-serif">${escapeXml(eventDate)}</text>
  <text x="800" y="234" fill="#6b7280" font-size="14" font-family="Arial, Helvetica, sans-serif">TIME</text>
  <text x="800" y="264" fill="#111827" font-size="30" font-family="Arial, Helvetica, sans-serif">${escapeXml(eventTime)}</text>

  <text x="118" y="382" fill="#6b7280" font-size="14" font-family="Arial, Helvetica, sans-serif" letter-spacing="1.2">ATTENDEE</text>
  <text x="118" y="422" fill="#111827" font-size="42" font-weight="700" font-family="Arial, Helvetica, sans-serif">${escapeXml(registration.name)}</text>
  <text x="118" y="458" fill="#374151" font-size="24" font-family="Arial, Helvetica, sans-serif">${escapeXml(registration.email)}</text>
  <text x="118" y="494" fill="#374151" font-size="24" font-family="Arial, Helvetica, sans-serif">${escapeXml(registration.phone)}</text>

  <rect x="118" y="536" width="360" height="86" rx="12" fill="#111827" />
  <text x="146" y="568" fill="#d1d5db" font-size="13" font-family="Arial, Helvetica, sans-serif" letter-spacing="1.1">PASS TYPE</text>
  <text x="146" y="602" fill="#ffffff" font-size="34" font-weight="700" font-family="Arial, Helvetica, sans-serif">${escapeXml(passName)}</text>

  <text x="118" y="684" fill="#6b7280" font-size="14" font-family="Arial, Helvetica, sans-serif">TRANSACTION ID</text>
  <text x="118" y="716" fill="#111827" font-size="28" font-family="Arial, Helvetica, sans-serif">${escapeXml(registration.transactionId || "N/A")}</text>

  <text x="118" y="774" fill="#6b7280" font-size="14" font-family="Arial, Helvetica, sans-serif">TICKET ID</text>
  <text x="118" y="810" fill="#111827" font-size="34" font-weight="700" font-family="Arial, Helvetica, sans-serif">${escapeXml(ticketId)}</text>

  <rect x="1078" y="196" width="286" height="346" rx="14" fill="#f9fafb" stroke="#e5e7eb" />
  <image href="${largeQrCodeUrl}" x="1121" y="230" width="200" height="200" preserveAspectRatio="xMidYMid meet" />
  <text x="1221" y="462" fill="#374151" font-size="16" text-anchor="middle" font-family="Arial, Helvetica, sans-serif">Scan for entry verification</text>

  <text x="118" y="858" fill="#6b7280" font-size="13" font-family="Arial, Helvetica, sans-serif">Official partners</text>
  <rect x="118" y="868" width="284" height="64" rx="10" fill="#ffffff" stroke="#d1d5db" />
  <image href="${STARTUP_INDIA_LOGO_URL}" x="136" y="882" width="248" height="38" preserveAspectRatio="xMidYMid meet" />

  <rect x="420" y="868" width="186" height="64" rx="10" fill="#ffffff" stroke="#d1d5db" />
  <image href="${THUB_LOGO_URL}" x="450" y="884" width="126" height="34" preserveAspectRatio="xMidYMid meet" />

  <rect x="624" y="868" width="132" height="64" rx="10" fill="#ffffff" stroke="#d1d5db" />
  <image href="${DEVUP_LOGO_URL}" x="660" y="882" width="60" height="36" preserveAspectRatio="xMidYMid meet" />

  <text x="780" y="906" fill="#111827" font-size="23" font-weight="700" font-family="Arial, Helvetica, sans-serif">I&amp;E · ISI</text>
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

async function fetchImageData(url: string): Promise<RemoteImageData> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${url}`);
  }

  const buffer = await response.arrayBuffer();
  return {
    bytes: new Uint8Array(buffer),
    contentType: response.headers.get("content-type") || "",
  };
}

async function embedRemoteImage(
  pdf: PDFDocument,
  image: RemoteImageData,
): Promise<Awaited<ReturnType<PDFDocument["embedPng"]>> | null> {
  try {
    if (image.contentType.includes("jpeg") || image.contentType.includes("jpg")) {
      return await pdf.embedJpg(image.bytes);
    }
    return await pdf.embedPng(image.bytes);
  } catch {
    try {
      return await pdf.embedPng(image.bytes);
    } catch {
      try {
        return await pdf.embedJpg(image.bytes);
      } catch {
        return null;
      }
    }
  }
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
  const qrUrl = `https://quickchart.io/qr?text=${qrPayload}&size=420`;

  const [startupIndiaLogoData, thubLogoData, devupLogoData, qrData] = await Promise.all([
    fetchImageData(STARTUP_INDIA_LOGO_URL),
    fetchImageData(THUB_LOGO_URL),
    fetchImageData(DEVUP_LOGO_URL),
    fetchImageData(qrUrl),
  ]);

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([640, 390]);
  const fontRegular = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const startupIndiaLogo = await embedRemoteImage(pdf, startupIndiaLogoData);
  const thubLogo = await embedRemoteImage(pdf, thubLogoData);
  const devupLogo = await embedRemoteImage(pdf, devupLogoData);
  const qrImage = await embedRemoteImage(pdf, qrData);

  page.drawRectangle({ x: 0, y: 0, width: 640, height: 390, color: rgb(0.95, 0.96, 0.97) });
  page.drawRectangle({
    x: 24,
    y: 24,
    width: 592,
    height: 342,
    color: rgb(1, 1, 1),
    borderColor: rgb(0.87, 0.89, 0.92),
    borderWidth: 1,
  });
  page.drawRectangle({ x: 24, y: 354, width: 592, height: 12, color: rgb(0.07, 0.09, 0.13) });

  page.drawText("STARTUPS INDIA PRESENTS", {
    x: 44,
    y: 334,
    size: 10,
    font: fontBold,
    color: rgb(0.43, 0.48, 0.55),
  });
  page.drawText("Founders Meet", {
    x: 44,
    y: 305,
    size: 30,
    font: fontBold,
    color: rgb(0.07, 0.09, 0.13),
  });

  page.drawRectangle({
    x: 44,
    y: 242,
    width: 358,
    height: 56,
    color: rgb(0.98, 0.98, 0.99),
    borderColor: rgb(0.9, 0.92, 0.95),
    borderWidth: 1,
  });
  page.drawText("Venue", { x: 58, y: 279, size: 9, font: fontRegular, color: rgb(0.43, 0.48, 0.55) });
  page.drawText(eventVenue.slice(0, 36), { x: 58, y: 262, size: 13, font: fontBold, color: rgb(0.07, 0.09, 0.13) });
  page.drawText("Date", { x: 240, y: 279, size: 9, font: fontRegular, color: rgb(0.43, 0.48, 0.55) });
  page.drawText(eventDate, { x: 240, y: 262, size: 13, font: fontBold, color: rgb(0.07, 0.09, 0.13) });
  page.drawText("Time", { x: 334, y: 279, size: 9, font: fontRegular, color: rgb(0.43, 0.48, 0.55) });
  page.drawText(eventTime.slice(0, 20), { x: 334, y: 262, size: 13, font: fontBold, color: rgb(0.07, 0.09, 0.13) });

  page.drawText("Attendee", { x: 44, y: 223, size: 9, font: fontRegular, color: rgb(0.43, 0.48, 0.55) });
  page.drawText(registration.name.slice(0, 32), { x: 44, y: 204, size: 18, font: fontBold, color: rgb(0.07, 0.09, 0.13) });
  page.drawText(registration.email.slice(0, 40), { x: 44, y: 188, size: 10.5, font: fontRegular, color: rgb(0.2, 0.24, 0.3) });

  page.drawRectangle({ x: 44, y: 150, width: 168, height: 28, color: rgb(0.07, 0.09, 0.13) });
  page.drawText(passName.toUpperCase(), { x: 54, y: 160, size: 11, font: fontBold, color: rgb(1, 1, 1) });

  page.drawText("Transaction ID", { x: 44, y: 132, size: 9, font: fontRegular, color: rgb(0.43, 0.48, 0.55) });
  page.drawText((registration.transactionId || "N/A").slice(0, 32), {
    x: 44,
    y: 116,
    size: 11,
    font: fontBold,
    color: rgb(0.07, 0.09, 0.13),
  });

  page.drawText("Ticket ID", { x: 44, y: 96, size: 9, font: fontRegular, color: rgb(0.43, 0.48, 0.55) });
  page.drawText(ticketId, { x: 44, y: 78, size: 15, font: fontBold, color: rgb(0.07, 0.09, 0.13) });

  page.drawRectangle({
    x: 426,
    y: 126,
    width: 160,
    height: 172,
    color: rgb(0.98, 0.98, 0.99),
    borderColor: rgb(0.9, 0.92, 0.95),
    borderWidth: 1,
  });
  if (qrImage) {
    page.drawImage(qrImage, { x: 445, y: 149, width: 122, height: 122 });
  }
  page.drawText("Scan for entry verification", {
    x: 441,
    y: 135,
    size: 9,
    font: fontRegular,
    color: rgb(0.2, 0.24, 0.3),
  });

  page.drawText("Official partners", { x: 44, y: 58, size: 9, font: fontRegular, color: rgb(0.43, 0.48, 0.55) });

  page.drawRectangle({ x: 44, y: 34, width: 170, height: 20, color: rgb(1, 1, 1), borderColor: rgb(0.83, 0.86, 0.9), borderWidth: 1 });
  page.drawRectangle({ x: 220, y: 34, width: 116, height: 20, color: rgb(1, 1, 1), borderColor: rgb(0.83, 0.86, 0.9), borderWidth: 1 });
  page.drawRectangle({ x: 342, y: 34, width: 92, height: 20, color: rgb(1, 1, 1), borderColor: rgb(0.83, 0.86, 0.9), borderWidth: 1 });

  if (startupIndiaLogo) {
    const startupIndiaLogoScaled = scaleToFit(startupIndiaLogo.width, startupIndiaLogo.height, 156, 14);
    page.drawImage(startupIndiaLogo, {
      x: 44 + (170 - startupIndiaLogoScaled.width) / 2,
      y: 34 + (20 - startupIndiaLogoScaled.height) / 2,
      width: startupIndiaLogoScaled.width,
      height: startupIndiaLogoScaled.height,
    });
  } else {
    page.drawText("Startups India", { x: 88, y: 40, size: 8.5, font: fontBold, color: rgb(0.07, 0.09, 0.13) });
  }

  if (thubLogo) {
    const thubLogoScaled = scaleToFit(thubLogo.width, thubLogo.height, 102, 14);
    page.drawImage(thubLogo, {
      x: 220 + (116 - thubLogoScaled.width) / 2,
      y: 34 + (20 - thubLogoScaled.height) / 2,
      width: thubLogoScaled.width,
      height: thubLogoScaled.height,
    });
  } else {
    page.drawText("T-Hub", { x: 262, y: 40, size: 8.5, font: fontBold, color: rgb(0.07, 0.09, 0.13) });
  }

  if (devupLogo) {
    const devupLogoScaled = scaleToFit(devupLogo.width, devupLogo.height, 78, 14);
    page.drawImage(devupLogo, {
      x: 342 + (92 - devupLogoScaled.width) / 2,
      y: 34 + (20 - devupLogoScaled.height) / 2,
      width: devupLogoScaled.width,
      height: devupLogoScaled.height,
    });
  } else {
    page.drawText("DevUp", { x: 373, y: 40, size: 8.5, font: fontBold, color: rgb(0.07, 0.09, 0.13) });
  }

  page.drawText("I&E · ISI", {
    x: 448,
    y: 40,
    size: 10,
    font: fontBold,
    color: rgb(0.07, 0.09, 0.13),
  });

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
