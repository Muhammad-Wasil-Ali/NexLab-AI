import bcrypt from "bcryptjs";

import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserPasswordByEmail,
  updateUserPasswordById,
} from "@/repositories/authRepository";
import {
  validateChangePasswordPayload,
  validateForgotPasswordPayload,
  validateResetPasswordPayload,
  validateSigninPayload,
  validateSignupPayload,
} from "@/utils/auth/authValidation";
import generateToken from "@/utils/jwt/generateToken";

const SALT_ROUNDS = 12;

export async function signupUser(payload) {
  const validation = validateSignupPayload(payload);

  if (!validation.valid) {
    return { success: false, status: 400, message: validation.message };
  }

  const existingUser = await findUserByEmail(validation.data.email);

  if (existingUser) {
    return {
      success: false,
      status: 409,
      message: "An account with this email already exists.",
    };
  }

  const hashedPassword = await bcrypt.hash(validation.data.password, SALT_ROUNDS);
  const user = await createUser({
    name: validation.data.name,
    email: validation.data.email,
    password: hashedPassword,
  });

  return {
    success: true,
    status: 201,
    message: "Account created successfully.",
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
  };
}

export async function signinUser(payload) {
  const validation = validateSigninPayload(payload);

  if (!validation.valid) {
    return { success: false, status: 400, message: validation.message };
  }

  const user = await findUserByEmail(validation.data.email, {
    includePassword: true,
  });

  if (!user) {
    return { success: false, status: 401, message: "Invalid email or password." };
  }

  const isValidPassword = await bcrypt.compare(
    validation.data.password,
    user.password
  );

  if (!isValidPassword) {
    return { success: false, status: 401, message: "Invalid email or password." };
  }

  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    name: user.name,
  });

  return {
    success: true,
    status: 200,
    message: "Signed in successfully.",
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
  };
}

export async function requestPasswordRecovery(payload) {
  const validation = validateForgotPasswordPayload(payload);

  if (!validation.valid) {
    return { success: false, status: 400, message: validation.message };
  }

  const user = await findUserByEmail(validation.data.email);

  if (!user) {
    return {
      success: false,
      status: 404,
      message: "No account was found with this email address.",
    };
  }

  return {
    success: true,
    status: 200,
    message: "Account found. Continue to reset your password.",
    email: user.email,
  };
}

export async function resetPassword(payload) {
  const validation = validateResetPasswordPayload(payload);

  if (!validation.valid) {
    return { success: false, status: 400, message: validation.message };
  }

  const user = await findUserByEmail(validation.data.email);

  if (!user) {
    return {
      success: false,
      status: 404,
      message: "No account was found with this email address.",
    };
  }

  const hashedPassword = await bcrypt.hash(validation.data.password, SALT_ROUNDS);
  await updateUserPasswordByEmail(validation.data.email, hashedPassword);

  return {
    success: true,
    status: 200,
    message: "Password updated. You can sign in with your new password.",
  };
}

export async function changeUserPassword(userId, payload) {
  const validation = validateChangePasswordPayload(payload);

  if (!validation.valid) {
    return { success: false, status: 400, message: validation.message };
  }

  const user = await findUserById(userId, { includePassword: true });

  if (!user) {
    return { success: false, status: 404, message: "User was not found." };
  }

  const isValidPassword = await bcrypt.compare(
    validation.data.currentPassword,
    user.password
  );

  if (!isValidPassword) {
    return {
      success: false,
      status: 401,
      message: "Current password is incorrect.",
    };
  }

  const hashedPassword = await bcrypt.hash(validation.data.password, SALT_ROUNDS);
  await updateUserPasswordById(userId, hashedPassword);

  return {
    success: true,
    status: 200,
    message: "Password updated successfully.",
  };
}
