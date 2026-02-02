import React from "react"
import styles from "./FeatureCard.module.css"

/**
 * FeatureCard Component Props
 */
interface FeatureCardProps {
    icon: React.ReactNode
    title: string
    description: string
}

/**
 * FeatureCard Component
 *
 * Reusable card component for showcasing features on the landing page.
 * Follows Neo-Brutalist design with sharp borders and strong shadows.
 *
 * Features:
 * - Sharp borders (no rounded corners)
 * - Strong drop shadow on hover
 * - Subtle scale transform on hover
 * - Responsive layout
 * - Icon + title + description structure
 *
 * Server Component - Uses CSS Modules for styling
 *
 * @param icon - React node for the feature icon (SVG, emoji, or component)
 * @param title - Feature title
 * @param description - Feature description text
 */
export function FeatureCard({
    icon,
    title,
    description
}: FeatureCardProps): React.ReactNode {
    return (
        <div className={styles.featureCard}>
            <div className={styles.cardIcon}>{icon}</div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDescription}>{description}</p>
        </div>
    )
}
