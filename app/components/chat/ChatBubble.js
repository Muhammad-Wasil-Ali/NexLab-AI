"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatBubble({ role, content }) {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  if (isUser) {
    return (
      <div className="max-w-[86%] rounded-2xl rounded-br-sm bg-violet-600 px-4 py-3 text-sm leading-6 text-white shadow-sm shadow-violet-600/20 sm:max-w-[74%]">
        <p className="whitespace-pre-wrap break-words">{content}</p>
      </div>
    );
  }

  return (
    <div className="max-w-[86%] rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-slate-700 shadow-sm ring-1 ring-slate-200 sm:max-w-[78%]">
      <div className="prose prose-sm max-w-none prose-headings:text-slate-950 prose-p:my-2 prose-p:leading-7 prose-a:text-violet-700 prose-strong:text-slate-950 prose-code:rounded prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-violet-700 prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:bg-slate-950 prose-pre:p-4 prose-pre:text-slate-50 prose-ul:my-2 prose-ol:my-2">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-violet-700"
          aria-label="Copy generated text"
          title="Copy"
        >
          {copied ? <FiCheck /> : <FiCopy />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
