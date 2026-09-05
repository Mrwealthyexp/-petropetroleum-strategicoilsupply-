"use client";
import { Database, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { useSPRData } from "@/app/lib/hooks/useSPRData";
import { Skeleton } from "../shared/Skeleton";

export function SPRCard() {
  const { data, isLoading, isError } = useSPRData();
  if (isLoading) return <Skeleton className="h-80" />;
  if (isError || !data) return <div className="bg-[#0f0f0f] border border-[#222] rounded-xl p-6 h-80 flex flex-col items-center justify-center text-gray-500"><Database className="w-12 h-12 mb-4 opacity-50" /><p>SPR data unavailable</p></div>;
  const { summary, facilities } = data; const overallPercentage = parseFloat(summary.overallPercentage);
  return (
    <div className="bg-[#0f0f0f] border border-[#222] rounded-xl p-6 hover:border-[#ff6b00]/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#ff6b00]/10 rounded-lg"><Database className="w-5 h-5 text-[#ff6b00]" /></div>
          <div><h3 className="text-sm font-semibold text-white">Strategic Reserves</h3><p className="text-xs text-gray-500">{summary.facilityCount} facilities monitored</p></div>
        </div>
        {overallPercentage < 50 && <AlertTriangle className="w-5 h-5 text-yellow-500 animate-pulse" />}
      </div>
      <div className="mb-6">
        <div className="flex items-end justify-between mb-2"><span className="text-3xl font-bold text-white font-mono">{summary.totalCurrent.toFixed(1)}M</span><span className="text-sm text-gray-500">/ {summary.totalCapacity.toFixed(1)}M bbl</span></div>
        <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-500 bg-[#ff6b00]" style={{ width: `${overallPercentage}%` }} /></div>
        <div className="flex items-center justify-between mt-2"><span className="text-xs text-gray-500">{overallPercentage.toFixed(1)}% capacity</span><span className={`text-xs flex items-center gap-1 ${overallPercentage > 90 ? "text-green-400" : overallPercentage > 70 ? "text-yellow-400" : "text-red-400"}`}>{overallPercentage > 90 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{overallPercentage > 90 ? "Healthy" : overallPercentage > 70 ? "Moderate" : "Critical"}</span></div>
      </div>
      <div className="space-y-3">{facilities.map((facility) => (
        <div key={facility.facility} className="space-y-1">
          <div className="flex items-center justify-between text-xs"><span className="text-gray-400">{facility.facility}</span><span className="text-gray-500 font-mono">{facility.percentageFull.toFixed(1)}%</span></div>
          <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${facility.percentageFull}%`, backgroundColor: facility.percentageFull > 90 ? "#22c55e" : facility.percentageFull > 70 ? "#eab308" : "#ef4444" }} /></div>
        </div>
      ))}</div>
    </div>
  );
}
