import {
  errorResponse,
  getApiSession,
  unauthorizedResponse,
} from "@/app/api/_auth";
import { createUserPrompt, getPrompts } from "@/services/promptService";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const session = await getApiSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const { searchParams } = new URL(request.url);
    const result = await getPrompts(session.userId, {
      search: searchParams.get("search") || "",
      favorite: searchParams.get("favorite") === "true",
    });

    return Response.json(result, { status: result.status });
  } catch (error) {
    return errorResponse(error, "Unable to load prompts.");
  }
}

export async function POST(request) {
  const session = await getApiSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const payload = await request.json();
    const result = await createUserPrompt(session.userId, payload);

    return Response.json(result, { status: result.status });
  } catch (error) {
    return errorResponse(error, "Unable to create prompt.");
  }
}
