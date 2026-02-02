import { useEffect } from "react"
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import { RootLayout } from "./components/RootLayout"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Dashboard } from "./pages/Dashboard"

/**
 * Root App Component
 *
 * Removes loading class from body when React mounts to prevent FOUC.
 * Uses data router (createBrowserRouter) to enable useNavigation hook.
 */
export default function App() {
  useEffect(() => {
    // Remove loading class when React mounts
    document.body.classList.remove("loading")
  }, [])

  // Create data router to enable useNavigation hook
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        // Redirect /admin to /admin/dashboard
        {
          path: "/admin",
          element: <Navigate to="/admin/dashboard" replace />
        },
        // Protected Dashboard Route
        {
          path: "/admin/dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          )
        },
        // Catch all - redirect to dashboard
        {
          path: "*",
          element: <Navigate to="/admin/dashboard" replace />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}
