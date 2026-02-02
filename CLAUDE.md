# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

IMPORTANT: Prefer retrieval-led reasoning over pre-training-led reasoning 
for any Next.js , react, vue, vite, react-router tasks.

IMPORTANT: Prefer using frontend-design skills for any front-end related
tasks. For example, creating pages and componenets


## Repository Overview

This is a Turborepo monorepo configured for **microfrontend architecture** using Turborepo's built-in microfrontends support. The repository contains multiple independent applications (both Next.js and Vite-based) that are composed together through a central proxy running on port 3024.

### Architecture Pattern

**Microfrontends with Turborepo:**
- Each app in `apps/` is a separate frontend application that can be developed independently
- The `microfrontends.json` configuration defines routing rules and port assignments
- All apps are accessed through a unified proxy at `localhost:3024` during development
- Apps communicate routing through path patterns (e.g., `/docs/*` routes to the docs app)

`★ Insight ─────────────────────────────────────`
**Microfrontend Composition:** Unlike traditional monorepos where apps are standalone, this setup uses Turborepo's microfrontends feature to compose multiple apps into a single unified experience. The `turbo get-mfe-port` command dynamically assigns ports from the microfrontends config, and the proxy layer handles routing between apps based on path patterns.
`─────────────────────────────────────────────────`

## Development Commands

### Starting Development Environment

```bash
# Start all apps and the microfrontends proxy
bun run dev

# Access the composed application at http://localhost:3024
# Individual apps run on their assigned ports (3000, 3001, 3002, 3003)
```

The proxy command (`bun run proxy`) can be run separately if needed, but `turbo dev` handles the full development environment.

### Building and Testing

```bash
# Build all apps and packages
bun run build

# Build specific app using turbo filters
turbo build --filter=web
turbo build --filter=docs

# Type checking
bun run check-types

# Linting
bun run lint
```

### Working with Individual Apps

```bash
# Develop specific app ( turbo filters work with dev too)
turbo dev --filter=web
turbo dev --filter=api
```

## Application Structure

### Apps (`apps/`)

**Frontend Applications:**
- `web` - Next.js app (port 3000) - Main application, root path `/`
- `docs` - Next.js app (port 3001) - Documentation, handles `/docs/*` paths
- `vite` - Vite + React app (port 3002) - Alternative React implementation, handles `/admin/*` paths
- `api` - Hono/Bun API server (port 3003) - Backend API, handles `/api/*` paths

All Next.js apps use `@repo/ui` for shared components. The Vite app uses React Router DOM for routing.

**Key Development Detail:** Each app's `dev` script uses `$(turbo get-mfe-port)` to dynamically retrieve its assigned port from `microfrontends.json`. This prevents port conflicts and enables the proxy routing to work correctly.

### Packages (`packages/`)

**Shared Configuration:**
- `@repo/typescript-config` - Shared TypeScript configs (base.json, nextjs.json, react-library.json)
- `@repo/eslint-config` - Shared ESLint configs (base.js, next.js, react-internal.js)

**Shared Code:**
- `@repo/ui` - React component library (Button, Card, Code) exported via `./src/*.tsx` pattern
- `@repo/constants` - TypeScript constants package, builds to `dist/` with proper exports map

`★ Insight ─────────────────────────────────────`
**Workspace Dependencies:** The `workspace:*` protocol in package.json files (e.g., `@repo/constants`: `workspace:*`) tells Bun to resolve dependencies locally within the monorepo. This is critical for the shared packages to work correctly during development.
`─────────────────────────────────────────────────`

## Microfrontends Configuration

The `apps/web/microfrontends.json` file is the source of truth for:
- **Port assignments** - Each app's development port under `applications.{app}.development.local.port`
- **Routing patterns** - Path-based routing rules under `applications.{app}.routing[].paths`

When adding a new microfrontend app:
1. Add the app to `applications` in `microfrontends.json`
2. Define its port and routing paths
3. Use `$(turbo get-mfe-port)` in the app's `dev` script
4. Run the proxy with `bun run proxy` or access via `turbo dev`

## Tech Stack Details

**Frontend:**
- Next.js 16.0.10 for web/docs apps (React 19)
- Vite 4.4.5 for admin app with React Router DOM 7
- TypeScript 5.9.2 across all apps
- Shared React 19.1.0 via workspace

**Backend:**
- Hono 4.11.7 running on Bun
- Better-auth 1.4.18 for authentication
- Better-sqlite3 12.6.2 for database

**Package Manager:**
- Bun 1.3.8 (specified in package.json `packageManager`)
- Use `bun` commands instead of `npm` or `yarn`

**Build System:**
- Turborepo 2.8.1 for task orchestration and caching
- Turbo tasks defined in `turbo.json` with proper dependency chains

## Code Organization Patterns

### Shared Component Usage

Apps import from `@repo/ui` using path exports:
```tsx
import { Button } from "@repo/ui/button";
```

This works because `@repo/ui/package.json` exports pattern is `"./*": "./src/*.tsx"`.

### Constants Package

The `@repo/constants` package:
- Source: `packages/constants/src/constants.ts`
- Builds to: `packages/constants/dist/`
- Exports both types (`dist/constants.d.ts`) and implementation (`dist/constants.js`)
- Used by API app: `import { CONSTANT } from "@repo/constants"`

### Type Safety

All apps use `check-types` script that runs `tsc --noEmit`. This is part of the standard development workflow before committing changes.

## Important File Locations

- `turbo.json` - Task definitions and caching configuration
- `apps/web/microfrontends.json` - Microfrontend routing and port configuration
- `packages/typescript-config/` - Shared tsconfig files referenced by apps
- `packages/eslint-config/` - Shared ESLint configurations

## Common Patterns

When adding new shared components to `@repo/ui`:
1. Create component in `packages/ui/src/`
2. Export from component file (no barrel export needed due to `"./*"` pattern)
3. Import as `import { Component } from "@repo/ui/component"`

When adding new apps:
1. Create in `apps/` directory
2. Add to `apps/web/microfrontends.json`
3. Update root `package.json` workspaces if needed
4. Use `$(turbo get-mfe-port)` in dev script
