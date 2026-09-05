import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="max-w-3xl text-center">
        <p className="text-sm font-medium tracking-[0.4em] text-[#ff6b00]">PETROPULSE</p>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-7xl">Strategic oil intelligence.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-400">Monitor oil markets, reserve capacity, global supply routes, and geopolitical risk in one operational view.</p>
        <div className="mt-10 flex justify-center gap-4">
          <Link className="rounded-lg bg-[#ff6b00] px-5 py-3 font-medium text-black" href="/dashboard">Enter platform</Link>
          <Link className="rounded-lg border border-zinc-700 px-5 py-3 font-medium text-white hover:border-[#ff6b00]/50" href="/globe">Explore globe</Link>
        </div>
      </section>
    </main>
  );
}
