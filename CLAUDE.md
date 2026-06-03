# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website for Travis Vocino built with **Astro** (not Jekyll - the README is outdated) and deployed on **Cloudflare Workers** via Wrangler. It uses hybrid rendering: static prerender for content pages, on-demand SSR for API routes. The landing page lives at `/` (external social links only); topic "hubs" — self-contained mini-sites like `/baldurs-gate-3` and `/homelab` — branch off it.

## Development Commands

```bash
# Start development server
npm run dev
# or
npm start

# Build for production (runs type checking first)
npm run build

# Preview production build locally (workerd runtime)
npm run preview

# Deploy locally (optional; production uses Git → Workers Builds)
npm run deploy

# Regenerate Wrangler binding types after wrangler.jsonc changes
npm run cf:types

# Type checking only
astro check

# Twitch game box art — see "Twitch integrations" below
npm run twitch:boxart:refresh

# SteamGridDB hero backgrounds — see "SteamGrid assets" below
npm run steamgrid:assets:refresh
```

## Architecture

### Framework Configuration
- **Output mode**: `server` (hybrid: prerender static pages, SSR for APIs)
- **Adapter**: `@astrojs/cloudflare` v13+ for Cloudflare Workers deployment
- **Wrangler**: [`wrangler.jsonc`](./wrangler.jsonc) — `main` is `@astrojs/cloudflare/entrypoints/server`
- **Site URL**: https://vocino.com
- **Trailing slashes (slashless canonical URLs)**: e.g. `/baldurs-gate-3`, not `/baldurs-gate-3/`. Aligned with Cloudflare **auto-trailing-slash** (default `assets.html_handling`): flat `*.html` files are served without a trailing slash; `*/` requests redirect to the slashless path. Astro: `trailingSlash: 'never'` + `build.format: 'file'` → `baldurs-gate-3.html`, `homelab.html`. SEO: `normalizeCanonicalPath()` + hub `canonicalPath`. Worker-only: `src/middleware.ts` 301-strips slashes on SSR/API routes. Never use `public/_redirects` for slash rules.
- **Redirects**: legacy `/bg3` and `/bg3/*` → `/baldurs-gate-3` and `/baldurs-gate-3/*` (301 via [`public/_redirects`](public/_redirects) for static assets + `src/middleware.ts` for Worker routes). Use `_redirects` only for intentional slug migrations — never for trailing-slash normalization (that caused redirect loops with Workers Assets).

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
│   ├── GoogleAnalytics.astro    # GA4 tag + outbound social click tracking (prod only)
│   └── TwitchStatus.astro       # Live streaming status indicator
├── data/
│   ├── home.ts                  # Homepage data (if used)
│   ├── hubs.ts                  # Hub registry (slug, accent, ogHeroPath — not Twitch box art)
│   ├── seo.ts                   # Site-wide SEO defaults
│   ├── social-profiles.ts       # Canonical social URLs + analytics platform ids
│   └── twitch-game-boxart.ts    # Twitch game ids + static box art paths (see Twitch integrations)
├── layouts/
│   ├── BaseLayout.astro         # Main HTML layout, imports main.scss (head/SEO/fonts/reset)
│   └── HubLayout.astro          # SHARED: opt-in hub wrapper (accent + BrandHome corner)
├── lib/
│   ├── formatIsoDate.ts
│   └── twitch-api.ts            # Helix helpers (box art download script + twitch-status API)
├── pages/
│   ├── index.astro              # Landing page
│   ├── baldurs-gate-3/          # HUB: Baldur's Gate 3 (index + nested guide pages)
│   ├── homelab/                 # HUB: Home Lab (index + nested pages)
│   ├── crimson-desert/          # HUB: Crimson Desert (tabbed character builds)
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
    └── images/
        ├── twitch-boxart/       # Committed Twitch IGDB box art (npm run twitch:boxart:refresh)
        ├── steamgrid-hero/      # Committed SteamGridDB hero assets (npm run steamgrid:assets:refresh)
        ├── og-hero/             # Per-hub OG background sources (generate-og-images.mjs)
        └── og/                  # Generated social preview PNGs (npm run og:build)
