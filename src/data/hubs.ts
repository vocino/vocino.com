import type { SeoBreadcrumbItem } from './seo';

export interface HubRegistryEntry {
  slug: string;
  name: string;
  description: string;
  accent: string;
  indexable: boolean;
  imagePath?: string;
}

export const hubRegistry: HubRegistryEntry[] = [
  {
    slug: 'bg3',
    name: "Baldur's Gate 3",
    description: "Baldur's Gate 3 builds, guides, and honour-mode notes by Travis Vocino.",
    accent: '#46E08B',
    indexable: false,
  },
  {
    slug: 'homelab',
    name: 'Home Lab',
    description:
      'Self-hosted media stack — Docker Compose, *arr, Jellyfin, Cloudflare Tunnel, and the traps worth knowing.',
    accent: '#FFB86B',
    indexable: true,
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
