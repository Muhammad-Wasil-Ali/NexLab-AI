import { getChatSession, unauthorizedResponse, errorResponse } from "../../_auth";
import { deleteConversation } from "@/services/chatService";

export async function DELETE(_request, { params }) {
  const session = await getChatSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const { id } = await params;
    const result = await deleteConversation(session.userId, id);

    return Response.json(result, { status: result.status });
  } catch (error) {
    return errorResponse(error, "Unable to delete conversation.");
  }
}