```

### Key Architectural Patterns

#### API Routes
- Use **Astro API routes** (in `src/pages/api/`) with `export const prerender = false`
- Environment variables: `getWorkerEnvVar()` from [`src/lib/cloudflare-env.ts`](src/lib/cloudflare-env.ts) (`import { env } from 'cloudflare:workers'`)
- Cache API: use global `caches.default`
- Background tasks: `locals.cfContext.waitUntil()` (Astro 6; replaces `locals.runtime`)

Example pattern from `twitch-status.ts`:
```typescript
import { getWorkerEnvVar } from '../../lib/cloudflare-env';

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  const clientId = getWorkerEnvVar('TWITCH_CLIENT_ID');
  const cached = await caches.default.match(cacheKey);

  const ctx = locals.cfContext;
  if (ctx?.waitUntil) {
    ctx.waitUntil(caches.default.put(cacheKey, response.clone()));
  }
}
```

#### Twitch integrations (two systems — do not conflate)

Twitch touches this repo in **two unrelated ways**. Pick the right one before changing code.

| System | Purpose | When it runs | Key files |
| --- | --- | --- | --- |
| **Live stream status** | Homepage live dot + stream title/game | **Runtime** on each `/api/twitch-status` request | [`twitch-status.ts`](src/pages/api/twitch-status.ts), [`TwitchStatus.astro`](src/components/TwitchStatus.astro), `getWorkerEnvVar('TWITCH_*')` |
| **Game box art** | Static cover images for game hubs | **Build time** only; committed files served from `public/` | [`twitch-game-boxart.ts`](src/data/twitch-game-boxart.ts), [`download-twitch-boxart.mjs`](scripts/download-twitch-boxart.mjs), [`verify-twitch-boxart.mjs`](scripts/verify-twitch-boxart.mjs) |

Shared Helix helpers live in [`src/lib/twitch-api.ts`](src/lib/twitch-api.ts) (used by the download script and optionally by the status route — not by prerendered hub pages for box art).

##### Game box art (build-time static assets)

**Goal:** High-quality IGDB box art as committed WebP files — no Twitch API calls when Astro prerenders hub pages.

- **Registry (single source of truth):** [`src/data/twitch-game-boxart.ts`](src/data/twitch-game-boxart.ts) — `key` = Twitch directory category slug (must match hub `slug` in `hubs.ts`), plus Twitch game id, expected game name, and `publicPath`. **Add new games here only**; do not copy ids into hub `_lib` files.
- **On disk:** `public/assets/images/twitch-boxart/{key}.webp` where `{key}` is that category slug (600×800 source, committed to git).
- **npm scripts:** `twitch:boxart` (download), `twitch:boxart:verify` (assert files exist), `twitch:boxart:refresh` (download + verify). `predev` / `prestart` / `prebuild` run **verify only** so CI passes without Twitch secrets.
- **Refresh:** `npm run twitch:boxart:refresh`. Uses `.dev.vars` / env `TWITCH_CLIENT_ID` + `TWITCH_CLIENT_SECRET` when present (Helix validates ids + names); without creds, downloads from the IGDB CDN URL pattern (`…/ttv-boxart/{id}_IGDB-600x800.jpg`) — still works in CI.

**Hub consumption (no runtime fetch):**

- Import `getTwitchBoxArtPublicPath('crimson-desert')` from the registry, or a thin hub helper that re-exports it (e.g. [`cd-game-art.ts`](src/pages/crimson-desert/_lib/cd-game-art.ts) → `getCrimsonDesertBoxArtUrl()`).
- Use `TWITCH_BOX_ART_DISPLAY_SIZE` for `<img width>` / `height` (288×384).

**Not the same as OG hero images:** [`hubs.ts`](src/data/hubs.ts) `ogHeroPath` (e.g. `public/assets/images/og-hero/bg3.png`) feeds [`generate-og-images.mjs`](scripts/generate-og-images.mjs) for social previews. That pipeline is separate unless you deliberately wire it to `twitch-boxart/`.

**Not the same as SteamGrid heroes:** wide ambient backgrounds (often animated) come from [`steamgrid-assets.ts`](src/data/steamgrid-assets.ts) — see **SteamGrid assets** below.

**Do not:**

- Call `fetchTwitchGames` / `getTwitchAppAccessToken` from Astro pages to resolve box art URLs at prerender.
- Hardcode Twitch game ids or `static-cdn.jtvnw.net` URLs outside the registry + download script.
- Reintroduce per-hub OAuth/box-art fetch logic (removed from Crimson Desert intentionally).

**Adding a new game:** (1) confirm the Twitch category slug from `twitch.tv/directory/category/…`, (2) add hub + registry entries using that exact slug, (3) `npm run twitch:boxart:refresh`, (4) commit the new `.webp`, (5) hub imports `getTwitchBoxArtPublicPath(key)` (optional thin wrapper in that hub’s `_lib/`).

#### SteamGrid assets (build-time hero backgrounds)

**Goal:** Optional wide hero/banner art (including animated WebP) as committed files — no SteamGridDB API calls when Astro prerenders hub pages. Complements Twitch box art (3:4 covers); does not replace it.

- **Registry (single source of truth):** [`src/data/steamgrid-assets.ts`](src/data/steamgrid-assets.ts) — pinned `steamGridAssetId` per entry (permalink from `steamgriddb.com/hero/{id}`). **Add new assets here only**; do not copy ids into hub `_lib` files.
- **On disk:** `public/assets/images/steamgrid-hero/{key}.webp` (animated, resized on refresh) + `{key}.png` (first-frame static fallback for `prefers-reduced-motion`).
- **npm scripts:** `steamgrid:assets` (download), `steamgrid:assets:verify`, `steamgrid:assets:refresh`. `predev` / `prestart` / `prebuild` run **verify only** (no API key required).
- **Refresh:** `npm run steamgrid:assets:refresh`. Uses the public asset endpoint `GET /api/public/asset/hero/{id}` (no auth). The download script resizes to max width 960px and extracts a real PNG static frame (SteamGrid `fake_png` is often animated WebP).
- **Discovery (optional):** v2 API `https://www.steamgriddb.com/api/v2` with `Authorization: Bearer <token>` from [SteamGridDB preferences](https://www.steamgriddb.com/profile/preferences) — use only to browse candidates; **pin a specific asset id** for production.

