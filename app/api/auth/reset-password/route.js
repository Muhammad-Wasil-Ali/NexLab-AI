import { NextResponse } from "next/server";

import { resetPassword } from "@/services/authService";

export async function POST(request) {
  try {
    const payload = await request.json();
    const result = await resetPassword(payload);

    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Unable to reset password.",
      },
      { status: 500 }
    );
  }
}
