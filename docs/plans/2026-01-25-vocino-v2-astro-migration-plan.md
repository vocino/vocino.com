# Vocino.com v2 - Astro Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate vocino.com from Jekyll to Astro while preserving design, and add dynamic Twitch status indicator using Cloudflare Pages Functions.

**Architecture:** Astro static-first site with Islands for Twitch component, Cloudflare Pages Functions for API proxy with caching.

**Tech Stack:** Astro 4.x, @astrojs/cloudflare adapter, SCSS, Cloudflare Pages Functions, Twitch Helix API

---

## Task 1: Initialize Astro Project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore` (update existing)

**Step 1: Create package.json with Astro dependencies**

```json
{
  "name": "vocino.com",
  "type": "module",
  "version": "2.0.0",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/cloudflare": "^12.0.0",
    "@astrojs/sass": "^3.0.0",
    "astro": "^4.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

**Step 2: Create astro.config.mjs**

```javascript
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sass from '@astrojs/sass';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [sass()],
  site: 'https://vocino.com',
});
```

**Step 3: Create tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

**Step 4: Update .gitignore**

Add to existing `.gitignore`:
```
# Astro
.astro/
dist/
```

**Step 5: Install dependencies**

Run: `npm install`

Expected: Dependencies installed successfully

**Step 6: Commit**

```bash
git add package.json astro.config.mjs tsconfig.json .gitignore
git commit -m "feat: initialize Astro project with Cloudflare adapter"
```

---

## Task 2: Migrate SCSS Variables and Base Styles

**Files:**
- Create: `src/styles/_variables.scss`
- Create: `src/styles/_base.scss`
- Create: `src/styles/main.scss`

**Step 1: Copy variables from existing _sass/_variables.scss**

Copy entire contents of `_sass/_variables.scss` to `src/styles/_variables.scss`

**Step 2: Copy base styles from existing _sass/_base.scss**

Copy entire contents of `_sass/_base.scss` to `src/styles/_base.scss`

**Step 3: Create main.scss entry point**

```scss
@import "variables";
@import "base";
```

**Step 4: Verify SCSS compiles**

Run: `npm run build`

Expected: Build succeeds (may have missing layout/page errors, that's OK)

**Step 5: Commit**

```bash
git add src/styles/
git commit -m "feat: migrate SCSS variables and base styles to Astro"
```

---

## Task 3: Create Base Layout

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/SEO.astro`

**Step 1: Create SEO component**

Create `src/components/SEO.astro`:

```astro
---
interface Props {
  title?: string;
  description?: string;
  noindex?: boolean;
}

const {
  title = "Vocino - Perfect blend of technology and magic",
  description = "Personal website of Travis Vocino - Maker, nerd tchotchke collector, and creative technologist. Perfect blend of technology and magic.",
  noindex = false,
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!-- Primary Meta Tags -->
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />
{noindex && <meta name="robots" content="noindex, nofollow" />}

<!-- Canonical URL -->
<link rel="canonical" href={canonicalURL} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content={canonicalURL} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={new URL('/assets/images/og-image.png', Astro.site)} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="Vocino" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content={canonicalURL} />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={new URL('/assets/images/og-image.png', Astro.site)} />

<!-- Structured Data - Person/Profile -->
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Travis Vocino",
  "url": Astro.site,
  "sameAs": [
    "https://www.threads.com/@vocino",
    "https://instagram.com/vocino",
    "https://github.com/vocino"
  ],
  "jobTitle": "Maker",
  "description": description,
  "email": "travis@vocino.com"
})} />

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&family=Source+Serif+4:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500;600;700&display=swap" rel="stylesheet" />

<!-- Favicons -->
<link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico" />
<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />

<!-- Social links - rel="me" for two-way verification -->
<link rel="me" href="https://www.threads.com/@vocino" />
<link rel="me" href="https://instagram.com/vocino" />
<link rel="me" href="https://github.com/vocino" />
<link rel="author" href={Astro.site} />
<meta name="fediverse:creator" content="@vocino@threads.net" />
```

**Step 2: Create BaseLayout component**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import SEO from '../components/SEO.astro';

interface Props {
  title?: string;
  description?: string;
  noindex?: boolean;
}

const { title, description, noindex } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark light" />
  
  <SEO title={title} description={description} noindex={noindex} />
  
  <link rel="stylesheet" href="/src/styles/main.scss" />
</head>
<body>
  <main style="position: relative; z-index: 1;">
    <slot />
  </main>
