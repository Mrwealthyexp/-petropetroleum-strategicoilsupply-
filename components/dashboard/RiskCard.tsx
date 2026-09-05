"use client";

import { useQuery } from "@tanstack/react-query";
import { CardSkeleton } from "@/components/ui/Skeleton";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

export interface RiskRegion {
  id: string;
  region: string;
  score: number; // 0-100, higher = riskier
  trend: "up" | "down" | "flat";
}

async function fetchRiskScores(): Promise<RiskRegion[]> {
  return [
    { id: "middle-east", region: "Middle East", score: 78, trend: "up" },
    { id: "eastern-europe", region: "Eastern Europe", score: 65, trend: "flat" },
    { id: "west-africa", region: "West Africa", score: 54, trend: "up" },
    { id: "south-china-sea", region: "South China Sea", score: 42, trend: "down" },
    { id: "latin-america", region: "Latin America", score: 31, trend: "flat" },
  ];
}

function useRiskScores() {
  return useQuery({ queryKey: ["geopolitical-risk"], queryFn: fetchRiskScores, staleTime: 60_000 });
}

function riskColor(score: number) {
  if (score >= 70) return "text-red-400 bg-red-400/15";
  if (score >= 45) return "text-amber-400 bg-amber-400/15";
  return "text-emerald-400 bg-emerald-400/15";
}

function trendIcon(trend: RiskRegion["trend"]) {
  if (trend === "up") return "▲";
  if (trend === "down") return "▼";
  return "▬";
}

function RiskRow({ risk }: { risk: RiskRegion }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-2 last:border-none">
      <span className="text-sm font-medium text-white/80">{risk.region}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/40">{trendIcon(risk.trend)}</span>
        <span
          className={`min-w-[2.5rem] rounded-full px-2 py-0.5 text-center text-xs font-semibold ${riskColor(
            risk.score
          )}`}
        >
          {risk.score}
        </span>
      </div>
    </div>
  );
}

function RiskCardContent() {
  const { data, isLoading, isError, error } = useRiskScores();

  if (isLoading) return <CardSkeleton />;
  if (isError) throw error instanceof Error ? error : new Error("Failed to load risk scores");

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-4">
      <h3 className="text-sm font-semibold text-white/70">Geopolitical Risk</h3>
      <div className="flex flex-col">
        {data?.map((risk) => (
          <RiskRow key={risk.id} risk={risk} />
        ))}
      </div>
    </div>
  );
}

/** Regional geopolitical risk scores with trend indicators. */
export default function RiskCard() {
  return (
    <ErrorBoundary label="Risk Card">
      <RiskCardContent />
    </ErrorBoundary>
  );
}
