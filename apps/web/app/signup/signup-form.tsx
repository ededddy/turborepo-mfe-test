"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
//import { signUp } from "@web/lib/auth-client"
import { signUp } from "@repo/auth/client/next"

import styles from "../styles/auth.module.css"

/**
 * SignupForm Component
 *
 * Client Component for new user registration.
 * Features comprehensive validation, password confirmation, and loading states.
 *
 * Registration Flow:
 * 1. User enters name, email, password, and confirm password
 * 2. Client-side validation (all fields, email format, password strength, match)
 * 3. Submit → signUp.email() calls /api/auth/sign-up/email
 * 4. On success: redirect to /dashboard
 * 5. On error: display error message
 */
export function SignupForm(): React.ReactNode {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // Client-side validation
    const validateForm = (): boolean => {
        if (!name.trim()) {
            setError("Name is required")
            return false
        }

        if (name.trim().length < 2) {
            setError("Name must be at least 2 characters")
            return false
        }

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

        if (password.length < 8) {
            setError("Password must be at least 8 characters")
            return false
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
            setError("Password must contain both uppercase and lowercase letters")
            return false
        }

        if (!/(?=.*\d)/.test(password)) {
            setError("Password must contain at least one number")
            return false
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match")
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
            // Call better-auth signUp
            const result = await signUp.email({
                email,
                password,
                name,
                callbackURL: "/dashboard", // Redirect on successful signup
            })

            if (result.error) {
                setError(result.error.message || "Failed to create account")
                setIsLoading(false)
            } else {
                // Success - router will handle redirect via callbackURL
                // Or manually redirect after a short delay
                setTimeout(() => {
                    router.push("/dashboard")
                }, 100)
            }
        } catch (err) {
            console.error("Signup error:", err)
            setError("An unexpected error occurred. Please try again.")
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.authContainer}>
            <div className={styles.authCard}>
                <div className={styles.authHeader}>
                    <h1 className={styles.authTitle}>Create Account</h1>
                    <p className={styles.authSubtitle}>
                        Start building scalable microfrontends today
                    </p>
                </div>

                {error && (
                    <div className={styles.errorMessage} role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.authForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={`${styles.formLabel} ${styles.required}`}>
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className={styles.formInput}
                            disabled={isLoading}
                            autoComplete="name"
                            required
                        />
                    </div>

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
                                autoComplete="new-password"
                                required
                            />
                        </div>
                        <p className={styles.helperText}>
                            Must be at least 8 characters with uppercase, lowercase, and numbers
                        </p>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword" className={`${styles.formLabel} ${styles.required}`}>
                            Confirm Password
                        </label>
                        <div className={styles.inputWrapper}>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className={styles.formInput}
                                disabled={isLoading}
                                autoComplete="new-password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`${styles.formButton} ${isLoading ? styles.loading : ""}`}
                    >
                        {isLoading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <div className={styles.formFooter}>
                    <p className={styles.formFooterText}>
                        Already have an account?{" "}
                        <Link href="/login" className={styles.formFooterLink}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
