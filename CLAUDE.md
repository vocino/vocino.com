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
- **Trailing slashes**: canonical URLs omit trailing slashes (e.g. `/bg3`, not `/bg3/`). `src/middleware.ts` 301-redirects `/bg3/` → `/bg3` (and likewise for other paths).
- **Redirects**: none currently (`/bg3` is now a real hub, not a redirect)

### Project Structure

```
src/
├── components/                  # Reusable Astro components
│   ├── SEO.astro                # Meta tags + OG/Twitter/JSON-LD + Google Fonts
│   ├── BrandMark.astro          # SHARED: the logo SVG geometry (single source of truth)
│   ├── SiteBrand.astro          # Logo as a non-link (homepage hero), wraps BrandMark
│   ├── BrandHome.astro          # SHARED: persistent top-left logo linking to "/" (on every hub)
│   ├── ComingSoon.astro         # SHARED: placeholder body for not-yet-built hubs
│   ├── SocialLinks.astro        # External social icons on the landing page
│   └── TwitchStatus.astro       # Live streaming status indicator
├── data/
│   └── home.ts                  # Homepage data (if used)
├── layouts/
│   ├── BaseLayout.astro         # Main HTML layout, imports main.scss (head/SEO/fonts/reset)
│   └── HubLayout.astro          # SHARED: opt-in hub wrapper (accent + BrandHome corner)
├── lib/
│   └── formatIsoDate.ts
├── pages/
│   ├── index.astro              # Landing page
│   ├── bg3.astro                # HUB: Baldur's Gate 3 (nested pages go in bg3/)
│   ├── homelab.astro            # HUB: Home Lab (nested pages go in homelab/)
│   └── api/                     # Astro API routes (Cloudflare runtime)
│       ├── twitch-status.ts
│       └── instagram-stickers.ts
├── styles/                      # SCSS files (entry: main.scss) — the SHARED design system
│   ├── main.scss                # Imports the partials below in order
│   ├── _variables.scss          # Design tokens (colors, fonts, spacing, cyber chrome)
│   ├── _base.scss               # Resets + base element styles (bg, links, headings)
│   ├── _layout.scss             # Homepage layout, brand/logo styles + animations
│   ├── _hacker.scss             # Hacker/HUD utility classes (label-mono, hud-corners…)
│   ├── _utilities.scss
│   ├── _home-micro.scss
│   └── _style-guide.scss
public/
├── sitemap.xml                  # Static sitemap (hand-maintained; list only indexable pages)
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
- `BaseLayout` provides the shared foundation — design tokens, fonts, reset, and the base background — and is where global styling applies. **Prefer `BaseLayout` over a custom `<html>/<body>` shell** for anything that should live inside the site's design system. (Exception: a hub that intentionally diverges may build its own shell — see "Content Hubs" below.)

#### SEO and metadata standardization
- Site-wide SEO defaults live in `src/data/seo.ts` and helper logic in `src/lib/seo.ts`.
- `BaseLayout` routes all metadata through `components/SEO.astro`; do not hand-roll per-page head tags unless there is a clear exception.
- Use `pageType` (`home`, `hub`, `article`, `generic`) so title templates + default JSON-LD schemas are applied consistently.
- Hub defaults (name/slug/description/accent/indexability) live in `src/data/hubs.ts`. Hub pages should consume these defaults rather than duplicating strings.
- Dynamic sitemap is served by `src/pages/sitemap.xml.ts`; it includes `/` plus hubs marked `indexable: true` in the hub registry.
- Placeholder/thin hubs must keep `indexable: false` and pass `noindex` until real content is published.

#### Client-Side Interactivity
- Component-scoped scripts use `<script>` tags in `.astro` files (see TwitchStatus.astro)
- Larger scripts can live in `public/assets/js/` and be referenced with `<script src="...">`

## Content Hubs (independent mini-sites)

The site is a minimal landing page plus a growing set of **hubs** — self-contained mini-sites (e.g. `/bg3`, `/homelab`) for evergreen, topic-organized reference content (game build guides, home-lab write-ups, AI notes, etc.). This is a **digital garden, not a blog**: pages are organized by topic, not date; there is no reverse-chronological feed and no "posted on" metadata as the organizing principle.

### URL & hierarchy
- Hubs are **flat, top-level slugs**: `/bg3`, `/homelab` — NOT `/gaming/bg3`.
- Pages *within* a hub nest under it: `/bg3/<guide-slug>`.
- Grouping (e.g. "all my gaming stuff") is a **curated view** — a future `/directory`-style page that *links* to hubs — never a URL parent. Adding a grouping page must never move a hub's slug.

### The shared layer — changing these affects EVERY hub
Only a few things are shared across hubs; treat edits here as cross-cutting and intentional:
- `components/BrandMark.astro` — the logo SVG geometry. Single source of truth for the mark.
- `components/BrandHome.astro` — the persistent top-left logo linking to `/`. **The one visual constant on every hub.** Re-tints to the hub accent.
- `layouts/HubLayout.astro` — opt-in wrapper: `<head>`/SEO/fonts (via `BaseLayout`) + the `BrandHome` corner + the per-hub accent.
- `components/ComingSoon.astro` — shared placeholder body for not-yet-built hubs.

### How a hub wires up
```
BaseLayout (head, SEO, fonts, reset, tokens)
  └─ HubLayout (sets --section-accent, renders fixed BrandHome corner)
       └─ <slot/>  = the hub's own content (free to design)
