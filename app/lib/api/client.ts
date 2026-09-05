import { OilPrice, SPRData, SupplyRouteData, RiskData, CopilotResponse, ScenarioData, ScenarioParams, PersonalizedDashboard, ChatMessage } from "../types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8888";

class ApiError extends Error {
  constructor(public status: number, public message: string, public details?: string[]) {
    super(message); this.name = "ApiError";
  }
}

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-API-Key": process.env.NEXT_PUBLIC_API_KEY || "pk_analyst_demo_2026",
    ...((options.headers as Record<string, string>) || {}),
  };
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
    throw new ApiError(response.status, errorData.error, errorData.details);
  }
  return response.json() as Promise<T>;
}

export const queryKeys = {
  personalization: ["personalization"] as const,
  oilPrices: (symbol?: string) => ["oilPrices", symbol] as const,
  sprData: (facility?: string) => ["sprData", facility] as const,
  supplyRoutes: (filters?: object) => ["supplyRoutes", filters] as const,
  geopoliticalRisk: (region?: string, minScore?: number) => ["geopoliticalRisk", region, minScore] as const,
};

export const oilApi = {
  getPersonalization: () => apiFetch<PersonalizedDashboard>("/api/personalize"),
  getPrices: (symbol?: string) => apiFetch<{ timestamp: string; symbols: OilPrice[]; source: string; accessLevel: string }>(`/api/oil-data${symbol ? `?symbol=${symbol}` : ""}`),
  getSPR: (facility?: string) => apiFetch<SPRData>(`/api/spr-data${facility ? `?facility=${facility}` : ""}`),
  getSupplyRoutes: (filters?: object) => { const params = new URLSearchParams(); return apiFetch<SupplyRouteData>(`/api/supply-routes?${params.toString()}`); },
  getGeopoliticalRisk: (region?: string, minScore?: number) => { const params = new URLSearchParams(); if (region) params.append("region", region); if (minScore !== undefined) params.append("minScore", minScore.toString()); return apiFetch<RiskData>(`/api/geopolitical-risk?${params.toString()}`); },
  chatWithCopilot: (messages: ChatMessage[]) => apiFetch<CopilotResponse>("/api/ai-copilot", { method: "POST", body: JSON.stringify({ messages }) }),
  runScenario: (params: ScenarioParams) => apiFetch<ScenarioData>("/api/scenarios", { method: "POST", body: JSON.stringify(params) }),
};

export { ApiError };
