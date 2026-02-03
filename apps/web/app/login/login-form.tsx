"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
//import { signIn } from "@web/lib/auth-client"
import { signIn } from "@repo/auth/client/next"
import styles from "../styles/auth.module.css"

/**
 * LoginForm Component
 *
 * Client Component for user authentication via email/password.
 * Features real-time validation, error handling, and loading states.
 *
 * Authentication Flow:
 * 1. User enters email and password
 * 2. Client-side validation (email format, required fields)
 * 3. Submit → signIn.email() calls /api/auth/sign-in/email
 * 4. On success: redirect to /admin/dashboard
 * 5. On error: display error message
 */
export function LoginForm(): React.ReactNode {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // Client-side validation
    const validateForm = (): boolean => {
        if (!email.trim()) {
            setError("Email is required")
            return false
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address")
            return false
        }

        if (!password) {
            setError("Password is required")
            return false
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters")
            return false
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Clear previous errors
        setError("")

        // Validate form
        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            // Call better-auth signIn
            const result = await signIn.email({
                email,
                password,
                callbackURL: "/admin/dashboard", // Redirect on successful login
            })

            if (result.error) {
                setError(result.error.message || "Invalid email or password")
                setIsLoading(false)
            } else {
                // Success - router will handle redirect via callbackURL
                // Or manually redirect after a short delay
                setTimeout(() => {
                    router.push("/admin/dashboard")
                }, 100)
            }
        } catch (err) {
            console.error("Login error:", err)
            setError("An unexpected error occurred. Please try again.")
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.authContainer}>
            <div className={styles.authCard}>
                <div className={styles.authHeader}>
                    <h1 className={styles.authTitle}>Welcome Back</h1>
                    <p className={styles.authSubtitle}>
                        Sign in to your account to continue
                    </p>
                </div>

                {error && (
                    <div className={styles.errorMessage} role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.authForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={`${styles.formLabel} ${styles.required}`}>
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className={styles.formInput}
                            disabled={isLoading}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={`${styles.formLabel} ${styles.required}`}>
                            Password
                        </label>
                        <div className={styles.inputWrapper}>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className={styles.formInput}
                                disabled={isLoading}
                                autoComplete="current-password"
                                required
                            />
                        </div>
                        <p className={styles.helperText}>
                            Must be at least 6 characters
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`${styles.formButton} ${isLoading ? styles.loading : ""}`}
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className={styles.formFooter}>
                    <p className={styles.formFooterText}>
                        Don&apos;t have an account?
                        <Link href="/signup" className={styles.formFooterLink}>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