```
- A hub page passes `accent="#RRGGBB"` to `HubLayout`, which sets `--section-accent` on the hub wrapper.
- `BrandHome` / `.site-brand` use `color: var(--section-accent, var(--brand))`, so the logo automatically tints to the hub's color (green on `/bg3`, amber on `/homelab`, cyan at root). **This variable is the mechanism for per-hub color** — set the accent once and the shared chrome follows.
- Placeholder hubs render `<ComingSoon>` and pass `noindex` to `HubLayout` (thin content shouldn't be indexed). Remove `noindex` when real content ships.

### Hub independence — CRITICAL for AI agents (read this before editing any hub)
**Each hub is an intentionally independent mini-site.** Hubs may have wildly different layouts, typography, color, interactions, and even their own fonts. A hub can skip `HubLayout` entirely and build its own `<html>/<body>` shell — the *only* requirement is that it includes `<BrandHome />` (the one constant) linking home.

Because of this, when working in the codebase:
- **Do NOT treat one hub's code as a house pattern to copy.** Anything inside `src/pages/bg3/` (styles, components, conventions) is local to BG3 *by design*. It is **not** the site's style and must **not** be propagated to other hubs, to the shared layer, or to the landing page.
- **Do NOT "harmonize" or "fix" visual differences between hubs.** Divergence is the intended design, not drift.
- **Scope changes to the hub you're working in.** Only touch the shared layer (listed above) when the change is genuinely meant for *every* hub — and say so explicitly.
- Per-hub specifics (slug, accent color, local conventions) live in the **Hub registry** below. Check it before editing a hub.

### Hub registry
The authoritative list of hubs and their fixed properties. Update this when adding or changing a hub.

| Hub | Slug | Accent | Status | Notes |
| --- | --- | --- | --- | --- |
| Baldur's Gate 3 | `/bg3` | `#46E08B` (green) | Placeholder (`ComingSoon`, `noindex`) | Builds, run notes, honour-mode guides. Pages nest as `/bg3/<guide-slug>`. |
| Home Lab | `/homelab` | `#FFB86B` (amber) | Placeholder (`ComingSoon`, `noindex`) | Hardware, self-hosting, infra write-ups. Pages nest as `/homelab/<page-slug>`. |

### Adding a new hub
1. Create `src/pages/<slug>/index.astro`.
2. Either use `HubLayout` (fast path — inherits the shared vibe) **or** build a custom shell that includes `<BrandHome />`.
3. Add/update the hub entry in `src/data/hubs.ts` (slug, name, description, accent, `indexable`).
4. While it's a placeholder, render `<ComingSoon>` and keep `indexable: false` + `noindex`. Flip to `indexable: true` only once the hub has real, indexable content (the sitemap is generated automatically).
5. **Do NOT add a `CLAUDE.md` inside `src/pages/<slug>/`** — Astro routes any `.md` under `src/pages/` as a public page (e.g. `/bg3/claude`). Keep per-hub notes in the Hub registry instead.

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
- **Hubs are independent mini-sites.** Before editing anything under `src/pages/<hub>/`, read the "Content Hubs" section above (including the Hub registry). Do not copy one hub's styles/patterns into another hub or the shared layer.

## Agent context (Cursor / Claude Code)

This file is the **single source of truth**. Cursor and Claude Code auto-apply it every session.

- **[AGENTS.md](./AGENTS.md)** — thin index for Cursor; points here. Do not duplicate architecture there.
- **`.cursor/rules/*.mdc`** — file-scoped pointers into sections of this doc. Update this file when conventions change; keep rules as pointers only.
