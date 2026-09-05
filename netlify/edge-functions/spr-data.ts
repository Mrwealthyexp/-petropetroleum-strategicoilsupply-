import type { Context } from "@netlify/edge-functions";
import { handleCors } from "../lib/cors.ts";
import { authenticate } from "../lib/auth.ts";
import { mockSPRLevels } from "../lib/mockData.ts";

export default async (request: Request, context: Context): Promise<Response> => {
  const corsResponse = handleCors(request); if (corsResponse) return corsResponse;
  const user = authenticate(request);
  if (!["analyst", "executive", "admin"].includes(user.role)) return new Response(JSON.stringify({ error: "Insufficient permissions" }), { status: 403, headers: { "Content-Type": "application/json" } });
  return new Response(JSON.stringify({ timestamp: new Date().toISOString(), facilities: mockSPRLevels, summary: { totalCapacity: 716, totalCurrent: 657.4, overallPercentage: "91.8", facilityCount: 4 } }), { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=60" } });
};
export const config = { path: "/api/spr-data" };
