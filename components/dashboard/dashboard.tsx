import { MetricCard } from "./metric-card";
import { Card } from "@/components/ui/card";

const facilities = [
  ["Bryan Mound", 90.6],
  ["Big Hill", 94.2],
  ["West Hackberry", 90.3],
  ["Bayou Choctaw", 94.9],
] as const;

export function Dashboard() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-sm font-medium tracking-[0.3em] text-[#ff6b00]">PETROPULSE / LIVE INTELLIGENCE</p>
      <h1 className="mt-3 text-4xl font-semibold text-white">Strategic oil dashboard</h1>
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <MetricCard label="Brent crude" value="$84.52" change="+1.47%" />
        <MetricCard label="WTI crude" value="$80.15" change="+1.24%" />
      </section>
      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-medium text-white">Strategic Petroleum Reserve</h2>
          <div className="mt-5 space-y-4">
            {facilities.map(([name, level]) => (
              <div key={name}>
                <div className="mb-1 flex justify-between text-sm text-zinc-400"><span>{name}</span><span className="font-mono">{level}%</span></div>
                <div className="h-2 overflow-hidden rounded bg-zinc-800"><div className="h-full bg-[#ff6b00]" style={{ width: `${level}%` }} /></div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="font-medium text-white">Route status</h2>
          <div className="mt-5 space-y-4 text-sm">
            <p className="flex justify-between text-zinc-400"><span>Houston → Rotterdam</span><span className="text-green-500">Active</span></p>
            <p className="flex justify-between text-zinc-400"><span>Basra → Qingdao</span><span className="text-green-500">Active</span></p>
            <p className="flex justify-between text-zinc-400"><span>Primorsk → Wilhelmshaven</span><span className="text-red-500">Disrupted</span></p>
          </div>
          <h2 className="mt-8 font-medium text-white">Geopolitical risk</h2>
          <p className="mt-3 text-sm text-zinc-400">Middle East <span className="ml-2 font-mono text-[#ff6b00]">78 / 100</span></p>
        </Card>
      </section>
    </main>
  );
}
