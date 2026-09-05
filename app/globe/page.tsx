"use client";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Globe, MapPin, Info, X, Layers, Database } from "lucide-react";
import { useSupplyRoutes } from "@/app/lib/hooks/useSupplyRoutes";
import { useSPRData } from "@/app/lib/hooks/useSPRData";

const GlobeScene = dynamic(() => import("@/app/components/globe/GlobeScene").then((mod) => mod.GlobeScene), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center"><Globe className="w-12 h-12 text-[#ff6b00] animate-pulse mx-auto mb-4" /><p className="text-gray-500 text-sm">Initializing 3D Engine...</p></div>
    </div>
  ),
});

export default function GlobePage() {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lon: number; label: string } | null>(null);
  const { data: routeData } = useSupplyRoutes();
  const { data: sprData } = useSPRData();
  const handleLocationSelect = useCallback((lat: number, lon: number, label: string) => { setSelectedLocation({ lat, lon, label }); }, []);
  const clearSelection = () => setSelectedLocation(null);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#222] bg-[#0a0a0a]/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-[#ff6b00]" />
          <div><h1 className="text-lg font-bold tracking-tight">Global Supply Monitor</h1><p className="text-xs text-gray-500">Real-time oil flow visualization</p></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-3 py-2">
            <Layers className="w-4 h-4 text-gray-500" />
            <span className="text-xs px-2 py-1 rounded bg-[#ff6b00]/20 text-[#ff6b00]">Routes</span>
            <span className="text-xs px-2 py-1 rounded bg-[#ff6b00]/20 text-[#ff6b00]">Facilities</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-400" /><span>{routeData?.summary.activeRoutes || 0} Active</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-400" /><span>{routeData?.summary.disruptedRoutes || 0} Disrupted</span></div>
          </div>
        </div>
      </header>
      <div className="flex-1 flex relative">
        <div className="flex-1 relative">
          <GlobeScene onLocationSelect={handleLocationSelect} className="absolute inset-0" />
          {selectedLocation && (
            <div className="absolute top-4 left-4 bg-[#0a0a0a]/90 backdrop-blur-sm border border-[#333] rounded-xl p-4 max-w-xs z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#ff6b00]" /><span className="font-semibold text-sm">{selectedLocation.label}</span></div>
                <button onClick={clearSelection} className="text-gray-500 hover:text-white"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex justify-between"><span>Latitude</span><span className="text-white font-mono">{selectedLocation.lat.toFixed(4)}&deg;</span></div>
                <div className="flex justify-between"><span>Longitude</span><span className="text-white font-mono">{selectedLocation.lon.toFixed(4)}&deg;</span></div>
              </div>
            </div>
          )}
        </div>
        <div className="w-80 border-l border-[#222] bg-[#0a0a0a]/50 backdrop-blur-sm p-4 overflow-y-auto">
          <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2"><Info className="w-4 h-4 text-[#ff6b00]" />Active Routes</h2>
          <div className="space-y-3">
            {routeData?.routes.map((route) => (
              <div key={route.id} className={`p-3 rounded-lg border transition-all cursor-pointer ${route.status === "active" ? "bg-green-500/5 border-green-500/20" : route.status === "disrupted" ? "bg-red-500/5 border-red-500/20" : "bg-yellow-500/5 border-yellow-500/20"}`}>
                <div className="flex items-center justify-between mb-2"><span className="text-xs font-medium text-white">{route.origin} &rarr; {route.destination}</span><span className={`text-[10px] px-1.5 py-0.5 rounded ${route.status === "active" ? "bg-green-500/20 text-green-400" : route.status === "disrupted" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}>{route.status}</span></div>
                <div className="text-xs text-gray-500">{(route.volume / 1000000).toFixed(1)}M bbl/day &bull; {route.type}</div>
              </div>
            ))}
          </div>
          <h2 className="text-sm font-semibold text-white mt-6 mb-4 flex items-center gap-2"><Database className="w-4 h-4 text-[#ff6b00]" />SPR Facilities</h2>
          <div className="space-y-3">
            {sprData?.facilities.map((facility) => (
              <div key={facility.facility} className="p-3 bg-[#1a1a1a] rounded-lg border border-[#222]">
                <div className="flex items-center justify-between mb-2"><span className="text-xs font-medium text-white">{facility.facility}</span><span className="text-xs text-[#ff6b00] font-mono">{facility.percentageFull.toFixed(1)}%</span></div>
                <div className="h-1.5 bg-[#0a0a0a] rounded-full overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${facility.percentageFull}%`, backgroundColor: facility.percentageFull > 90 ? "#22c55e" : facility.percentageFull > 70 ? "#eab308" : "#ef4444" }} /></div>
                <div className="text-[10px] text-gray-600 mt-1">{facility.currentLevel.toFixed(1)}M / {facility.capacity.toFixed(1)}M bbl</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
