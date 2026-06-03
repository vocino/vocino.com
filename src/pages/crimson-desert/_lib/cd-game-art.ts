/**
 * Crimson Desert hub art — thin wrappers over shared asset registries.
 * Do not fetch from Twitch or SteamGridDB here; see CLAUDE.md.
 */
import { getSteamGridHeroBackgroundPaths, getSteamGridAssetEntry } from '../../../data/steamgrid-assets';
import {
  getTwitchBoxArtPublicPath,
  TWITCH_BOX_ART_DISPLAY_SIZE,
} from '../../../data/twitch-game-boxart';

export const CRIMSON_DESERT_BOX_ART_SIZE = TWITCH_BOX_ART_DISPLAY_SIZE;

const CD_HERO_BG_KEY = 'crimson-desert-hero-bg' as const;

export function getCrimsonDesertBoxArtUrl(): string {
  return getTwitchBoxArtPublicPath('crimson-desert');
}

export function getCrimsonDesertHeroBackgroundUrls(): {
  animated: string;
  static: string;
} {
  return getSteamGridHeroBackgroundPaths(CD_HERO_BG_KEY);
}

export function getCrimsonDesertHeroBackgroundAttribution(): {
  author: string;
  url: string;
} | undefined {
  const entry = getSteamGridAssetEntry(CD_HERO_BG_KEY);
  if (!entry.creditAuthor || !entry.creditUrl) return undefined;
  return { author: entry.creditAuthor, url: entry.creditUrl };
}
