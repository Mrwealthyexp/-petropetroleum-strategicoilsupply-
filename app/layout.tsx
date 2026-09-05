import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'PetroPulse - Strategic Oil Intelligence',
  description: 'Real-time oil market analysis, supply chain monitoring, and geopolitical risk assessment',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-darker text-white">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
