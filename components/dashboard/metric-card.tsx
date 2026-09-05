import { Card } from "@/components/ui/card";

type MetricCardProps = {
  label: string;
  value: string;
  change: string;
  positive?: boolean;
};

export function MetricCard({ label, value, change, positive = true }: MetricCardProps) {
  return (
    <Card>
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <strong className="font-mono text-2xl text-white">{value}</strong>
        <span className={positive ? "font-mono text-sm text-green-500" : "font-mono text-sm text-red-500"}>{change}</span>
      </div>
    </Card>
  );
}
