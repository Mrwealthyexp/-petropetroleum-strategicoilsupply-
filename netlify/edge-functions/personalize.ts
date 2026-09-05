import type { Context } from "@netlify/edge-functions";
import { handleCors } from "../lib/cors.ts";
import { authenticate } from "../lib/auth.ts";

export default async (request: Request, context: Context): Promise<Response> => {
  const corsResponse = handleCors(request); if (corsResponse) return corsResponse;
  if (request.method !== "GET") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
  const user = authenticate(request);
  const featureMatrix: Record<string, string[]> = { public: ["basic-prices", "news-feed"], analyst: ["basic-prices", "news-feed", "spr-data", "supply-routes", "scenario-modeling", "export-csv", "raw-data-feeds"], executive: ["basic-prices", "news-feed", "spr-data", "supply-routes", "scenario-modeling", "export-csv", "raw-data-feeds", "executive-summary", "risk-alerts", "weekly-briefing", "portfolio-impact", "compliance-reports"], admin: ["basic-prices", "news-feed", "spr-data", "supply-routes", "scenario-modeling", "export-csv", "raw-data-feeds", "executive-summary", "risk-alerts", "weekly-briefing", "portfolio-impact", "compliance-reports", "user-management", "audit-logs", "api-key-management"] };
  const refreshRates: Record<string, number> = { free: 300, pro: 60, enterprise: 10 };
  const dataSourceMatrix: Record<string, string[]> = { free: ["delayed-15min"], pro: ["real-time", "historical-1yr", "eia-feed"], enterprise: ["real-time", "historical-5yr", "eia-feed", "satellite-ais", "insider-reports"] };
  return new Response(JSON.stringify({ userContext: user, geoLocation: { country: context.geo?.country?.name || "Unknown", countryCode: context.geo?.country?.code || "XX", city: context.geo?.city || "Unknown", timezone: context.geo?.timezone || "UTC", latitude: context.geo?.latitude || 0, longitude: context.geo?.longitude || 0 }, features: featureMatrix[user.role] || featureMatrix.public, dataSources: dataSourceMatrix[user.subscription] || dataSourceMatrix.free, refreshRate: refreshRates[user.subscription] || 300, timezone: context.geo?.timezone || "UTC" }), { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "private, no-cache" } });
};
export const config = { path: "/api/personalize" };
