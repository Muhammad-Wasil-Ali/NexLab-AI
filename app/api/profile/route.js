import { NextResponse } from "next/server";

import {
  errorResponse,
  getApiSession,
  unauthorizedResponse,
} from "@/app/api/_auth";
import { getUserProfile, updateProfileName } from "@/services/userService";
import generateToken from "@/utils/jwt/generateToken";

const COOKIE_NAME = "auth_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getApiSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const result = await getUserProfile(session.userId);

    return Response.json(result, { status: result.status });
  } catch (error) {
    return errorResponse(error, "Unable to load profile.");
  }
}

export async function PATCH(request) {
  const session = await getApiSession();

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const payload = await request.json();
    const result = await updateProfileName(session.userId, payload);
    const response = NextResponse.json(result, { status: result.status });

    if (result.success) {
      const token = generateToken({
        userId: result.user.id,
        email: result.user.email,
        name: result.user.name,
      });

      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: COOKIE_MAX_AGE,
      });
    }

    return response;
  } catch (error) {
    return errorResponse(error, "Unable to update profile.");
  }
}
