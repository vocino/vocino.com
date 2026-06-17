/**
 * Battlefront II hub art — thin wrappers over the shared asset registries.
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

export const BF2_BOX_ART_SIZE = TWITCH_BOX_ART_DISPLAY_SIZE;

const BF2_HERO_BG_KEY = 'star-wars-battlefront-2-hero-bg' as const;

export function getBf2BoxArtUrl(): string {
  return getTwitchBoxArtPublicPath('star-wars-battlefront-ii');
}

export function getBf2HeroBackgroundUrls(): { animated: string; static: string } {
  return getSteamGridHeroBackgroundPaths(BF2_HERO_BG_KEY);
}

export function getBf2HeroBackgroundAttribution(): { author: string; url: string } | undefined {
  const entry = getSteamGridAssetEntry(BF2_HERO_BG_KEY);
  if (!entry.creditAuthor || !entry.creditUrl) return undefined;
  return { author: entry.creditAuthor, url: entry.creditUrl };
}
