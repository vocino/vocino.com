/**
 * Build-time Twitch game box art registry.
 * See CLAUDE.md → "Twitch integrations" → "Game box art".
 * Download: npm run twitch:boxart:refresh — do not add game ids elsewhere.
 */
export type TwitchGameBoxArtKey = 'bg3' | 'crimson-desert';

export interface TwitchGameBoxArtEntry {
  key: TwitchGameBoxArtKey;
  twitchGameId: string;
  /** Expected Helix game name — logged on refresh for sanity checks. */
  twitchGameName: string;
  /** Public URL path (under `public/`). */
  publicPath: `/assets/images/twitch-boxart/${string}.webp`;
}

/** Fetch dimensions for source assets (3:4 Twitch box art). */
export const TWITCH_BOX_ART_SOURCE_SIZE = { width: 600, height: 800 } as const;

/** Display size for hub `<img>` attributes (2× default 144×192). */
export const TWITCH_BOX_ART_DISPLAY_SIZE = { width: 288, height: 384 } as const;

export const twitchGameBoxArtRegistry: TwitchGameBoxArtEntry[] = [
  {
    key: 'bg3',
    /** Twitch directory slug: baldurs-gate-3 */
    twitchGameId: '512923',
    twitchGameName: "Baldur's Gate 3",
    publicPath: '/assets/images/twitch-boxart/bg3.webp',
  },
  {
    key: 'crimson-desert',
    twitchGameId: '515186',
    twitchGameName: 'Crimson Desert',
    publicPath: '/assets/images/twitch-boxart/crimson-desert.webp',
  },
];

export function getTwitchBoxArtEntry(key: TwitchGameBoxArtKey): TwitchGameBoxArtEntry {
  const entry = twitchGameBoxArtRegistry.find((e) => e.key === key);
  if (!entry) {
    throw new Error(`Unknown Twitch box art key: ${key}`);
  }
  return entry;
}

export function getTwitchBoxArtPublicPath(key: TwitchGameBoxArtKey): TwitchGameBoxArtEntry['publicPath'] {
  return getTwitchBoxArtEntry(key).publicPath;
}

/** IGDB-sourced Twitch CDN URL (works without Helix credentials). */
export function buildTwitchIgdbCdnUrl(
  gameId: string,
  width: number = TWITCH_BOX_ART_SOURCE_SIZE.width,
  height: number = TWITCH_BOX_ART_SOURCE_SIZE.height,
): string {
  return `https://static-cdn.jtvnw.net/ttv-boxart/${gameId}_IGDB-${width}x${height}.jpg`;
}

/**
 * Prefer IGDB box art. Rewrites a Helix `box_art_url` template when it omits `_IGDB`.
 */
export function toIgdbBoxArtUrl(
  templateOrGameId: string,
  width: number = TWITCH_BOX_ART_SOURCE_SIZE.width,
  height: number = TWITCH_BOX_ART_SOURCE_SIZE.height,
): string {
  if (templateOrGameId.includes('_IGDB')) {
    return templateOrGameId
      .replace('{width}', String(width))
      .replace('{height}', String(height));
  }

  const idMatch = templateOrGameId.match(/ttv-boxart\/(\d+)/);
  const gameId = idMatch?.[1] ?? templateOrGameId;
  return buildTwitchIgdbCdnUrl(gameId, width, height);
}
