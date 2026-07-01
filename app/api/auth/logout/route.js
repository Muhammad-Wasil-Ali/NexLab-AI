import { NextResponse } from "next/server";

const COOKIE_NAME = "auth_token";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Signed out successfully.",
    redirectTo: "/sign-in",
  });

  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
