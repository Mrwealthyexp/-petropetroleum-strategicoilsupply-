"use client";
import { TrendingUp, TrendingDown, Minus, Activity } from "lucide-react";
import { useOilPrices } from "@/app/lib/hooks/useOilPrices";
import { Skeleton } from "../shared/Skeleton";
import { format } from "date-fns";

function PriceCard({ symbol, price, change, changePercent, currency, unit, lastUpdated }: any) {
  const isPositive = change > 0; const isNegative = change < 0;
  const Icon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
  const colorClass = isPositive ? "text-green-400" : isNegative ? "text-red-400" : "text-gray-400";
  return (
    <div className="bg-[#0f0f0f] border border-[#222] rounded-xl p-6 hover:border-[#ff6b00]/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#ff6b00] animate-pulse" /><span className="text-xs font-mono text-gray-500 uppercase tracking-wider">{symbol}</span></div>
        <Icon className={`w-5 h-5 ${colorClass}`} />
      </div>
      <div className="space-y-1"><div className="text-3xl font-bold text-white font-mono tracking-tight">{currency}{price.toFixed(2)}</div><div className="text-sm text-gray-500">per {unit}</div></div>
      <div className={`flex items-center gap-2 mt-4 ${colorClass}`}><span className="text-sm font-semibold">{isPositive ? "+" : ""}{change.toFixed(2)}</span><span className="text-xs px-2 py-0.5 rounded-full bg-current/10">{isPositive ? "+" : ""}{changePercent.toFixed(2)}%</span></div>
      <div className="mt-4 pt-4 border-t border-[#222]"><div className="flex items-center gap-1 text-xs text-gray-600"><Activity className="w-3 h-3" /><span>Updated {format(new Date(lastUpdated), "HH:mm:ss")}</span></div></div>
    </div>
  );
}

export function PriceTicker() {
  const { prices, isLoading, isError, error, lastUpdated } = useOilPrices();
  if (isLoading) return <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><Skeleton className="h-40" /><Skeleton className="h-40" /></div>;
  if (isError) return <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 text-red-400"><p className="font-semibold">Failed to load prices</p><p className="text-sm mt-1">{error instanceof Error ? error.message : "Unknown error"}</p></div>;
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{prices.map((price) => <PriceCard key={price.symbol} {...price} lastUpdated={lastUpdated || new Date().toISOString()} />)}</div>;
}
