"use client";

import { useQuery } from "@tanstack/react-query";
import { CardSkeleton } from "@/components/ui/Skeleton";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

export interface SupplyRoute {
  id: string;
  name: string;
  status: "active" | "disrupted";
  throughputMillionBpd: number;
  note?: string;
}

async function fetchSupplyRoutes(): Promise<SupplyRoute[]> {
  return [
    { id: "hormuz", name: "Strait of Hormuz", status: "active", throughputMillionBpd: 21 },
    { id: "malacca", name: "Strait of Malacca", status: "active", throughputMillionBpd: 16 },
    { id: "suez", name: "Suez Canal", status: "disrupted", throughputMillionBpd: 5.5, note: "Rerouted via Cape of Good Hope" },
    { id: "bab-el-mandeb", name: "Bab el-Mandeb", status: "disrupted", throughputMillionBpd: 3.2, note: "Reduced tanker traffic" },
    { id: "panama", name: "Panama Canal", status: "active", throughputMillionBpd: 0.9 },
  ];
}

function useSupplyRoutes() {
  return useQuery({ queryKey: ["supply-routes"], queryFn: fetchSupplyRoutes, staleTime: 60_000 });
}

function RouteRow({ route }: { route: SupplyRoute }) {
  const isActive = route.status === "active";
  return (
    <div className="flex items-start justify-between gap-3 border-b border-white/5 py-2 last:border-none">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white/80">{route.name}</span>
        {route.note && <span className="text-xs text-white/40">{route.note}</span>}
      </div>
      <div className="flex flex-col items-end gap-1">
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
            isActive
              ? "bg-emerald-400/15 text-emerald-300"
              : "bg-red-400/15 text-red-300"
          }`}
        >
          {route.status}
        </span>
        <span className="text-xs text-white/50">{route.throughputMillionBpd} Mbpd</span>
      </div>
    </div>
  );
}

function SupplyRoutesCardContent() {
  const { data, isLoading, isError, error } = useSupplyRoutes();

  if (isLoading) return <CardSkeleton />;
  if (isError) throw error instanceof Error ? error : new Error("Failed to load supply routes");

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-4">
      <h3 className="text-sm font-semibold text-white/70">Global Supply Routes</h3>
      <div className="flex flex-col">
        {data?.map((route) => (
          <RouteRow key={route.id} route={route} />
        ))}
      </div>
    </div>
  );
}

/** Active/disrupted maritime supply route status list. */
export default function SupplyRoutesCard() {
  return (
    <ErrorBoundary label="Supply Routes Card">
      <SupplyRoutesCardContent />
    </ErrorBoundary>
  );
}
