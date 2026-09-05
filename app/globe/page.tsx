'use client';

import { Suspense } from 'react';
import Skeleton from '@/components/shared/Skeleton';

export default function GlobePage() {
  return (
    <main className="min-h-screen bg-dark flex flex-col">
      <header className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-b border-blue-500/20 p-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          Global Supply Intelligence
        </h1>
        <p className="text-gray-400 mt-2">3D visualization of oil infrastructure and supply routes</p>
      </header>

      <div className="flex-1 relative">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <Skeleton className="w-full h-full" />
          </div>
        }>
          <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl">🌍</div>
              <p className="text-gray-400">3D Globe Component</p>
              <p className="text-sm text-gray-500">Three.js interactive globe will render here</p>
            </div>
          </div>
        </Suspense>
      </div>

      {/* Control panel */}
      <div className="bg-slate-900/50 border-t border-blue-500/20 p-4">
        <div className="max-w-7xl mx-auto flex gap-2 flex-wrap">
          <button className="px-4 py-2 bg-blue-600/20 border border-blue-500/50 rounded hover:bg-blue-600/40 transition text-sm">
            Show Refineries
          </button>
          <button className="px-4 py-2 bg-cyan-600/20 border border-cyan-500/50 rounded hover:bg-cyan-600/40 transition text-sm">
            Show Tankers
          </button>
          <button className="px-4 py-2 bg-teal-600/20 border border-teal-500/50 rounded hover:bg-teal-600/40 transition text-sm">
            Show Pipelines
          </button>
        </div>
      </div>
    </main>
  );
}
