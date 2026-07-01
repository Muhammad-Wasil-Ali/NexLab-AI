"use client";

import { useState } from "react";

import Button from "@/app/components/common/Button";
import Input from "@/app/components/common/Input";
import TextArea from "@/app/components/common/TextArea";

const initialForm = {
  title: "",
  category: "General",
  content: "",
  favorite: false,
};

export default function PromptForm({
  prompt,
  isSubmitting,
  onCancel,
  onSubmit,
}) {
  const [form, setForm] = useState(() =>
    prompt
      ? {
          title: prompt.title || "",
          category: prompt.category || "General",
          content: prompt.content || "",
          favorite: Boolean(prompt.favorite),
        }
      : initialForm
  );

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="prompt-title"
        label="Title"
        value={form.title}
        onChange={(event) => updateField("title", event.target.value)}
        placeholder="Summarize a research paper"
        required
        maxLength={120}
      />
      <Input
        id="prompt-category"
        label="Category"
        value={form.category}
        onChange={(event) => updateField("category", event.target.value)}
        placeholder="Research"
        maxLength={80}
      />
      <TextArea
        id="prompt-content"
        label="Prompt"
        value={form.content}
        onChange={(event) => updateField("content", event.target.value)}
        placeholder="Paste or write the reusable prompt..."
        required
        maxLength={12000}
        rows={8}
      />
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
        <input
          type="checkbox"
          checked={form.favorite}
          onChange={(event) => updateField("favorite", event.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
        />
        Mark as favorite
      </label>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {prompt ? "Save Prompt" : "Create Prompt"}
        </Button>
      </div>
    </form>
  );
}
