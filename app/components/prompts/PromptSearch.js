"use client";

import { FiSearch, FiStar } from "react-icons/fi";

import Input from "@/app/components/common/Input";

export default function PromptSearch({
  search,
  favoriteOnly,
  onSearchChange,
  onFavoriteOnlyChange,
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="relative">
          <Input
            id="prompt-search"
            label="Search prompts"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search title, category, or prompt content"
            inputClassName="pl-10"
          />
          <FiSearch className="pointer-events-none absolute left-3 top-10 text-slate-400" />
        </div>
        <label className="flex h-11 cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50">
          <input
            type="checkbox"
            checked={favoriteOnly}
            onChange={(event) => onFavoriteOnlyChange(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
          />
          <FiStar className={favoriteOnly ? "text-amber-500" : "text-slate-400"} />
          Favorites only
        </label>
      </div>
    </div>
  );
}
