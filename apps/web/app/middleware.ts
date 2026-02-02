import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Next.js Middleware
 *
 * Protects authenticated routes by checking for session cookies.
 * Redirects unauthenticated users to the login page.
 *
 * Protected Routes:
 * - /dashboard/* - Requires valid session
 *
 * Session Token:
 * - better-auth.session_token - Set by better-auth on successful login
 */

// Routes that require authentication
const protectedRoutes = ["/dashboard"]

// Routes that should redirect to dashboard if already authenticated
const publicRoutes = ["/login", "/signup"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // Check if the path is a public route (login/signup)
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // Get the session token from cookies
  const sessionToken = request.cookies.get("better-auth.session_token")

  // If accessing protected route without session, redirect to login
  if (isProtectedRoute && !sessionToken) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If accessing public route with session, redirect to dashboard
  if (isPublicRoute && sessionToken) {
    const dashboardUrl = new URL("/dashboard", request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  // Allow request to proceed
  return NextResponse.next()
}

/**
 * Matcher Configuration
 *
 * Specifies which routes the middleware should run on.
 * - Include dashboard and subpaths
 * - Include login and signup pages
 * - Exclude static files, API routes, and Next.js internals
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*$).*)",
  ],
}
