import { Suspense } from "react";
import { PriceTicker } from "@/app/components/dashboard/PriceTicker";
import { SPRCard } from "@/app/components/dashboard/SPRCard";
import { SupplyRoutesCard } from "@/app/components/dashboard/SupplyRoutesCard";
import { RiskCard } from "@/app/components/dashboard/RiskCard";
import { DashboardSkeleton } from "@/app/components/shared/Skeleton";
import { ErrorBoundary } from "@/app/components/shared/ErrorBoundary";
import { CopilotChat } from "@/app/components/copilot/CopilotChat";
import { Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">PETRO<span className="text-[#ff6b00]">PULSE</span></h1>
            <p className="text-sm text-gray-500 mt-1">Strategic Oil Intelligence Platform</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/globe" className="flex items-center gap-2 px-4 py-2 bg-[#ff6b00] text-black font-semibold rounded-lg hover:bg-[#ff8533] transition-colors"><Globe className="w-4 h-4" />3D Globe<ArrowRight className="w-4 h-4" /></Link>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] rounded-full"><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span className="text-xs text-gray-400">Live</span></div>
            <div className="text-xs text-gray-500 font-mono">{new Date().toUTCString()}</div>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min">
        <div className="lg:col-span-2"><ErrorBoundary><Suspense fallback={<DashboardSkeleton />}><PriceTicker /></Suspense></ErrorBoundary></div>
        <div className="lg:col-span-2 lg:row-span-2"><ErrorBoundary><Suspense fallback={<DashboardSkeleton />}><SPRCard /></Suspense></ErrorBoundary></div>
        <div className="lg:col-span-2"><ErrorBoundary><Suspense fallback={<DashboardSkeleton />}><SupplyRoutesCard /></Suspense></ErrorBoundary></div>
        <div className="lg:col-span-2"><ErrorBoundary><Suspense fallback={<DashboardSkeleton />}><RiskCard /></Suspense></ErrorBoundary></div>
        <div className="lg:col-span-2 bg-[#0f0f0f] border border-[#222] rounded-xl p-6 flex items-center justify-between hover:border-[#ff6b00]/30 transition-all cursor-pointer">
          <div><h3 className="text-sm font-semibold text-white mb-1">Scenario Engine</h3><p className="text-xs text-gray-500">Monte Carlo simulation with interactive parameters</p></div>
          <Link href="/scenarios" className="flex items-center gap-2 text-[#ff6b00] hover:text-[#ff8533] transition-colors"><span className="text-sm">Open</span><ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
      <CopilotChat />
    </div>
  );
}
