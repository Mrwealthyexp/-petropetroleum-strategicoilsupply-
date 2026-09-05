const metrics = [
  { label: 'Active terminals', value: '62', tone: 'cyan' },
  { label: 'Vessel queue', value: '14', tone: 'gold' },
  { label: 'Port dwell', value: '2.4d', tone: 'green' },
];

export default function GlobePage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" />
          Global supply network
        </div>
        <nav className="nav-pills" aria-label="Main navigation">
          <a className="pill" href="/dashboard">Dashboard</a>
          <a className="pill active" href="/globe">Globe</a>
          <a className="pill" href="/scenarios">Scenarios</a>
        </nav>
      </header>

      <section className="globe-shell">
        <aside className="card sidebar">
          <div className="card-header">
            <h3>Network status</h3>
            <span className="tag green">Stable</span>
          </div>
          <div className="panel-list">
            {metrics.map((item) => (
              <div key={item.label} className="panel-chip">
                <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{item.label}</div>
                <div style={{ fontSize: '1.8rem', marginTop: '8px', fontWeight: 700 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </aside>

        <div className="globe-stage">
          <div className="globe" aria-label="Global supply network globe">
            <div className="orbit one" />
            <div className="orbit two" />
            <span className="node n1" />
            <span className="node n2" />
            <span className="node n3" />
            <span className="node n4" />
            <span className="node n5" />
            <span className="route r1" />
            <span className="route r2" />
            <span className="route r3" />
          </div>

          <div className="globe-legend">
            <div className="legend-row">
              <span><span className="legend-dot" style={{ background: 'var(--cyan)' }} /> Inbound flow</span>
              <strong>4.8 mt</strong>
            </div>
            <div className="legend-row">
              <span><span className="legend-dot" style={{ background: 'var(--teal)' }} /> Export corridor</span>
              <strong>3.1 mt</strong>
            </div>
            <div className="legend-row">
              <span><span className="legend-dot" style={{ background: 'var(--gold)' }} /> Risk watch</span>
              <strong>7 routes</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
