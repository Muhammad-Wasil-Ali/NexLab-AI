async function requestProfile(endpoint, options = {}) {
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
    throw new Error(data.message || "Profile request failed.");
  }

  return data;
}

export function updateProfile(payload) {
  return requestProfile("/api/profile", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function updatePassword(payload) {
  return requestProfile("/api/profile/password", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
