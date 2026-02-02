import { useNavigation } from "react-router-dom"
import styles from "./LoadingOverlay.module.css"

/**
 * LoadingOverlay Component
 *
 * Global loading indicator that appears during route transitions.
 * Prevents screen flash by showing a branded loading state immediately.
 *
 * Uses React Router's useNavigation hook to detect navigation state.
 * Only shows when navigation is actually loading (not just navigating).
 */
export function LoadingOverlay() {
    const navigation = useNavigation()

    // Only show overlay when navigation state is 'loading'
    // This prevents showing during instant client-side redirects
    if (navigation.state !== "loading") {
        return null
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
                <p className={styles.loadingText}>Loading...</p>
            </div>
        </div>
    )
}
