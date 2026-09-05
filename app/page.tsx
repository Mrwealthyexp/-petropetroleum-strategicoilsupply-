import { cn } from './lib/utils';

const metrics = [
  { label: 'Live supply nodes', value: '142' },
  { label: 'Avg. vessel delay', value: '4.2h' },
  { label: 'Forecast accuracy', value: '96.4%' },
  { label: 'Cross-border flows', value: '27' },
];

export default function HomePage() {
  return (
    <main className={cn('min-h-screen bg-slate-950 px-6 py-10 text-slate-50')}>
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Strategic Oil</p>
            <h1 className="mt-2 text-3xl font-semibold">Intelligence Platform</h1>
          </div>
          <button type="button" className={cn('rounded-full border border-cyan-400/60 px-4 py-2 text-sm text-cyan-200')}>
            View Demo
          </button>
        </header>

        <section className="grid gap-6 md:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-cyan-950/20">
              <div className="text-2xl font-semibold text-cyan-300">{metric.value}</div>
              <div className="mt-2 text-sm text-slate-300">{metric.label}</div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
