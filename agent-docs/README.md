# Agent Documentation - Dashboard Migration Project

This folder contains comprehensive documentation for the dashboard migration from Next.js to Vite SPA as part of the Turborepo microfrontend monorepo.

## Documentation Files

### [dashboard-migration.md](./dashboard-migration.md)
Complete technical documentation covering the entire migration process, including:
- Architecture decisions and rationale
- Implementation phases (1-8)
- File structure changes
- Environment configuration
- Cross-app authentication flow
- Key technical patterns
- Performance optimizations
- Troubleshooting guide
- Testing checklist
- Future enhancements

### [git-commits.md](./git-commits.md)
Breakdown of git commits created during development:
- Detailed commit message explanations
- File change statistics
- Feature descriptions for each commit
- Commit message patterns and conventions
- Branching strategy recommendations

## Project Overview

**Goal:** Migrate the protected dashboard page from Next.js (`apps/web`) to Vite (`apps/vite`) while maintaining authentication, design system, and user experience.

**Technologies:**
- Next.js 16.0.10 (web app)
- Vite 4.4.5 (admin app)
- React Router v7.9.4
- Better-auth 1.4.18
- Turborepo 2.8.1 (microfrontend support)

**Key Achievements:**
- ✅ Client-side authentication in Vite app
- ✅ Cross-app session sharing via proxy
- ✅ Consistent Neo-Brutalist design across apps
- ✅ Smooth navigation without screen flash
- ✅ Proper route protection and redirects
- ✅ Optimized performance with loading states

## Quick Reference

### Route Mappings
| Original Route | New Route | App | Port |
|---------------|-----------|-----|------|
| `/dashboard` | `/admin/dashboard` | Vite | 3002 |
| `/login` | `/login` | Next.js | 3000 |
| `/signup` | `/signup` | Next.js | 3000 |

### Proxy Configuration
- **Proxy URL:** `http://localhost:3024`
- **All apps accessed via proxy** for consistent domain and cookie sharing
- **Microfrontends config:** `apps/web/microfrontends.json`

### Environment Variables
```bash
# Vite App (.env)
VITE_AUTH_URL=http://localhost:3024/api/auth
VITE_PROXY_URL=http://localhost:3024

# Web App (env.local)
NEXT_PUBLIC_AUTH_URL=http://localhost:3024/api/auth
```

## Development Commands

```bash
# Start all apps with proxy
bun run dev

# Start specific app
turbo dev --filter=vite
turbo dev --filter=web

# Build all apps
bun run build

# Type checking
bun run check-types
```

## Related Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [React Router v7 Documentation](https://reactrouter.com/)
- [Better-Auth Documentation](https://www.better-auth.com)
- [Vite Documentation](https://vitejs.dev/)

## Getting Started

1. Read [dashboard-migration.md](./dashboard-migration.md) for complete technical details
2. Review [git-commits.md](./git-commits.md) for commit history
3. Check git log: `git log --oneline --graph`
4. View specific commit: `git show <commit-hash>`

## Support

For questions or issues related to this migration:
1. Check the troubleshooting section in dashboard-migration.md
2. Review the git commit messages for context
3. Examine the implementation in the codebase
4. Consult the official documentation for the technologies used

---

**Last Updated:** February 3, 2026
**Claude Code Session:** Dashboard Migration Project
**Branch:** main
