import { getChatSession, unauthorizedResponse, errorResponse } from "../_auth";
import {
  createConversation,
  getChatHistory,
} from "@/services/chatService";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getChatSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const result = await getChatHistory(session.userId);
    return Response.json(result, { status: result.status });
  } catch (error) {
    return errorResponse(error, "Unable to load conversations.");
  }
}

export async function POST() {
  const session = await getChatSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const result = await createConversation(session.userId);
    return Response.json(result, { status: result.status });
  } catch (error) {
    return errorResponse(error, "Unable to create conversation.");
  }
}
