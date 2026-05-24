# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website for Travis Vocino built with **Astro** (not Jekyll - the README is outdated) and deployed on **Cloudflare Pages**. It uses server-side rendering (SSR) with the Cloudflare adapter. The landing page lives at `/` (external social links only); topic "hubs" — self-contained mini-sites like `/bg3` and `/homelab` — branch off it.

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
- **Redirects**: `/bg3` → `/` (see `astro.config.mjs`)

### Project Structure

```
src/
├── components/                  # Reusable Astro components
│   ├── SEO.astro                # Meta tags + OG/Twitter/JSON-LD + Google Fonts
│   ├── SiteBrand.astro          # Site logo (non-link)
│   ├── SocialLinks.astro        # External social icons on the landing page
│   └── TwitchStatus.astro       # Live streaming status indicator
├── data/
│   └── home.ts                  # Homepage data (if used)
├── layouts/
│   └── BaseLayout.astro         # Main HTML layout, imports main.scss
├── lib/
│   └── formatIsoDate.ts
├── pages/
│   ├── index.astro              # Homepage (only public page)
│   └── api/                     # Astro API routes (Cloudflare runtime)
│       ├── twitch-status.ts
│       └── instagram-stickers.ts
├── styles/                      # SCSS files (entry: main.scss)
│   ├── main.scss                # Imports the partials below in order
│   ├── _variables.scss          # Design tokens (colors, fonts, spacing, cyber chrome)
│   ├── _base.scss               # Resets, body chrome (dot grid, scanlines, vignette)
│   ├── _layout.scss             # Homepage layout + animations
│   ├── _hacker.scss             # Hacker/HUD utility classes (label-mono, hud-corners…)
│   ├── _utilities.scss
│   ├── _home-micro.scss
│   └── _style-guide.scss
public/
└── assets/
    └── images/                  # Static images
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
- The site has a cyberpunk/hacker aesthetic. Design tokens live in `_variables.scss` (`--bg`, `--surface-1/2`, `--border`, `--text-primary/secondary/muted`, `--brand`, `--accent-blue`, `--accent-purple`, `--accent-yellow`, cyber chrome). Fonts: Source Sans 3 (body), Source Serif 4 (display), Source Code Pro (mono).
- Reusable HUD utilities are in `_hacker.scss`: `.label-mono`, `.heading-bracket`, `.hud-corners`, `.telemetry-rail`, `.accent-block`, `.terminal-prefix`, `.cursor-blink`, `.status-block`.
- Body chrome (dot grid, scanlines, ambient drift, vignette) is owned by `_base.scss` and applies automatically when a page renders inside `BaseLayout`. **Prefer `BaseLayout` over a custom `<html>/<body>` shell** so the page lives inside the site's design system.

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

**Important:** This project uses **Astro 5** with `@astrojs/cloudflare` v12 because Cloudflare Pages expects the `dist/_worker.js` build layout. Astro 6 removed Cloudflare Pages support; migrating to Astro 6 requires moving the deploy target to Cloudflare Workers (`wrangler deploy`).

## Important Notes

- The README.md still references Jekyll but the project has been migrated to Astro
- Prefer Astro API routes over Cloudflare Pages Functions (best practice for Astro on Cloudflare)
- Always access Cloudflare environment through `locals.runtime.env`, not `process.env`
- TypeScript is configured with strict mode and React JSX support
