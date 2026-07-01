"use client";

import { FiCopy, FiEdit2, FiMessageSquare, FiStar, FiTrash2 } from "react-icons/fi";

import Button from "@/app/components/common/Button";

export default function PromptCard({
  prompt,
  onCopy,
  onDelete,
  onEdit,
  onToggleFavorite,
  onUse,
}) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-violet-200 hover:shadow-lg hover:shadow-violet-950/10">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-lg font-bold text-slate-950">
            {prompt.title}
          </p>
          <p className="mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {prompt.category || "General"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onToggleFavorite(prompt)}
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg border transition ${
            prompt.favorite
              ? "border-amber-200 bg-amber-50 text-amber-600"
              : "border-slate-200 bg-white text-slate-400 hover:border-amber-200 hover:text-amber-600"
          }`}
          aria-label={prompt.favorite ? "Unfavorite prompt" : "Favorite prompt"}
          title={prompt.favorite ? "Unfavorite" : "Favorite"}
        >
          <FiStar fill={prompt.favorite ? "currentColor" : "none"} />
        </button>
      </div>

      <p className="mt-4 line-clamp-6 flex-1 whitespace-pre-wrap text-sm leading-6 text-slate-600">
        {prompt.content}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <Button
          onClick={() => onUse(prompt)}
          className="gap-2 px-3"
          title="Use prompt"
        >
          <FiMessageSquare />
          Use
        </Button>
        <Button
          variant="secondary"
          onClick={() => onCopy(prompt)}
          className="gap-2 px-3"
          title="Copy prompt"
        >
          <FiCopy />
          Copy
        </Button>
        <Button
          variant="ghost"
          onClick={() => onEdit(prompt)}
          className="gap-2 px-3"
          title="Edit prompt"
        >
          <FiEdit2 />
          Edit
        </Button>
        <Button
          variant="ghost"
          onClick={() => onDelete(prompt)}
          className="gap-2 px-3 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
          title="Delete prompt"
        >
          <FiTrash2 />
          Delete
        </Button>
      </div>
    </article>
  );
}
