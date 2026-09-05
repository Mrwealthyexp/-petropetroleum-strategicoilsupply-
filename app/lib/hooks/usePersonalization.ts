"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { oilApi, queryKeys } from "../api/client";
import { useAppStore } from "../store/useAppStore";

export function usePersonalization() {
  const setGlobalError = useAppStore((s) => s.setGlobalError);
  const query = useQuery({ queryKey: queryKeys.personalization, queryFn: oilApi.getPersonalization, staleTime: 1000 * 60 * 5 });
  useEffect(() => { if (query.error) setGlobalError(query.error instanceof Error ? query.error.message : "Failed to load personalization"); }, [query.error, setGlobalError]);
  return { dashboard: query.data, isLoading: query.isLoading, isError: query.isError, error: query.error, refetch: query.refetch };
}
