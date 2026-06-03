/**
 * BG3 hub art — thin wrappers over shared asset registries.
 * Do not fetch from Twitch or SteamGridDB here; see CLAUDE.md.
 */
import { getSteamGridHeroBackgroundPaths, getSteamGridAssetEntry } from '../../../data/steamgrid-assets';
import {
  getTwitchBoxArtPublicPath,
  TWITCH_BOX_ART_DISPLAY_SIZE,
} from '../../../data/twitch-game-boxart';

export const BG3_BOX_ART_SIZE = TWITCH_BOX_ART_DISPLAY_SIZE;

const BG3_HERO_BG_KEY = 'bg3-hero-bg' as const;

export function getBg3BoxArtUrl(): string {
  return getTwitchBoxArtPublicPath('bg3');
}

export function getBg3HeroBackgroundUrls(): {
  animated: string;
  static: string;
} {
  return getSteamGridHeroBackgroundPaths(BG3_HERO_BG_KEY);
}

export function getBg3HeroBackgroundAttribution(): {
  author: string;
  url: string;
} | undefined {
  const entry = getSteamGridAssetEntry(BG3_HERO_BG_KEY);
  if (!entry.creditAuthor || !entry.creditUrl) return undefined;
  return { author: entry.creditAuthor, url: entry.creditUrl };
}
