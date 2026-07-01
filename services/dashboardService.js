import {
  countChatsByUser,
  countMessagesByUser,
  listChatsByUser,
} from "@/repositories/chatRepository";
import { listActivitiesByUser } from "@/repositories/activityRepository";
import { getPromptCounts } from "@/services/promptService";

function serializeChat(chat) {
  return {
    id: chat._id.toString(),
    userId: chat.userId.toString(),
    title: chat.title,
    createdAt: chat.createdAt,
    updatedAt: chat.updatedAt,
  };
}

function serializeActivity(activity) {
  return {
    id: activity._id.toString(),
    userId: activity.userId.toString(),
    type: activity.type,
    title: activity.title,
    description: activity.description,
    entityId: activity.entityId ? activity.entityId.toString() : null,
    entityType: activity.entityType || null,
    createdAt: activity.createdAt,
  };
}

export async function getDashboardSummary(userId) {
  const [
    totalChats,
    totalMessages,
    promptCounts,
    recentChats,
    recentActivity,
  ] = await Promise.all([
    countChatsByUser(userId),
    countMessagesByUser(userId),
    getPromptCounts(userId),
    listChatsByUser(userId, { limit: 5 }),
    listActivitiesByUser(userId, { limit: 5 }),
  ]);

  return {
    success: true,
    status: 200,
    stats: {
      totalChats,
      totalMessages,
      savedPrompts: promptCounts.savedPrompts,
      favoritePrompts: promptCounts.favoritePrompts,
    },
    recentChats: recentChats.map(serializeChat),
    recentActivity: recentActivity.map(serializeActivity),
  };
}

export async function getNavigationCounts(userId) {
  const [totalChats, promptCounts] = await Promise.all([
    countChatsByUser(userId),
    getPromptCounts(userId),
  ]);

  return {
    chats: totalChats,
    prompts: promptCounts.savedPrompts,
  };
}
