"use client";
import { ScenarioEngine } from "@/app/components/scenarios/ScenarioEngine";
import { ArrowLeft, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function ScenariosPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] rounded-lg hover:bg-[#222] transition-colors text-gray-400 hover:text-white"><ArrowLeft className="w-4 h-4" /><span className="text-sm">Dashboard</span></Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2"><BarChart3 className="w-6 h-6 text-[#ff6b00]" />Scenario Engine</h1>
              <p className="text-sm text-gray-500">Monte Carlo simulation for oil price forecasting</p>
            </div>
          </div>
          <div className="text-xs text-gray-500 font-mono">{new Date().toUTCString()}</div>
        </div>
      </header>
      <ScenarioEngine />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-[#0f0f0f] border border-[#222] rounded-xl p-4"><h3 className="text-sm font-semibold text-white mb-2">Model Details</h3><p className="text-xs text-gray-500">Uses Monte Carlo simulation with 10,000 iterations to project price outcomes based on geopolitical and market variables.</p></div>
        <div className="bg-[#0f0f0f] border border-[#222] rounded-xl p-4"><h3 className="text-sm font-semibold text-white mb-2">Confidence Intervals</h3><p className="text-xs text-gray-500">95% confidence intervals calculated using historical volatility (18.3%) and 30-day projection horizon.</p></div>
        <div className="bg-[#0f0f0f] border border-[#222] rounded-xl p-4"><h3 className="text-sm font-semibold text-white mb-2">Data Sources</h3><p className="text-xs text-gray-500">EIA, OPEC, Bloomberg, ICE Futures Europe, NYMEX. Updated in real-time for Pro and Enterprise subscribers.</p></div>
      </div>
    </div>
  );
}
