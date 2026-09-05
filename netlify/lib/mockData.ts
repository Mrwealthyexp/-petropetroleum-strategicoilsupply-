import { OilDataPoint, SPRLevel, SupplyRoute, GeopoliticalRisk } from "./types.ts";
export const mockBrentPrice: OilDataPoint = { timestamp: new Date().toISOString(), price: 84.52, currency: "USD", unit: "barrel", change: 1.23, changePercent: 1.47, source: "ICE Futures Europe" };
export const mockWtiPrice: OilDataPoint = { timestamp: new Date().toISOString(), price: 80.15, currency: "USD", unit: "barrel", change: 0.98, changePercent: 1.24, source: "NYMEX" };
export const mockSPRLevels: SPRLevel[] = [
  { country: "United States", facility: "Bryan Mound", currentLevel: 226.4, capacity: 250.0, percentageFull: 90.6, lastUpdated: new Date().toISOString() },
  { country: "United States", facility: "Big Hill", currentLevel: 160.2, capacity: 170.0, percentageFull: 94.2, lastUpdated: new Date().toISOString() },
  { country: "United States", facility: "West Hackberry", currentLevel: 198.7, capacity: 220.0, percentageFull: 90.3, lastUpdated: new Date().toISOString() },
  { country: "United States", facility: "Bayou Choctaw", currentLevel: 72.1, capacity: 76.0, percentageFull: 94.9, lastUpdated: new Date().toISOString() }
];
export const mockSupplyRoutes: SupplyRoute[] = [
  { id: "route-001", origin: "Houston, TX", destination: "Rotterdam, NL", type: "tanker", volume: 2500000, status: "active", coordinates: [[-95.3698, 29.7604], [-80.1918, 25.7617], [-40.0, 35.0], [-10.0, 45.0], [4.4792, 51.9225]] },
  { id: "route-002", origin: "Basra, IQ", destination: "Qingdao, CN", type: "tanker", volume: 1800000, status: "active", coordinates: [[47.7835, 30.5156], [55.0, 20.0], [75.0, 15.0], [100.0, 20.0], [120.3851, 36.0669]] },
  { id: "route-003", origin: "Alberta, CA", destination: "Cushing, OK", type: "pipeline", volume: 590000, status: "active", coordinates: [[-113.4909, 53.5461], [-110.0, 48.0], [-105.0, 45.0], [-100.0, 42.0], [-96.7667, 35.9911]] },
  { id: "route-004", origin: "Primorsk, RU", destination: "Wilhelmshaven, DE", type: "tanker", volume: 1200000, status: "disrupted", coordinates: [[28.6167, 60.3667], [20.0, 55.0], [10.0, 50.0], [5.0, 48.0], [8.1238, 53.5272]] }
];
export const mockGeopoliticalRisks: GeopoliticalRisk[] = [
  { region: "Middle East", score: 78, factors: ["Strait of Hormuz tensions", "Yemen Houthi attacks", "Iran nuclear negotiations"], trend: "rising", lastIncident: "2026-04-20" },
  { region: "Eastern Europe", score: 65, factors: ["Ukraine conflict", "Druzhba pipeline uncertainty", "Sanctions enforcement"], trend: "stable", lastIncident: "2026-04-15" },
  { region: "East Asia", score: 42, factors: ["South China Sea disputes", "Taiwan Strait monitoring"], trend: "falling", lastIncident: null },
  { region: "West Africa", score: 58, factors: ["Niger Delta instability", "Piracy in Gulf of Guinea"], trend: "rising", lastIncident: "2026-04-18" }
];
