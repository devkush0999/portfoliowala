import { NextResponse } from "next/server";
import { adminCookieName } from "@/lib/cms/auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName(), "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return response;
}
