import type { VercelRequest, VercelResponse } from "@vercel/node";

const ADMIN_COOKIE_NAME = "ffn_admin_session";

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "";
}

function getAdminSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader.split(";").reduce<Record<string, string>>((acc, part) => {
    const [rawKey, ...rawValue] = part.split("=");
    const key = rawKey?.trim();
    if (!key) {
      return acc;
    }
    acc[key] = decodeURIComponent(rawValue.join("=").trim());
    return acc;
  }, {});
}

function buildCookie(value: string, maxAgeSeconds: number): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${ADMIN_COOKIE_NAME}=${encodeURIComponent(value)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${maxAgeSeconds}${secure}`;
}

export function isAdminEnvConfigured(): boolean {
  return Boolean(getAdminPassword() && getAdminSessionSecret());
}

export function verifyAdminPassword(password: string): boolean {
  const expected = getAdminPassword();
  return Boolean(expected) && password === expected;
}

export function setAdminSessionCookie(res: VercelResponse): void {
  const sessionSecret = getAdminSessionSecret();
  res.setHeader("Set-Cookie", buildCookie(sessionSecret, 60 * 60 * 12));
}

export function clearAdminSessionCookie(res: VercelResponse): void {
  res.setHeader("Set-Cookie", buildCookie("", 0));
}

export function isAdminAuthenticated(req: VercelRequest): boolean {
  const expected = getAdminSessionSecret();
  if (!expected) {
    return false;
  }
  const cookies = parseCookies(req.headers.cookie);
  return cookies[ADMIN_COOKIE_NAME] === expected;
}
