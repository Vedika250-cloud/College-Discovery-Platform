import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
 const isAuthenticated = request.cookies.get("isAuthenticated")?.value === "true";
 const hasCompletedOnboarding = request.cookies.get("hasCompletedOnboarding")?.value === "true";
 const path = request.nextUrl.pathname;

 const publicPaths = ["/", "/login"];
 const isPublicPath = publicPaths.includes(path);

 // If not authenticated and trying to access protected route -> login
 if (!isAuthenticated && !isPublicPath && !path.startsWith("/_next") && !path.startsWith("/api") && !path.startsWith("/favicon.ico")) {
 return NextResponse.redirect(new URL("/login", request.url));
 }

 // If authenticated but onboarding is incomplete, and trying to access any page other than /onboarding
 if (isAuthenticated && !hasCompletedOnboarding && path !== "/onboarding" && !path.startsWith("/_next") && !path.startsWith("/api")) {
 return NextResponse.redirect(new URL("/onboarding", request.url));
 }

 // If authenticated and onboarding IS complete
 if (isAuthenticated && hasCompletedOnboarding) {
 if (isPublicPath || path === "/onboarding") {
 return NextResponse.redirect(new URL("/dashboard", request.url));
 }
 }

 return NextResponse.next();
}

export const config = {
 matcher: [
 "/((?!_next/static|_next/image|favicon.ico).*)",
 ],
};