**Hub consumption (no runtime fetch):**

- Import `getSteamGridHeroBackgroundPaths(key)` from the registry, or a thin hub helper (e.g. [`bg3-game-art.ts`](src/pages/baldurs-gate-3/_lib/bg3-game-art.ts) → `getBg3HeroBackgroundUrls()`).
- Credit authors via registry `creditAuthor` / `creditUrl` when displaying community art.

**Do not:**

- Hotlink `cdn2.steamgriddb.com` in production `<img src>`.
- Fetch SteamGridDB from Astro pages at prerender.
- Conflate with Twitch box art or OG hero pipelines.

**Adding a new hero:** (1) entry in `steamgrid-assets.ts`, (2) `npm run steamgrid:assets:refresh`, (3) commit `.webp` + `.png`, (4) wire hub UI + attribution.

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
- **Homepage** must pass `canonicalPath="/"` (file-build prerender can otherwise emit `/index.html`). `normalizeCanonicalPath()` in `src/lib/seo.ts` strips `.html` suffixes so canonicals match sitemap URLs.
- **Guide hubs** use `HubLayout` with `pageType="article"` (default) for Article JSON-LD + `dateModified` from content frontmatter.
- **Search Console (manual):** After shipping hub or SEO changes, confirm `https://vocino.com/sitemap.xml` is submitted, inspect indexing for `/baldurs-gate-3` and `/homelab`, and request indexing if URLs are not indexed.

#### Analytics and outbound social links
- **GA4** loads via `components/GoogleAnalytics.astro` from `BaseLayout` — **production only** (`import.meta.env.PROD`). Measurement ID: `G-56M2CVYY6T`.
- **Outbound social clicks** are tracked site-wide with a delegated listener on `a[data-social-platform]`. It fires GA4 event `outbound_social` with parameters `social_platform` and `link_url` (beacon transport).
- **Canonical social profiles** live in `src/data/social-profiles.ts`. Homepage nav uses `SocialLinks.astro` + `TwitchStatus.astro`, which read from that file.

**When adding or changing a social link anywhere** (homepage, a hub like `/baldurs-gate-3`, footer, etc.):

