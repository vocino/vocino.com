/**
 * Star Wars hub section registry — single source of truth for the landing cards.
 * Local to /star-wars only (mirrors the role of cd-characters.ts for Crimson Desert).
 *
 * Per-section accents drive the landing card tints and each section page's
 * `--section-accent`. The hub baseline accent (opening-crawl yellow) lives in
 * src/data/hubs.ts.
 */
export type SwSectionId = 'outlaws' | 'legion' | 'celebration-2027' | 'zero-company';

export type SwSectionStatus = 'live' | 'soon';

export interface SwSection {
  id: SwSectionId;
  /** Short label for the card heading. */
  label: string;
  /** "kicker" shown above the label (mono). */
  kicker: string;
  /** One-line blurb for the card. */
  tagline: string;
  /** Internal href; only meaningful when status === 'live'. */
  href: string;
  /** Per-section accent hex. */
  accent: string;
  status: SwSectionStatus;
}

export const swSections: SwSection[] = [
  {
    id: 'outlaws',
    label: 'Star Wars Outlaws',
    kicker: 'Now playing',
    tagline: 'Playthrough notes from the Outer Rim — scoundrel runs, syndicates, and tips.',
    href: '/star-wars/outlaws',
    accent: '#E8A33D',
    status: 'live',
  },
  {
    id: 'legion',
    label: 'Star Wars: Legion',
    kicker: 'Tabletop',
    tagline: 'My Legion army list — units, points, and the lists I actually field.',
    href: '/star-wars/legion',
    accent: '#C0392B',
    status: 'soon',
  },
  {
    id: 'celebration-2027',
    label: 'Celebration 2027',
    kicker: 'Event',
    tagline: 'Plans, panels, and the checklist for Star Wars Celebration 2027.',
    href: '/star-wars/celebration-2027',
    accent: '#FFE81F',
    status: 'soon',
  },
  {
    id: 'zero-company',
    label: 'Star Wars Zero Company',
    kicker: 'Upcoming',
    tagline: 'Notes and anticipation for the upcoming tactical Star Wars game.',
    href: '/star-wars/zero-company',
    accent: '#4DA3FF',
    status: 'soon',
  },
];

export function getSwSection(id: string): SwSection | undefined {
  return swSections.find((section) => section.id === id);
}
