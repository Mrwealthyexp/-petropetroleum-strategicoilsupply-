import Link from "next/link";
import { ScenarioModel } from "@/components/dashboard/scenario-model";

export default function ScenariosPage() {
  return <main className="mx-auto min-h-screen max-w-6xl px-6 py-12"><Link className="text-sm text-zinc-400 hover:text-[#ff6b00]" href="/dashboard">← Dashboard</Link><p className="mt-8 text-sm font-medium tracking-[0.3em] text-[#ff6b00]">SCENARIO MODELING</p><h1 className="mt-3 text-4xl font-semibold text-white">Price projection</h1><p className="mt-3 max-w-xl text-zinc-400">Model market conditions to estimate potential Brent price impact.</p><div className="mt-8"><ScenarioModel /></div></main>;
}
