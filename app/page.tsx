import Link from "next/link";
import { ArrowRight, Globe, TrendingUp, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#222]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#ff6b00] rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-black" />
          </div>
          <span className="text-lg font-bold tracking-tight">PETRO<span className="text-[#ff6b00]">PULSE</span></span>
        </div>
        <div className="text-xs text-gray-500">Strategic Oil Intelligence</div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-2xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Global Energy<span className="block text-[#ff6b00]">Intelligence</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-lg mx-auto">
              Real-time monitoring of strategic petroleum reserves, supply routes, geopolitical risks, and market dynamics.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="flex items-center justify-center gap-2 px-8 py-4 bg-[#ff6b00] text-black font-bold rounded-xl hover:bg-[#ff8533] transition-all">
              Enter Platform<ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/globe" className="flex items-center justify-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white border border-[#333] rounded-xl hover:border-[#ff6b00]/50 transition-all">
              <Globe className="w-5 h-5" />3D Globe
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#ff6b00] font-mono">657M</div>
              <div className="text-xs text-gray-500 mt-1">Barrels Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#4a90d9] font-mono">4</div>
              <div className="text-xs text-gray-500 mt-1">SPR Facilities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#22c55e] font-mono">24/7</div>
              <div className="text-xs text-gray-500 mt-1">Live Monitoring</div>
            </div>
          </div>
        </div>
      </main>
      <footer className="px-6 py-4 border-t border-[#222] text-center text-xs text-gray-600">
        <div className="flex items-center justify-center gap-4">
          <Shield className="w-3 h-3" />
          <span>Secured by Web3 Technology</span>
          <span className="text-[#ff6b00]">global energy.strategicoilsupply</span>
        </div>
      </footer>
    </div>
  );
}
