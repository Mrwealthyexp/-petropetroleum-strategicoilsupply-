import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "./components/providers/QueryProvider";

export const metadata: Metadata = {
  title: "PetroPulse | Strategic Oil Intelligence",
  description: "Real-time strategic petroleum reserve monitoring, supply route tracking, and geopolitical risk assessment.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-[#050505] text-white antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
