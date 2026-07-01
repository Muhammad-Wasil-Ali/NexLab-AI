import {
  errorResponse,
  getApiSession,
  unauthorizedResponse,
} from "@/app/api/_auth";
import {
  deleteUserPrompt,
  getPrompt,
  updateUserPrompt,
} from "@/services/promptService";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const session = await getApiSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const { id } = await params;
    const result = await getPrompt(session.userId, id);

    return Response.json(result, { status: result.status });
  } catch (error) {
    return errorResponse(error, "Unable to load prompt.");
  }
}

export async function PATCH(request, { params }) {
  const session = await getApiSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const { id } = await params;
    const payload = await request.json();
    const result = await updateUserPrompt(session.userId, id, payload);

    return Response.json(result, { status: result.status });
  } catch (error) {
    return errorResponse(error, "Unable to update prompt.");
  }
}

export async function DELETE(_request, { params }) {
  const session = await getApiSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const { id } = await params;
    const result = await deleteUserPrompt(session.userId, id);

    return Response.json(result, { status: result.status });
  } catch (error) {
    return errorResponse(error, "Unable to delete prompt.");
  }
}
