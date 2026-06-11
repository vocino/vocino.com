/**
 * Build-time SteamGridDB asset registry.
 * See CLAUDE.md → "SteamGrid assets".
 * Download: npm run steamgrid:assets:refresh — do not add asset ids elsewhere.
 */
export type SteamGridAssetKey = 'bg3-hero-bg' | 'crimson-desert-hero-bg' | 'star-wars-outlaws-hero-bg';

export type SteamGridAssetType = 'hero';

export interface SteamGridAssetEntry {
  key: SteamGridAssetKey;
  assetType: SteamGridAssetType;
  /** Permalink ID from steamgriddb.com/hero/{id} */
  steamGridAssetId: number;
  /** Committed animated asset (WebP when source is animated). */
  animatedPublicPath: `/assets/images/steamgrid-hero/${string}.webp`;
  /** Static fallback for prefers-reduced-motion (fake_png from API). */
  staticPublicPath: `/assets/images/steamgrid-hero/${string}.png`;
  /** Attribution — author display name on SteamGridDB. */
  creditAuthor?: string;
  /** Permalink for attribution link. */
  creditUrl?: string;
}

export const steamGridAssetRegistry: SteamGridAssetEntry[] = [
  {
    key: 'bg3-hero-bg',
    assetType: 'hero',
    steamGridAssetId: 85263,
    animatedPublicPath: '/assets/images/steamgrid-hero/bg3-hero-bg.webp',
    staticPublicPath: '/assets/images/steamgrid-hero/bg3-hero-bg.png',
    creditAuthor: 'trivialattire',
    creditUrl: 'https://www.steamgriddb.com/hero/85263',
  },
  {
    key: 'crimson-desert-hero-bg',
    assetType: 'hero',
    steamGridAssetId: 168164,
    animatedPublicPath: '/assets/images/steamgrid-hero/crimson-desert-hero-bg.webp',
    staticPublicPath: '/assets/images/steamgrid-hero/crimson-desert-hero-bg.png',
    creditAuthor: 'Zea',
    creditUrl: 'https://www.steamgriddb.com/hero/168164',
  },
  {
    key: 'star-wars-outlaws-hero-bg',
    assetType: 'hero',
    steamGridAssetId: 155977,
    animatedPublicPath: '/assets/images/steamgrid-hero/star-wars-outlaws-hero-bg.webp',
    staticPublicPath: '/assets/images/steamgrid-hero/star-wars-outlaws-hero-bg.png',
    creditAuthor: 'apfelspeier',
    creditUrl: 'https://www.steamgriddb.com/hero/155977',
  },
];

export function getSteamGridAssetEntry(key: SteamGridAssetKey): SteamGridAssetEntry {
  const entry = steamGridAssetRegistry.find((e) => e.key === key);
  if (!entry) {
    throw new Error(`Unknown SteamGrid asset key: ${key}`);
  }
  return entry;
}

export function getSteamGridHeroBackgroundPaths(key: SteamGridAssetKey): {
  animated: SteamGridAssetEntry['animatedPublicPath'];
  static: SteamGridAssetEntry['staticPublicPath'];
} {
  const entry = getSteamGridAssetEntry(key);
  return {
    animated: entry.animatedPublicPath,
    static: entry.staticPublicPath,
  };
}
