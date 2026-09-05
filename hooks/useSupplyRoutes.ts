import { useRemoteData } from "./useRemoteData";

export type SupplyRoute = {
  id: string;
  origin: string;
  destination: string;
  status: "operational" | "delayed" | "disrupted";
  throughput: number;
  updatedAt: string;
};

export function useSupplyRoutes(url = "/api/supply-routes", refreshMs = 120_000) {
  return useRemoteData<SupplyRoute[]>(url, refreshMs);
}
