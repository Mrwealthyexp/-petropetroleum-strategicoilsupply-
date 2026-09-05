import { useCallback, useMemo, useState } from "react";

export type ScenarioInput = {
  startingPrice: number;
  annualDrift: number;
  annualVolatility: number;
  years: number;
  simulations?: number;
};

export type ScenarioResult = {
  paths: number[][];
  percentiles: { p10: number; p50: number; p90: number };
};

export function useScenario(initial: ScenarioInput) {
  const [input, setInput] = useState(initial);
  const [seed, setSeed] = useState(0);
  const result = useMemo<ScenarioResult>(() => {
    const simulations = Math.max(1, Math.floor(input.simulations ?? 1_000));
    const steps = Math.max(1, Math.floor(input.years * 12));
    const paths: number[][] = [];
    for (let simulation = 0; simulation < simulations; simulation += 1) {
      const path = [input.startingPrice];
      for (let step = 0; step < steps; step += 1) {
        const u1 = Math.max(Number.EPSILON, Math.random());
        const u2 = Math.random();
        const normal = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        const returnRate =
          (input.annualDrift - input.annualVolatility ** 2 / 2) / 12 +
          (input.annualVolatility / Math.sqrt(12)) * normal;
        path.push(path[path.length - 1] * Math.exp(returnRate));
      }
      paths.push(path);
    }
    const endings = paths.map((path) => path[path.length - 1]).sort((a, b) => a - b);
    const percentile = (value: number) => endings[Math.min(endings.length - 1, Math.floor(value * endings.length))];
    return { paths, percentiles: { p10: percentile(0.1), p50: percentile(0.5), p90: percentile(0.9) } };
  }, [input, seed]);

  const run = useCallback((next: Partial<ScenarioInput> = {}) => {
    setInput((current) => ({ ...current, ...next }));
    setSeed((current) => current + 1);
  }, []);

  return { input, result, run };
}
