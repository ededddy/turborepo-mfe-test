import { createAuthClient } from "better-auth/react"

/**
 * Better-Auth client instance for authentication
 *
 * Configured to work with the microfrontend proxy at localhost:3024
 * The proxy forwards /api/* requests to the backend API service (port 3003)
 *
 * NOTE: No nextCookies() plugin needed - Vite is client-side only
 * The browser handles cookies automatically via the proxy
 */
export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_AUTH_URL || "http://localhost:3024/api/auth"
    // NO nextCookies() plugin - Vite is client-side only
})

/**
 * Authentication utility functions
 * These provide type-safe methods for authentication operations
 */
export const { signIn, signUp, signOut, useSession } = authClient

/**
 * Session hook for accessing authentication state
 * @returns { data, isPending, error } - Session data and loading state
 *
 * Example usage:
 * ```tsx
 * import { useSession } from "../lib/auth-client"
 *
 * export function UserProfile() {
 *   const { data: session, isPending } = useSession()
 *
 *   if (isPending) return <div>Loading...</div>
 *   if (!session) return <div>Not authenticated</div>
 *
 *   return <div>Welcome, {session.user.name}</div>
 * }
 * ```
 */
