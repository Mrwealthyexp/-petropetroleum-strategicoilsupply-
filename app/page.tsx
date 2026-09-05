import Link from "next/link";

const LINKS = [
  { href: "/dashboard", label: "Dashboard", description: "Prices, SPR levels, supply routes, and risk." },
  { href: "/globe", label: "Global Supply Map", description: "Interactive 3D globe view." },
  { href: "/scenarios", label: "Scenario Simulator", description: "Model supply/demand shocks." },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Strategic Oil Intelligence Platform</h1>
        <p className="text-white/60">
          Real-time strategic oil supply, price, and risk intelligence.
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-white/30 hover:bg-white/10"
          >
            <span className="text-lg font-medium">{link.label}</span>
            <span className="text-sm text-white/50">{link.description}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
