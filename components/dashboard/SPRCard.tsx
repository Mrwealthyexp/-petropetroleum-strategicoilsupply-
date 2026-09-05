"use client";

import { useQuery } from "@tanstack/react-query";
import { CardSkeleton } from "@/components/ui/Skeleton";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

export interface SPRFacility {
  id: string;
  name: string;
  location: string;
  capacityMillionBarrels: number;
  currentMillionBarrels: number;
}

// TODO: replace with a real API call. This placeholder never rejects, so the
// isError/error handling in SPRCardContent below is currently unreachable —
// validate it once a real data source (which can fail) is wired in.
async function fetchSPRFacilities(): Promise<SPRFacility[]> {
  return [
    { id: "bryan-mound", name: "Bryan Mound", location: "Texas", capacityMillionBarrels: 254, currentMillionBarrels: 189 },
    { id: "big-hill", name: "Big Hill", location: "Texas", capacityMillionBarrels: 170, currentMillionBarrels: 121 },
    { id: "west-hackberry", name: "West Hackberry", location: "Louisiana", capacityMillionBarrels: 227, currentMillionBarrels: 158 },
    { id: "bayou-choctaw", name: "Bayou Choctaw", location: "Louisiana", capacityMillionBarrels: 76, currentMillionBarrels: 62 },
  ];
}

function useSPRFacilities() {
  return useQuery({ queryKey: ["spr-facilities"], queryFn: fetchSPRFacilities, staleTime: 5 * 60_000 });
}

function FacilityRow({ facility }: { facility: SPRFacility }) {
  const pct = Math.min(
    100,
    Math.round((facility.currentMillionBarrels / facility.capacityMillionBarrels) * 100)
  );
  const barColor = pct > 60 ? "bg-emerald-400" : pct > 30 ? "bg-amber-400" : "bg-red-400";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-white/80">{facility.name}</span>
        <span className="text-white/40">{facility.location}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${barColor} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-xs text-white/50">
        {facility.currentMillionBarrels}M / {facility.capacityMillionBarrels}M bbl ({pct}%)
      </div>
    </div>
  );
}

function SPRCardContent() {
  const { data, isLoading, isError, error } = useSPRFacilities();

  if (isLoading) return <CardSkeleton />;
  if (isError) throw error instanceof Error ? error : new Error("Failed to load SPR data");

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <h3 className="text-sm font-semibold text-white/70">
        Strategic Petroleum Reserve
      </h3>
      <div className="flex flex-col gap-4">
        {data?.map((facility) => (
          <FacilityRow key={facility.id} facility={facility} />
        ))}
      </div>
    </div>
  );
}

/** SPR facilities with fill-level progress bars. */
export default function SPRCard() {
  return (
    <ErrorBoundary label="SPR Card">
      <SPRCardContent />
    </ErrorBoundary>
  );
}
