const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function validateSignupPayload(payload = {}) {
  const name = String(payload.name || "").trim();
  const email = normalizeEmail(payload.email);
  const password = String(payload.password || "");
  const confirmPassword = String(payload.confirmPassword || "");

  if (!name) {
    return { valid: false, message: "Name is required." };
  }

  if (name.length < 2) {
    return { valid: false, message: "Name must be at least 2 characters." };
  }

  if (!email || !EMAIL_PATTERN.test(email)) {
    return { valid: false, message: "Please enter a valid email address." };
  }

  if (!password) {
    return { valid: false, message: "Password is required." };
  }

  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters." };
  }

  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return {
      valid: false,
      message: "Password must include at least one letter and one number.",
    };
  }

  if (password !== confirmPassword) {
    return { valid: false, message: "Passwords do not match." };
  }

  return {
    valid: true,
    data: { name, email, password },
  };
}

export function validateSigninPayload(payload = {}) {
  const email = normalizeEmail(payload.email);
  const password = String(payload.password || "");

  if (!email || !EMAIL_PATTERN.test(email)) {
    return { valid: false, message: "Please enter a valid email address." };
  }

  if (!password) {
    return { valid: false, message: "Password is required." };
  }

  return {
    valid: true,
    data: { email, password },
  };
}

export function validateForgotPasswordPayload(payload = {}) {
  const email = normalizeEmail(payload.email);

  if (!email || !EMAIL_PATTERN.test(email)) {
    return { valid: false, message: "Please enter a valid email address." };
  }

  return {
    valid: true,
    data: { email },
  };
}

function validatePasswordPair(password, confirmPassword) {
  if (!password) {
    return { valid: false, message: "Password is required." };
  }

  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters." };
  }

  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return {
      valid: false,
      message: "Password must include at least one letter and one number.",
    };
  }

  if (password !== confirmPassword) {
    return { valid: false, message: "Passwords do not match." };
  }

  return { valid: true };
}

export function validateResetPasswordPayload(payload = {}) {
  const email = normalizeEmail(payload.email);
  const password = String(payload.password || "");
  const confirmPassword = String(payload.confirmPassword || "");

  if (!email || !EMAIL_PATTERN.test(email)) {
    return { valid: false, message: "Please enter a valid email address." };
  }

  const passwordValidation = validatePasswordPair(password, confirmPassword);
  if (!passwordValidation.valid) {
    return passwordValidation;
  }

  return {
    valid: true,
    data: { email, password },
  };
}

export function validateChangePasswordPayload(payload = {}) {
  const currentPassword = String(payload.currentPassword || "");
  const password = String(payload.password || "");
  const confirmPassword = String(payload.confirmPassword || "");

  if (!currentPassword) {
    return { valid: false, message: "Current password is required." };
  }

  const passwordValidation = validatePasswordPair(password, confirmPassword);
  if (!passwordValidation.valid) {
    return passwordValidation;
  }

  if (currentPassword === password) {
    return {
      valid: false,
      message: "New password must be different from the current password.",
    };
  }

  return {
    valid: true,
    data: { currentPassword, password },
  };
}
