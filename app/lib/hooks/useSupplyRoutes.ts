"use client";
import { useQuery } from "@tanstack/react-query";
import { oilApi, queryKeys } from "../api/client";
import { SupplyRouteData } from "../types";

export function useSupplyRoutes(filters?: { status?: string; type?: string }) {
  return useQuery<SupplyRouteData>({ queryKey: queryKeys.supplyRoutes(filters), queryFn: () => oilApi.getSupplyRoutes(filters), staleTime: 1000 * 30 });
}
