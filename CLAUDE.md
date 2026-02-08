# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website for Travis Vocino built with **Astro** (not Jekyll - the README is outdated) and deployed on **Cloudflare Pages**. It uses server-side rendering (SSR) with the Cloudflare adapter.

## Development Commands

```bash
# Start development server
npm run dev
# or
npm start

# Build for production (runs type checking first)
npm run build

# Preview production build locally
npm run preview

# Type checking only
astro check
```

## Architecture

### Framework Configuration
- **Output mode**: `server` (SSR enabled)
- **Adapter**: `@astrojs/cloudflare` for Cloudflare Pages deployment
- **Site URL**: https://vocino.com

### Project Structure

```
src/
├── components/          # Reusable Astro components
│   ├── SEO.astro       # Meta tags and SEO handling
│   ├── SiteBrand.astro # Site logo/branding
│   ├── SocialLinks.astro
│   ├── Terminal.astro  # Interactive terminal easter egg
│   └── TwitchStatus.astro # Live streaming status indicator
├── layouts/
│   └── BaseLayout.astro # Main HTML layout, imports main.scss
├── pages/
│   ├── index.astro     # Homepage
│   └── api/
│       └── twitch-status.ts # Astro API route for Twitch API
├── styles/             # SCSS files
│   ├── main.scss       # Main stylesheet (imported by BaseLayout)
│   ├── _variables.scss # Colors, fonts, spacing
│   ├── _base.scss      # Base styles and resets
│   ├── _layout.scss    # Layout-specific styles
│   ├── _style-guide.scss
│   └── _utilities.scss
public/
└── assets/
    └── js/
        └── terminal.js # Terminal easter egg JavaScript
```

### Key Architectural Patterns

#### API Routes
- Use **Astro API routes** (in `src/pages/api/`) instead of Cloudflare Pages Functions
- API routes have access to Cloudflare runtime via `locals.runtime`
- Environment variables: `locals.runtime.env.VAR_NAME`
- Cache API: Use `caches.default` for caching responses
- Background tasks: Use `runtime.waitUntil()` for non-blocking operations

Example pattern from `twitch-status.ts`:
```typescript
export const GET: APIRoute = async ({ request, locals }) => {
  const runtime = locals.runtime;
  const envVar = runtime.env.ENV_VAR_NAME;

  // Use Cloudflare Cache API
  const cache = caches.default;
  const cachedResponse = await cache.match(cacheKey);

  // Background cache write
  if (runtime.waitUntil) {
    runtime.waitUntil(cache.put(cacheKey, response.clone()));
  }
}
```

#### Styling
- Import SCSS in Astro layouts (NOT via link tags): `import '../styles/main.scss'`
- Scoped component styles use `<style>` tags in `.astro` files
- Global styles live in `src/styles/`

#### Client-Side Interactivity
- Component-scoped scripts use `<script>` tags in `.astro` files (see TwitchStatus.astro)
- Larger scripts can live in `public/assets/js/` and be referenced with `<script src="...">`

## Environment Variables

Required for Twitch integration (Cloudflare Pages secrets):
- `TWITCH_CLIENT_ID`
- `TWITCH_CLIENT_SECRET`
- `TWITCH_USERNAME` (defaults to "vocino" if not set)

## Deployment

- **Platform**: Cloudflare Pages
- **Production branch**: `master`
- **Build command**: `npm run build` (includes type checking)
- **Build output**: `dist/`
- Auto-deploys on push to master

## Important Notes

- The README.md still references Jekyll but the project has been migrated to Astro
- Prefer Astro API routes over Cloudflare Pages Functions (best practice for Astro on Cloudflare)
- Always access Cloudflare environment through `locals.runtime.env`, not `process.env`
- TypeScript is configured with strict mode and React JSX support
