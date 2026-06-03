/**
 * The 12 Baldur's Gate 3 base classes, in the catalogue's display order.
 * Drives the build grid on /baldurs-gate-3 (including "coming soon" placeholders) and the
 * class badge shown on each build. `iconSlug` matches a `category: 'class'`
 * entry in `bg3-icons.ts`.
 */

export interface Bg3Class {
  /** URL/match slug, e.g. "paladin". */
  slug: string;
  /** Display name, e.g. "Paladin". */
  name: string;
  /** Class icon slug in the bg3-icons registry (same as `slug` here). */
  iconSlug: string;
}

export const bg3Classes: Bg3Class[] = [
  { slug: 'barbarian', name: 'Barbarian', iconSlug: 'barbarian' },
  { slug: 'bard', name: 'Bard', iconSlug: 'bard' },
  { slug: 'cleric', name: 'Cleric', iconSlug: 'cleric' },
  { slug: 'druid', name: 'Druid', iconSlug: 'druid' },
  { slug: 'fighter', name: 'Fighter', iconSlug: 'fighter' },
  { slug: 'monk', name: 'Monk', iconSlug: 'monk' },
  { slug: 'paladin', name: 'Paladin', iconSlug: 'paladin' },
  { slug: 'ranger', name: 'Ranger', iconSlug: 'ranger' },
  { slug: 'rogue', name: 'Rogue', iconSlug: 'rogue' },
  { slug: 'sorcerer', name: 'Sorcerer', iconSlug: 'sorcerer' },
  { slug: 'warlock', name: 'Warlock', iconSlug: 'warlock' },
  { slug: 'wizard', name: 'Wizard', iconSlug: 'wizard' },
];
