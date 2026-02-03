"use client"

import React, { useState } from "react"
import Link from "next/link"
// import { useSession, signOut } from "@web/lib/auth-client"
import { useSession, signOut } from "@repo/auth/client/next"
import styles from "./AuthHeader.module.css"

/**
 * AuthHeader Component
 *
 * Sticky header with authentication-aware navigation.
 * Displays different content based on authentication state.
 *
 * Features:
 * - Sticky positioning with backdrop-blur effect
 * - Responsive navigation
 * - Authentication state detection via useSession hook
 * - Conditional rendering based on auth state
 *
 * Client Component - Uses React hooks (useState, useSession)
 */
export function AuthHeader(): React.ReactNode {
    const { data: session, isPending } = useSession()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleLogout = async () => {
        try {
            await signOut({
                fetchOptions: {
                    onSuccess: () => {
                        window.location.href = "/"
                    }
                }
            })
        } catch (error) {
            console.error("Logout error:", error)
        }
    }

    return (
        <header className={styles.authHeader}>
            <div className="container">
                <div className={styles.headerContent}>
                    {/* Logo */}
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoText}>MFE</span>
                        <span className={styles.logoDot}>.</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className={styles.navDesktop}>
                        <Link href="/" className={styles.navLink}>
                            Home
                        </Link>
                        <a href="/docs" className={styles.navLink}>
                            Docs
                        </a>
                    </nav>

                    {/* Auth Buttons / User Menu */}
                    <div className="auth-section">
                        {isPending ? (
                            <div className={styles.loadingSpinner} />
                        ) : session ? (
                            /* Authenticated State */
                            <div className={styles.userMenu}>
                                <button
                                    className={styles.userMenuButton}
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    aria-label="User menu"
                                >
                                    <span className={styles.userAvatar}>
                                        {session.user?.name?.[0]?.toUpperCase() || "U"}
                                    </span>
                                    <span className={styles.userName}>{session.user?.name}</span>
                                    <svg
                                        className={`${styles.chevron} ${isMenuOpen ? styles.chevronOpen : ""}`}
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3 4.5L6 7.5L9 4.5"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {isMenuOpen && (
                                    <div className={styles.dropdownMenu}>
                                        <a href="/admin/dashboard" className={styles.dropdownItem}>
                                            Dashboard
                                        </a>
                                        <div className={styles.dropdownDivider} />
                                        <button onClick={handleLogout} className={styles.dropdownItem}>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Unauthenticated State */
                            <div className={styles.authButtons}>
                                <Link href="/login" className={`${styles.btn} ${styles.btnSecondary}`}>
                                    Login
                                </Link>
                                <Link href="/signup" className={`${styles.btn} ${styles.btnPrimary}`}>
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            className={styles.mobileMenuToggle}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isMenuOpen ? (
                                    <path
                                        d="M18 6L6 18M6 6L18 18"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                ) : (
                                    <>
                                        <path
                                            d="M3 12H21"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M3 6H21"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M3 18H21"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </>
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className={styles.navMobile}>
                        <Link href="/" className={styles.mobileNavLink}>
                            Home
                        </Link>
                        <Link href="/docs" className={styles.mobileNavLink}>
                            Docs
                        </Link>
                        {!session && (
                            <>
                                <Link href="/login" className={styles.mobileNavLink}>
                                    Login
                                </Link>
                                <Link href="/signup" className={styles.mobileNavLink}>
                                    Sign Up
                                </Link>
                            </>
                        )}
                        {session && (
                            <>
                                <a href="/admin/dashboard" className={styles.mobileNavLink}>
                                    Dashboard
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className={`${styles.mobileNavLink} ${styles.mobileNavButton}`}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </nav>
                )}
            </div>
        </header>
    )
}
