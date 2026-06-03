#!/usr/bin/env node
/** Verifies every Twitch box art entry has a file on disk. CLAUDE.md → Twitch integrations. */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { twitchGameBoxArtRegistry } from '../src/data/twitch-game-boxart.ts';

const root = join(fileURLToPath(new URL('..', import.meta.url)), 'public');

const missing = twitchGameBoxArtRegistry.filter((entry) => {
  const filePath = join(root, entry.publicPath);
  return !existsSync(filePath);
});

if (missing.length) {
  console.error('Missing Twitch box art files (run: npm run twitch:boxart:refresh):');
  for (const entry of missing) console.error(`  ${entry.key} -> ${entry.publicPath}`);
  process.exit(1);
}

console.log(`OK: ${twitchGameBoxArtRegistry.length} Twitch box art file(s) verified`);
