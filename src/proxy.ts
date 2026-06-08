import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value === "true";
  const hasCompletedOnboarding = request.cookies.get("hasCompletedOnboarding")?.value === "true";
  const path = request.nextUrl.pathname;

  const publicPaths = ["/", "/login"];
  const isPublicPath = publicPaths.includes(path);

  // If not authenticated and trying to access protected route -> login
  if (!isAuthenticated && !isPublicPath && !path.startsWith("/_next") && !path.startsWith("/api") && !path.startsWith("/favicon.ico")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If authenticated and trying to access public routes -> dashboard
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If authenticated and onboarding IS complete, don't allow going back to onboarding
  if (isAuthenticated && hasCompletedOnboarding && path === "/onboarding") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
