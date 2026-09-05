"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { oilApi, queryKeys } from "../api/client";
import { useAppStore } from "../store/useAppStore";
import { OilPrice } from "../types";

interface OilPricesData { timestamp: string; symbols: OilPrice[]; source: string; accessLevel: string; }

export function useOilPrices(symbol?: string) {
  const autoRefresh = useAppStore((s) => s.autoRefresh);
  const refreshInterval = useAppStore((s) => s.refreshInterval);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const query = useQuery<OilPricesData>({ queryKey: queryKeys.oilPrices(symbol), queryFn: () => oilApi.getPrices(symbol), staleTime: 1000 * 10 });
  useEffect(() => { if (autoRefresh && !query.isLoading) { intervalRef.current = setInterval(() => query.refetch(), refreshInterval * 1000); } return () => { if (intervalRef.current) clearInterval(intervalRef.current); }; }, [autoRefresh, refreshInterval, query]);
  return { data: query.data, prices: query.data?.symbols || [], isLoading: query.isLoading, isError: query.isError, error: query.error, lastUpdated: query.data?.timestamp, refetch: query.refetch };
}
