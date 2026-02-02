# Dashboard Migration to Vite SPA - Complete Documentation

## Overview

Successfully migrated the protected dashboard page from Next.js web app (`apps/web`) to Vite React app (`apps/vite`), adapting Next.js-specific patterns to React Router v7 while maintaining the distinctive Neo-Brutalist design aesthetic and cross-app authentication.

**Current Route:** `/dashboard` (Next.js app on port 3000)
**Target Route:** `/admin/dashboard` (Vite app on port 3002, accessed via proxy at `localhost:3024/admin/dashboard`)

## Architecture Decisions

### Client-Side vs Server-Side Auth

**Decision:** Use client-side route protection in Vite app instead of server-side middleware.

**Rationale:**
- Next.js uses server-side middleware for route protection
- Vite apps protect routes client-side using React Router wrappers
- This is acceptable because better-auth API validates sessions server-side on every request
- Cookie-based session (`better-auth.session_token`) is shared across apps via the proxy
- Maintains security without needing server-side route protection in Vite

**Implementation:**
- `ProtectedRoute` component wraps protected routes
- Uses `useSession` hook to check authentication
- Redirects to `/login` via proxy if not authenticated
- Full page redirect using `window.location.replace()` to ensure proxy routing

### Data Router vs BrowserRouter

**Decision:** Use `createBrowserRouter` (data router) instead of `BrowserRouter`.

**Rationale:**
- `useNavigation` hook requires data router
- Enables advanced features: loaders, actions, error boundaries
- Better performance with optimized data loading patterns
- Object-based route configuration (easier to type and validate)

**Implementation:**
```typescript
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/admin/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> }
    ]
  }
])

<RouterProvider router={router} />
```

## Implementation Phases

### Phase 1: Authentication Foundation ✅

**Files Created:**
- `apps/vite/src/lib/auth-client.ts` - Auth client without nextCookies plugin
- `apps/vite/src/components/ProtectedRoute.tsx` - Route protection wrapper

**Key Changes:**
- Removed `nextCookies()` plugin (Vite is client-side only)
- Used `window.location.replace()` for cross-app redirects
- Added `VITE_AUTH_URL` and `VITE_PROXY_URL` environment variables

### Phase 2: Design System Migration ✅

**Files Modified:**
- `apps/vite/src/index.css` - Replaced with Neo-Brutalist CSS variables
- `apps/vite/index.html` - Added Google Fonts and metadata

**Design System Features:**
- Color palette (Neo-Brutalist dark theme)
- Typography variables (Syne, IBM Plex Mono, Geist Sans)
- Spacing scale (8px to 96px)
- Effects (shadows, borders)
- Utility classes (container, grid, flex)

### Phase 3: Component Migration ✅

**Files Created:**
- `apps/vite/src/components/GradientBackground.tsx` + module.css
- `apps/vite/src/components/AuthHeader.tsx` + module.css
- `apps/vite/src/pages/Dashboard.tsx` + module.css

**Adaptations from Next.js:**
- Removed `"use client"` directive (not needed in Vite)
- Replaced `useRouter` with `useNavigate`
- Replaced `router.push()` with `navigate({ replace: true })`
- Changed `Link href` to `Link to` props
- Updated routes: `/dashboard` → `/admin/dashboard`

### Phase 4: Routing Integration ✅

**Files Created:**
- `apps/vite/src/components/RootLayout.tsx` - Global layout wrapper
- `apps/vite/src/App.tsx` - Data router configuration
- Updated `apps/vite/src/main.tsx` - Simplified entry point

**Routing Structure:**
- RootLayout renders global elements (GradientBackground, AuthHeader, LoadingOverlay)
- Protected routes wrapped with `ProtectedRoute` component
- Redirects: `/admin` → `/admin/dashboard`, catch-all → dashboard

### Phase 5: Navigation Fixes ✅

**Problem:** Logout and redirect navigation not routing through proxy

**Solution:**
- Use full proxy URL for navigation: `window.location.replace('http://localhost:3024/')`
- Added `VITE_PROXY_URL` environment variable
- Implemented proper cross-app navigation pattern

### Phase 6: Screen Flash Prevention ✅

**Problem:** White flash when navigating from Next.js to Vite SPA

**Solution:**
- Critical CSS in `<head>` to set background immediately
- Body loading class removed when React mounts
- LoadingOverlay component using `useNavigation` hook
- Inline loading styles in ProtectedRoute component
- Performance optimizations with `will-change` hints

**Techniques:**
1. **Critical CSS** - Inline styles prevent FOUC
2. **Loading State** - `body.loading` class shows "Loading..." text
3. **Global Overlay** - Shows spinner during route transitions
4. **Optimized Animations** - GPU acceleration with `will-change`

