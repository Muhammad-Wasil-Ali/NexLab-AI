import {
  errorResponse,
  getApiSession,
  unauthorizedResponse,
} from "@/app/api/_auth";
import { changeUserPassword } from "@/services/authService";

export async function PATCH(request) {
  const session = await getApiSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const payload = await request.json();
    const result = await changeUserPassword(session.userId, payload);

    return Response.json(result, { status: result.status });
  } catch (error) {
    return errorResponse(error, "Unable to update password.");
  }
}
