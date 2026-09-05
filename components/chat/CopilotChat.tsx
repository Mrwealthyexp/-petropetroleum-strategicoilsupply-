"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hi! I'm your strategic oil supply copilot. Ask me about prices, SPR levels, supply routes, or geopolitical risk.",
  },
];

function respondTo(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("price") || lower.includes("brent") || lower.includes("wti")) {
    return "Brent and WTI prices are updated live on the dashboard's Price Ticker card.";
  }
  if (lower.includes("spr") || lower.includes("reserve")) {
    return "The Strategic Petroleum Reserve levels are shown per facility with fill percentages on the SPR card.";
  }
  if (lower.includes("route") || lower.includes("strait") || lower.includes("canal")) {
    return "Supply route status (active/disrupted) for key chokepoints is tracked on the Supply Routes card.";
  }
  if (lower.includes("risk")) {
    return "Geopolitical risk scores by region are available on the Risk card, with trend indicators.";
  }
  return "I can help with oil prices, SPR levels, supply routes, and geopolitical risk. What would you like to know?";
}

/** Floating AI chat widget for asking questions about the dashboard data. */
export default function CopilotChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          content: respondTo(trimmed),
        },
      ]);
    }, 400);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-96 w-80 flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="text-sm font-semibold text-white">Copilot</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/50 transition hover:text-white"
            >
              ✕
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  message.role === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "bg-white/10 text-white/90"
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-white/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about supply, prices, risk…"
              className="flex-1 rounded-md bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              Send
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close copilot chat" : "Open copilot chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg transition hover:bg-blue-500"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
