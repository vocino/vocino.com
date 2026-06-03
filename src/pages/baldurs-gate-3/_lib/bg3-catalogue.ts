import { getCollection, type CollectionEntry } from 'astro:content';
import { bg3Classes, type Bg3Class } from './bg3-classes';

export type Bg3Entry = CollectionEntry<'bg3'>;

/** A class slot in the catalogue grid: either a published build or a placeholder. */
export interface Bg3ClassSlot {
  class: Bg3Class;
  build?: Bg3Entry;
}

function byOrderThenTitle(a: Bg3Entry, b: Bg3Entry): number {
  const ao = a.data.order ?? Number.MAX_SAFE_INTEGER;
  const bo = b.data.order ?? Number.MAX_SAFE_INTEGER;
  if (ao !== bo) return ao - bo;
  return a.data.title.localeCompare(b.data.title, undefined, { sensitivity: 'base' });
}

/** All routable (non-draft) bg3 entries. */
export async function getPublishedBg3Entries(): Promise<Bg3Entry[]> {
  const all = await getCollection('bg3');
  return all.filter((entry) => !entry.data.draft);
}

export function getBg3Builds(entries: Bg3Entry[]): Bg3Entry[] {
  return entries.filter((entry) => entry.data.kind === 'build').sort(byOrderThenTitle);
}

export function getBg3Playthroughs(entries: Bg3Entry[]): Bg3Entry[] {
  return entries.filter((entry) => entry.data.kind === 'playthrough').sort(byOrderThenTitle);
}

/** One slot per canonical class, filled with its build when one exists. */
export function getBg3ClassSlots(entries: Bg3Entry[]): Bg3ClassSlot[] {
  const builds = getBg3Builds(entries);
  return bg3Classes.map((cls) => ({
    class: cls,
    build: builds.find((b) => b.data.classSlug === cls.slug),
  }));
}

/** Rough reading time from the markdown body (~220 wpm). */
export function getReadingMinutes(entry: Bg3Entry, fallbackWords = 1500): number {
  const words = entry.body?.split(/\s+/).filter(Boolean).length ?? fallbackWords;
  return Math.max(1, Math.round(words / 220));
}

/** Newest `updated` across published entries — powers homepage hub freshness. */
export function getLatestBg3Update(entries: Bg3Entry[]): Date | undefined {
  return entries
    .map((entry) => entry.data.updated)
    .filter((date): date is Date => date instanceof Date)
    .sort((a, b) => b.getTime() - a.getTime())[0];
}
