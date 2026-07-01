import {
  errorResponse,
  getApiSession,
  unauthorizedResponse,
} from "@/app/api/_auth";
import { toggleUserPromptFavorite } from "@/services/promptService";

export async function PATCH(_request, { params }) {
  const session = await getApiSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const { id } = await params;
    const result = await toggleUserPromptFavorite(session.userId, id);

    return Response.json(result, { status: result.status });
  } catch (error) {
    return errorResponse(error, "Unable to update favorite.");
  }
}
