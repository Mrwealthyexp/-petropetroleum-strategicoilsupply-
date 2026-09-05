import Link from "next/link";
import { GlobeView } from "@/components/globe/globe-view";

export default function GlobePage() {
  return (
    <main className="relative h-screen overflow-hidden">
      <GlobeView />
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-6">
        <div><p className="text-sm font-medium tracking-[0.3em] text-[#ff6b00]">PETROPULSE / GLOBE</p><h1 className="mt-2 text-2xl font-semibold text-white">Global supply network</h1></div>
        <Link className="pointer-events-auto rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white hover:border-[#ff6b00]/50" href="/dashboard">Dashboard</Link>
      </div>
      <p className="absolute bottom-6 left-6 text-sm text-zinc-400">Drag to rotate · Scroll to zoom</p>
    </main>
  );
}
