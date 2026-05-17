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
├── components/                  # Reusable Astro components
│   ├── SEO.astro                # Meta tags + OG/Twitter/JSON-LD + Google Fonts
│   ├── SiteBrand.astro          # Site logo/branding
│   ├── SocialLinks.astro
│   ├── GlobalHamburgerMenu.astro # Site-wide slide-out nav (rendered by BaseLayout)
│   ├── TwitchStatus.astro       # Live streaming status indicator
│   ├── InstagramStickers.astro
│   ├── HomeLivePanel.astro
│   └── bg3/                     # /bg3 guide components
│       └── BG3Checklist.astro
├── data/
│   ├── home.ts                  # Homepage identity / now / contact data
│   ├── site-nav.ts              # Hamburger-menu links (home, gaming, elsewhere)
│   └── bg3/                     # /bg3 guide content (typed)
│       ├── types.ts             # CheckItem, CheckSection, Tag
│       ├── now.ts               # Now tab — act lists, rest, Thay, approval gates
│       ├── levels.ts            # L1–L12 progression
│       ├── gear.ts              # Items per act
│       ├── coven.ts             # Companions + Lore Rules
│       └── setup.ts             # Character creation
├── layouts/
│   └── BaseLayout.astro         # Main HTML layout, imports main.scss, mounts GlobalHamburgerMenu
├── lib/
│   └── formatIsoDate.ts
├── pages/
│   ├── index.astro              # Homepage
│   ├── bg3.astro                # /bg3 — Baldur's Gate 3 Necromancer mini-site
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
│   ├── _style-guide.scss
│   └── _bg3.scss                # /bg3 mini-site styles (see "Game guides" below)
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
- For new top-level sections that need their own identity, see the "Game guides (mini-sites)" pattern below — it's how `/bg3` is built and is the prescribed pattern for any future per-topic mini-site (e.g. World of Warcraft).

#### Client-Side Interactivity
- Component-scoped scripts use `<script>` tags in `.astro` files (see TwitchStatus.astro)
- Larger scripts can live in `public/assets/js/` and be referenced with `<script src="...">`

#### Game guides (mini-sites)

Routes like `/bg3` are self-contained second-screen companions for a game playthrough — phone-first, checklist-driven, with `localStorage` progress. They are styled as **sections of the main site, not standalone pages**: same chrome, same fonts, same UI vocabulary — only the accent color changes per game.

**Three-layer separation** keeps content, presentation, and behavior independently editable:

| Concern | Lives in | Per-guide?            |
|---------|----------|-----------------------|
| Content (typed data) | `src/data/<game>/*.ts` | Yes |
| Presentation (SCSS)  | `src/styles/_<game>.scss`, scoped to `.<game>-section` | Yes |
| Markup + behavior    | `src/pages/<game>.astro` + inline `<script is:inline>` | Yes |

**Section-accent token convention.** The `.<game>-section` root binds a small set of CSS custom properties. Every UI primitive inside the section (tabs, buttons, checkbox accent, details borders, count badges, glow, lore tag pills) consumes these vars. To retone an entire guide, override the variables at the section root — nothing else needs to change.

```scss
.bg3-section {
  --section-accent:        #9D7CFF;            // primary
  --section-accent-bright: #C4B0FF;            // hover / active
  --section-accent-dim:    rgba(157, 124, 255, 0.18);
  --section-accent-soft:   rgba(157, 124, 255, 0.08);
  --section-frame:         rgba(157, 124, 255, 0.32);
  --section-glow:          0 0 24px rgba(157, 124, 255, 0.22);
}
```

**Existing guides:**
- `/bg3` — Baldur's Gate 3 Necromancer. Accent: necromancy violet `#9D7CFF` (matches `--accent-purple`).

**How to add a new game guide (e.g. `/wow`):**

1. Add the route to `src/data/site-nav.ts` under `gaming`.
2. Clone `src/data/bg3/` → `src/data/wow/`. Reuse `CheckItem` / `CheckSection` from `types.ts` for any checklist-shaped content; add new types as needed.
3. Clone `src/styles/_bg3.scss` → `src/styles/_wow.scss`. Replace every `.bg3-*` class with `.wow-*`. Pick the game's accent color and rebind the `--section-accent-*` block. Append `@use "wow";` to `src/styles/main.scss`.
4. Clone `src/pages/bg3.astro` → `src/pages/wow.astro`. The page must:
   - Wrap content in `<BaseLayout>` (do **not** write a custom `<html>/<body>`).
   - Wrap all content in `<section class="wow-section">` so the accent vars cascade.
   - Render `BG3Checklist`-equivalent components against the new data.
   - Mount the fixed tabbar `<nav class="wow-tabbar">` at the BaseLayout slot root (not inside `.wow-section`).
   - Use a fresh `localStorage` key (e.g. `wow-guide-v1`) and a fresh set of tab/hash-prefix names.
5. Optionally extract `BG3Checklist.astro` → a shared `components/guide/GuideChecklist.astro` if/when the second guide actually needs it. **Don't extract preemptively** — wait for the second consumer.
6. Verify with `npm run build` (runs `astro check`). Smoke-test the page in `npm run dev`.

**Why these conventions:**
- **`BaseLayout` always** — guarantees the site chrome (dot grid, scanlines, fonts, hamburger menu, SEO/OG) is inherited and not re-implemented.
- **Section-scoped CSS file, not inline `<style>`** — keeps the page file scannable and lets the design system enforce the accent-token pattern via one shared linting target.
- **Typed data over hardcoded markup** — makes mid-playthrough content tweaks fast (edit one TS array) and prevents content rot inside JSX/Astro markup.
- **No premature `.guide-*` abstraction** — with one consumer (`/bg3`), the right shared shape isn't obvious. After the second guide ships, refactor `.bg3-*` / `.wow-*` into `.guide-*` + modifier classes.

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
