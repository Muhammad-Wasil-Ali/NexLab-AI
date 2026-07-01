import { NextResponse } from "next/server";

import { signinUser } from "@/services/authService";

const COOKIE_NAME = "auth_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export async function POST(request) {
  try {
    const payload = await request.json();
    const result = await signinUser(payload);

    const response = NextResponse.json(
      {
        success: result.success,
        message: result.message,
        user: result.user,
      },
      { status: result.status }
    );

    if (result.success) {
      response.cookies.set(COOKIE_NAME, result.token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: COOKIE_MAX_AGE,
      });
    }

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Unable to sign in.",
      },
      { status: 500 }
    );
  }
}
