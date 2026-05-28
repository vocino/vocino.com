import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// NOTE: This is a build-time script executed by Node directly.
// Node does not load TypeScript modules here without an explicit loader, so we
// keep a tiny JS config in sync with `src/data/hubs.ts`.
const SITE_NAME = 'Vocino';
const HUBS = [
  { slug: 'bg3', name: "Baldur's Gate 3", accent: '#46E08B', ogHeroPath: '/assets/images/og-hero/bg3.png' },
  { slug: 'homelab', name: 'Home Lab', accent: '#FFB86B', ogHeroPath: '/assets/images/og-hero/homelab.png' },
];

const ROOT = path.resolve(process.cwd());
const OUT_DIR = path.join(ROOT, 'public', 'assets', 'images', 'og');
const HERO_DIR = path.join(ROOT, 'public', 'assets', 'images', 'og-hero');

const WIDTH = 1200;
const HEIGHT = 630;
const SUPERSAMPLE = 2; // render at 2x then downsample for smoother text/edges

const RENDER_WIDTH = WIDTH * SUPERSAMPLE;
const RENDER_HEIGHT = HEIGHT * SUPERSAMPLE;

function ensureHexColor(input) {
  if (!input) return null;
  const c = input.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(c)) return c.toUpperCase();
  return null;
}

