# AGENTS

**Source of truth:** [CLAUDE.md](./CLAUDE.md) — architecture, commands, styling, API routes, hubs, deployment. If anything here, in README, or in a rule conflicts with `CLAUDE.md` or the code, follow `CLAUDE.md` and the code.

## Cursor rules

Scoped pointers into `CLAUDE.md` (only load when matching files are in context):

| Rule | Globs | CLAUDE.md section |
|------|-------|-------------------|
| `content-hubs.mdc` | `src/pages/*/**`, hub shared components | Content Hubs |
| `cloudflare-api-routes.mdc` | `src/pages/api/**` | API Routes |
| `astro-styling.mdc` | `**/*.astro`, `src/styles/**` | Styling, Project Structure |

Do not duplicate `CLAUDE.md` content in these files — update `CLAUDE.md` instead.

For SEO/metadata, see CLAUDE.md → **SEO and metadata standardization** (`src/data/seo.ts`, `src/data/hubs.ts`, `src/pages/sitemap.xml.ts`).
