# Vocino.com v2 - Astro Migration with Twitch Status Design

**Date:** January 25, 2026  
**Status:** Design Complete - Ready for Implementation

## Goal

Migrate vocino.com from Jekyll to Astro while preserving the current design aesthetic, and add dynamic Twitch status indicator using Cloudflare Pages Functions for API integration.

## Architecture

**Framework:** Astro (static-first with islands for dynamic components)  
**Deployment:** Cloudflare Pages  
**API Integration:** Cloudflare Pages Functions (serverless functions)  
**Design:** Preserve existing SCSS variables, layout patterns, and visual style

### Key Architectural Decisions

1. **Static-first approach** - Most of the site remains static HTML/CSS for optimal performance and SEO
2. **Islands architecture** - Only the Twitch status indicator uses client-side hydration (minimal JavaScript)
3. **Server-side API proxy** - Cloudflare Pages Function handles Twitch API calls, caching, and API key security
4. **Design preservation** - Migrate existing SCSS variables and styles to Astro's styling system

## Data Flow

1. **Page Load:** Static HTML renders immediately with placeholder/offline state for Twitch indicator
2. **Component Hydration:** Astro Island component hydrates on client-side
3. **API Request:** Component calls `/api/twitch-status` endpoint
4. **Pages Function:** Checks cache (30-60 second TTL), calls Twitch API if needed, returns JSON
5. **UI Update:** Component updates indicator with online/offline status and current game/title

## Components

### Twitch Status Indicator
- **Location:** Near social links on homepage
- **Display:** Small badge/icon showing online/offline status
- **Details:** Shows current game/title when online (optional tooltip or small text)
- **Styling:** Matches existing social link styling, uses `--success` color for online, muted for offline

### Cloudflare Pages Function
- **Path:** `/functions/api/twitch-status.ts`
- **Method:** GET
- **Response:** JSON with `{ online: boolean, game?: string, title?: string }`
- **Caching:** 30-60 second cache using Cloudflare Cache API
- **Error Handling:** Returns offline state on API errors

## Migration Strategy

1. **Setup Astro project** - Initialize new Astro project with Cloudflare adapter
2. **Migrate styles** - Convert SCSS files to Astro's styling approach (SCSS still supported)
3. **Migrate layouts** - Convert Jekyll layouts to Astro layouts
4. **Migrate pages** - Convert HTML pages to Astro components/pages
5. **Preserve terminal easter egg** - Migrate terminal.js as client-side component
6. **Add Twitch integration** - Create Pages Function and Astro Island component
7. **Update deployment config** - Configure Cloudflare Pages for Astro build

## Technical Stack

- **Framework:** Astro 4.x
- **Adapter:** @astrojs/cloudflare
- **Styling:** SCSS (via @astrojs/sass or similar)
- **Runtime:** Cloudflare Pages Functions
- **API:** Twitch Helix API (requires Client ID and Client Secret)

## Environment Variables

- `TWITCH_CLIENT_ID` - Twitch API Client ID
- `TWITCH_CLIENT_SECRET` - Twitch API Client Secret
- `TWITCH_USERNAME` - Twitch username to check status for

## Success Criteria

- [ ] Site renders identically to current Jekyll version
- [ ] Twitch status indicator shows correct online/offline state
- [ ] API calls are cached appropriately (30-60 seconds)
- [ ] Terminal easter egg works as before
- [ ] All pages (homepage, about) render correctly
- [ ] SEO metadata preserved
- [ ] Performance metrics maintained or improved
- [ ] Deployed successfully to Cloudflare Pages

## Future Extensibility

This architecture enables easy addition of:
- Other API integrations (GitHub activity, blog posts, etc.)
- More dynamic components using Astro Islands
- Server-side rendering for specific pages if needed
- Edge-side includes for dynamic content