</body>
</html>
```

**Step 3: Verify layout renders**

Run: `npm run build`

Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/layouts/ src/components/SEO.astro
git commit -m "feat: create base layout and SEO component"
```

---

## Task 4: Migrate Layout Styles

**Files:**
- Create: `src/styles/_layout.scss`
- Modify: `src/styles/main.scss`

**Step 1: Copy layout styles**

Copy entire contents of `_sass/_layout.scss` to `src/styles/_layout.scss`

**Step 2: Import layout in main.scss**

Update `src/styles/main.scss`:

```scss
@import "variables";
@import "base";
@import "layout";
```

**Step 3: Copy utility styles**

Copy `_sass/_utilities.scss` to `src/styles/_utilities.scss` and import in main.scss

**Step 4: Copy style guide**

Copy `_sass/_style-guide.scss` to `src/styles/_style-guide.scss` and import in main.scss

**Step 5: Verify styles compile**

Run: `npm run build`

Expected: Build succeeds

**Step 6: Commit**

```bash
git add src/styles/
git commit -m "feat: migrate layout, utility, and style guide SCSS"
```

---

## Task 5: Migrate Homepage

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/components/SiteBrand.astro`
- Create: `src/components/SocialLinks.astro`
- Create: `src/components/Terminal.astro`

**Step 1: Create SiteBrand component**

Create `src/components/SiteBrand.astro`:

```astro
---
---

<a href="/" class="site-brand">
  <img src="/assets/images/vocino.svg" alt="Vocino" class="brand-logo" />
</a>
```

**Step 2: Create SocialLinks component (without Twitch for now)**

Create `src/components/SocialLinks.astro`:

```astro
---
---

<nav class="social-links">
  <a href="https://instagram.com/vocino" rel="me" aria-label="Instagram" target="_blank">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  </a>
  <a href="https://threads.com/vocino" rel="me" aria-label="Threads" target="_blank">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 192 192" fill="currentColor">
      <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"></path>
    </svg>
  </a>
  <a href="https://github.com/vocino" rel="me" aria-label="GitHub" target="_blank">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  </a>
</nav>
```

**Step 3: Create Terminal component (client-side)**

Create `src/components/Terminal.astro`:

```astro
---
---

<!-- Terminal Easter Egg -->
<div id="terminal-container" class="terminal-container">
  <div id="terminal" class="terminal">
    <div id="terminal-output" class="terminal-output"></div>
    <div class="terminal-input-line">
      <span class="terminal-prompt">$</span>
      <span class="terminal-cursor"></span>
      <span class="terminal-input-wrapper">
        <input type="text" id="terminal-input" class="terminal-input" autocomplete="off" spellcheck="false" />
      </span>
    </div>
  </div>
</div>
<div id="terminal-overlay" class="terminal-overlay"></div>

<script>
  // Copy entire contents of assets/js/terminal.js here
  // (We'll inline it for now, can extract later if needed)
</script>
```

Actually, better to keep it as external script. Create `public/assets/js/terminal.js` and copy contents.

**Step 4: Create homepage**

Create `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SiteBrand from '../components/SiteBrand.astro';
import SocialLinks from '../components/SocialLinks.astro';
import Terminal from '../components/Terminal.astro';
---

<BaseLayout
  title="Vocino - Perfect blend of technology and magic"
  description="Personal website of Travis Vocino - Maker, nerd tchotchke collector, and creative technologist. Perfect blend of technology and magic."
>
  <Terminal client:load />
  
  <div class="centered-content">
    <div class="content-wrapper">
      <SiteBrand />
      
      <h1 class="tagline">Perfect blend of <span class="word-tech">technology</span>&nbsp;and&nbsp;<span class="word-magic">magic</span>.</h1>
      
      <p class="bio">From the desk of Travis&nbsp;Vocino. Maker. Nerd tchotchke&nbsp;collector. Chaotic&nbsp;good.</p>
      
      <SocialLinks />
    </div>
  </div>
</BaseLayout>
```

**Step 5: Copy terminal.js to public**

Copy `assets/js/terminal.js` to `public/assets/js/terminal.js`

**Step 6: Update Terminal component to use script tag**

Update `src/components/Terminal.astro`:

```astro
---
---

