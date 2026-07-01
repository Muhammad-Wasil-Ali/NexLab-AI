import { NextResponse } from "next/server";

import { requestPasswordRecovery } from "@/services/authService";

export async function POST(request) {
  try {
    const payload = await request.json();
    const result = await requestPasswordRecovery(payload);

    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Unable to process password recovery.",
      },
      { status: 500 }
    );
  }
}
