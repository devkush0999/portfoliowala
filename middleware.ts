import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminCookieName, isAdminToken } from "@/lib/cms/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(adminCookieName())?.value;
  const ok = await isAdminToken(token);

  if (pathname.startsWith("/api/admin") && pathname !== "/api/admin/login") {
    if (!ok) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!ok) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (pathname === "/admin/login" && ok) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/api/admin/:path*"],
};
