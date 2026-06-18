#!/usr/bin/env node
/**
 * Downloads Twitch IGDB box art into public/assets/images/twitch-boxart/.
 * Registry: src/data/twitch-game-boxart.ts — CLAUDE.md → "Twitch integrations".
 * Run: npm run twitch:boxart | twitch:boxart:refresh
 */

import { mkdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import {
  TWITCH_BOX_ART_SOURCE_SIZE,
  twitchGameBoxArtRegistry,
  toIgdbBoxArtUrl,
  buildTwitchIgdbCdnUrl,
} from '../src/data/twitch-game-boxart.ts';
import {
  fetchTwitchGames,
  getTwitchAppAccessToken,
  resolveTwitchBoxArtUrl,
} from '../src/lib/twitch-api.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const { width, height } = TWITCH_BOX_ART_SOURCE_SIZE;

async function loadDevVars() {
  try {
    const text = await readFile(join(root, '.dev.vars'), 'utf8');
    for (const line of text.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = value;
    }
  } catch {
    // optional local file
  }
}

function readTwitchCredentials() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  if (!clientId || !clientSecret || clientId === 'your_client_id_here') {
    return null;
  }
  return { clientId, clientSecret };
}

async function resolveBoxArtUrl(entry) {
  const creds = readTwitchCredentials();
  const cdnFallback = buildTwitchIgdbCdnUrl(entry.twitchGameId, width, height);

  if (!creds) {
    console.log(`  ${entry.key}: no Twitch creds — IGDB CDN`);
    return cdnFallback;
  }

  try {
    const accessToken = await getTwitchAppAccessToken(creds.clientId, creds.clientSecret);
    const games = await fetchTwitchGames(creds.clientId, accessToken, {
      ids: [entry.twitchGameId],
    });
    const game = games[0];
    if (!game?.box_art_url) {
      console.warn(`  ${entry.key}: no box_art_url from API — IGDB CDN`);
      return cdnFallback;
    }

    if (game.name !== entry.twitchGameName) {
      console.warn(
        `  ${entry.key}: API name "${game.name}" !== expected "${entry.twitchGameName}" (id ${entry.twitchGameId})`,
      );
    } else {
      console.log(`  ${entry.key}: ${game.name} (${entry.twitchGameId})`);
    }

    const resolved = resolveTwitchBoxArtUrl(game.box_art_url, width, height);
    return toIgdbBoxArtUrl(resolved, width, height);
  } catch (err) {
    console.warn(`  ${entry.key}: API failed (${err.message}) — IGDB CDN`);
    return cdnFallback;
  }
}

async function downloadAndSaveWebp(url, dest) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(dest), { recursive: true });
  await sharp(buf)
    .resize(width, height, { fit: 'cover', position: 'centre' })
    .webp({ quality: 85, effort: 6 })
    .toFile(dest);
}

async function main() {
  await loadDevVars();

  let failed = 0;
  for (const entry of twitchGameBoxArtRegistry) {
    const dest = join(root, 'public', entry.publicPath);
    try {
      const url = await resolveBoxArtUrl(entry);
      await downloadAndSaveWebp(url, dest);
      console.log(`ok ${entry.publicPath} <- ${url}`);
    } catch (err) {
      failed += 1;
      console.error(`FAIL ${entry.publicPath}: ${err.message}`);
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
