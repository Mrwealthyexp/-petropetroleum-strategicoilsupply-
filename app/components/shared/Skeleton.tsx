"use client";
import { cn } from "@/app/lib/utils";

interface Props { className?: string; variant?: "text" | "circular" | "rectangular"; width?: string; height?: string; pulse?: boolean; }

export function Skeleton({ className, variant = "rectangular", width = "100%", height = "20px", pulse = true }: Props) {
  const base = "bg-[#1a1a1a] border border-[#333]";
  const variants = { text: "rounded", circular: "rounded-full", rectangular: "rounded-lg" };
  return <div className={cn(base, variants[variant], pulse && "animate-pulse", className)} style={{ width, height }} />;
}

export function CardSkeleton() {
  return (
    <div className="bg-[#0f0f0f] border border-[#222] rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between"><Skeleton variant="text" width="120px" height="16px" /><Skeleton variant="circular" width="32px" height="32px" /></div>
      <Skeleton variant="text" width="80%" height="40px" /><Skeleton variant="text" width="60%" height="16px" />
      <div className="flex gap-2"><Skeleton variant="text" width="60px" height="24px" /><Skeleton variant="text" width="60px" height="24px" /></div>
    </div>
  );
}

export function DashboardSkeleton() {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}</div>;
}
