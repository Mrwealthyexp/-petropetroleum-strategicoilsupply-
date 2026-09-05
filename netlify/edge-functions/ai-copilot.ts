import type { Context } from "@netlify/edge-functions";
import { handleCors } from "../lib/cors.ts";
import { authenticate } from "../lib/auth.ts";

export default async (request: Request, context: Context): Promise<Response> => {
  const corsResponse = handleCors(request); if (corsResponse) return corsResponse;
  if (request.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
  const user = authenticate(request);
  if (user.subscription === "free") return new Response(JSON.stringify({ error: "AI Co-Pilot requires Pro subscription" }), { status: 403, headers: { "Content-Type": "application/json" } });
  const { messages } = await request.json();
  const lastMsg = messages[messages.length - 1]?.content || "";
  let response = "I am your PetroPulse AI Co-Pilot. Ask about oil prices, SPR, routes, or risks.";
  if (lastMsg.toLowerCase().includes("spr")) response = "Current SPR: 657.4M barrels (91.8% capacity). Bryan Mound: 226.4M/250M (90.6%). Big Hill: 160.2M/170M (94.2%).";
  else if (lastMsg.toLowerCase().includes("price")) response = "Brent: $84.52 (+1.47%), WTI: $80.15 (+1.24%). Spread: $4.37.";
  return new Response(JSON.stringify({ id: `chat-${Date.now()}`, role: "assistant", content: response, timestamp: new Date().toISOString(), model: "petropulse-copilot-v1" }), { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "private, no-cache" } });
};
export const config = { path: "/api/ai-copilot" };
