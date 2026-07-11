"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  FileText,
  MessageSquare,
  Mic,
  Monitor,
  MoreVertical,
  Plus,
  Sparkles,
  Wand2,
} from "lucide-react";
import { cn } from "@/dashboard/lib/cn";
import { AgentFeatures } from "@/dashboard/components/agents/AgentFeatures";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [agentMode, setAgentMode] = useState(true);
  const textareaRef = useRef(null);

  const hasStarted = messages.length > 0;

  const handleSend = (text = input) => {
    const content = text.trim();
    if (!content) return;

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, role: "user", content },
      {
        id: prev.length + 2,
        role: "assistant",
        content:
          "Based on your workspace data, three opportunities stand out:\n\n1. Re-engage inactive leads — estimated $18k pipeline recovery.\n2. Launch a retention offer for customers with declining order frequency.\n3. Shift ad spend toward your top-converting landing page.\n\nI can draft a detailed action plan if you'd like.",
      },
    ]);
    setInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex min-h-[calc(100dvh-7rem)] flex-col">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_center,rgba(237,233,254,0.55)_0%,rgba(255,237,213,0.15)_45%,transparent_72%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.18)_0%,rgba(30,27,75,0.12)_45%,transparent_72%)]"
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-end gap-2 px-1 pt-1">
        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-surface-border bg-white px-3 text-sm font-medium text-ink transition-colors hover:bg-surface-muted"
        >
          <Monitor className="h-4 w-4 text-ink-muted" />
          Manage
        </button>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border bg-white text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
          aria-label="More options"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="relative flex flex-1 flex-col items-center px-4 pb-6 pt-6 sm:pt-10">
        {!hasStarted ? (
          <div className="mb-8 max-w-2xl text-center sm:mb-12">
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Hi Divine, how can I help you today?
            </h1>
          </div>
        ) : (
          <div className="mb-6 flex w-full max-w-3xl flex-1 flex-col overflow-hidden">
            <div className="flex-1 space-y-5 overflow-y-auto pr-1 dashboard-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-3",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-ink text-white"
                        : "border border-surface-border bg-white text-ink shadow-soft"
                    )}
                  >
                    {msg.content.split("\n").map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-2" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl"
        >
          <div className="rounded-2xl border border-surface-border bg-white p-4 shadow-card sm:p-5">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything"
              rows={hasStarted ? 2 : 3}
              className="w-full resize-none bg-transparent text-base text-ink outline-none placeholder:text-ink-faint"
            />

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-surface-border text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
                  aria-label="Add attachment"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-surface-border text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
                  aria-label="Open conversations"
                >
                  <MessageSquare className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setAgentMode((v) => !v)}
                  className={cn(
                    "inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-sm font-medium transition-colors",
                    agentMode
                      ? "border-ink/15 bg-surface-muted text-ink"
                      : "border-surface-border bg-white text-ink-muted hover:bg-surface-muted"
                  )}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Agent
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
                  aria-label="Enhance prompt"
                >
                  <Wand2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
                  aria-label="Insert document"
                >
                  <FileText className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
                  aria-label="Voice input"
                >
                  <Mic className="h-4 w-4" />
                </button>
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Send message"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </form>

        {!hasStarted && (
          <div className="w-full max-w-5xl">
            <AgentFeatures />
          </div>
        )}
      </div>

      <p className="relative px-4 pb-2 text-center text-xs text-ink-faint">
        Rizzbrand Agent can make mistakes. Monitor and verify results.{" "}
        <button type="button" className="underline underline-offset-2 hover:text-ink-muted">
          Learn more
        </button>
      </p>
    </div>
  );
}
