export interface GeoLocation { country: string; countryCode: string; city: string; timezone: string; latitude: number; longitude: number; }
export interface UserContext { ip: string; userAgent: string; role: "analyst" | "executive" | "public" | "admin"; subscription: "free" | "pro" | "enterprise"; }
export interface OilDataPoint { timestamp: string; price: number; currency: string; unit: "barrel" | "gallon" | "liter"; change: number; changePercent: number; source: string; }
export interface SPRLevel { country: string; facility: string; currentLevel: number; capacity: number; percentageFull: number; lastUpdated: string; }
export interface SupplyRoute { id: string; origin: string; destination: string; type: "pipeline" | "tanker" | "rail"; volume: number; status: "active" | "disrupted" | "maintenance"; coordinates: [number, number][]; }
export interface GeopoliticalRisk { region: string; score: number; factors: string[]; trend: "rising" | "stable" | "falling"; lastIncident: string | null; }
export interface PersonalizedDashboard { userContext: UserContext; geoLocation: GeoLocation; features: string[]; dataSources: string[]; refreshRate: number; timezone: string; }
