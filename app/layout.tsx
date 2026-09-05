import './globals.css';
import { QueryProvider } from './components/providers/query-provider';

export const metadata = {
  title: 'Strategic Oil Intelligence Platform',
  description: 'A strategic oil intelligence platform for upstream, supply, and transportation decision making.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
