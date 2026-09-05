"use client";

import { useQuery } from "@tanstack/react-query";

export interface OilPrice {
  symbol: "BRENT" | "WTI";
  label: string;
  price: number;
  change: number;
  changePercent: number;
  history: number[];
}

async function fetchOilPrices(): Promise<OilPrice[]> {
  // Placeholder data source. Replace with a real market-data API call.
  const seed = (base: number) => {
    const jitter = (Math.random() - 0.5) * 2;
    const price = Number((base + jitter).toFixed(2));
    const change = Number((jitter).toFixed(2));
    const changePercent = Number(((change / base) * 100).toFixed(2));
    const history = Array.from({ length: 12 }, (_, i) =>
      Number((base + Math.sin(i / 2) * 1.5 + jitter * 0.3).toFixed(2))
    );
    return { price, change, changePercent, history };
  };

  const brent = seed(83.5);
  const wti = seed(79.2);

  return [
    { symbol: "BRENT", label: "Brent Crude", ...brent },
    { symbol: "WTI", label: "WTI Crude", ...wti },
  ];
}

export function useOilPrices() {
  return useQuery({
    queryKey: ["oil-prices"],
    queryFn: fetchOilPrices,
    refetchInterval: 60_000,
  });
}
