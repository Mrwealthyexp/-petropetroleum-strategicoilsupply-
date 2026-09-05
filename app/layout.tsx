import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PetroPulse | Strategic Oil Intelligence",
  description: "Strategic oil intelligence for a changing world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
