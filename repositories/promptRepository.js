import mongoose from "mongoose";

import connectMongoDB from "@/lib/mongodb";
import Prompt from "@/models/Prompt";

export function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function createPrompt(data) {
  await connectMongoDB();
  return Prompt.create(data);
}

export async function findPromptByIdForUser(promptId, userId) {
  await connectMongoDB();

  if (!isValidObjectId(promptId)) {
    return null;
  }

  return Prompt.findOne({ _id: promptId, userId });
}

export async function listPromptsByUser(
  userId,
  { search, favorite, limit } = {}
) {
  await connectMongoDB();

  const filters = { userId };
  if (favorite === true) {
    filters.favorite = true;
  }
  if (search) {
    const expression = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filters.$or = [
      { title: expression },
      { content: expression },
      { category: expression },
    ];
  }

  const query = Prompt.find(filters).sort({ updatedAt: -1 }).lean();
  if (limit) {
    query.limit(limit);
  }

  return query;
}

export async function updatePromptByIdForUser(promptId, userId, updates) {
  await connectMongoDB();

  if (!isValidObjectId(promptId)) {
    return null;
  }

  return Prompt.findOneAndUpdate(
    { _id: promptId, userId },
    { $set: updates },
    { new: true }
  );
}

export async function deletePromptByIdForUser(promptId, userId) {
  await connectMongoDB();

  if (!isValidObjectId(promptId)) {
    return null;
  }

  return Prompt.findOneAndDelete({ _id: promptId, userId });
}

export async function countPromptsByUser(userId, { favorite } = {}) {
  await connectMongoDB();

  const filters = { userId };
  if (favorite === true) {
    filters.favorite = true;
  }

  return Prompt.countDocuments(filters);
}
