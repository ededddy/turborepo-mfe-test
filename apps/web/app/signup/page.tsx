import type { Metadata } from "next"
import { GradientBackground } from "../components/GradientBackground"
import { AuthHeader } from "../components/AuthHeader"
import { SignupForm } from "./signup-form"
import styles from "../styles/auth.module.css"

/**
 * Signup Page - Server Component
 *
 * Wrapper component for the user registration functionality.
 * Provides SEO metadata and renders the SignupForm Client Component.
 *
 * Note: Server-side session checking can be added here to redirect
 * already-authenticated users to the dashboard.
 */
export default function SignupPage() {
  return (
    <>
      <GradientBackground />
      <AuthHeader />

      <main className={styles.authPage}>
        <SignupForm />
      </main>
    </>
  )
}

export const metadata: Metadata = {
  title: "Sign Up - Microfrontend Platform",
  description: "Create a new account to start building scalable microfrontends with our modern platform.",
}
