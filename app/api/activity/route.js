import {
  errorResponse,
  getApiSession,
  unauthorizedResponse,
} from "@/app/api/_auth";
import { getUserActivities } from "@/services/activityService";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getApiSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const result = await getUserActivities(session.userId);

    return Response.json(result, { status: result.status });
  } catch (error) {
    return errorResponse(error, "Unable to load activity.");
  }
}
