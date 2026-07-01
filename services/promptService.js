import {
  countPromptsByUser,
  createPrompt,
  deletePromptByIdForUser,
  findPromptByIdForUser,
  listPromptsByUser,
  updatePromptByIdForUser,
} from "@/repositories/promptRepository";
import { recordActivity } from "@/services/activityService";

const MAX_TITLE_LENGTH = 120;
const MAX_CATEGORY_LENGTH = 80;
const MAX_CONTENT_LENGTH = 12000;

function serializePrompt(prompt) {
  return {
    id: prompt._id.toString(),
    userId: prompt.userId.toString(),
    title: prompt.title,
    content: prompt.content,
    category: prompt.category,
    favorite: prompt.favorite,
    createdAt: prompt.createdAt,
    updatedAt: prompt.updatedAt,
  };
}

function validatePromptPayload(payload, { partial = false } = {}) {
  const title = payload?.title?.trim();
  const content = payload?.content?.trim();
  const category = payload?.category?.trim() || "General";
  const updates = {};

  if (!partial || "title" in (payload || {})) {
    if (!title) {
      return { valid: false, message: "Prompt title is required." };
    }
    if (title.length > MAX_TITLE_LENGTH) {
      return { valid: false, message: "Prompt title is too long." };
    }
    updates.title = title;
  }

  if (!partial || "content" in (payload || {})) {
    if (!content) {
      return { valid: false, message: "Prompt content is required." };
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      return { valid: false, message: "Prompt content is too long." };
    }
    updates.content = content;
  }

  if (!partial || "category" in (payload || {})) {
    if (category.length > MAX_CATEGORY_LENGTH) {
      return { valid: false, message: "Prompt category is too long." };
    }
    updates.category = category;
  }

  if ("favorite" in (payload || {})) {
    updates.favorite = Boolean(payload.favorite);
  }

  return { valid: true, data: updates };
}

export async function getPrompts(userId, filters = {}) {
  const prompts = await listPromptsByUser(userId, {
    search: filters.search,
    favorite: filters.favorite,
  });

  return {
    success: true,
    status: 200,
    prompts: prompts.map(serializePrompt),
  };
}

export async function getPrompt(userId, promptId) {
  const prompt = await findPromptByIdForUser(promptId, userId);

  if (!prompt) {
    return { success: false, status: 404, message: "Prompt was not found." };
  }

  return {
    success: true,
    status: 200,
    prompt: serializePrompt(prompt),
  };
}

export async function createUserPrompt(userId, payload) {
  const validation = validatePromptPayload(payload);

  if (!validation.valid) {
    return { success: false, status: 400, message: validation.message };
  }

  const prompt = await createPrompt({
    userId,
    ...validation.data,
    favorite: Boolean(payload?.favorite),
  });

  await recordActivity({
    userId,
    type: "prompt_created",
    title: "Created Prompt",
    description: `Created "${prompt.title}".`,
    entityId: prompt._id,
    entityType: "Prompt",
  });

  return {
    success: true,
    status: 201,
    message: "Prompt created.",
    prompt: serializePrompt(prompt),
  };
}

export async function updateUserPrompt(userId, promptId, payload) {
  const validation = validatePromptPayload(payload, { partial: true });

  if (!validation.valid) {
    return { success: false, status: 400, message: validation.message };
  }

  const prompt = await updatePromptByIdForUser(
    promptId,
    userId,
    validation.data
  );

  if (!prompt) {
    return { success: false, status: 404, message: "Prompt was not found." };
  }

  await recordActivity({
    userId,
    type: "prompt_updated",
    title: "Updated Prompt",
    description: `Updated "${prompt.title}".`,
    entityId: prompt._id,
    entityType: "Prompt",
  });

  return {
    success: true,
    status: 200,
    message: "Prompt updated.",
    prompt: serializePrompt(prompt),
  };
}

export async function deleteUserPrompt(userId, promptId) {
  const prompt = await deletePromptByIdForUser(promptId, userId);

  if (!prompt) {
    return { success: false, status: 404, message: "Prompt was not found." };
  }

  await recordActivity({
    userId,
    type: "prompt_deleted",
    title: "Deleted Prompt",
    description: `Deleted "${prompt.title}".`,
    entityType: "Prompt",
  });

  return {
    success: true,
    status: 200,
    message: "Prompt deleted.",
    promptId,
  };
}

export async function toggleUserPromptFavorite(userId, promptId) {
  const prompt = await findPromptByIdForUser(promptId, userId);

  if (!prompt) {
    return { success: false, status: 404, message: "Prompt was not found." };
  }

  prompt.favorite = !prompt.favorite;
  await prompt.save();

  await recordActivity({
    userId,
    type: prompt.favorite ? "prompt_favorited" : "prompt_unfavorited",
    title: prompt.favorite ? "Favorited Prompt" : "Unfavorited Prompt",
    description: `${prompt.favorite ? "Favorited" : "Unfavorited"} "${
      prompt.title
    }".`,
    entityId: prompt._id,
    entityType: "Prompt",
  });

  return {
    success: true,
    status: 200,
    message: prompt.favorite ? "Prompt favorited." : "Prompt unfavorited.",
    prompt: serializePrompt(prompt),
  };
}

export async function getPromptCounts(userId) {
  const [savedPrompts, favoritePrompts] = await Promise.all([
    countPromptsByUser(userId),
    countPromptsByUser(userId, { favorite: true }),
  ]);

  return { savedPrompts, favoritePrompts };
}