function escapeXml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function vocinoLogoSvg({ accent, inner = '#0F1419', width = 160 }) {
  const viewBoxWidth = 250;
  const viewBoxHeight = 216;
  const height = Math.round((width * viewBoxHeight) / viewBoxWidth);
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 250 216">
  <path d="M125 215.909L0 0L250 2.17954e-05L125 215.909Z" fill="${accent}"/>
  <path d="M125 71.9697L83.3334 0L166.667 7.26513e-06L125 71.9697Z" fill="${inner}"/>
</svg>
`.trim();
}

function overlaySvg({ accent, title, subtitle }) {
  const safeTitle = escapeXml(title);
  const safeSubtitle = escapeXml(subtitle);
  const logo = vocinoLogoSvg({ accent, width: 170 * SUPERSAMPLE });

  // Left-aligned lockup with generous safe margins.
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${RENDER_WIDTH}" height="${RENDER_HEIGHT}" viewBox="0 0 ${RENDER_WIDTH} ${RENDER_HEIGHT}">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="rgba(0,0,0,0.10)"/>
      <stop offset="1" stop-color="rgba(0,0,0,0.55)"/>
    </linearGradient>
    <radialGradient id="spot" cx="18%" cy="45%" r="65%">
      <stop offset="0" stop-color="rgba(0,0,0,0)"/>
      <stop offset="1" stop-color="rgba(0,0,0,0.60)"/>
    </radialGradient>
  </defs>

  <rect width="100%" height="100%" fill="url(#fade)"/>
  <rect width="100%" height="100%" fill="url(#spot)"/>

  <g transform="translate(${90 * SUPERSAMPLE} ${118 * SUPERSAMPLE})">
    <g opacity="0.98">
      ${logo}
    </g>

    <g transform="translate(0 ${230 * SUPERSAMPLE})">
      <text x="0" y="0"
        font-family="system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, sans-serif"
        font-size="${64 * SUPERSAMPLE}"
        font-weight="800"
        letter-spacing="-0.5"
        fill="rgba(255,255,255,0.96)">${safeTitle}</text>

      <text x="0" y="${54 * SUPERSAMPLE}"
        font-family="system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, sans-serif"
        font-size="${30 * SUPERSAMPLE}"
        font-weight="600"
        fill="rgba(255,255,255,0.78)">${safeSubtitle}</text>
    </g>
  </g>

  <rect x="0" y="${RENDER_HEIGHT - 6 * SUPERSAMPLE}" width="${RENDER_WIDTH}" height="${6 * SUPERSAMPLE}" fill="${accent}" opacity="0.95"/>
</svg>
`.trim();
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function buildBackground({ heroAbsolutePath }) {
  const base = sharp({
    create: {
      width: RENDER_WIDTH,
      height: RENDER_HEIGHT,
      channels: 4,
      background: { r: 10, g: 14, b: 20, alpha: 1 },
    },
  });

  const heroExists = heroAbsolutePath ? await fileExists(heroAbsolutePath) : false;
  if (!heroExists) {
    // Subtle diagonal gradient + noise-like texture (simple and fast).
    const fallbackSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${RENDER_WIDTH}" height="${RENDER_HEIGHT}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0B0F14"/>
      <stop offset="1" stop-color="#151E29"/>
    </linearGradient>
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="
        1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 0.07 0"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" filter="url(#n)"/>
</svg>`.trim();

    return base.composite([{ input: Buffer.from(fallbackSvg), top: 0, left: 0 }]);
  }

  const hero = sharp(heroAbsolutePath)
    .resize(RENDER_WIDTH, RENDER_HEIGHT, { fit: 'cover', position: 'centre' })
    .grayscale()
    .blur(1.6)
    .modulate({ brightness: 0.72, saturation: 0.8 });

  return base.composite([{ input: await hero.toBuffer(), top: 0, left: 0 }]);
}

async function renderOg({ outAbsolutePath, accent, title, subtitle, heroAbsolutePath }) {
  const bg = await buildBackground({ heroAbsolutePath });
  const overlay = overlaySvg({ accent, title, subtitle });
  const bgPng = await bg.png().toBuffer();
  // Important: `density` scales SVG pixels (dpi/72). Keep it at 72 so our
  // explicit SVG width/height stay exact (we supersample via RENDER_* instead).
  const overlayPng = await sharp(Buffer.from(overlay), { density: 72 })
    .resize(RENDER_WIDTH, RENDER_HEIGHT, { fit: 'fill' })
    .png()
    .toBuffer();
  const [bgMeta, overlayMeta] = await Promise.all([sharp(bgPng).metadata(), sharp(overlayPng).metadata()]);
  // (Debug logging removed once stable)
  if ((overlayMeta.width ?? 0) > (bgMeta.width ?? 0) || (overlayMeta.height ?? 0) > (bgMeta.height ?? 0)) {
    throw new Error(
      `Overlay larger than background for ${outAbsolutePath}: bg=${bgMeta.width}x${bgMeta.height} overlay=${overlayMeta.width}x${overlayMeta.height}`,
    );
  }

  // Two-step pipeline to guarantee operation order:
  // composite at supersampled resolution, then downsample.
  const merged = await sharp(bgPng)
    .composite([{ input: overlayPng, top: 0, left: 0 }])
    .png()
    .toBuffer();

  await sharp(merged)
    .resize(WIDTH, HEIGHT, { kernel: sharp.kernel.lanczos3 })
    // PNG is lossless; "quality" doesn't apply. We optimize filtering/effort.
    .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
    .toFile(outAbsolutePath);
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(HERO_DIR, { recursive: true });

  // Homepage OG
  const homeAccent = ensureHexColor('#00CCFF') ?? '#00CCFF';
  await renderOg({
    outAbsolutePath: path.join(OUT_DIR, 'home.png'),
    accent: homeAccent,
    title: SITE_NAME,
    subtitle: 'vocino.com',
    heroAbsolutePath: null,
  });

  // One OG per hub (per the selected scope).
  for (const hub of HUBS) {
    const accent = ensureHexColor(hub.accent) ?? '#00CCFF';
    const heroAbsolutePath = hub.ogHeroPath ? path.join(ROOT, 'public', hub.ogHeroPath) : null;
    const subtitle = `vocino.com/${hub.slug}`;

    await renderOg({
      outAbsolutePath: path.join(OUT_DIR, `${hub.slug}.png`),
      accent,
      title: hub.name,
      subtitle,
      heroAbsolutePath,
    });
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