<!-- Terminal Easter Egg -->
<div id="terminal-container" class="terminal-container">
  <div id="terminal" class="terminal">
    <div id="terminal-output" class="terminal-output"></div>
    <div class="terminal-input-line">
      <span class="terminal-prompt">$</span>
      <span class="terminal-cursor"></span>
      <span class="terminal-input-wrapper">
        <input type="text" id="terminal-input" class="terminal-input" autocomplete="off" spellcheck="false" />
      </span>
    </div>
  </div>
</div>
<div id="terminal-overlay" class="terminal-overlay"></div>

<script src="/assets/js/terminal.js" defer></script>
```

**Step 7: Copy images to public**

Copy entire `assets/images/` directory to `public/assets/images/`

**Step 8: Copy other static files**

Copy `site.webmanifest`, `robots.txt`, `sitemap.xml` to `public/`

**Step 9: Verify homepage renders**

Run: `npm run dev`

Expected: Homepage renders at http://localhost:4321

**Step 10: Commit**

```bash
git add src/pages/ src/components/ public/
git commit -m "feat: migrate homepage with components"
```

---

## Task 6: Migrate About Page

**Files:**
- Create: `src/pages/about.astro`

**Step 1: Create about page**

Create `src/pages/about.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SiteBrand from '../components/SiteBrand.astro';
---

<BaseLayout
  title="About - Vocino"
  description="Who is Travis Vocino and why should you care? Maker, nerd tchotchke collector, and creative technologist."
>
  <div class="centered-content about-page">
    <SiteBrand />
    
    <div class="content-wrapper about-wrapper">
      <div class="about-photo-container">
        <img src="/assets/images/travis.png" alt="Travis Vocino" class="about-photo" />
        <div class="photo-glow"></div>
      </div>
      
      <div class="about-content">
        <p>Hi. I'm Travis Vocino. Husband and dad of two boys. Builder of tools, prototypes, and systems that reduce chaos. I've been working at Meta since 2014, where I'm currently Director of Product Design. I'm focused on communities, how people find each other, connect around their passions, and keep showing up.</p>
        
        <p>Also an investor in early stage companies, I mostly look for indie games, fintech, and creator tools. Big fan of founders with design taste and a bias toward shipping.</p>
        
        <p>I've shipped products to a lot of people, tanked a lot of raids, and allegedly invented the Zim Devastator cyberware.</p>
        
        <p>San Francisco and London.</p>
      </div>
    </div>
  </div>
</BaseLayout>
```

**Step 2: Verify about page renders**

Run: `npm run dev` and navigate to `/about`

Expected: About page renders correctly

**Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: migrate about page"
```

---

## Task 7: Create Cloudflare Pages Function for Twitch API

**Files:**
- Create: `functions/api/twitch-status.ts`

**Step 1: Create Twitch status function**

Create `functions/api/twitch-status.ts`:

```typescript
export async function onRequest(context: EventContext): Promise<Response> {
  const { request, env } = context;
  
  // Get environment variables
  const clientId = env.TWITCH_CLIENT_ID;
  const clientSecret = env.TWITCH_CLIENT_SECRET;
  const username = env.TWITCH_USERNAME || 'vocino';
  
  if (!clientId || !clientSecret) {
    return new Response(
      JSON.stringify({ online: false, error: 'Twitch API credentials not configured' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  
  // Check cache first (Cloudflare Cache API)
  const cacheKey = `twitch-status-${username}`;
  const cache = caches.default;
  const cachedResponse = await cache.match(cacheKey);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    // Get OAuth token
    const tokenResponse = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      }),
    });
    
    if (!tokenResponse.ok) {
      throw new Error('Failed to get OAuth token');
    }
    
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    
    // Get user ID
    const userResponse = await fetch(
      `https://api.twitch.tv/helix/users?login=${username}`,
      {
        headers: {
          'Client-ID': clientId,
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
    
    if (!userResponse.ok) {
      throw new Error('Failed to get user info');
    }
    
    const userData = await userResponse.json();
    const userId = userData.data[0]?.id;
    
    if (!userId) {
      return new Response(
        JSON.stringify({ online: false }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=60',
          },
        }
      );
    }
    
    // Check stream status
    const streamResponse = await fetch(
      `https://api.twitch.tv/helix/streams?user_id=${userId}`,
      {
        headers: {
          'Client-ID': clientId,
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
    
    if (!streamResponse.ok) {
      throw new Error('Failed to get stream status');
    }
    
    const streamData = await streamResponse.json();
    const stream = streamData.data[0];
    
    const responseData = {
      online: !!stream,
      game: stream?.game_name || null,
      title: stream?.title || null,
    };
    
    // Create response with cache headers
    const response = new Response(JSON.stringify(responseData), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      },
    });
    
    // Cache the response
    context.waitUntil(cache.put(cacheKey, response.clone()));
    
    return response;
  } catch (error) {
    console.error('Twitch API error:', error);
    return new Response(
      JSON.stringify({ online: false, error: 'Failed to fetch Twitch status' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=30',
        },
      }
    );
  }
}
```

**Step 2: Fix TypeScript types**

Create `functions/api/twitch-status.ts` with proper types:

```typescript
interface Env {
  TWITCH_CLIENT_ID: string;
  TWITCH_CLIENT_SECRET: string;
  TWITCH_USERNAME?: string;
}

