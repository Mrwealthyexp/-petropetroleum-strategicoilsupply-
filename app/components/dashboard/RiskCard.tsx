"use client";
import { Globe, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useGeopoliticalRisk } from "@/app/lib/hooks/useGeopoliticalRisk";
import { Skeleton } from "../shared/Skeleton";

const riskLevels = [{ max: 30, label: "Low", color: "text-green-400", bg: "bg-green-400/10" }, { max: 60, label: "Moderate", color: "text-yellow-400", bg: "bg-yellow-400/10" }, { max: 100, label: "High", color: "text-red-400", bg: "bg-red-400/10" }];
function getRiskLevel(score: number) { return riskLevels.find((l) => score <= l.max) || riskLevels[riskLevels.length - 1]; }
const trendIcons = { rising: { icon: TrendingUp, color: "text-red-400" }, stable: { icon: Minus, color: "text-gray-400" }, falling: { icon: TrendingDown, color: "text-green-400" } };

export function RiskCard() {
  const { data, isLoading, isError } = useGeopoliticalRisk(undefined, 40);
  if (isLoading) return <Skeleton className="h-80" />;
  if (isError || !data) return <div className="bg-[#0f0f0f] border border-[#222] rounded-xl p-6 h-80 flex flex-col items-center justify-center text-gray-500"><Globe className="w-12 h-12 mb-4 opacity-50" /><p>Risk data unavailable</p></div>;
  const { risks, summary } = data;
  return (
    <div className="bg-[#0f0f0f] border border-[#222] rounded-xl p-6 hover:border-[#ff6b00]/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3"><div className="p-2 bg-red-500/10 rounded-lg"><Globe className="w-5 h-5 text-red-400" /></div><div><h3 className="text-sm font-semibold text-white">Geopolitical Risk</h3><p className="text-xs text-gray-500">Global score: {summary.globalRiskScore}/100</p></div></div>
        {summary.risingCount > 0 && <div className="flex items-center gap-1 text-xs text-red-400"><TrendingUp className="w-3 h-3" />{summary.risingCount} rising</div>}
      </div>
      <div className="space-y-3">{risks.map((risk) => { const level = getRiskLevel(risk.score); const TrendIcon = trendIcons[risk.trend].icon; return (
        <div key={risk.region} className="p-3 bg-[#1a1a1a] rounded-lg">
          <div className="flex items-center justify-between mb-2"><span className="text-sm text-white font-medium">{risk.region}</span><div className="flex items-center gap-2"><span className={`text-xs px-2 py-0.5 rounded-full ${level.bg} ${level.color}`}>{level.label}</span><TrendIcon className={`w-4 h-4 ${trendIcons[risk.trend].color}`} /></div></div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-[#0a0a0a] rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${risk.score}%`, backgroundColor: risk.score > 60 ? "#ef4444" : risk.score > 30 ? "#eab308" : "#22c55e" }} /></div>
            <span className="text-sm font-mono text-white w-8 text-right">{risk.score}</span>
          </div>
          {risk.factors && risk.factors.length > 0 && <div className="mt-2 flex flex-wrap gap-1">{risk.factors.slice(0, 2).map((factor, i) => <span key={i} className="text-[10px] text-gray-500 bg-[#0a0a0a] px-2 py-0.5 rounded">{factor}</span>)}{risk.factors.length > 2 && <span className="text-[10px] text-gray-600">+{risk.factors.length - 2}</span>}</div>}
        </div>
      ); })}</div>
    </div>
  );
}
