"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";

const controls = [
  ["Sanctions level", "sanctions", 0, 100, 35],
  ["OPEC cuts", "opec", 0, 10, 2],
  ["Hurricane risk", "hurricane", 0, 100, 15],
  ["Demand growth", "demand", 0, 8, 2],
] as const;

export function ScenarioModel() {
  const [values, setValues] = useState<Record<string, number>>({ sanctions: 35, opec: 2, hurricane: 15, demand: 2 });
  const price = useMemo(() => 84.52 + values.sanctions * 0.15 + values.opec * 0.8 + values.hurricane * 0.05 + values.demand * 1.5, [values]);

  return (
    <Card className="max-w-2xl">
      <div className="flex items-end justify-between"><div><p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Projected Brent price</p><strong className="font-mono text-4xl text-[#ff6b00]">${price.toFixed(2)}</strong></div><p className="font-mono text-sm text-zinc-400">90% CI $78.50–$102.30</p></div>
      <div className="mt-8 space-y-5">
        {controls.map(([label, key, min, max]) => (
          <label className="block text-sm text-zinc-300" key={key}>{label}<span className="float-right font-mono text-[#ff6b00]">{values[key]}</span><input className="mt-2 block w-full accent-[#ff6b00]" type="range" min={min} max={max} value={values[key]} onChange={(event) => setValues({ ...values, [key]: Number(event.target.value) })} /></label>
        ))}
      </div>
    </Card>
  );
}
