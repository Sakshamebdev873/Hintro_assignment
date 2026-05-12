import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.HINTRO_API_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:3001";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.toString();
    const targetUrl = query
      ? `${API_BASE_URL}/api/call-sessions?${query}`
      : `${API_BASE_URL}/api/call-sessions`;

    const response = await fetch(targetUrl, {
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
    return NextResponse.json({ error: "Upstream call history fetch failed" }, { status: 502 });
  }
}
