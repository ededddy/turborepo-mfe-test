import { Outlet } from "react-router-dom"
import { GradientBackground } from "./GradientBackground"
import { AuthHeader } from "./AuthHeader"
import { LoadingOverlay } from "./LoadingOverlay"

/**
 * RootLayout Component
 *
 * Wraps all routes with common layout elements.
 * GradientBackground and AuthHeader are rendered here to appear on all pages.
 * LoadingOverlay is rendered here to ensure it has access to navigation context.
 *
 * Uses Outlet to render child routes. Works with data router (createBrowserRouter).
 */
export function RootLayout() {
    return (
        <>
            <GradientBackground />
            <AuthHeader />
            <LoadingOverlay />
            <Outlet />
        </>
    )
}
