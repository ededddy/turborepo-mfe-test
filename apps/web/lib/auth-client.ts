import { nextCookies } from "better-auth/next-js"
import { createAuthClient } from "better-auth/react"

/**
 * Better-Auth client instance for authentication
 *
 * Configured to work with the microfrontend proxy at localhost:3024
 * The proxy forwards /api/* requests to the backend API service (port 3003)
 */
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3024/api/auth",
    plugins: [
        nextCookies()
    ]
})

/**
 * Authentication utility functions
 * These provide type-safe methods for authentication operations
 */
export const { signIn, signUp, signOut, useSession } = authClient

/**
 * Session hook for accessing authentication state in Client Components
 * @returns { data, isPending, error } - Session data and loading state
 *
 * Example usage:
 * ```tsx
 * "use client"
 * import { useSession } from "@/lib/auth-client"
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