export async function onRequest(
  context: { request: Request; env: Env; waitUntil: (promise: Promise<any>) => void }
): Promise<Response> {
  // ... rest of code from Step 1
}
```

Actually, Cloudflare Pages Functions use a different signature. Let me check the correct format:

```typescript
export async function onRequest(context: {
  request: Request;
  env: {
    TWITCH_CLIENT_ID: string;
    TWITCH_CLIENT_SECRET: string;
    TWITCH_USERNAME?: string;
  };
  waitUntil: (promise: Promise<any>) => void;
}): Promise<Response> {
  const { request, env } = context;
  // ... rest of implementation
}
```

**Step 3: Test function locally (optional)**

Note: Pages Functions require Cloudflare deployment to test fully. Document that env vars need to be set in Cloudflare Pages dashboard.

**Step 4: Commit**

```bash
git add functions/
git commit -m "feat: add Cloudflare Pages Function for Twitch API"
```

---

## Task 8: Create Twitch Status Component

**Files:**
- Create: `src/components/TwitchStatus.astro`

**Step 1: Create Twitch status component**

Create `src/components/TwitchStatus.astro`:

```astro
---
---

<div id="twitch-status" class="twitch-status">
  <a
    href="https://twitch.tv/vocino"
    rel="me"
    aria-label="Twitch"
    target="_blank"
    class="twitch-link"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
    </svg>
    <span class="twitch-status-indicator" id="twitch-indicator"></span>
  </a>
</div>

<script>
  async function fetchTwitchStatus() {
    try {
      const response = await fetch('/api/twitch-status');
      const data = await response.json();
      
      const indicator = document.getElementById('twitch-indicator');
      const link = document.querySelector('.twitch-link');
      
      if (data.online) {
        indicator?.classList.add('online');
        indicator?.setAttribute('title', `Live: ${data.title || data.game || 'Streaming'}`);
        link?.setAttribute('aria-label', `Twitch - Live: ${data.title || data.game || 'Streaming'}`);
      } else {
        indicator?.classList.remove('online');
        indicator?.setAttribute('title', 'Offline');
        link?.setAttribute('aria-label', 'Twitch - Offline');
      }
    } catch (error) {
      console.error('Failed to fetch Twitch status:', error);
    }
  }
  
  // Fetch on load
  fetchTwitchStatus();
  
  // Poll every 60 seconds
  setInterval(fetchTwitchStatus, 60000);
</script>

<style>
  .twitch-status {
    display: inline-block;
  }
  
  .twitch-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    color: var(--text-secondary);
    transition: color 0.2s;
  }
  
  .twitch-link:hover {
    color: var(--accent-blue);
  }
  
  .twitch-status-indicator {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--text-muted);
    border: 2px solid var(--bg);
    transition: background 0.2s;
  }
  
  .twitch-status-indicator.online {
    background: var(--success);
    box-shadow: 0 0 8px var(--success);
  }
</style>
```

**Step 2: Add TwitchStatus to SocialLinks**

Update `src/components/SocialLinks.astro`:

```astro
---
import TwitchStatus from './TwitchStatus.astro';
---

<nav class="social-links">
  <!-- existing social links -->
  <a href="https://instagram.com/vocino" rel="me" aria-label="Instagram" target="_blank">
    <!-- SVG -->
  </a>
  <a href="https://threads.com/vocino" rel="me" aria-label="Threads" target="_blank">
    <!-- SVG -->
  </a>
  <a href="https://github.com/vocino" rel="me" aria-label="GitHub" target="_blank">
    <!-- SVG -->
  </a>
  
  <TwitchStatus client:load />
