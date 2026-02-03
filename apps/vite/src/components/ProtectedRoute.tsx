import { useEffect } from "react"
// import { useSession } from "../lib/auth-client"
import { useSession } from "@repo/auth/client/react"

interface ProtectedRouteProps {
    children: React.ReactNode
}

/**
 * ProtectedRoute Component
 *
 * Client-side route protection wrapper for React Router v7.
 * Checks authentication status and redirects to login if not authenticated.
 *
 * Unlike Next.js middleware (server-side), this runs client-side.
 * This is safe because the better-auth API still validates sessions server-side.
 *
 * Usage:
 * ```tsx
 * <Route
 *   path="/admin/dashboard"
 *   element={
 *     <ProtectedRoute>
 *       <Dashboard />
 *     </ProtectedRoute>
 *   }
 * />
 * ```
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { data: session, isPending } = useSession()
    const proxyUrl = import.meta.env.VITE_PROXY_URL || "http://localhost:3024"

    useEffect(() => {
        if (!isPending && !session) {
            // Redirect to Next.js web app login page via proxy
            window.location.replace(`${proxyUrl}/login`)
        }
    }, [session, isPending, proxyUrl])

    if (isPending) {
        return (
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "var(--color-bg, #0a0a0a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "var(--space-lg, 2rem)",
                zIndex: 9999
            }}>
                <div style={{
                    width: "48px",
                    height: "48px",
                    border: "3px solid var(--color-border, #262626)",
                    borderTopColor: "var(--color-primary, #3b82f6)",
                    borderRadius: "0",
                    animation: "spin 0.8s linear infinite"
                }} />
                <p style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.875rem",
                    color: "var(--color-muted, #737373)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    margin: 0
                }}>
                    Loading...
                </p>
                <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        )
    }

    if (!session) {
        return null // Will redirect via useEffect
    }

    return <>{children}</>
}
