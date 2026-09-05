"use client";
import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, User, Loader2, Sparkles } from "lucide-react";
import { useCopilot } from "@/app/lib/hooks/useCopilot";
import { cn } from "@/app/lib/utils";

export function CopilotChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, clearChat, isTyping, isLoading } = useCopilot();

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!input.trim() || isLoading) return; sendMessage(input.trim()); setInput(""); };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className={cn("fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300", isOpen ? "bg-[#222] text-white rotate-90" : "bg-[#ff6b00] text-black hover:bg-[#ff8533] hover:scale-110")}>{isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}</button>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-[#0a0a0a] border border-[#333] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-[#222] bg-[#0f0f0f]">
            <div className="flex items-center gap-3"><div className="p-2 bg-[#ff6b00]/10 rounded-lg"><Bot className="w-5 h-5 text-[#ff6b00]" /></div><div><h3 className="text-sm font-semibold text-white">PetroPulse AI</h3><div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /><span className="text-xs text-gray-500">Online</span></div></div></div>
            <button onClick={clearChat} className="text-xs text-gray-500 hover:text-white transition-colors">Clear</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", msg.role === "user" ? "bg-[#4a90d9]" : "bg-[#ff6b00]")}>{msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-black" />}</div>
                <div className={cn("max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap", msg.role === "user" ? "bg-[#4a90d9]/20 text-white rounded-br-md" : "bg-[#1a1a1a] text-gray-300 rounded-bl-md")}>{msg.content}</div>
              </div>
            ))}
            {isTyping && <div className="flex gap-3"><div className="w-8 h-8 rounded-full bg-[#ff6b00] flex items-center justify-center"><Bot className="w-4 h-4 text-black" /></div><div className="bg-[#1a1a1a] p-3 rounded-2xl rounded-bl-md"><Loader2 className="w-4 h-4 text-[#ff6b00] animate-spin" /></div></div>}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-[#222] bg-[#0f0f0f]">
            <div className="flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about oil prices, SPR, routes..." className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#ff6b00]/50 transition-colors" />
              <button type="submit" disabled={!input.trim() || isLoading} className="p-2.5 bg-[#ff6b00] text-black rounded-lg hover:bg-[#ff8533] disabled:opacity-50 disabled:cursor-not-allowed transition-all"><Send className="w-4 h-4" /></button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
