import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.HINTRO_API_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:3001";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/dashboard`, {
      headers: {
        "x-user-id": request.headers.get("x-user-id") ?? "u2",
      },
      cache: "no-store",
    });

    const data = await response.text();
    return new NextResponse(data, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json({ error: "Upstream dashboard fetch failed" }, { status: 502 });
  }
}
