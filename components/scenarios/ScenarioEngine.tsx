"use client";

import { useMemo, useState } from "react";

interface ScenarioInputs {
  supplyDisruptionPct: number; // 0-50
  demandGrowthPct: number; // -10-20
  sprReleaseMbpd: number; // 0-3
}

const DEFAULT_INPUTS: ScenarioInputs = {
  supplyDisruptionPct: 5,
  demandGrowthPct: 2,
  sprReleaseMbpd: 0,
};

const BASE_PRICE = 82;

// Coefficients for the simplified linear pricing model below. Tuned to give
// intuitive, directionally-correct price moves for demo/simulation purposes
// (not derived from a real econometric model).
const DISRUPTION_IMPACT_FACTOR = 0.9; // $ per % of supply disrupted
const DEMAND_IMPACT_FACTOR = 0.6; // $ per % of demand growth
const SPR_RELIEF_FACTOR = 4; // $ reduction per Mbpd of SPR released
const MIN_PROJECTED_PRICE = 20; // floor to avoid unrealistic/negative prices

function computeProjectedPrice(inputs: ScenarioInputs): number {
  const disruptionImpact = inputs.supplyDisruptionPct * DISRUPTION_IMPACT_FACTOR;
  const demandImpact = inputs.demandGrowthPct * DEMAND_IMPACT_FACTOR;
  const sprRelief = inputs.sprReleaseMbpd * SPR_RELIEF_FACTOR;
  const projected = BASE_PRICE + disruptionImpact + demandImpact - sprRelief;
  return Math.max(MIN_PROJECTED_PRICE, Number(projected.toFixed(2)));
}

interface SliderConfig {
  key: keyof ScenarioInputs;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
}

const SLIDERS: SliderConfig[] = [
  { key: "supplyDisruptionPct", label: "Supply Disruption", min: 0, max: 50, step: 1, unit: "%" },
  { key: "demandGrowthPct", label: "Demand Growth", min: -10, max: 20, step: 1, unit: "%" },
  { key: "sprReleaseMbpd", label: "SPR Release", min: 0, max: 3, step: 0.1, unit: "Mbpd" },
];

/** Interactive sliders to simulate how supply/demand shocks affect projected price. */
export default function ScenarioEngine() {
  const [inputs, setInputs] = useState<ScenarioInputs>(DEFAULT_INPUTS);

  const projectedPrice = useMemo(() => computeProjectedPrice(inputs), [inputs]);
  const delta = projectedPrice - BASE_PRICE;

  function updateInput(key: keyof ScenarioInputs, value: number) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/70">Scenario Simulator</h3>
        <button
          onClick={() => setInputs(DEFAULT_INPUTS)}
          className="text-xs text-white/40 underline transition hover:text-white/70"
        >
          Reset
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {SLIDERS.map((slider) => (
          <div key={slider.key} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor={slider.key} className="text-white/70">
                {slider.label}
              </label>
              <span className="text-white/50">
                {inputs[slider.key]}
                {slider.unit}
              </span>
            </div>
            <input
              id={slider.key}
              type="range"
              min={slider.min}
              max={slider.max}
              step={slider.step}
              value={inputs[slider.key]}
              onChange={(e) => updateInput(slider.key, Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-blue-500"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-lg bg-black/30 p-4">
        <div>
          <span className="text-xs uppercase tracking-wide text-white/40">
            Projected Brent Price
          </span>
          <div className="text-2xl font-semibold text-white">
            ${projectedPrice.toFixed(2)}
          </div>
        </div>
        <span
          className={`text-sm font-medium ${
            delta >= 0 ? "text-red-400" : "text-emerald-400"
          }`}
        >
          {delta >= 0 ? "+" : ""}
          {delta.toFixed(2)} vs base
        </span>
      </div>
    </div>
  );
}
