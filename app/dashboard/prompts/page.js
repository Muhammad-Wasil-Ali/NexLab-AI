"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";

import Button from "@/app/components/common/Button";
import ErrorMessage from "@/app/components/common/ErrorMessage";
import SuccessMessage from "@/app/components/common/SuccessMessage";
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import PromptForm from "@/app/components/prompts/PromptForm";
import PromptList from "@/app/components/prompts/PromptList";
import PromptModal from "@/app/components/prompts/PromptModal";
import PromptSearch from "@/app/components/prompts/PromptSearch";
import {
  createPrompt,
  deletePrompt,
  getPrompts,
  togglePromptFavorite,
  updatePrompt,
} from "@/utils/prompts/promptApi";

export default function PromptLibraryPage() {
  const router = useRouter();
  const [prompts, setPrompts] = useState([]);
  const [search, setSearch] = useState("");
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadPrompts = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await getPrompts({ search, favorite: favoriteOnly });
      setPrompts(data.prompts || []);
    } catch (loadError) {
      setError(loadError.message || "Unable to load prompts.");
    } finally {
      setIsLoading(false);
    }
  }, [favoriteOnly, search]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadPrompts();
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [loadPrompts]);

  function openCreateModal() {
    setEditingPrompt(null);
    setError("");
    setSuccess("");
    setIsModalOpen(true);
  }

  function openEditModal(prompt) {
    setEditingPrompt(prompt);
    setError("");
    setSuccess("");
    setIsModalOpen(true);
  }

  function closeModal() {
    if (isSubmitting) {
      return;
    }

    setIsModalOpen(false);
    setEditingPrompt(null);
  }

  async function handleSubmit(payload) {
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const data = editingPrompt
        ? await updatePrompt(editingPrompt.id, payload)
        : await createPrompt(payload);

      setSuccess(data.message || "Prompt saved.");
      setIsModalOpen(false);
      setEditingPrompt(null);
      await loadPrompts();
    } catch (submitError) {
      setError(submitError.message || "Unable to save prompt.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleToggleFavorite(prompt) {
    setError("");
    setSuccess("");

    setPrompts((current) =>
      current.map((item) =>
        item.id === prompt.id ? { ...item, favorite: !item.favorite } : item
      )
    );

    try {
      const data = await togglePromptFavorite(prompt.id);
      setPrompts((current) =>
        current
          .map((item) => (item.id === prompt.id ? data.prompt : item))
          .filter((item) => !favoriteOnly || item.favorite)
      );
      setSuccess(data.message);
    } catch (favoriteError) {
      setError(favoriteError.message || "Unable to update favorite.");
      await loadPrompts();
    }
  }

  async function handleDelete(prompt) {
    const confirmed = window.confirm(`Delete "${prompt.title}"?`);
    if (!confirmed) {
      return;
    }

    setError("");
    setSuccess("");
    setPrompts((current) => current.filter((item) => item.id !== prompt.id));

    try {
      const data = await deletePrompt(prompt.id);
      setSuccess(data.message || "Prompt deleted.");
    } catch (deleteError) {
      setError(deleteError.message || "Unable to delete prompt.");
      await loadPrompts();
    }
  }

  async function handleCopy(prompt) {
    setError("");
    setSuccess("");

    try {
      await navigator.clipboard.writeText(prompt.content);
      setSuccess("Prompt copied to clipboard.");
    } catch {
      setError("Unable to copy prompt. Please copy it manually.");
    }
  }

  function handleUse(prompt) {
    router.push(`/dashboard/chat?prompt=${encodeURIComponent(prompt.content)}`);
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <DashboardHeader
        eyebrow="Prompt Library"
        title="Saved prompts"
        description="Create, organize, and reuse prompts across your AI workspace."
        action={
          <Button onClick={openCreateModal} className="gap-2">
            <FiPlus />
            New Prompt
          </Button>
        }
      />

      <div className="space-y-3">
        <ErrorMessage message={error} />
        <SuccessMessage message={success} />
      </div>

      <PromptSearch
        search={search}
        favoriteOnly={favoriteOnly}
        onSearchChange={setSearch}
        onFavoriteOnlyChange={setFavoriteOnly}
      />

      <PromptList
        prompts={prompts}
        isLoading={isLoading}
        onCopy={handleCopy}
        onDelete={handleDelete}
        onEdit={openEditModal}
        onToggleFavorite={handleToggleFavorite}
        onUse={handleUse}
      />

      <PromptModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingPrompt ? "Edit Prompt" : "Create Prompt"}
      >
        <PromptForm
          key={editingPrompt?.id || "new-prompt"}
          prompt={editingPrompt}
          isSubmitting={isSubmitting}
          onCancel={closeModal}
          onSubmit={handleSubmit}
        />
      </PromptModal>
    </div>
  );
}
