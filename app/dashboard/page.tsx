const metrics = [
  { label: 'Total throughput', value: '8.4M', delta: '+3.8%', sub: 'vs. last month', tone: 'green' },
  { label: 'Refining yield', value: '92.1%', delta: '+1.2%', sub: 'across key assets', tone: 'green' },
  { label: 'Shipment risk', value: 'Low', delta: '-6.4%', sub: 'lower disruption index', tone: 'gold' },
  { label: 'Storage fill', value: '74%', delta: '+2.1%', sub: 'regional buffer health', tone: 'cyan' },
];

const activity = [
  { name: 'North Sea', share: '38%', tag: 'green' },
  { name: 'Gulf Coast', share: '26%', tag: 'gold' },
  { name: 'Middle East', share: '22%', tag: 'cyan' },
  { name: 'West Africa', share: '14%', tag: 'red' },
];

const logistics = [
  { label: 'Marine LNG', value: '404 kbd', tone: 'green' },
  { label: 'Pipeline', value: '1.12 mbd', tone: 'cyan' },
  { label: 'Rail to refinery', value: '165 kbd', tone: 'gold' },
];

export default function DashboardPage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" />
          Petro Petroleum
        </div>
        <nav className="nav-pills" aria-label="Main navigation">
          <a className="pill active" href="/dashboard">Dashboard</a>
          <a className="pill" href="/globe">Globe</a>
          <a className="pill" href="/scenarios">Scenarios</a>
        </nav>
      </header>

      <section className="bento-grid">
        {metrics.map((metric) => (
          <article key={metric.label} className="card metric-card">
            <div className="card-header">
              <h2>{metric.label}</h2>
            </div>
            <div className="value">{metric.value}</div>
            <div className={`delta ${metric.tone === 'gold' ? 'down' : ''}`}>
              {metric.delta}
            </div>
            <div className="sub">{metric.sub}</div>
          </article>
        ))}

        <article className="card chart-card">
          <div className="card-header">
            <h3>Market flow</h3>
            <span className="tag green">+9.4%</span>
          </div>
          <div className="sparkline" aria-label="Market flow chart" />
        </article>

        <article className="card logistics-card">
          <div className="card-header">
            <h3>Logistics</h3>
            <span className="tag cyan">Live</span>
          </div>
          <div className="stack-list">
            {logistics.map((item) => (
              <div key={item.label} className="list-row">
                <span>{item.label}</span>
                <span className={`tag ${item.tone}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="card activity-card">
          <div className="card-header">
            <h3>Production split</h3>
          </div>
          <div className="stack-list">
            {activity.map((item) => (
              <div key={item.name} className="list-row">
                <span>{item.name}</span>
                <span className={`tag ${item.tag}`}>{item.share}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
