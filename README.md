# vocino.com

Personal website for Travis Vocino built with Astro 6 and deployed on Cloudflare Workers.

## Quick Start

### Prerequisites
- Node.js (version 18 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vocino/vocino.com.git
cd vocino.com
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your Twitch API credentials
```

4. Run the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:4321`

## Development

### Local Development
```bash
# Start development server with hot reload
npm run dev
# or
npm start

# Type checking only
npm run astro check
```

### Building for Production
```bash
npm run build
```

The compiled site will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## Deployment

Production deploys via **Cloudflare Workers Builds** when you push to `master` on GitHub (`vocino/vocino.com`). Content pages are prerendered at build time; API routes run on-demand in the Worker.

### Cloudflare Workers Builds (dashboard)

| Setting | Value |
|--------|--------|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Production branch | `master` |
| Node | `22` (`.nvmrc`) |
| Worker name | `vocino-com` |

**Variables and Secrets** (Worker runtime, set in dashboard): `TWITCH_CLIENT_ID`, `TWITCH_CLIENT_SECRET`, `TWITCH_USERNAME`, optional Instagram vars — see `.env.example`.

**Local only:** `.dev.vars` for Worker dev secrets; `.env` for Wrangler CLI auth. `npm run deploy` if you need a manual deploy.

## Project Structure

```
.
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── SEO.astro       # Meta tags and SEO handling
│   │   ├── SiteBrand.astro # Site logo/branding
│   │   ├── SocialLinks.astro
│   │   └── TwitchStatus.astro # Live streaming status indicator
│   ├── layouts/
│   │   └── BaseLayout.astro # Main HTML layout
│   ├── pages/
│   │   ├── index.astro     # Homepage
│   │   └── api/
│   │       └── twitch-status.ts # Astro API route for Twitch API
│   └── styles/             # SCSS files
│       ├── main.scss       # Main stylesheet
│       ├── _variables.scss # Design tokens
│       ├── _base.scss      # Base styles
│       ├── _layout.scss    # Layout-specific styles
│       ├── _style-guide.scss
│       └── _utilities.scss
├── public/
│   └── assets/
│       └── images/         # Static images
├── astro.config.mjs        # Astro configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Node dependencies
```

## Features

- **Server-Side Rendering** - Powered by Astro with Cloudflare adapter
- **Twitch Integration** - Live streaming status indicator with caching
- **Modern SCSS** - Using @use syntax with design tokens
- **TypeScript** - Type-safe development
- **Cloudflare Cache API** - API response caching for performance

## Customization

### Update Site Information
Edit `src/layouts/BaseLayout.astro` and `src/components/SEO.astro` to update:
- Site title and description
- Meta tags and social sharing
- Favicon and icons

### Modify Styling
- Design tokens: `src/styles/_variables.scss`
- Base styles: `src/styles/_base.scss`
- Layout: `src/styles/_layout.scss`
- All styles use modern `@use` syntax (Dart Sass 3.0 ready)

### Add Content
Edit `src/pages/index.astro` or create new pages in `src/pages/` to add content.

### API Routes
Create new API endpoints in `src/pages/api/` with `export const prerender = false`. Use `getWorkerEnvVar()` from `src/lib/cloudflare-env.ts` for secrets.

## Environment Variables

Local development uses `.env` file:
```env
TWITCH_CLIENT_ID=your_client_id_here
TWITCH_CLIENT_SECRET=your_client_secret_here
TWITCH_USERNAME=vocino
```

Local Worker dev uses `.dev.vars` (Twitch/Instagram keys from `.env.example`). Wrangler CLI auth uses `.env` for `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` (both files are gitignored). Production uses `wrangler secret put` or dashboard variables.

## License

Personal website - all rights reserved.

## Author

Travis Vocino
- Website: [vocino.com](https://vocino.com)
- Threads: [@vocino](https://threads.net/@vocino)
- Instagram: [@vocino](https://instagram.com/vocino)
- GitHub: [@vocino](https://github.com/vocino)
- Email: travis@vocino.com
