# vocino.com

Personal website for Travis Vocino built with Astro and deployed on Cloudflare Pages.

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

This site is deployed on Cloudflare Pages with server-side rendering (SSR). Changes pushed to the `master` branch automatically trigger a new build and deployment.

### Cloudflare Pages Configuration

- **Production branch**: `master`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Framework preset**: Astro
- **Stack note**: Astro 5 + `@astrojs/cloudflare` v12 (required for Pages SSR). Astro 6 needs Cloudflare Workers instead — see [Astro Cloudflare adapter docs](https://docs.astro.build/en/guides/integrations-guide/cloudflare/#removed-cloudflare-pages-support).
- **Environment variables** (set in Cloudflare dashboard):
  - `TWITCH_CLIENT_ID`
  - `TWITCH_CLIENT_SECRET`
  - `TWITCH_USERNAME` (defaults to "vocino")

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
Create new API endpoints in `src/pages/api/` - they'll have access to Cloudflare runtime via `locals.runtime`.

## Environment Variables

Local development uses `.env` file:
```env
TWITCH_CLIENT_ID=your_client_id_here
TWITCH_CLIENT_SECRET=your_client_secret_here
TWITCH_USERNAME=vocino
```

Production uses Cloudflare Pages environment variables (set in dashboard).

## License

Personal website - all rights reserved.

## Author

Travis Vocino
- Website: [vocino.com](https://vocino.com)
- Threads: [@vocino](https://threads.net/@vocino)
- Instagram: [@vocino](https://instagram.com/vocino)
- GitHub: [@vocino](https://github.com/vocino)
- Email: travis@vocino.com
