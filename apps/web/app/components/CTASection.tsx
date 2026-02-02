import React from "react"
import Link from "next/link"
import styles from "./CTASection.module.css"

/**
 * CTASection Component
 *
 * Call-to-action section for the landing page with gradient background.
 * Encourages users to sign up and get started.
 *
 * Features:
 * - Animated gradient background
 * - Compelling headline and subtext
 * - Prominent CTA button
 * - Centered content layout
 * - Neo-Brutalist styling with sharp borders
 *
 * Server Component - Uses CSS Modules for styling
 */
export function CTASection(): React.ReactNode {
    return (
        <section className={styles.ctaSection}>
            <div className="container">
                <div className={styles.ctaContent}>
                    <h2 className={styles.ctaTitle}>Ready to Build?</h2>
                    <p className={styles.ctaDescription}>
                        Join thousands of developers building scalable microfrontend
                        applications with our modern platform.
                    </p>
                    <div className={styles.ctaButtons}>
                        <Link href="/signup" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
                            Get Started Free
                        </Link>
                        <Link href="/docs" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
                            Read the Docs
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className={styles.ctaDecoration}>
                <div className={`${styles.decorationCircle} ${styles.decorationCircle1}`} />
                <div className={`${styles.decorationCircle} ${styles.decorationCircle2}`} />
                <div className={`${styles.decorationCircle} ${styles.decorationCircle3}`} />
            </div>
        </section>
    )
}
