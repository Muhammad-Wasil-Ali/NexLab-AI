async function requestAuth(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload || {}),
  });

  const data = await response.json().catch(() => ({
    success: false,
    message: "Unexpected server response.",
  }));

  if (!response.ok) {
    throw new Error(data.message || "Authentication request failed.");
  }

  return data;
}

export function signup(payload) {
  return requestAuth("/api/auth/signup", payload);
}

export function signin(payload) {
  return requestAuth("/api/auth/signin", payload);
}

export function forgotPassword(payload) {
  return requestAuth("/api/auth/forgot-password", payload);
}

export function resetPassword(payload) {
  return requestAuth("/api/auth/reset-password", payload);
}

export function logout() {
  return requestAuth("/api/auth/logout");
}
