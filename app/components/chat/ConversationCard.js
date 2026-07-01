"use client";

import { FiTrash2 } from "react-icons/fi";

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export default function ConversationCard({
  conversation,
  active = false,
  onSelect,
  onDelete,
}) {
  return (
    <div
      className={`group flex items-center gap-2 rounded-lg border p-3 transition ${
        active
          ? "border-violet-200 bg-violet-50"
          : "border-transparent hover:border-slate-200 hover:bg-slate-50"
      }`}
    >
      <button type="button" onClick={onSelect} className="min-w-0 flex-1 text-left">
        <p
          className={`truncate text-sm font-semibold ${
            active ? "text-violet-800" : "text-slate-800"
          }`}
        >
          {conversation.title || "New Chat"}
        </p>
        <p className="mt-1 text-xs font-medium text-slate-400">
          {formatDate(conversation.updatedAt)}
        </p>
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 opacity-100 transition hover:bg-white hover:text-rose-600 sm:opacity-0 sm:group-hover:opacity-100"
        aria-label={`Delete ${conversation.title || "conversation"}`}
        title="Delete conversation"
      >
        <FiTrash2 />
      </button>
    </div>
  );
}
