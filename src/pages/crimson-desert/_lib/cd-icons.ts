/**
 * Maps guide slugs to local icon paths under /assets/images/crimson-desert/.
 * Icons sourced from https://crimsondesert.fandom.com/ (see guide attribution).
 */

export type CdIconCategory = 'skill' | 'equipment' | 'weapon' | 'accessory';

export interface CdIconEntry {
  slug: string;
  label: string;
  category: CdIconCategory;
  /** Path relative to /assets/images/crimson-desert/ */
  file: string;
  wikiPath?: string;
}

const entries: CdIconEntry[] = [
  { slug: 'stamina', label: 'Stamina', category: 'skill', file: 'skills/stamina.webp', wikiPath: 'Stamina' },
  { slug: 'grapple', label: 'Grapple', category: 'skill', file: 'skills/grapple.webp', wikiPath: 'Grapple' },
  { slug: 'forward-slash', label: 'Forward Slash', category: 'skill', file: 'skills/forward-slash.webp', wikiPath: 'Forward_Slash' },
  { slug: 'axiom-force', label: 'Axiom Force', category: 'skill', file: 'skills/axiom-force.webp', wikiPath: 'Axiom_Force' },
  { slug: 'force-palm', label: 'Force Palm', category: 'skill', file: 'skills/force-palm.webp', wikiPath: 'Force_Palm' },
  { slug: 'canta-plate-helm', label: 'Canta Plate Helm', category: 'equipment', file: 'equipment/canta-plate-helm.webp', wikiPath: 'Canta_Plate_Helm' },
  { slug: 'canta-plate-armor', label: 'Canta Plate Armor', category: 'equipment', file: 'equipment/canta-plate-armor.webp', wikiPath: 'Canta_Plate_Armor' },
  { slug: 'canta-plate-cloak', label: 'Canta Plate Cloak', category: 'equipment', file: 'equipment/canta-plate-cloak.webp', wikiPath: 'Canta_Plate_Cloak' },
  { slug: 'canta-plate-gloves', label: 'Canta Plate Gloves', category: 'equipment', file: 'equipment/canta-plate-gloves.webp', wikiPath: 'Canta_Plate_Gloves' },
  { slug: 'canta-plate-foot', label: 'Canta Plate Foot', category: 'equipment', file: 'equipment/canta-plate-foot.webp', wikiPath: 'Canta_Plate_Foot' },
  { slug: 'finely-crafted-gold-necklace', label: 'Finely Crafted Gold Necklace', category: 'accessory', file: 'accessories/finely-crafted-gold-necklace.webp', wikiPath: 'Finely_Crafted_Gold_Necklace' },
  { slug: 'oath-of-darkness-earring', label: 'Oath of Darkness Earring', category: 'accessory', file: 'accessories/oath-of-darkness-earring.webp', wikiPath: 'Oath_of_Darkness_Earring' },
  { slug: 'engraved-gold-earring', label: 'Engraved Gold Earring', category: 'accessory', file: 'accessories/engraved-gold-earring.webp', wikiPath: 'Engraved_Gold_Earring' },
  { slug: 'tarnished-ring', label: 'Tarnished Ring', category: 'accessory', file: 'accessories/tarnished-ring.webp', wikiPath: 'Tarnished_Ring' },
  { slug: 'worn-ring', label: 'Worn Ring', category: 'accessory', file: 'accessories/worn-ring.webp', wikiPath: 'Worn_Ring' },
  { slug: 'sword-of-the-wolf', label: 'Sword of the Wolf', category: 'weapon', file: 'weapons/sword-of-the-wolf.webp', wikiPath: 'Sword_of_the_Wolf' },
  { slug: 'shield-of-conviction', label: 'Shield of Conviction', category: 'weapon', file: 'weapons/shield-of-conviction.webp', wikiPath: 'Shield_of_Conviction' },
  { slug: 'hwando-two-hander', label: 'Hwando Two-Hander', category: 'weapon', file: 'weapons/hwando-two-hander.webp', wikiPath: 'Hwando_Two-Hander' },
  { slug: 'grey-wolf-bow', label: 'Grey Wolf Bow', category: 'weapon', file: 'weapons/grey-wolf-bow.webp', wikiPath: 'Grey_Wolf_Bow' },
];

const bySlug = new Map(entries.map((e) => [e.slug, e]));

export function getCdIcon(slug: string): CdIconEntry | undefined {
  return bySlug.get(slug.toLowerCase());
}

export function getCdIconPublicPath(slug: string): string {
  const entry = getCdIcon(slug);
  if (entry) return `/assets/images/crimson-desert/${entry.file}`;
  return '/assets/images/crimson-desert/fallback/icon.webp';
}

export function slugToDefaultLabel(slug: string): string {
  return getCdIcon(slug)?.label ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export const cdIconEntries = entries;

export const cdWikiAttribution =
  'Icons from the Crimson Desert Wiki where available; generic wiki item art is used when a page has no dedicated icon yet.';
