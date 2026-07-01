import { GoogleGenerativeAI } from "@google/generative-ai";

import {
  countChatsByUser,
  countMessagesByChat,
  createChat,
  createMessage,
  deleteChatByIdForUser,
  findChatByIdForUser,
  listChatsByUser,
  listMessagesByChat,
  touchChat,
  updateChatTitle,
} from "@/repositories/chatRepository";
import { recordActivity } from "@/services/activityService";

const DEFAULT_MODEL = "gemini-3.5-flash";
const FALLBACK_MODEL = "gemini-2.5-flash";
const MAX_MESSAGE_LENGTH = 12000;

function serializeChat(chat) {
  return {
    id: chat._id.toString(),
    userId: chat.userId.toString(),
    title: chat.title,
    createdAt: chat.createdAt,
    updatedAt: chat.updatedAt,
  };
}

function serializeMessage(message) {
  return {
    id: message._id.toString(),
    chatId: message.chatId.toString(),
    role: message.role,
    content: message.content,
    createdAt: message.createdAt,
  };
}

function makeTitle(message) {
  const normalized = message.replace(/\s+/g, " ").trim();
  if (!normalized) {
    return "New Chat";
  }

  return normalized.length > 58 ? `${normalized.slice(0, 58)}...` : normalized;
}

function getGeminiClient(modelName) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Gemini API key is not configured.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  return genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 4096,
    },
  });
}

async function generateGeminiResponse(messages) {
  const contents = messages.map((message) => ({
    role: message.role,
    parts: [{ text: message.content }],
  }));

  const configuredModel = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const modelNames =
    configuredModel === FALLBACK_MODEL
      ? [configuredModel]
      : [configuredModel, FALLBACK_MODEL];

  let lastError;

  for (const modelName of modelNames) {
    try {
      const model = getGeminiClient(modelName);
      const result = await model.generateContent({
        contents,
        systemInstruction:
          "You are NexLab AI, a concise, helpful assistant. Use markdown when it improves readability.",
      });
      const text = result.response.text();

      if (!text?.trim()) {
        throw new Error("Gemini returned an empty response.");
      }

      return text.trim();
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(lastError?.message || "Gemini request failed.");
}

export async function createConversation(userId) {
  const chat = await createChat({ userId, title: "New Chat" });

  await recordActivity({
    userId,
    type: "chat_started",
    title: "Started Chat",
    description: "Started a new AI chat.",
    entityId: chat._id,
    entityType: "Chat",
  });

  return {
    success: true,
    status: 201,
    message: "Conversation created.",
    chat: serializeChat(chat),
    messages: [],
  };
}

export async function getChatHistory(userId, options = {}) {
  const chats = await listChatsByUser(userId, options);

  return {
    success: true,
    status: 200,
    chats: chats.map(serializeChat),
  };
}

export async function getConversation(userId, chatId) {
  const chat = await findChatByIdForUser(chatId, userId);

  if (!chat) {
    return {
      success: false,
      status: 404,
      message: "Conversation was not found.",
    };
  }

  const messages = await listMessagesByChat(chatId);

  return {
    success: true,
    status: 200,
    chat: serializeChat(chat),
    messages: messages.map(serializeMessage),
  };
}

export async function deleteConversation(userId, chatId) {
  const chat = await deleteChatByIdForUser(chatId, userId);

  if (!chat) {
    return {
      success: false,
      status: 404,
      message: "Conversation was not found.",
    };
  }

  await recordActivity({
    userId,
    type: "chat_deleted",
    title: "Deleted Chat",
    description: `Deleted "${chat.title}".`,
    entityType: "Chat",
  });

  return {
    success: true,
    status: 200,
    message: "Conversation deleted.",
    chatId,
  };
}

export async function sendChatMessage(userId, payload) {
  const content = payload?.message?.trim();
  const chatId = payload?.chatId;

  if (!content) {
    return { success: false, status: 400, message: "Message cannot be empty." };
  }

  if (content.length > MAX_MESSAGE_LENGTH) {
    return {
      success: false,
      status: 400,
      message: "Message is too long. Please shorten it and try again.",
    };
  }

  let chat = chatId ? await findChatByIdForUser(chatId, userId) : null;
  const startedNewChat = !chat;

  if (chatId && !chat) {
    return {
      success: false,
      status: 404,
      message: "Conversation was not found.",
    };
  }

  if (!chat) {
    chat = await createChat({ userId, title: makeTitle(content) });
  }

  const existingMessageCount = await countMessagesByChat(chat._id);
  const userMessage = await createMessage({
    chatId: chat._id,
    role: "user",
    content,
  });

  if (existingMessageCount === 0) {
    chat = await updateChatTitle(chat._id, userId, makeTitle(content));
    if (startedNewChat) {
      await recordActivity({
        userId,
        type: "chat_started",
        title: "Started Chat",
        description: `Started "${chat.title}".`,
        entityId: chat._id,
        entityType: "Chat",
      });
    }
  } else {
    chat = await touchChat(chat._id, userId);
  }

  const conversationMessages = await listMessagesByChat(chat._id);
  const aiContent = await generateGeminiResponse(
    conversationMessages.map(serializeMessage)
  );

  const aiMessage = await createMessage({
    chatId: chat._id,
    role: "model",
    content: aiContent,
  });
  chat = await touchChat(chat._id, userId);

  return {
    success: true,
    status: 200,
    message: "Message sent.",
    chat: serializeChat(chat),
    userMessage: serializeMessage(userMessage),
    aiMessage: serializeMessage(aiMessage),
  };
}

export async function getDashboardChatSummary(userId) {
  const [totalChats, recentChats] = await Promise.all([
    countChatsByUser(userId),
    listChatsByUser(userId, { limit: 5 }),
  ]);

  return {
    totalChats,
    recentChats: recentChats.map(serializeChat),
  };
}
