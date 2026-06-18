#!/usr/bin/env node
/**
 * Downloads Crimson Desert guide icons via the Fandom API + CDN.
 * Most item pages do not exist on the wiki yet — category defaults apply.
 * Run: node scripts/download-cd-icons.mjs
 */

import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { cdIconEntries } from '../src/pages/crimson-desert/_lib/cd-icons.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const outRoot = join(root, 'public/assets/images/crimson-desert');
const WIKI_BASE = 'https://crimsondesert.fandom.com';
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const REFERER = `${WIKI_BASE}/`;

/** Direct wiki File: titles when a page slug has no dedicated asset yet. */
const DIRECT_WIKI_FILE = {
  // Skills — wiki pages exist but have no icons; use generic item art.
  stamina: 'File:Item.png',
  grapple: 'File:Item.png',
  'forward-slash': 'File:Item.png',
  'axiom-force': 'File:Item.png',
  'force-palm': 'File:Item.png',
};

const CATEGORY_WIKI_FILE = {
  skill: 'File:Item.png',
  equipment: 'File:Item.png',
  accessory: 'File:Item.png',
  weapon: 'File:MercenaryDagger.png',
};

const fileUrlCache = new Map();

async function wikiApi(params) {
  const url = `${WIKI_BASE}/api.php?${new URLSearchParams({ format: 'json', ...params })}`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`API HTTP ${res.status}`);
  return res.json();
}

async function getWikiFileUrl(fileTitle) {
  if (fileUrlCache.has(fileTitle)) return fileUrlCache.get(fileTitle);

  const data = await wikiApi({
    action: 'query',
    titles: fileTitle,
    prop: 'imageinfo',
    iiprop: 'url',
  });

  const page = Object.values(data.query?.pages ?? {})[0];
  const url = page?.imageinfo?.[0]?.url ?? null;
  fileUrlCache.set(fileTitle, url);
  return url;
}

async function findPageImageUrl(pageTitle) {
  const data = await wikiApi({
    action: 'query',
    generator: 'images',
    titles: pageTitle.replace(/_/g, ' '),
    gimlimit: '10',
    prop: 'imageinfo',
    iiprop: 'url',
  });

  const pages = Object.values(data.query?.pages ?? {});
  for (const page of pages) {
    if (page.ns !== 6) continue;
    const name = page.title?.toLowerCase() ?? '';
    if (name.includes('site-') || name.includes('wiki') || name.includes('favicon')) continue;
    const url = page.imageinfo?.[0]?.url;
    if (url) return url;
  }
  return null;
}

async function downloadBuffer(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Referer: REFERER },
  });
  if (!res.ok) throw new Error(`image HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function saveIconWebp(buf, dest, size = 64) {
  await mkdir(dirname(dest), { recursive: true });
  await sharp(buf)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 18, g: 20, b: 21, alpha: 1 },
    })
    .webp({ quality: 90 })
    .toFile(dest);
}

async function resolveSourceUrl(entry) {
  if (DIRECT_WIKI_FILE[entry.slug]) {
    const url = await getWikiFileUrl(DIRECT_WIKI_FILE[entry.slug]);
    if (url) return url;
  }

  if (entry.wikiPath) {
    const pageUrl = await findPageImageUrl(entry.wikiPath);
    if (pageUrl) return pageUrl;
  }

  const fallbackFile = CATEGORY_WIKI_FILE[entry.category];
  const url = await getWikiFileUrl(fallbackFile);
  if (url) return url;

  throw new Error(`no source for ${entry.slug}`);
}

async function buildFallback(dest) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="6" fill="#1a1410"/>
    <rect x="4" y="4" width="56" height="56" rx="4" fill="none" stroke="#d44d37" stroke-width="2" opacity="0.55"/>
    <path d="M32 18 L44 46 H20 Z" fill="#c9a227" opacity="0.85"/>
  </svg>`;
  await saveIconWebp(Buffer.from(svg), dest);
}

let failed = 0;

for (const entry of cdIconEntries) {
  const dest = join(outRoot, entry.file);
  try {
    const sourceUrl = await resolveSourceUrl(entry);
    const buf = await downloadBuffer(sourceUrl);
    await saveIconWebp(buf, dest);
    console.log(`ok ${entry.file} <- ${sourceUrl}`);
  } catch (err) {
    failed += 1;
    console.warn(`WARN ${entry.file}: ${err.message} — generated fallback`);
    await buildFallback(dest);
  }
  await new Promise((r) => setTimeout(r, 150));
}

const fallbackDest = join(outRoot, 'fallback/icon.webp');
try {
  const itemUrl = await getWikiFileUrl('File:Item.png');
  const buf = await downloadBuffer(itemUrl);
  await saveIconWebp(buf, fallbackDest);
  console.log('ok fallback/icon.webp <- Item.png');
} catch (err) {
  console.warn(`WARN fallback: ${err.message}`);
  await buildFallback(fallbackDest);
}

if (failed > 0) {
  console.warn(`\n${failed} icon(s) used wiki category defaults or SVG fallback (item pages missing on wiki).`);
}

console.log('done');
