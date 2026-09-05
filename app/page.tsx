const metrics = [
  { label: 'Live supply nodes', value: '142' },
  { label: 'Avg. vessel delay', value: '4.2h' },
  { label: 'Forecast accuracy', value: '96.4%' },
  { label: 'Cross-border flows', value: '27' }
];

const capabilities = [
  {
    title: 'Portfolio monitoring',
    description: 'Track production, inventory, and logistics from a single strategic control room.'
  },
  {
    title: 'Market intelligence',
    description: 'Surface anomalies in throughput, pricing spreads, and refinery load factors in real time.'
  },
  {
    title: 'Scenario planning',
    description: 'Model supply disruptions, route constraints, and contract exposure before market shifts hit.'
  }
];

const markets = [
  'West Africa',
  'Gulf Coast',
  'North Sea',
  'Middle East',
  'Asia Pacific'
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />

      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark">SO</div>
          <div>
            <p className="eyebrow">Strategic Oil</p>
            <strong>Intelligence Platform</strong>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#platform">Platform</a>
          <a href="#coverage">Coverage</a>
          <a href="#insights">Insights</a>
        </nav>

        <button type="button" className="ghost-button">
          View Demo
        </button>
      </header>

      <section className="hero" id="platform">
        <div className="hero-copy">
          <span className="status-pill">Operational intelligence · Live</span>
          <h1>See supply risks before they reshape the market.</h1>
          <p>
            Aggregate production, inventory, freight, and demand signals to keep every upstream,
            midstream, and trading decision aligned with real-world availability.
          </p>

          <div className="cta-row">
            <a href="#platform" className="primary-button">
              Enter Platform
            </a>
            <button type="button" className="secondary-button">
              Explore data
            </button>
          </div>

          <div className="metrics-grid" aria-label="Platform statistics">
            {metrics.map((metric) => (
              <div key={metric.label} className="metric-card">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-panel" aria-label="Network overview panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">Signal health</span>
              <h2>Global supply index</h2>
            </div>
            <span className="trend positive">+12.4%</span>
          </div>

          <div className="network-visual" aria-hidden="true">
            <span className="node node-a" />
            <span className="node node-b" />
            <span className="node node-c" />
            <span className="node node-d" />
            <span className="node node-e" />
            <span className="connection connection-a" />
            <span className="connection connection-b" />
            <span className="connection connection-c" />
          </div>

          <div className="slider-panel">
            <div className="slider-labels">
              <span>Supply confidence</span>
              <strong>82%</strong>
            </div>
            <input aria-label="Supply confidence" type="range" min="0" max="100" defaultValue="82" />
          </div>
        </div>
      </section>

      <section className="lower-grid" id="insights">
        <div className="info-card feature-card">
          <p className="card-label">Why teams switch</p>
          <h3>Built for strategic operators and trading desks.</h3>
          <div className="feature-list">
            {capabilities.map((capability) => (
              <div key={capability.title} className="feature-item">
                <span className="bullet" />
                <div>
                  <h4>{capability.title}</h4>
                  <p>{capability.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="info-card market-card" id="coverage">
          <p className="card-label">Coverage</p>
          <h3>Integrated across major trading corridors.</h3>
          <div className="market-pills" aria-label="Market coverage list">
            {markets.map((market) => (
              <span key={market}>{market}</span>
            ))}
          </div>
          <div className="mini-chart" aria-hidden="true">
            <span className="bar bar-1" />
            <span className="bar bar-2" />
            <span className="bar bar-3" />
            <span className="bar bar-4" />
            <span className="bar bar-5" />
          </div>
        </div>
      </section>
    </main>
  );
}
