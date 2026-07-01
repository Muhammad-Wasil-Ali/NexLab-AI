"use client";

import { FiMenu, FiPlus } from "react-icons/fi";

export default function ChatHeader({ title, onMenuClick, onNewChat }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="grid h-10 w-10 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open conversations"
          title="Conversations"
        >
          <FiMenu />
        </button>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-950">
            {title || "New Chat"}
          </p>
          <p className="text-xs font-medium text-violet-600">Gemini Flash</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onNewChat}
        className="grid h-10 w-10 place-items-center rounded-lg text-violet-700 hover:bg-violet-50"
        aria-label="New chat"
        title="New chat"
      >
        <FiPlus />
      </button>
    </header>
  );
}
