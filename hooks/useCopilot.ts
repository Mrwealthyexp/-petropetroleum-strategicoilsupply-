import { useCallback, useState } from "react";

export type CopilotMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatResponse = { content: string };

export function useCopilot(url = "/api/copilot") {
  const [messages, setMessages] = useState<CopilotMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    const text = content.trim();
    if (!text || loading) return;
    const userMessage: CopilotMessage = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((current) => [...current, userMessage]);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      const result = (await response.json()) as ChatResponse;
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: "assistant", content: result.content },
      ]);
    } catch (value) {
      setError(value instanceof Error ? value : new Error("Unable to contact copilot"));
    } finally {
      setLoading(false);
    }
  }, [loading, messages, url]);

  const clear = useCallback(() => setMessages([]), []);
  return { messages, loading, error, sendMessage, clear };
}
