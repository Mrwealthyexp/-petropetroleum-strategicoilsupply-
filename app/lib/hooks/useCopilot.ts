"use client";
import { useMutation } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { oilApi } from "../api/client";
import { ChatMessage, CopilotResponse } from "../types";

export function useCopilot() {
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: "welcome", role: "assistant", content: "I am your PetroPulse AI Co-Pilot. Ask me about oil prices, SPR levels, supply routes, or geopolitical risks.", timestamp: new Date().toISOString() }]);
  const [isTyping, setIsTyping] = useState(false);
  const mutation = useMutation({
    mutationFn: (msgs: ChatMessage[]) => oilApi.chatWithCopilot(msgs),
    onMutate: () => setIsTyping(true),
    onSuccess: (data: CopilotResponse) => { setMessages((prev) => [...prev, { id: data.id, role: "assistant", content: data.content, timestamp: data.timestamp }]); setIsTyping(false); },
    onError: (error: Error) => { setMessages((prev) => [...prev, { id: `error-${Date.now()}`, role: "assistant", content: `Error: ${error.message}. Please try again.`, timestamp: new Date().toISOString() }]); setIsTyping(false); },
  });
  const sendMessage = useCallback((content: string) => { const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content, timestamp: new Date().toISOString() }; setMessages((prev) => [...prev, userMessage]); mutation.mutate([...messages, userMessage].slice(-10)); }, [messages, mutation]);
  const clearChat = useCallback(() => setMessages([{ id: "welcome", role: "assistant", content: "Chat cleared. How can I help you?", timestamp: new Date().toISOString() }]), []);
  return { messages, sendMessage, clearChat, isTyping, isLoading: mutation.isPending };
}
