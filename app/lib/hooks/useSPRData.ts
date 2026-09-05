"use client";
import { useQuery } from "@tanstack/react-query";
import { oilApi, queryKeys } from "../api/client";
import { SPRData } from "../types";

export function useSPRData(facility?: string) {
  return useQuery<SPRData>({ queryKey: queryKeys.sprData(facility), queryFn: () => oilApi.getSPR(facility), staleTime: 1000 * 60 });
}
