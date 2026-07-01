async function requestChat(endpoint, options = {}) {
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
    throw new Error(data.message || "Chat request failed.");
  }

  return data;
}

export function sendMessage({ chatId, message, signal } = {}) {
  return requestChat("/api/chat/send", {
    method: "POST",
    body: JSON.stringify({ chatId, message }),
    signal,
  });
}

export function getHistory() {
  return requestChat("/api/chat/history", {
    method: "GET",
  });
}

export function createConversation() {
  return requestChat("/api/chat/history", {
    method: "POST",
    body: JSON.stringify({}),
  });
}

export function getConversation(id) {
  return requestChat(`/api/chat/conversation/${id}`, {
    method: "GET",
  });
}

export function deleteConversation(id) {
  return requestChat(`/api/chat/delete/${id}`, {
    method: "DELETE",
  });
}
