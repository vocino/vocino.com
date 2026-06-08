/**
 * Star Wars hub art — thin wrappers over the shared asset registries.
 * Do not fetch from Twitch or SteamGridDB here; see CLAUDE.md.
 */
import {
  getSteamGridHeroBackgroundPaths,
  getSteamGridAssetEntry,
} from '../../../data/steamgrid-assets';
import {
  getTwitchBoxArtPublicPath,
  TWITCH_BOX_ART_DISPLAY_SIZE,
} from '../../../data/twitch-game-boxart';

export const OUTLAWS_BOX_ART_SIZE = TWITCH_BOX_ART_DISPLAY_SIZE;

const OUTLAWS_HERO_BG_KEY = 'star-wars-outlaws-hero-bg' as const;

export function getOutlawsBoxArtUrl(): string {
  return getTwitchBoxArtPublicPath('star-wars-outlaws');
}

export function getOutlawsHeroBackgroundUrls(): {
  animated: string;
  static: string;
} {
  return getSteamGridHeroBackgroundPaths(OUTLAWS_HERO_BG_KEY);
}

export function getOutlawsHeroBackgroundAttribution():
  | { author: string; url: string }
  | undefined {
  const entry = getSteamGridAssetEntry(OUTLAWS_HERO_BG_KEY);
  if (!entry.creditAuthor || !entry.creditUrl) return undefined;
  return { author: entry.creditAuthor, url: entry.creditUrl };
}
