#!/usr/bin/env node
/**
 * Downloads pinned SteamGridDB assets into public/assets/images/steamgrid-hero/.
 * Registry: src/data/steamgrid-assets.ts — CLAUDE.md → "SteamGrid assets".
 * Run: npm run steamgrid:assets | steamgrid:assets:refresh
 */

import { mkdir, writeFile, unlink } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { steamGridAssetRegistry } from '../src/data/steamgrid-assets.ts';

/** Max width for committed hero assets (ambient backgrounds). */
const HERO_MAX_WIDTH = 960;

const root = fileURLToPath(new URL('..', import.meta.url));
const apiBase = 'https://www.steamgriddb.com/api/public/asset';

async function fetchAssetMeta(entry) {
  const url = `${apiBase}/${entry.assetType}/${entry.steamGridAssetId}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const json = await res.json();
  if (!json.success || !json.data?.asset) {
    throw new Error(`Unexpected API response for ${entry.key}`);
  }
  return json.data.asset;
}

async function downloadBuffer(remoteUrl) {
  const res = await fetch(remoteUrl);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${remoteUrl}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

/**
 * SteamGrid fake_png is often animated WebP; extract frame 0 as a real PNG.
 * Resize animated source for committed ambient WebP (smaller than CDN originals).
 */
async function saveOptimizedHeroAssets(sourceBuf, animatedDest, staticDest) {
  await mkdir(dirname(animatedDest), { recursive: true });

  await sharp(sourceBuf, { animated: true, limitInputPixels: false })
    .resize(HERO_MAX_WIDTH, null, { fit: 'inside' })
    .webp({ quality: 65, effort: 4 })
    .toFile(animatedDest);

  await sharp(sourceBuf, { animated: false, page: 0, limitInputPixels: false })
    .resize(HERO_MAX_WIDTH, null, { fit: 'inside' })
    .png({ compressionLevel: 9 })
    .toFile(staticDest);
}

async function main() {
  let failed = 0;

  for (const entry of steamGridAssetRegistry) {
    try {
      const asset = await fetchAssetMeta(entry);
      const animatedUrl = asset.url;
      if (!animatedUrl) {
        throw new Error(`Missing url for ${entry.key}`);
      }

      const animatedDest = join(root, 'public', entry.animatedPublicPath);
      const staticDest = join(root, 'public', entry.staticPublicPath);
      const tempPath = join(root, 'public', `.steamgrid-${entry.key}.tmp`);

      const sourceBuf = await downloadBuffer(animatedUrl);
      await writeFile(tempPath, sourceBuf);
      await saveOptimizedHeroAssets(sourceBuf, animatedDest, staticDest);
      await unlink(tempPath).catch(() => {});

      const author = asset.author?.name ?? entry.creditAuthor ?? 'unknown';
      console.log(
        `ok ${entry.key} (${entry.steamGridAssetId}) by ${author} -> ${entry.animatedPublicPath}, ${entry.staticPublicPath}`,
      );
    } catch (err) {
      failed += 1;
      console.error(`FAIL ${entry.key}: ${err.message}`);
    }
  }

  if (failed > 0) {
    process.exitCode = 1;
    return;
  }
  console.log('done');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
