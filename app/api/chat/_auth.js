import { cookies } from "next/headers";

import verifyToken from "@/utils/jwt/verifyToken";

const COOKIE_NAME = "auth_token";

export async function getChatSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  return token ? verifyToken(token) : null;
}

export function unauthorizedResponse() {
  return Response.json(
    { success: false, message: "Unauthorized access." },
    { status: 401 }
  );
}

export function errorResponse(error, fallback = "Chat request failed.") {
  return Response.json(
    {
      success: false,
      message: error?.message || fallback,
    },
    { status: 500 }
  );
}
