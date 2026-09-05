export interface OilPrice {
  timestamp: string; price: number; currency: string; unit: "barrel" | "gallon" | "liter";
  change: number; changePercent: number; source: string; symbol: "BRENT" | "WTI";
}
export interface SPRFacility {
  country: string; facility: string; currentLevel: number; capacity: number;
  percentageFull: number; lastUpdated: string;
}
export interface SPRSummary {
  totalCapacity: number; totalCurrent: number; overallPercentage: string; facilityCount: number;
}
export interface SPRData {
  timestamp: string; facilities: SPRFacility[]; summary: SPRSummary; accessLevel: string;
}
export interface SupplyRoute {
  id: string; origin: string; destination: string; type: "pipeline" | "tanker" | "rail";
  volume: number; status: "active" | "disrupted" | "maintenance"; coordinates: [number, number][];
}
export interface SupplyRouteSummary {
  totalRoutes: number; activeRoutes: number; disruptedRoutes: number;
  activeVolume: number; disruptedVolume: number; totalVolume: number;
}
export interface SupplyRouteData {
  timestamp: string; routes: SupplyRoute[]; summary: SupplyRouteSummary; accessLevel: string;
}
export interface GeopoliticalRisk {
  region: string; score: number; trend: "rising" | "stable" | "falling";
  factors?: string[]; lastIncident?: string | null;
}
export interface RiskSummary {
  regionsMonitored: number; globalRiskScore: string; highestRisk: string | null; risingCount: number;
}
export interface RiskData {
  timestamp: string; risks: GeopoliticalRisk[]; summary: RiskSummary; accessLevel: string; detailLevel: string;
}
export interface ChatMessage {
  id: string; role: "user" | "assistant" | "system"; content: string; timestamp: string;
}
export interface CopilotResponse {
  id: string; role: string; content: string; timestamp: string; model: string;
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
}
export interface ScenarioParams {
  sanctionsLevel: number; opecCutPercent: number; hurricaneRisk: number; demandGrowth: number; sprRelease: number;
}
export interface ScenarioResult {
  basePrice: number; projectedPrice: number; probability: number;
  confidenceInterval: [number, number]; impactFactors: string[];
}
export interface ScenarioData {
  timestamp: string; scenario: ScenarioResult; inputs: ScenarioParams; modelVersion: string; accessLevel: string;
}
export interface UserContext {
  ip: string; userAgent: string; role: "analyst" | "executive" | "public" | "admin";
  subscription: "free" | "pro" | "enterprise";
}
export interface GeoLocation {
  country: string; countryCode: string; city: string; timezone: string; latitude: number; longitude: number;
}
export interface PersonalizedDashboard {
  userContext: UserContext; geoLocation: GeoLocation; features: string[];
  dataSources: string[]; refreshRate: number; timezone: string;
}
export interface ApiError { error: string; details?: string[]; }
