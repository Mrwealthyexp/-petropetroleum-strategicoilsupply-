import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Strategic Oil Intelligence Platform',
  description: 'Global oil and supply intelligence dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
