import { countChatsByUser } from "@/repositories/chatRepository";
import { findUserById, updateUserName } from "@/repositories/userRepository";
import { recordActivity } from "@/services/activityService";
import { getPromptCounts } from "@/services/promptService";

function serializeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function validateName(name) {
  const value = name?.trim();

  if (!value) {
    return { valid: false, message: "Name is required." };
  }

  if (value.length < 2 || value.length > 80) {
    return {
      valid: false,
      message: "Name must be between 2 and 80 characters.",
    };
  }

  return { valid: true, value };
}

export async function getUserProfile(userId) {
  const user = await findUserById(userId);

  if (!user) {
    return { success: false, status: 404, message: "User was not found." };
  }

  const [totalChats, promptCounts] = await Promise.all([
    countChatsByUser(userId),
    getPromptCounts(userId),
  ]);

  return {
    success: true,
    status: 200,
    user: serializeUser(user),
    stats: {
      totalChats,
      savedPrompts: promptCounts.savedPrompts,
      favoritePrompts: promptCounts.favoritePrompts,
    },
  };
}

export async function updateProfileName(userId, payload) {
  const validation = validateName(payload?.name);

  if (!validation.valid) {
    return { success: false, status: 400, message: validation.message };
  }

  const user = await updateUserName(userId, validation.value);

  if (!user) {
    return { success: false, status: 404, message: "User was not found." };
  }

  await recordActivity({
    userId,
    type: "profile_updated",
    title: "Updated Profile",
    description: "Updated account profile information.",
  });

  return {
    success: true,
    status: 200,
    message: "Profile updated.",
    user: serializeUser(user),
  };
}
