/**
 * middleware.js
 *
 * Next.js Edge Middleware — runs before every matched request.
 * Protects /dashboard: if no auth_session cookie → redirect to /login.
 */

import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const sessionCookie = request.cookies.get("auth_session");
  const isLoggedIn    = Boolean(sessionCookie?.value);

  // ── Guard /dashboard (and all sub-paths) ──────────────────
  if (pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ── Redirect logged-in users away from auth pages ─────────
  if ((pathname === "/login" || pathname === "/signup") && isLoggedIn) {
    const dashUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
