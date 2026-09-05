import { useRemoteData } from "./useRemoteData";

export type GeopoliticalRisk = {
  score: number;
  level: "low" | "moderate" | "high" | "critical";
  factors: string[];
  asOf: string;
};

export function useGeopoliticalRisk(url = "/api/geopolitical-risk", refreshMs = 300_000) {
  return useRemoteData<GeopoliticalRisk>(url, refreshMs);
}
