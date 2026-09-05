"use client";
import { Ship, AlertCircle, CheckCircle2, Timer } from "lucide-react";
import { useSupplyRoutes } from "@/app/lib/hooks/useSupplyRoutes";
import { Skeleton } from "../shared/Skeleton";

const statusConfig = { active: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10", label: "Active" }, disrupted: { icon: AlertCircle, color: "text-red-400", bg: "bg-red-400/10", label: "Disrupted" }, maintenance: { icon: Timer, color: "text-yellow-400", bg: "bg-yellow-400/10", label: "Maintenance" } };

export function SupplyRoutesCard() {
  const { data, isLoading, isError } = useSupplyRoutes();
  if (isLoading) return <Skeleton className="h-96" />;
  if (isError || !data) return <div className="bg-[#0f0f0f] border border-[#222] rounded-xl p-6 h-96 flex flex-col items-center justify-center text-gray-500"><Ship className="w-12 h-12 mb-4 opacity-50" /><p>Route data unavailable</p></div>;
  const { routes, summary } = data;
  return (
    <div className="bg-[#0f0f0f] border border-[#222] rounded-xl p-6 hover:border-[#ff6b00]/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#4a90d9]/10 rounded-lg"><Ship className="w-5 h-5 text-[#4a90d9]" /></div>
          <div><h3 className="text-sm font-semibold text-white">Supply Routes</h3><p className="text-xs text-gray-500">{summary.activeRoutes} active / {summary.disruptedRoutes} disrupted</p></div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-[#1a1a1a] rounded-lg p-3 text-center"><div className="text-lg font-bold text-white font-mono">{(summary.totalVolume / 1000000).toFixed(1)}M</div><div className="text-[10px] text-gray-500 uppercase tracking-wider">Total bbl/day</div></div>
        <div className="bg-[#1a1a1a] rounded-lg p-3 text-center"><div className="text-lg font-bold text-green-400 font-mono">{(summary.activeVolume / 1000000).toFixed(1)}M</div><div className="text-[10px] text-gray-500 uppercase tracking-wider">Active Flow</div></div>
        <div className="bg-[#1a1a1a] rounded-lg p-3 text-center"><div className="text-lg font-bold text-red-400 font-mono">{(summary.disruptedVolume / 1000000).toFixed(1)}M</div><div className="text-[10px] text-gray-500 uppercase tracking-wider">At Risk</div></div>
      </div>
      <div className="space-y-3 max-h-64 overflow-y-auto">{routes.map((route) => { const config = statusConfig[route.status]; const StatusIcon = config.icon; return (
        <div key={route.id} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#222] transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded ${config.bg}`}><StatusIcon className={`w-4 h-4 ${config.color}`} /></div>
            <div><div className="text-sm text-white font-medium">{route.origin} &rarr; {route.destination}</div><div className="text-xs text-gray-500 flex items-center gap-2"><span className="capitalize">{route.type}</span><span>&bull;</span><span>{(route.volume / 1000000).toFixed(1)}M bbl/day</span></div></div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${config.bg} ${config.color}`}>{config.label}</span>
        </div>
      ); })}</div>
    </div>
  );
}
