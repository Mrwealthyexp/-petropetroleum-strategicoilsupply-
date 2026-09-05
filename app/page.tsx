import Link from 'next/link';

const pages = [
  { href: '/dashboard', label: 'Dashboard', description: 'Portfolio performance and operating view' },
  { href: '/globe', label: 'Globe', description: 'Global flow monitoring and network overview' },
  { href: '/scenarios', label: 'Scenarios', description: 'Trade-off modeling and strategic planning' },
];

export default function HomePage() {
  return (
    <main className="home-shell">
      <div className="home-panel">
        <p className="eyebrow">Strategic oil intelligence</p>
        <h1>Petro Petroleum Strategic Oil Supply</h1>
        <p className="lead">
          Monitor global production, logistics, refining output, and market risk from one command center.
        </p>
        <div className="link-grid">
          {pages.map((page) => (
            <Link href={page.href} key={page.href} className="nav-card">
              <span>{page.label}</span>
              <small>{page.description}</small>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