1. **Register the profile** in `src/data/social-profiles.ts` — add an entry with stable `id`, `label`, and `href`. Extend the `SocialProfile['id']` union when the platform is new.
2. **Use the registered `href`** from that data (import the profile or map over `socialProfiles`) — do not hardcode duplicate URLs.
3. **Mark the anchor for analytics:** `data-social-platform="{id}"` on the `<a>`, where `{id}` matches the entry in `social-profiles.ts` (e.g. `data-social-platform="instagram"`).
4. Pages must use **`BaseLayout`** (directly or via `HubLayout`) so `GoogleAnalytics` is present. Custom hub shells that skip `BaseLayout` will not track until they include the same component.

Hub-specific social links (e.g. a community Discord on `/baldurs-gate-3`) still follow steps 1–3 — add a hub-relevant `id` to `social-profiles.ts` even if only one page links to it, so analytics stay consistent.

Optional: if the link is a primary identity profile, also add its URL to `siteSeo.person.sameAs` in `src/data/seo.ts`.

#### Client-Side Interactivity
- Component-scoped scripts use `<script>` tags in `.astro` files (see TwitchStatus.astro)
- Larger scripts can live in `public/assets/js/` and be referenced with `<script src="...">`

## Content Hubs (independent mini-sites)

The site is a minimal landing page plus a growing set of **hubs** — self-contained mini-sites (e.g. `/baldurs-gate-3`, `/homelab`) for evergreen, topic-organized reference content (game build guides, home-lab write-ups, AI notes, etc.). This is a **digital garden, not a blog**: pages are organized by topic, not date; there is no reverse-chronological feed and no "posted on" metadata as the organizing principle.

