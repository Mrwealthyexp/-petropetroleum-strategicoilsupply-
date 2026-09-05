import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Strategic Oil Intelligence Platform',
  description: 'A strategic oil intelligence platform for upstream, supply, and transportation decision making.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
