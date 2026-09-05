'use client';

import { Suspense } from 'react';
import Skeleton from '@/components/shared/Skeleton';

const DashboardLoading = () => (
  <div className="space-y-4">
    <Skeleton className="h-48 w-full" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
    </div>
  </div>
);

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-dark p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Oil Market Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Real-time market data and analysis</p>
        </header>

        <Suspense fallback={<DashboardLoading />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Placeholder cards - replace with real components */}
            <div className="bg-slate-900/50 border border-blue-500/20 rounded-lg p-6">
              <h3 className="text-sm text-gray-400 mb-2">WTI Crude Price</h3>
              <p className="text-3xl font-bold">$82.45</p>
              <p className="text-sm text-green-400 mt-1">+2.3% today</p>
            </div>
            <div className="bg-slate-900/50 border border-cyan-500/20 rounded-lg p-6">
              <h3 className="text-sm text-gray-400 mb-2">Brent Crude</h3>
              <p className="text-3xl font-bold">$87.20</p>
              <p className="text-sm text-green-400 mt-1">+1.8% today</p>
            </div>
            <div className="bg-slate-900/50 border border-teal-500/20 rounded-lg p-6">
              <h3 className="text-sm text-gray-400 mb-2">SPR Level</h3>
              <p className="text-3xl font-bold">362.8M</p>
              <p className="text-sm text-yellow-400 mt-1">-1.2% week</p>
            </div>
            <div className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-6">
              <h3 className="text-sm text-gray-400 mb-2">Risk Index</h3>
              <p className="text-3xl font-bold">6.2/10</p>
              <p className="text-sm text-orange-400 mt-1">Moderate</p>
            </div>
          </div>
        </Suspense>
      </div>
    </main>
  );
}
