#!/usr/bin/env node
/** Verifies every SteamGrid asset entry has committed files on disk. CLAUDE.md → SteamGrid assets. */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { steamGridAssetRegistry } from '../src/data/steamgrid-assets.ts';

const root = join(fileURLToPath(new URL('..', import.meta.url)), 'public');

const missing = [];
for (const entry of steamGridAssetRegistry) {
  for (const publicPath of [entry.animatedPublicPath, entry.staticPublicPath]) {
    const filePath = join(root, publicPath);
    if (!existsSync(filePath)) {
      missing.push({ key: entry.key, publicPath });
    }
  }
}

if (missing.length) {
  console.error('Missing SteamGrid asset files (run: npm run steamgrid:assets:refresh):');
  for (const { key, publicPath } of missing) console.error(`  ${key} -> ${publicPath}`);
  process.exit(1);
}

console.log(`OK: ${steamGridAssetRegistry.length} SteamGrid asset(s) verified`);
