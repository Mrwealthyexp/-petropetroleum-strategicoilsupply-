import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-xl border border-[#222] bg-[#0b0b0b] p-5 transition hover:border-[#ff6b00]/30", className)} {...props} />;
}
