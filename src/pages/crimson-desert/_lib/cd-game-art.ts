import { fetchTwitchGames, getTwitchAppAccessToken, resolveTwitchBoxArtUrl } from '../../../lib/twitch-api';

/** Twitch game id for Crimson Desert (IGDB-sourced box art). */
export const CRIMSON_DESERT_TWITCH_GAME_ID = '515186';

/** Display size — 2× the default 144×192 Twitch thumbnail. */
export const CRIMSON_DESERT_BOX_ART_SIZE = { width: 288, height: 384 } as const;

export function buildCrimsonDesertBoxArtFallbackUrl(): string {
  const { width, height } = CRIMSON_DESERT_BOX_ART_SIZE;
  return `https://static-cdn.jtvnw.net/ttv-boxart/${CRIMSON_DESERT_TWITCH_GAME_ID}_IGDB-${width}x${height}.jpg`;
}

function readTwitchCredentials(): { clientId: string; clientSecret: string } | null {
  const clientId = import.meta.env.TWITCH_CLIENT_ID;
  const clientSecret = import.meta.env.TWITCH_CLIENT_SECRET;
  if (typeof clientId !== 'string' || !clientId || typeof clientSecret !== 'string' || !clientSecret) {
    return null;
  }
  return { clientId, clientSecret };
}

/** Resolve box art at build/render time — Twitch API when creds exist, else CDN fallback. */
export async function getCrimsonDesertBoxArtUrl(): Promise<string> {
  const fallback = buildCrimsonDesertBoxArtFallbackUrl();
  const creds = readTwitchCredentials();
  if (!creds) return fallback;

  try {
    const accessToken = await getTwitchAppAccessToken(creds.clientId, creds.clientSecret);
    const games = await fetchTwitchGames(creds.clientId, accessToken, {
      ids: [CRIMSON_DESERT_TWITCH_GAME_ID],
    });
    const template = games[0]?.box_art_url;
    if (!template) return fallback;

    return resolveTwitchBoxArtUrl(
      template,
      CRIMSON_DESERT_BOX_ART_SIZE.width,
      CRIMSON_DESERT_BOX_ART_SIZE.height,
    );
  } catch (error) {
    console.warn('[crimson-desert] Twitch box art lookup failed; using CDN fallback.', error);
    return fallback;
  }
}
