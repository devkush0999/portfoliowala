import { NextResponse } from "next/server";
import { adminCookieName, adminToken } from "@/lib/cms/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  if (!process.env.ADMIN_PASSWORD || body.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await adminToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
