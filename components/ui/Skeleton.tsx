import { type HTMLAttributes } from "react";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Base pulsing skeleton block. Compose with utility classes to build
 * skeleton placeholders for cards, text lines, avatars, etc.
 */
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-white/10", className)}
      {...props}
    />
  );
}

/** Skeleton placeholder shaped like one of the dashboard summary cards. */
export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

/** Skeleton placeholder for a full-height 3D/canvas panel. */
export function CanvasSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-xl border border-white/10 bg-white/5">
      <Skeleton className="h-24 w-24 rounded-full" />
    </div>
  );
}

export default Skeleton;