</nav>
```

**Step 3: Verify component renders**

Run: `npm run dev`

Expected: Twitch icon appears in social links (may show offline initially)

**Step 4: Commit**

```bash
git add src/components/TwitchStatus.astro src/components/SocialLinks.astro
git commit -m "feat: add Twitch status indicator component"
```

---

## Task 9: Update Cloudflare Pages Configuration

**Files:**
- Create: `wrangler.toml` (optional, for local dev)
- Update: `.gitignore`

**Step 1: Create wrangler.toml for local development**

Create `wrangler.toml`:

```toml
name = "vocino-com"
compatibility_date = "2024-01-01"

[env.production]
vars = { }

# Note: Set TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, TWITCH_USERNAME
# in Cloudflare Pages dashboard under Settings > Environment Variables
```

**Step 2: Update .gitignore**

Add to `.gitignore`:
```
.wrangler/
```

**Step 3: Document environment variables**

Create `README.md` section or `.env.example` documenting required env vars:
- `TWITCH_CLIENT_ID`
- `TWITCH_CLIENT_SECRET`
- `TWITCH_USERNAME` (optional, defaults to 'vocino')

**Step 4: Commit**

```bash
git add wrangler.toml .gitignore
git commit -m "feat: add Cloudflare configuration"
```

---

## Task 10: Update Build and Deployment Configuration

**Files:**
- Create: `cloudflare-pages-build-config.md` (documentation)
- Update: `README.md`

**Step 1: Create deployment documentation**

Create `docs/deployment.md`:

```markdown
# Deployment Guide

## Cloudflare Pages Setup

1. Connect repository to Cloudflare Pages
2. Set build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
3. Set environment variables:
   - `TWITCH_CLIENT_ID`: Your Twitch API Client ID
   - `TWITCH_CLIENT_SECRET`: Your Twitch API Client Secret
   - `TWITCH_USERNAME`: (optional) Twitch username, defaults to 'vocino'
```

**Step 2: Update README.md**

Update README with Astro instructions:

```markdown
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

3. Run the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:4321`

## Development

### Local Development
```bash
# Standard development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This site is deployed on Cloudflare Pages. Changes pushed to the `master` branch automatically trigger a new build and deployment.

### Cloudflare Pages Configuration

- **Production branch**: `master`
- **Build command**: `npm run build`
- **Build directory**: `dist`
- **Environment variables**: See `docs/deployment.md`
```

**Step 3: Commit**

```bash
git add docs/deployment.md README.md
git commit -m "docs: update deployment and README for Astro"
```

---

## Task 11: Final Testing and Verification

**Files:**
- All files

**Step 1: Build for production**

Run: `npm run build`

Expected: Build succeeds without errors

**Step 2: Preview production build**

Run: `npm run preview`

Expected: Site previews correctly at http://localhost:4321

**Step 3: Verify all pages render**

Check:
- Homepage: `/`
- About page: `/about`
- Terminal easter egg works
- Social links render correctly
- Twitch status component appears (may show offline without API keys)

**Step 4: Check for console errors**

Open browser dev tools, check for JavaScript errors

**Step 5: Verify styles match original**

Compare visual appearance with original Jekyll site

**Step 6: Commit any final fixes**

```bash
git add .
git commit -m "fix: final adjustments and testing"
```

---

## Task 12: Cleanup Old Jekyll Files (Optional)

**Files:**
- Remove: `_config.yml`, `_layouts/`, `_sass/`, `Gemfile`, `Gemfile.lock`, `assets/` (old location)

**Step 1: Archive old Jekyll files**

Move to archive or delete:
- `_config.yml`
- `_layouts/`
- `_sass/`
- `Gemfile`
- `Gemfile.lock`
- Old `assets/` directory (if not needed)

**Step 2: Update .gitignore**

Remove Jekyll-specific ignores if no longer needed

**Step 3: Commit cleanup**

```bash
git add .
git commit -m "chore: remove old Jekyll files"
```

---

## Verification Checklist

Before considering complete:

- [ ] Site builds successfully (`npm run build`)
- [ ] All pages render correctly (homepage, about)
- [ ] Terminal easter egg works
- [ ] Social links render and link correctly
- [ ] Twitch status component appears (shows offline without API keys)
- [ ] Styles match original design
- [ ] No console errors
- [ ] SEO metadata present
- [ ] Favicons load correctly
- [ ] Cloudflare Pages Function code is correct (will need deployment to test fully)

## Next Steps After Implementation

1. Deploy to Cloudflare Pages
2. Set environment variables in Cloudflare dashboard
3. Test Twitch status API endpoint
4. Verify Twitch status updates correctly
5. Monitor for any issues
