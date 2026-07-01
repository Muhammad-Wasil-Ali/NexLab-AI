import {
  errorResponse,
  getApiSession,
  unauthorizedResponse,
} from "@/app/api/_auth";
import { getDashboardSummary } from "@/services/dashboardService";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getApiSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const result = await getDashboardSummary(session.userId);

    return Response.json(result, { status: result.status });
  } catch (error) {
    return errorResponse(error, "Unable to load dashboard summary.");
  }
}
