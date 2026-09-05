import type { Context } from "@netlify/edge-functions";
import { handleCors } from "../lib/cors.ts";
import { authenticate } from "../lib/auth.ts";
import { mockGeopoliticalRisks } from "../lib/mockData.ts";

export default async (request: Request, context: Context): Promise<Response> => {
  const corsResponse = handleCors(request); if (corsResponse) return corsResponse;
  const user = authenticate(request);
  const includeDetails = ["executive", "admin"].includes(user.role);
  const data = mockGeopoliticalRisks.map((risk) => ({ region: risk.region, score: risk.score, trend: risk.trend, ...(includeDetails && { factors: risk.factors, lastIncident: risk.lastIncident }) }));
  return new Response(JSON.stringify({ timestamp: new Date().toISOString(), risks: data, summary: { regionsMonitored: 4, globalRiskScore: "61.75", highestRisk: "Middle East", risingCount: 2 } }), { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=120" } });
};
export const config = { path: "/api/geopolitical-risk" };
