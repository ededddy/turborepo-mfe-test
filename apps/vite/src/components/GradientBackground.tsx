import React from "react"
import styles from "./GradientBackground.module.css"

/**
 * GradientBackground Component
 *
 * Provides an animated gradient background with geometric pattern overlays.
 * Creates the Neo-Brutalist aesthetic with a dynamic, tech-forward feel.
 *
 * Features:
 * - Animated gradient mesh using CSS animations
 * - SVG overlay with geometric patterns (circles, triangles)
 * - Fixed positioning with z-index -1 to stay behind content
 * - Performance optimized with CSS transforms and will-change
 * - Reduced motion support for accessibility
 */
export function GradientBackground(): React.ReactNode {
    return (
        <div className={styles.gradientBackground}>
            {/* Animated Gradient Mesh */}
            <div className={styles.gradientMesh} aria-hidden="true" />

            {/* Geometric Pattern Overlay */}
            <svg
                className={styles.geometricOverlay}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                {/* Large Circle - Top Left */}
                <circle
                    cx="10"
                    cy="10"
                    r="15"
                    fill="none"
                    stroke="rgba(59, 130, 246, 1)"
                    strokeWidth="0.5"
                />

                {/* Medium Circle - Bottom Right */}
                <circle
                    cx="85"
                    cy="90"
                    r="20"
                    fill="none"
                    stroke="rgba(249, 115, 22, 0.25)"
                    strokeWidth="0.5"
                />

                {/* Small Circle - Center */}
                <circle
                    cx="50"
                    cy="50"
                    r="8"
                    fill="none"
                    stroke="rgba(16, 185, 129, 0.3)"
                    strokeWidth="0.5"
                />

                {/* Triangle - Top Right */}
                <polygon
                    points="90,10 95,20 85,20"
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.25)"
                    strokeWidth="0.5"
                />

                {/* Triangle - Bottom Left */}
                <polygon
                    points="5,85 10,95 0,95"
                    fill="none"
                    stroke="rgba(249, 115, 22, 0.25)"
                    strokeWidth="0.5"
                />

                {/* Grid Lines - Horizontal */}
                <line
                    x1="0"
                    y1="25"
                    x2="100"
                    y2="25"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="0.3"
                />
                <line
                    x1="0"
                    y1="50"
                    x2="100"
                    y2="50"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="0.3"
                />
                <line
                    x1="0"
                    y1="75"
                    x2="100"
                    y2="75"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="0.3"
                />

                {/* Grid Lines - Vertical */}
                <line
                    x1="25"
                    y1="0"
                    x2="25"
                    y2="100"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="0.3"
                />
                <line
                    x1="50"
                    y1="0"
                    x2="50"
                    y2="100"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="0.3"
                />
                <line
                    x1="75"
                    y1="0"
                    x2="75"
                    y2="100"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="0.3"
                />
            </svg>

            {/* Additional decorative dots */}
            <div className={styles.decorativeDots} aria-hidden="true">
                <div className={`${styles.dot} ${styles.dot1}`} />
                <div className={`${styles.dot} ${styles.dot2}`} />
                <div className={`${styles.dot} ${styles.dot3}`} />
                <div className={`${styles.dot} ${styles.dot4}`} />
            </div>
        </div>
    )
}
