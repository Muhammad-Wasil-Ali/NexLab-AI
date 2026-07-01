import mongoose from "mongoose";

import connectMongoDB from "@/lib/mongodb";
import Chat from "@/models/Chat";
import Message from "@/models/Message";

export function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function createChat({ userId, title = "New Chat" }) {
  await connectMongoDB();
  return Chat.create({ userId, title });
}

export async function findChatByIdForUser(chatId, userId) {
  await connectMongoDB();

  if (!isValidObjectId(chatId)) {
    return null;
  }

  return Chat.findOne({ _id: chatId, userId });
}

export async function listChatsByUser(userId, { limit } = {}) {
  await connectMongoDB();

  const query = Chat.find({ userId }).sort({ updatedAt: -1 }).lean();
  if (limit) {
    query.limit(limit);
  }

  return query;
}

export async function countChatsByUser(userId) {
  await connectMongoDB();
  return Chat.countDocuments({ userId });
}

export async function updateChatTitle(chatId, userId, title) {
  await connectMongoDB();

  return Chat.findOneAndUpdate(
    { _id: chatId, userId },
    { $set: { title: title.trim() } },
    { new: true }
  );
}

export async function touchChat(chatId, userId) {
  await connectMongoDB();

  return Chat.findOneAndUpdate(
    { _id: chatId, userId },
    { $set: { updatedAt: new Date() } },
    { new: true }
  );
}

export async function deleteChatByIdForUser(chatId, userId) {
  await connectMongoDB();

  if (!isValidObjectId(chatId)) {
    return null;
  }

  const chat = await Chat.findOneAndDelete({ _id: chatId, userId });

  if (chat) {
    await Message.deleteMany({ chatId });
  }

  return chat;
}

export async function createMessage({ chatId, role, content }) {
  await connectMongoDB();
  return Message.create({ chatId, role, content });
}

export async function listMessagesByChat(chatId) {
  await connectMongoDB();

  if (!isValidObjectId(chatId)) {
    return [];
  }

  return Message.find({ chatId }).sort({ createdAt: 1 }).lean();
}

export async function countMessagesByChat(chatId) {
  await connectMongoDB();
  return Message.countDocuments({ chatId });
}

export async function countMessagesByUser(userId) {
  await connectMongoDB();

  const chats = await Chat.find({ userId }).select("_id").lean();
  const chatIds = chats.map((chat) => chat._id);

  if (!chatIds.length) {
    return 0;
  }

  return Message.countDocuments({ chatId: { $in: chatIds } });
}
