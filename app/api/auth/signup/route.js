import { NextResponse } from "next/server";

import { signupUser } from "@/services/authService";

export async function POST(request) {
  try {
    const payload = await request.json();
    const result = await signupUser(payload);

    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Unable to create account.",
      },
      { status: 500 }
    );
  }
}
