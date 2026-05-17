# AGENTS

This repository is **vocino.com** — Travis Vocino's personal site (Astro + Cloudflare Pages SSR).

## Source of truth

Follow **[CLAUDE.md](./CLAUDE.md)** for architecture, commands, styling, API routes, deployment, and game-guide conventions. If anything conflicts with a guess or outdated README, prefer `CLAUDE.md` and the code.

## Cursor rules

Project rules live in `.cursor/rules/`:

| Rule | When it applies |
|------|-----------------|
| `vocino-project.mdc` | Always |
| `cloudflare-api-routes.mdc` | `src/pages/api/**` |
| `game-guides.mdc` | BG3 guide files (data, page, components, `_bg3.scss`) |
| `astro-styling.mdc` | `*.astro`, `src/styles/**` |

## Quick constraints

- **Stack**: Astro (SSR), `@astrojs/cloudflare`, TypeScript strict — not Jekyll.
- **Layouts**: Use `BaseLayout`; do not hand-roll `<html>/<body>` shells.
- **API**: Astro API routes in `src/pages/api/`; env via `locals.runtime.env` in production (see existing routes for local fallbacks).
- **Styles**: Import `main.scss` from layouts; use design tokens in `_variables.scss` and HUD utilities in `_hacker.scss`.
- **Game guides**: Three layers — `src/data/<game>/`, `src/styles/_<game>.scss`, `src/pages/<game>.astro`. No premature shared abstractions until a second guide needs them.
- **Verify**: `npm run build` before finishing substantive changes.
