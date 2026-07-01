async function requestPrompt(endpoint, options = {}) {
  const response = await fetch(endpoint, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({
    success: false,
    message: "Unexpected server response.",
  }));

  if (!response.ok) {
    throw new Error(data.message || "Prompt request failed.");
  }

  return data;
}

export function getPrompts({ search = "", favorite = false } = {}) {
  const params = new URLSearchParams();

  if (search) {
    params.set("search", search);
  }
  if (favorite) {
    params.set("favorite", "true");
  }

  const query = params.toString();
  return requestPrompt(`/api/prompts${query ? `?${query}` : ""}`);
}

export function createPrompt(payload) {
  return requestPrompt("/api/prompts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updatePrompt(id, payload) {
  return requestPrompt(`/api/prompts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deletePrompt(id) {
  return requestPrompt(`/api/prompts/${id}`, {
    method: "DELETE",
  });
}

export function togglePromptFavorite(id) {
  return requestPrompt(`/api/prompts/${id}/favorite`, {
    method: "PATCH",
  });
}
