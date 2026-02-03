import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Dashboard.module.css"
//import { useSession, signOut } from "../lib/auth-client"
import { useSession, signOut } from "@repo/auth/client/react"

/**
 * Dashboard Page - React Router Component
 *
 * Protected route that displays user information and session data.
 * Verifies authentication client-side using ProtectedRoute wrapper.
 *
 * Security:
 * - ProtectedRoute wrapper checks for session token before rendering
 * - Client-side verification prevents UI flashing
 * - Redirects to /login if no valid session
 *
 * Adapted from Next.js:
 * - Removed "use client" directive (not needed in Vite)
 * - useRouter → useNavigate
 * - router.push() → navigate("/", { replace: true })
 * - GradientBackground and AuthHeader moved to RootLayout
 */
export function Dashboard() {
    const navigate = useNavigate()
    const proxyUrl = import.meta.env.VITE_PROXY_URL || "http://localhost:3024"

    const {
        data: session,
        isPending //loading state
    } = useSession()

    const handleLogout = async () => {
        try {
            await signOut()
            // Navigate to Next.js web app root via proxy
            window.location.replace(`${proxyUrl}/`)
        } catch (error) {
            console.error("Logout error:", error)
            // Still navigate even if signOut fails
            window.location.replace(`${proxyUrl}/`)
        }
    }

    useEffect(() => {
        const checkSession = () => {

            if (!session) {
                navigate("/login", { replace: true })
                return
            }

        }

        checkSession()
    }, [navigate, session])



    if (isPending) {
        return (
            <main className={styles.dashboard}>
                <div className="container">
                    <div className={styles.dashboardContent}>
                        <p>Loading...</p>
                    </div>
                </div>
            </main>
        )
    }

    if (!session) {
        return null // Will redirect
    }

    return (
        <main className={styles.dashboard}>
            <div className="container">
                <div className={styles.dashboardContent}>
                    <div className={styles.welcomeSection}>
                        <div className={styles.badge}>Authenticated</div>
                        <h1 className={styles.dashboardTitle}>Welcome to Your Dashboard</h1>
                        <p className={styles.dashboardSubtitle}>
                            You have successfully authenticated and accessed a protected route.
                        </p>
                    </div>

                    <div className={styles.infoGrid}>
                        {/* Session Info Card */}
                        <div className={styles.infoCard}>
                            <h2 className={styles.cardTitle}>Session Information</h2>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Status:</span>
                                <span className={`${styles.infoValue} ${styles.infoValueSuccess}`}>Active</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Token:</span>
                                <span className={`${styles.infoValue} ${styles.infoValueMono}`}>
                                    {session.session.token.substring(0, 20)}...
                                </span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Protected:</span>
                                <span className={`${styles.infoValue} ${styles.infoValueSuccess}`}>Yes</span>
                            </div>
                        </div>

                        {/* Features Card */}
                        <div className={styles.infoCard}>
                            <h2 className={styles.cardTitle}>Available Features</h2>
                            <ul className={styles.featureList}>
                                <li>✓ Microfrontend management</li>
                                <li>✓ Deployment monitoring</li>
                                <li>✓ Team collaboration</li>
                                <li>✓ Performance analytics</li>
                                <li>✓ API key management</li>
                            </ul>
                        </div>

                        {/* Next Steps Card */}
                        <div className={styles.infoCard}>
                            <h2 className={styles.cardTitle}>Next Steps</h2>
                            <div className={styles.actionList}>
                                <a href="/docs" className={styles.actionLink}>
                                    <span>→ Read the documentation</span>
                                </a>
                                <a href="/settings" className={styles.actionLink}>
                                    <span>→ Configure your profile</span>
                                </a>
                                <a href="/api/keys" className={styles.actionLink}>
                                    <span>→ Generate API keys</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Logout Section */}
                    <div className={styles.logoutSection}>
                        <p className={styles.logoutText}>
                            Ready to leave? Click the button below to securely log out.
                        </p>
                        <button
                            onClick={handleLogout}
                            className={styles.logoutButton}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
