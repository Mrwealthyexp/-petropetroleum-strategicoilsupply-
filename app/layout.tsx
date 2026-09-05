import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import CopilotChat from "@/components/chat/CopilotChat";

export const metadata: Metadata = {
  title: "Strategic Oil Intelligence Platform",
  description: "Real-time strategic oil supply, price, and risk intelligence dashboard.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-zinc-950 text-white font-sans">
        <QueryProvider>
          {children}
          <CopilotChat />
        </QueryProvider>
      </body>
    </html>
  );
}