### Phase 7: Metadata Updates ✅

**File Modified:** `apps/vite/index.html`

**Added:**
- Title: "Admin Dashboard | MFE Portal"
- Meta description for SEO
- Open Graph tags for social sharing
- Twitter card meta tags
- Robots meta tag (noindex, nofollow for admin areas)
- Theme color matching design system

### Phase 8: Gradient Background Visibility ✅

**Problem:** Gradient background not visible (solid dark color showing)

**Root Cause:** CSS stacking context issue - `body` background was covering gradient

**Solution:**
- Made `body` background transparent
- Added fallback background to `html` element
- Positioned `#root` with `z-index: 1` for proper stacking
- Increased gradient opacity (0.05 → 0.15) for better visibility
- Increased geometric pattern opacity (0.08-0.1 → 0.25-0.3)

**Final Result:**
- Animated gradient mesh with blue, orange, green colors
- Visible geometric patterns (circles, triangles, grid lines)
- Pulsing decorative dots with scale animation
- Proper stacking context for visibility

## File Structure

### Vite App Structure

```
apps/vite/
├── src/
│   ├── components/
│   │   ├── AuthHeader.tsx
│   │   ├── AuthHeader.module.css
│   │   ├── GradientBackground.tsx
│   │   ├── GradientBackground.module.css
│   │   ├── LoadingOverlay.tsx
│   │   ├── LoadingOverlay.module.css
│   │   ├── ProtectedRoute.tsx
│   │   └── RootLayout.tsx
│   ├── lib/
│   │   └── auth-client.ts
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   └── Dashboard.module.css
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
└── index.html
```

### Web App Structure (Created)

```
apps/web/
├── app/
│   ├── components/
│   │   ├── GradientBackground.tsx
│   │   ├── GradientBackground.module.css
│   │   └── AuthHeader.tsx
│   ├── fonts/
│   │   ├── IBMPlexMono-Bold.woff2
│   │   ├── IBMPlexMono-Medium.woff2
│   │   └── IBMPlexMono-Regular.woff2
│   ├── globals.css
│   ├── layout.tsx
│   ├── middleware.ts
│   ├── login/
│   │   └── page.tsx
│   └── signup/
│       └── page.tsx
└── lib/
    └── auth-client.ts
```

## Environment Variables

### Vite App (`apps/vite/.env`)
```bash
VITE_AUTH_URL=http://localhost:3024/api/auth
VITE_PROXY_URL=http://localhost:3024
```

**Purpose:**
- `VITE_AUTH_URL`: better-auth API endpoint via proxy
- `VITE_PROXY_URL`: Proxy URL for cross-app navigation

## Cross-App Authentication Flow

### How It Works

1. **Login (Next.js Web App):**
   - User enters credentials at `/login` (port 3000)
   - Better-auth validates and sets `better-auth.session_token` cookie
   - Cookie is set without domain attribute (or with `.localhost`)

2. **Session Sharing:**
   - Proxy at `localhost:3024` ensures both apps share same domain
   - Cookie is accessible to both Next.js app (port 3000) and Vite app (port 3002)
   - No re-login needed when switching between apps

3. **Access Protected Route (Vite App):**
   - User navigates to `/admin/dashboard` (via proxy)
   - `ProtectedRoute` checks session using `useSession()` hook
   - If authenticated, shows dashboard
   - If not authenticated, redirects to `http://localhost:3024/login`

4. **Logout:**
   - Click logout button
   - `signOut()` called via better-auth
   - `window.location.replace('http://localhost:3024/')` redirects to Next.js home
   - Cookie cleared, session terminated

## Key Technical Patterns

### Navigation Pattern

**Next.js (Web App):**
```typescript
import { useRouter } from "next/navigation"
const router = useRouter()
router.push("/dashboard")
```

**Vite (SPA):**
```typescript
import { useNavigate } from "react-router-dom"
const navigate = useNavigate()
navigate("/admin/dashboard", { replace: true })
```

**Cross-App Navigation:**
```typescript
// Use full proxy URL to ensure routing through proxy layer
window.location.replace(`${proxyUrl}/login`)
```

### Component Pattern

**Next.js Page:**
```typescript
"use client"

export default function DashboardPage() {
  // Client component code
}
```

**Vite Component:**
```typescript
// No "use client" needed - always client-side
export function Dashboard() {
  // Component code
}
```

### Authentication Pattern

**Next.js (Server + Client):**
- Middleware for server-side protection
- `nextCookies()` plugin for cookie access
- `useSession()` hook in client components

**Vite (Client-side):**
- `ProtectedRoute` wrapper for route protection
- No `nextCookies()` plugin needed
- `useSession()` hook in components
- Browser handles cookies automatically

