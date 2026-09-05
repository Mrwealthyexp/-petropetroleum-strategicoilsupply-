import type { Context } from "@netlify/edge-functions";
import { handleCors } from "../lib/cors.ts";
import { authenticate } from "../lib/auth.ts";
import { mockSupplyRoutes } from "../lib/mockData.ts";

export default async (request: Request, context: Context): Promise<Response> => {
  const corsResponse = handleCors(request); if (corsResponse) return corsResponse;
  const user = authenticate(request);
  if (!["analyst", "executive", "admin"].includes(user.role)) return new Response(JSON.stringify({ error: "Insufficient permissions" }), { status: 403, headers: { "Content-Type": "application/json" } });
  return new Response(JSON.stringify({ timestamp: new Date().toISOString(), routes: mockSupplyRoutes, summary: { totalRoutes: 4, activeRoutes: 3, disruptedRoutes: 1, activeVolume: 4890000, disruptedVolume: 1200000, totalVolume: 6090000 } }), { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=30" } });
};
export const config = { path: "/api/supply-routes" };
