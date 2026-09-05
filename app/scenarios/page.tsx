'use client';

import { useState } from 'react';

export default function ScenariosPage() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const scenarios = [
    {
      id: 'supply-shock',
      name: 'Supply Shock',
      description: 'Simulate a major supply disruption in Middle East',
      impact: 'High',
    },
    {
      id: 'demand-spike',
      name: 'Demand Spike',
      description: 'Model unexpected global demand increase',
      impact: 'Medium',
    },
    {
      id: 'geopolitical',
      name: 'Geopolitical Crisis',
      description: 'Analyze impact of international tensions',
      impact: 'High',
    },
    {
      id: 'weather',
      name: 'Weather Event',
      description: 'Model hurricane impact on Gulf production',
      impact: 'Medium',
    },
  ];

  return (
    <main className="min-h-screen bg-dark p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
            Scenario Engine
          </h1>
          <p className="text-gray-400 mt-2">Simulate market disruptions and analyze outcomes</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario.id)}
              className={`p-6 rounded-lg border-2 cursor-pointer transition ${
                selectedScenario === scenario.id
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-slate-700 bg-slate-900/30 hover:border-slate-600'
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{scenario.name}</h3>
              <p className="text-gray-400 mb-4">{scenario.description}</p>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-semibold px-3 py-1 rounded ${
                  scenario.impact === 'High'
                    ? 'bg-red-500/20 text-red-300'
                    : 'bg-yellow-500/20 text-yellow-300'
                }`}>
                  Impact: {scenario.impact}
                </span>
                <button className="text-sm text-cyan-400 hover:text-cyan-300">
                  Run Simulation →
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedScenario && (
          <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Simulation Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 p-4 rounded">
                <p className="text-gray-400 text-sm">Price Impact</p>
                <p className="text-2xl font-bold text-red-400 mt-2">+12.5%</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded">
                <p className="text-gray-400 text-sm">Supply Deficit</p>
                <p className="text-2xl font-bold text-orange-400 mt-2">2.3M bbl/d</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded">
                <p className="text-gray-400 text-sm">SPR Release Needed</p>
                <p className="text-2xl font-bold text-yellow-400 mt-2">50M bbl</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
