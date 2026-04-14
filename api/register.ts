import type { VercelRequest, VercelResponse } from "@vercel/node";
import registerHandler from "./registrations/register.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  return registerHandler(req, res);
}
