import { getChatSession, unauthorizedResponse, errorResponse } from "../_auth";
import { sendChatMessage } from "@/services/chatService";

export async function POST(request) {
  const session = await getChatSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const payload = await request.json();
    const result = await sendChatMessage(session.userId, payload);

    return Response.json(result, { status: result.status });
  } catch (error) {
    return errorResponse(error, "Unable to send message.");
  }
}
