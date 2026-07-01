"use client";

import EmptyState from "@/app/components/dashboard/EmptyState";
import PromptCard from "@/app/components/prompts/PromptCard";

export default function PromptList({
  prompts,
  isLoading,
  onCopy,
  onDelete,
  onEdit,
  onToggleFavorite,
  onUse,
}) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-72 animate-pulse rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="h-5 w-2/3 rounded bg-slate-200" />
            <div className="mt-4 h-4 w-24 rounded bg-slate-100" />
            <div className="mt-8 space-y-3">
              <div className="h-3 rounded bg-slate-100" />
              <div className="h-3 rounded bg-slate-100" />
              <div className="h-3 w-3/4 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!prompts.length) {
    return (
      <EmptyState
        title="No prompts found"
        description="Create a saved prompt or adjust your filters to see it here."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          onCopy={onCopy}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleFavorite={onToggleFavorite}
          onUse={onUse}
        />
      ))}
    </div>
  );
}
