'use client';

import { useMemo, useState } from 'react';

const startingScenario = {
  demand: 68,
  supply: 72,
  investment: 58,
};

export default function ScenariosPage() {
  const [demand, setDemand] = useState(startingScenario.demand);
  const [supply, setSupply] = useState(startingScenario.supply);
  const [investment, setInvestment] = useState(startingScenario.investment);

  const score = useMemo(() => {
    const weighted = Math.round((demand * 0.45 + supply * 0.35 + investment * 0.2) / 1.1);
    return Math.min(98, Math.max(54, weighted));
  }, [demand, supply, investment]);

  return (
    <main className="page-shell scenario-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" />
          Scenario planning
        </div>
        <nav className="nav-pills" aria-label="Main navigation">
          <a className="pill" href="/dashboard">Dashboard</a>
          <a className="pill" href="/globe">Globe</a>
          <a className="pill active" href="/scenarios">Scenarios</a>
        </nav>
      </header>

      <section className="scenario-top">
        <div className="card scenario-panel">
          <div className="card-header">
            <h3>Strategic levers</h3>
            <span className="tag cyan">Modeling</span>
          </div>

          <div className="slider-group">
            <div className="slider-row">
              <label htmlFor="demand">
                <span>Demand growth</span>
                <strong>{demand}%</strong>
              </label>
              <input id="demand" type="range" min="0" max="100" value={demand} onChange={(e) => setDemand(Number(e.target.value))} />
            </div>

            <div className="slider-row">
              <label htmlFor="supply">
                <span>Supply resilience</span>
                <strong>{supply}%</strong>
              </label>
              <input id="supply" type="range" min="0" max="100" value={supply} onChange={(e) => setSupply(Number(e.target.value))} />
            </div>

            <div className="slider-row">
              <label htmlFor="investment">
                <span>Capex intensity</span>
                <strong>{investment}%</strong>
              </label>
              <input id="investment" type="range" min="0" max="100" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} />
            </div>
          </div>
        </div>

        <aside className="card scenario-side">
          <div className="card-header">
            <h3>Scenario score</h3>
          </div>
          <div className="score">
            <strong>{score}</strong>
            <span>/100</span>
          </div>
          <div className="card-list">
            <div className="insight">
              <strong>Recommended strategy</strong>
              <span>Maintain balanced capex and prioritize resilient supply corridors.</span>
            </div>
            <div className="insight">
              <strong>Risk signal</strong>
              <span>Near-term volatility remains moderate with improving shipper confidence.</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="scenario-grid">
        <article className="card scenario-panel">
          <div className="card-header">
            <h3>Base case</h3>
            <span className="tag green">Favorable</span>
          </div>
          <div className="card-list">
            <div className="insight">
              <strong>Output mix</strong>
              <span>Crude import support remains stable across Atlantic shipments.</span>
            </div>
            <div className="insight">
              <strong>Margin outlook</strong>
              <span>Expected margin expansion of 7.2% through Q4.</span>
            </div>
          </div>
        </article>

        <article className="card scenario-panel">
          <div className="card-header">
            <h3>Stress case</h3>
            <span className="tag red">Watch</span>
          </div>
          <div className="card-list">
            <div className="insight">
              <strong>Shock event</strong>
              <span>Port congestion and refinery outages increase transit delays.</span>
            </div>
            <div className="insight">
              <strong>Mitigation</strong>
              <span>Shift cargo traffic toward inland storage and alternate terminals.</span>
            </div>
          </div>
        </article>

        <article className="card scenario-panel">
          <div className="card-header">
            <h3>Upside case</h3>
            <span className="tag gold">Opportunity</span>
          </div>
          <div className="card-list">
            <div className="insight">
              <strong>Demand pull</strong>
              <span>Regional demand surges support premium pricing and conversion rates.</span>
            </div>
            <div className="insight">
              <strong>Return profile</strong>
              <span>Optimize throughput and long-term contracts for incremental growth.</span>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