### URL & hierarchy
- Hubs are **flat, top-level slugs** — not nested parents like `/gaming/baldurs-gate-3`.
- **Game hubs:** the `slug` in [`hubs.ts`](src/data/hubs.ts) must match the **Twitch directory category slug** (the last path segment of `https://www.twitch.tv/directory/category/{slug}`). Example: Baldur's Gate 3 → `baldurs-gate-3`, Crimson Desert → `crimson-desert`. The same string is the `key` in [`twitch-game-boxart.ts`](src/data/twitch-game-boxart.ts). Do not use abbreviations (`bg3`) or invent a different slug.
- **Non-game hubs** (e.g. homelab): pick a clear kebab-case slug; no Twitch category applies.
- Pages *within* a hub nest under it: `/baldurs-gate-3/<guide-slug>`.
- `src/pages/<slug>/` must match the hub `slug`.
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
- `BrandHome` / `.site-brand` use `color: var(--section-accent, var(--brand))`, so the logo automatically tints to the hub's color (green on `/baldurs-gate-3`, amber on `/homelab`, cyan at root). **This variable is the mechanism for per-hub color** — set the accent once and the shared chrome follows.
- Placeholder hubs render `<ComingSoon>` and pass `noindex` to `HubLayout` (thin content shouldn't be indexed). Remove `noindex` when real content ships.

### Hub independence — CRITICAL for AI agents (read this before editing any hub)
**Each hub is an intentionally independent mini-site.** Hubs may have wildly different layouts, typography, color, interactions, and even their own fonts. A hub can skip `HubLayout` entirely and build its own `<html>/<body>` shell — the *only* requirement is that it includes `<BrandHome />` (the one constant) linking home.

Because of this, when working in the codebase:
- **Do NOT treat one hub's code as a house pattern to copy.** Anything inside `src/pages/baldurs-gate-3/` (styles, components, conventions) is local to BG3 *by design*. It is **not** the site's style and must **not** be propagated to other hubs, to the shared layer, or to the landing page.
- **Do NOT "harmonize" or "fix" visual differences between hubs.** Divergence is the intended design, not drift.
- **Scope changes to the hub you're working in.** Only touch the shared layer (listed above) when the change is genuinely meant for *every* hub — and say so explicitly.
- **Social / outbound profile links in a hub** must follow **Analytics and outbound social links** above (`social-profiles.ts` + `data-social-platform`) — not ad-hoc URLs or untracked anchors.
- Per-hub specifics (slug, accent color, local conventions) live in the **Hub registry** below. Check it before editing a hub.

### Hub registry
The authoritative list of hubs and their fixed properties. Update this when adding or changing a hub.

| Hub | Slug | Accent | Status | Notes |
| --- | --- | --- | --- | --- |
| Baldur's Gate 3 | `/baldurs-gate-3` | `#46E08B` (green) | Live (`indexable`) | Twitch category `baldurs-gate-3`. Legacy `/bg3` 301s here. Build catalogue + SteamGrid hero (85263). OG: `og-hero/bg3.png`. |
| Home Lab | `/homelab` | `#FFB86B` (amber) | Live (`indexable`) | Not a Twitch category. Self-hosted media stack (Docker Compose, *arr, Jellyfin). Pages nest as `/homelab/<page-slug>`. |
| Crimson Desert | `/crimson-desert` | `#D44D37` (ember) | Live (`indexable`) | Twitch category `crimson-desert`. Tabbed build notes (Kliff live). Guide icons: `npm run cd:icons:refresh`. SteamGrid hero (168164). |

### Adding a new hub
1. **Game hub:** set `slug` to the Twitch directory category slug (`twitch.tv/directory/category/{slug}`). **Other hubs:** choose a descriptive kebab-case slug.
2. Create `src/pages/<slug>/index.astro`.
3. Either use `HubLayout` (fast path — inherits the shared vibe) **or** build a custom shell that includes `<BrandHome />`.
4. Add/update the hub entry in `src/data/hubs.ts` (slug, name, description, accent, `indexable`). For game hubs, add matching `twitch-game-boxart.ts` entry with the same `key`.
5. While it's a placeholder, render `<ComingSoon>` and keep `indexable: false` + `noindex`. Flip to `indexable: true` only once the hub has real, indexable content (the sitemap is generated automatically).
6. **Do NOT add a `CLAUDE.md` inside `src/pages/<slug>/`** — Astro routes any `.md` under `src/pages/` as a public page (e.g. `/baldurs-gate-3/claude`). Keep per-hub notes in the Hub registry instead.

## Environment Variables

**Twitch live status (required in production for `/api/twitch-status`):**
- `TWITCH_CLIENT_ID`
- `TWITCH_CLIENT_SECRET`
- `TWITCH_USERNAME` (defaults to "vocino" if not set)

**Twitch game box art (optional):** same `TWITCH_CLIENT_ID` / `TWITCH_CLIENT_SECRET` in `.dev.vars` only when running `npm run twitch:boxart:refresh` locally to validate ids via Helix. Builds and prerendered hubs do not need these for box art — committed WebP files are enough. See **Twitch integrations**.

## Deployment

- **Platform**: Cloudflare Workers (`vocino-com`), connected to GitHub `vocino/vocino.com`
- **Production branch**: `master` — push triggers Workers Builds automatically
- **Workers Builds**: build `npm run build`, deploy `npx wrangler deploy` (see `wrangler.jsonc`)
- **Build output**: `dist/client` (static) + `dist/server` (Worker)
- **Node**: `22` (`.nvmrc` / `package.json` `engines`)
- **Production secrets**: Cloudflare dashboard → Worker **Variables and Secrets** (`TWITCH_*`, optional `INSTAGRAM_*`)
- **Local Worker vars**: `.dev.vars` (copy Twitch/Instagram keys from `.env.example`) — **gitignored**
- **Local Wrangler CLI auth**: `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` in `.env` only — **gitignored**
- **Observability**: Workers Logs enabled in `wrangler.jsonc` (invocation logs on, traces off)

**Local deploy (optional):** `npm run deploy`. Routine updates are `git push` only.

## Important Notes

- The README.md still references Jekyll but the project has been migrated to Astro
- Prefer Astro API routes over legacy Pages Functions
- Access environment through `cloudflare:workers` (`getWorkerEnvVar`), not `process.env`
- Run `npm run cf:types` after changing `wrangler.jsonc` bindings
- TypeScript is configured with strict mode and React JSX support
- **Hubs are independent mini-sites.** Before editing anything under `src/pages/<hub>/`, read the "Content Hubs" section above (including the Hub registry). Do not copy one hub's styles/patterns into another hub or the shared layer.

## Agent context (Cursor / Claude Code)

This file is the **single source of truth**. Cursor and Claude Code auto-apply it every session.

- **[AGENTS.md](./AGENTS.md)** — thin index for Cursor; points here. Do not duplicate architecture there.
- **`.cursor/rules/*.mdc`** — file-scoped pointers into sections of this doc. Update this file when conventions change; keep rules as pointers only.
