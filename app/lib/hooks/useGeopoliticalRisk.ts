"use client";
import { useQuery } from "@tanstack/react-query";
import { oilApi, queryKeys } from "../api/client";
import { RiskData } from "../types";

export function useGeopoliticalRisk(region?: string, minScore?: number) {
  return useQuery<RiskData>({ queryKey: queryKeys.geopoliticalRisk(region, minScore), queryFn: () => oilApi.getGeopoliticalRisk(region, minScore), staleTime: 1000 * 60 * 2 });
}
