import type { SeoBreadcrumbItem } from './seo';

/** Content collection keys used for hub freshness on the homepage nav. */
export type HubContentCollection = 'bg3' | 'homelab' | 'crimson-desert' | 'star-wars';

export interface HubRegistryEntry {
  slug: string;
  name: string;
  /** Short label for compact nav (homepage pills). Falls back to `name`. */
  navLabel?: string;
  description: string;
  accent: string;
  indexable: boolean;
  imagePath?: string;
  /** Optional source hero image used by the OG generator (build-time). */
  ogHeroPath?: string;
  /** Optional per-hub OG image alt text. */
  ogImageAlt?: string;
  /** Collection + entry slug for resolving `updated` from frontmatter. */
  contentCollection?: HubContentCollection;
  contentEntry?: string;
}

export const hubRegistry: HubRegistryEntry[] = [
  {
    slug: 'baldurs-gate-3',
    name: "Baldur's Gate 3",
    navLabel: "Baldur's Gate 3",
    description:
      "My personal Baldur's Gate 3 build catalogue — a favorite build for each class, plus the playthrough advice I actually use.",
    accent: '#46E08B',
    indexable: true,
    imagePath: '/assets/images/og/baldurs-gate-3.png',
    ogHeroPath: '/assets/images/og-hero/bg3.png',
    ogImageAlt: "Baldur's Gate 3 hub preview image",
    contentCollection: 'bg3',
    contentEntry: 'paladin',
  },
  {
    slug: 'homelab',
    name: 'Home Lab',
    navLabel: 'Homelab',
    description:
      'Self-hosted media stack — Docker Compose, *arr, Jellyfin, Cloudflare Tunnel, and the traps worth knowing.',
    accent: '#FFB86B',
    indexable: true,
    imagePath: '/assets/images/og/homelab.png',
    ogHeroPath: '/assets/images/og-hero/homelab.png',
    ogImageAlt: 'Home Lab hub preview image',
    contentCollection: 'homelab',
    contentEntry: 'media-stack',
  },
  {
    slug: 'crimson-desert',
    name: 'Crimson Desert',
    navLabel: 'Crimson Desert',
    description:
      'Build notes for Kliff, Damiane, and Oongka — where I put skill points and what gear I grabbed first around Hernand.',
    accent: '#D44D37',
    indexable: true,
    imagePath: '/assets/images/og/crimson-desert.png',
    ogHeroPath: '/assets/images/og-hero/crimson-desert.png',
    ogImageAlt: 'Crimson Desert hub preview image',
    contentCollection: 'crimson-desert',
    contentEntry: 'kliff',
  },
  {
    slug: 'star-wars',
    name: 'Star Wars',
    navLabel: 'Star Wars',
    description:
      'My Star Wars corner — Outlaws playthrough notes, a Legion army list, and plans for Star Wars Celebration 2027.',
    accent: '#FFE81F',
    indexable: true,
    imagePath: '/assets/images/og/star-wars.png',
    ogHeroPath: '/assets/images/og-hero/star-wars.png',
    ogImageAlt: 'Star Wars hub preview image',
    contentCollection: 'star-wars',
    contentEntry: 'outlaws',
  },
];

export function getHubBySlug(slug: string): HubRegistryEntry {
  const hub = hubRegistry.find((entry) => entry.slug === slug);
  if (!hub) {
    throw new Error(`Unknown hub slug: ${slug}`);
  }

  return hub;
}

export function getHubIndexablePaths(): string[] {
  return hubRegistry.filter((hub) => hub.indexable).map((hub) => `/${hub.slug}`);
}

export function getHubBreadcrumb(hub: HubRegistryEntry): SeoBreadcrumbItem[] {
  return [
    { name: 'Home', path: '/' },
    { name: hub.name, path: `/${hub.slug}` },
  ];
}
