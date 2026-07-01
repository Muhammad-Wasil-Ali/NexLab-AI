"use client";

import { useEffect, useRef } from "react";

import ChatMessage from "@/app/components/chat/ChatMessage";
import EmptyChat from "@/app/components/chat/EmptyChat";
import TypingLoader from "@/app/components/chat/TypingLoader";

export default function ChatWindow({
  messages,
  isLoading,
  isTyping,
  error,
  status,
  canRetry,
  onRetry,
  onPromptSelect,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50">
      {isLoading ? (
        <div className="mx-auto flex min-h-full max-w-4xl flex-col gap-4 px-4 py-8 sm:px-6">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className={`h-20 animate-pulse rounded-2xl bg-slate-200 ${
                item % 2 ? "ml-auto w-2/3" : "w-3/4"
              }`}
            />
          ))}
        </div>
      ) : messages.length ? (
        <div className="mx-auto flex max-w-4xl flex-col gap-5 px-4 py-6 sm:px-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping ? (
            <div className="flex justify-start">
              <TypingLoader />
            </div>
          ) : null}
          {error ? (
            <ChatNotice message={error} tone="error" canRetry={canRetry} onRetry={onRetry} />
          ) : null}
          {status ? (
            <ChatNotice message={status} tone="status" canRetry={canRetry} onRetry={onRetry} />
          ) : null}
          <div ref={bottomRef} />
        </div>
      ) : (
        <div className="flex min-h-full flex-col">
          {error ? (
            <div className="mx-auto mt-6 w-[calc(100%-2rem)] max-w-3xl">
              <ChatNotice message={error} tone="error" canRetry={canRetry} onRetry={onRetry} />
            </div>
          ) : null}
          {status ? (
            <div className="mx-auto mt-6 w-[calc(100%-2rem)] max-w-3xl">
              <ChatNotice message={status} tone="status" canRetry={canRetry} onRetry={onRetry} />
            </div>
          ) : null}
          <EmptyChat onPromptSelect={onPromptSelect} />
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}

function ChatNotice({ message, tone, canRetry, onRetry }) {
  const classes =
    tone === "error"
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : "border-violet-200 bg-violet-50 text-violet-700";

  return (
    <div
      className={`flex flex-col gap-3 rounded-lg border px-4 py-3 text-sm font-medium sm:flex-row sm:items-center sm:justify-between ${classes}`}
    >
      <span>{message}</span>
      {canRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="self-start rounded-md bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:text-violet-700 sm:self-auto"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}
