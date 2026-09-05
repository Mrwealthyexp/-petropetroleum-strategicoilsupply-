"use client";

import { CardSkeleton } from "@/components/ui/Skeleton";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { useOilPrices, type OilPrice } from "./useOilPrices";

function Sparkline({ points, positive }: { points: number[]; positive: boolean }) {
  if (points.length < 2) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const width = 100;
  const height = 28;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * height;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-7 w-24" preserveAspectRatio="none">
      <path
        d={path}
        fill="none"
        stroke={positive ? "#34d399" : "#f87171"}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function PriceCard({ price }: { price: OilPrice }) {
  const positive = price.change >= 0;
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/70">{price.label}</span>
        <span className="text-xs uppercase tracking-wide text-white/40">
          {price.symbol}
        </span>
      </div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="text-2xl font-semibold text-white">
            ${price.price.toFixed(2)}
          </span>
          <div
            className={`text-xs font-medium ${
              positive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {positive ? "▲" : "▼"} {Math.abs(price.change).toFixed(2)} (
            {Math.abs(price.changePercent).toFixed(2)}%)
          </div>
        </div>
        <Sparkline points={price.history} positive={positive} />
      </div>
    </div>
  );
}

function PriceTickerContent() {
  const { data, isLoading, isError, error } = useOilPrices();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (isError) {
    throw error instanceof Error ? error : new Error("Failed to load prices");
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {data?.map((price) => (
        <PriceCard key={price.symbol} price={price} />
      ))}
    </div>
  );
}

/** Brent/WTI price cards with trend sparklines, backed by React Query. */
export default function PriceTicker() {
  return (
    <ErrorBoundary label="Price Ticker">
      <PriceTickerContent />
    </ErrorBoundary>
  );
}
