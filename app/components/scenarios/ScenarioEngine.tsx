"use client";
import { useState } from "react";
import { Play, RotateCcw, TrendingUp, AlertTriangle, Wind, Droplets, Scale } from "lucide-react";
import { useScenario } from "@/app/lib/hooks/useScenario";
import { ScenarioParams } from "@/app/lib/types";
import { Skeleton } from "../shared/Skeleton";
import { cn } from "@/app/lib/utils";

const sliders = [
  { key: "sanctionsLevel", label: "Sanctions Intensity", icon: Scale, min: 0, max: 100, step: 5, unit: "%" },
  { key: "opecCutPercent", label: "OPEC+ Cut Volume", icon: Droplets, min: 0, max: 50, step: 1, unit: "%" },
  { key: "hurricaneRisk", label: "Hurricane Risk", icon: Wind, min: 0, max: 100, step: 5, unit: "%" },
  { key: "demandGrowth", label: "Demand Growth", icon: TrendingUp, min: -10, max: 10, step: 0.5, unit: "%" },
  { key: "sprRelease", label: "SPR Release", icon: AlertTriangle, min: 0, max: 180, step: 10, unit: "M bbl" },
] as const;

export function ScenarioEngine() {
  const [params, setParams] = useState<ScenarioParams>({ sanctionsLevel: 50, opecCutPercent: 10, hurricaneRisk: 30, demandGrowth: 2, sprRelease: 0 });
  const { mutate, data, isPending, isError, error } = useScenario();
  const handleSliderChange = (key: keyof ScenarioParams, value: number) => { setParams((prev) => ({ ...prev, [key]: value })); };
  const handleRun = () => mutate(params);
  const handleReset = () => { setParams({ sanctionsLevel: 50, opecCutPercent: 10, hurricaneRisk: 30, demandGrowth: 2, sprRelease: 0 }); };

  return (
    <div className="bg-[#0f0f0f] border border-[#222] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-lg font-bold text-white">Scenario Engine</h2><p className="text-sm text-gray-500">Monte Carlo simulation with 10,000 iterations</p></div>
        <div className="flex gap-2">
          <button onClick={handleReset} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white bg-[#1a1a1a] rounded-lg hover:bg-[#222] transition-colors"><RotateCcw className="w-4 h-4" />Reset</button>
          <button onClick={handleRun} disabled={isPending} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black bg-[#ff6b00] rounded-lg hover:bg-[#ff8533] disabled:opacity-50 transition-colors">{isPending ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Play className="w-4 h-4" />}Run Simulation</button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {sliders.map(({ key, label, icon: Icon, min, max, step, unit }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><Icon className="w-4 h-4 text-[#ff6b00]" /><span className="text-sm text-gray-300">{label}</span></div>
                <span className="text-sm font-mono text-[#ff6b00]">{params[key as keyof ScenarioParams]}{unit}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={params[key as keyof ScenarioParams]} onChange={(e) => handleSliderChange(key as keyof ScenarioParams, parseFloat(e.target.value))} className="w-full h-2 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-[#ff6b00]" />
              <div className="flex justify-between text-[10px] text-gray-600"><span>{min}{unit}</span><span>{max}{unit}</span></div>
            </div>
          ))}
        </div>
        <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#222]">
          {isPending && <div className="space-y-4"><Skeleton className="h-8" /><Skeleton className="h-32" /><Skeleton className="h-20" /></div>}
          {isError && <div className="text-red-400 text-sm">{error instanceof Error ? error.message : "Simulation failed"}</div>}
          {!data && !isPending && !isError && <div className="h-full flex flex-col items-center justify-center text-gray-600"><Play className="w-12 h-12 mb-4 opacity-50" /><p className="text-sm">Configure parameters and run simulation</p></div>}
          {data && (
            <div className="space-y-6">
              <div className="text-center"><div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Projected Price</div><div className="text-4xl font-bold text-white font-mono">${data.scenario.projectedPrice.toFixed(2)}</div><div className={cn("text-sm mt-1", data.scenario.projectedPrice > data.scenario.basePrice ? "text-red-400" : "text-green-400")}>{data.scenario.projectedPrice > data.scenario.basePrice ? "+" : ""}{(data.scenario.projectedPrice - data.scenario.basePrice).toFixed(2)} from base</div></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4 text-center"><div className="text-xs text-gray-500 mb-1">Probability &gt;$100</div><div className="text-2xl font-bold text-white font-mono">{data.scenario.probability.toFixed(1)}%</div></div>
                <div className="bg-[#1a1a1a] rounded-lg p-4 text-center"><div className="text-xs text-gray-500 mb-1">Confidence (95%)</div><div className="text-sm font-mono text-white">${data.scenario.confidenceInterval[0].toFixed(2)} - ${data.scenario.confidenceInterval[1].toFixed(2)}</div></div>
              </div>
              <div className="space-y-2"><div className="text-xs text-gray-500 uppercase tracking-wider">Impact Factors</div>{data.scenario.impactFactors.map((factor, i) => <div key={i} className="text-xs text-gray-400 bg-[#1a1a1a] px-3 py-2 rounded">{factor}</div>)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