## Design System

### Neo-Brutalist Aesthetic

**Key Characteristics:**
- Sharp edges (0px border-radius)
- High contrast colors
- Bold typography (Syne for display)
- Monospace fonts for technical elements (IBM Plex Mono)
- Strong shadows and borders
- Dark theme with vibrant accent colors

**Color Palette:**
- Background: `#0a0a0a` (near-black)
- Foreground: `#ededed` (off-white)
- Primary: `#3b82f6` (Electric Blue)
- Secondary: `#f97316` (Warm Coral)
- Accent: `#10b981` (Emerald Green)
- Border: `#262626` (dark gray)

**Typography Scale:**
- Display: Syne (700, 800 weights)
- Body: Geist Sans, system fonts
- Mono: IBM Plex Mono (400, 500, 600)

**Spacing Scale:**
- 8px, 16px, 24px, 32px, 48px, 64px, 96px

## Performance Optimizations

### Gradient Background
- `will-change: transform` for GPU acceleration
- `will-change: background-position` for animated mesh
- `will-change: transform, opacity` for animated elements
- `prefers-reduced-motion` media query for accessibility

### Loading States
- Critical CSS inline to prevent FOUC
- Minimal DOM manipulation during transitions
- CSS animations instead of JavaScript where possible
- Fixed positioning to avoid layout shifts

### Image/Font Optimization
- Google Fonts preconnect hints
- Font display: swap for faster rendering
- Local font fallbacks

## Troubleshooting

### Issue: useNavigation not supported
**Error:** "useNavigation must be used within a data router"

**Solution:** Use `createBrowserRouter` instead of `BrowserRouter`

### Issue: Screen flash during navigation
**Solution:**
1. Add critical CSS to `<head>`
2. Use `body.loading` class removed on mount
3. Implement LoadingOverlay with `useNavigation`

### Issue: Gradient background not visible
**Solution:**
1. Make `body` background transparent
2. Add fallback background to `html`
3. Ensure proper z-index stacking context

### Issue: Logout not routing to Next.js app
**Solution:** Use full proxy URL: `window.location.replace('http://localhost:3024/')`

## Testing Checklist

### Functionality
- [x] Navigate to `/admin/dashboard` unauthenticated → redirect to `/login`
- [x] Login via Next.js web app
- [x] Access `/admin/dashboard` authenticated → shows dashboard
- [x] Test logout button → redirects to Next.js home
- [x] Cross-app session sharing (login in web, access Vite dashboard)
- [x] Navigate between routes (no white flash)
- [x] Protected routes redirect properly

### Visual
- [x] Gradient background visible and animating
- [x] Geometric patterns (circles, triangles, grid lines) visible
- [x] Pulsing dots animation working
- [x] Neo-Brutalist design matches Next.js version
- [x] Fonts loading correctly (Syne, IBM Plex Mono)
- [x] Responsive layout (mobile, tablet, desktop)
- [x] Hover effects and transitions smooth

### Performance
- [x] No white flash on navigation
- [x] Fast initial load (critical CSS)
- [x] Smooth route transitions
- [x] No layout shifts
- [x] Loading states clear and consistent

## Future Enhancements

### Potential Improvements
1. Add error boundaries for better error handling
2. Implement code splitting for lazy loading routes
3. Add service worker for offline support
4. Implement analytics tracking
5. Add more microfrontend apps to the architecture
6. Create shared component library (beyond @repo/ui)

### Scalability Considerations
1. Add more protected routes to Vite app
2. Implement role-based access control
3. Add API rate limiting
4. Implement session refresh logic
5. Add more microfrontend apps (docs, admin, etc.)

## Resources

### Documentation
- [React Router v7 Documentation](https://reactrouter.com/)
- [Better-Auth Documentation](https://www.better-auth.com)
- [Turborepo Microfrontends](https://turbo.build/repo/docs/core-concepts/monorepos/micro-frontends)

### Related Commits
- `78c2927` - feat(web): add authentication system and Neo-Brutalist design
- `8bdabb3` - feat(web): implement authentication pages and middleware
- `66835ca` - feat(vite): migrate dashboard from Next.js to Vite SPA

## Conclusion

Successfully migrated the dashboard from Next.js to Vite while maintaining:
- ✅ Cross-app authentication via shared cookies
- ✅ Neo-Brutalist design system consistency
- ✅ Smooth navigation without screen flash
- ✅ Proper route protection and redirects
- ✅ Optimized performance with loading states

The migration demonstrates best practices for microfrontend architecture using Turborepo's built-in microfrontends support, with proper separation of concerns and shared design language across applications.
