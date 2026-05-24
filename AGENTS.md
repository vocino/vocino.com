# AGENTS

This repository is **vocino.com** — Travis Vocino's personal site (Astro + Cloudflare Pages SSR). Single-page landing at `/`.

## Source of truth

Follow **[CLAUDE.md](./CLAUDE.md)** for architecture, commands, styling, API routes, and deployment. If anything conflicts with a guess or outdated README, prefer `CLAUDE.md` and the code.

## Cursor rules

Project rules live in `.cursor/rules/`:

| Rule | When it applies |
|------|-----------------|
| `vocino-project.mdc` | Always |
| `cloudflare-api-routes.mdc` | `src/pages/api/**` |
| `astro-styling.mdc` | `*.astro`, `src/styles/**` |

## Quick constraints

- **Stack**: Astro (SSR), `@astrojs/cloudflare`, TypeScript strict — not Jekyll.
- **Layouts**: Use `BaseLayout`; do not hand-roll `<html>/<body>` shells.
- **SEO**: Use `BaseLayout`/`SEO.astro` contract (`pageType`, canonical, schema). Hub defaults come from `src/data/hubs.ts`; site defaults from `src/data/seo.ts`; sitemap is `src/pages/sitemap.xml.ts`.
- **API**: Astro API routes in `src/pages/api/`; env via `locals.runtime.env` in production (see existing routes for local fallbacks).
- **Styles**: Import `main.scss` from layouts; use design tokens in `_variables.scss` and HUD utilities in `_hacker.scss`.
- **Verify**: `npm run build` before finishing substantive changes.
