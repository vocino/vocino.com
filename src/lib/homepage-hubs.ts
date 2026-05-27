import { getEntry } from 'astro:content';
import { hubRegistry, type HubContentCollection, type HubRegistryEntry } from '../data/hubs';

export interface HomepageHubLink {
  slug: string;
  href: string;
  label: string;
  accent: string;
  updated?: Date;
}

function resolveLabel(hub: HubRegistryEntry): string {
  return hub.navLabel ?? hub.name;
}

async function resolveUpdated(hub: HubRegistryEntry): Promise<Date | undefined> {
  const { contentCollection, contentEntry } = hub;
  if (!contentCollection || !contentEntry) {
    return undefined;
  }

  const entry = await getEntry(contentCollection, contentEntry);
  return entry?.data.updated;
}

function compareHomepageHubs(a: HomepageHubLink, b: HomepageHubLink): number {
  const aTime = a.updated?.getTime() ?? 0;
  const bTime = b.updated?.getTime() ?? 0;

  if (bTime !== aTime) {
    return bTime - aTime;
  }

  return a.label.localeCompare(b.label, undefined, { sensitivity: 'base' });
}

/** Indexable hubs for the homepage pill nav, sorted by latest content update. */
export async function getHomepageHubs(): Promise<HomepageHubLink[]> {
  const indexable = hubRegistry.filter((hub) => hub.indexable);

  const links = await Promise.all(
    indexable.map(async (hub) => ({
      slug: hub.slug,
      href: `/${hub.slug}`,
      label: resolveLabel(hub),
      accent: hub.accent,
      updated: await resolveUpdated(hub),
    })),
  );

  return links.sort(compareHomepageHubs);
}

export type { HubContentCollection };
