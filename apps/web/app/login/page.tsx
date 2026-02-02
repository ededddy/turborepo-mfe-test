import type { Metadata } from "next"
import { GradientBackground } from "../components/GradientBackground"
import { AuthHeader } from "../components/AuthHeader"
import { LoginForm } from "./login-form"
import styles from "../styles/auth.module.css"

/**
 * Login Page - Server Component
 *
 * Wrapper component for the login functionality.
 * Provides SEO metadata and renders the LoginForm Client Component.
 *
 * Note: Server-side session checking can be added here to redirect
 * already-authenticated users to the dashboard.
 */
export default function LoginPage() {
    return (
        <>
            <GradientBackground />
            <AuthHeader />

            <main className={styles.authPage}>
                <LoginForm />
            </main>
        </>
    )
}


export const metadata: Metadata = {
    title: "Login - Microfrontend Platform",
    description: "Sign in to your account to access the microfrontend platform dashboard.",
}
