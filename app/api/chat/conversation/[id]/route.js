import { getChatSession, unauthorizedResponse, errorResponse } from "../../_auth";
import { getConversation } from "@/services/chatService";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const session = await getChatSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const { id } = await params;
    const result = await getConversation(session.userId, id);

    return Response.json(result, { status: result.status });
  } catch (error) {
    return errorResponse(error, "Unable to load conversation.");
  }
}
