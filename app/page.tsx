'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-dark to-darker flex items-center justify-center">
      <div className="text-center space-y-8 px-4">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
            PetroPulse
          </h1>
          <p className="text-xl text-gray-300">
            Strategic Oil Intelligence Platform
          </p>
        </div>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Real-time market analysis, global supply chain monitoring, and geopolitical risk assessment powered by AI
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
          <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-6 hover:border-blue-500/80 transition">
            <h3 className="text-lg font-semibold mb-2">📊 Dashboard</h3>
            <p className="text-gray-400 text-sm">Live price tickers and market insights</p>
          </div>
          <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500/80 transition">
            <h3 className="text-lg font-semibold mb-2">🌍 Global Globe</h3>
            <p className="text-gray-400 text-sm">3D visualization of supply routes</p>
          </div>
          <div className="bg-slate-900/50 border border-teal-500/30 rounded-lg p-6 hover:border-teal-500/80 transition">
            <h3 className="text-lg font-semibold mb-2">🎮 Scenarios</h3>
            <p className="text-gray-400 text-sm">Simulate market disruptions</p>
          </div>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition"
          >
            View Dashboard
          </Link>
          <Link
            href="/globe"
            className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition"
          >
            Explore Globe
          </Link>
          <Link
            href="/scenarios"
            className="px-8 py-3 border border-gray-500 rounded-lg font-semibold hover:border-gray-300 transition"
          >
            Run Scenarios
          </Link>
        </div>
      </div>
    </main>
  );
}
