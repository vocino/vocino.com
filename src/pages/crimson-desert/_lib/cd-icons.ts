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
  { slug: 'spencer-pistol', label: 'Spencer Pistol', category: 'weapon', file: 'weapons/spencer-pistol.webp', wikiPath: 'Spencer_Pistol' },
  { slug: 'bekker-musket', label: 'Bekker Musket', category: 'weapon', file: 'weapons/bekker-musket.webp', wikiPath: 'Bekker_Musket' },
  { slug: 'white-wind-rapier', label: 'White Wind Rapier', category: 'weapon', file: 'weapons/white-wind-rapier.webp', wikiPath: 'White_Wind_Rapier' },
  {
    slug: 'demenissian-gold-plated-shield',
    label: 'Demenissian Gold-Plated Shield',
    category: 'weapon',
    file: 'weapons/demenissian-gold-plated-shield.webp',
    wikiPath: 'Demenissian_Gold-Plated_Shield',
  },
  {
    slug: 'demeniss-elite-uniform-armor',
    label: 'Demeniss Elite Uniform Leather Armor',
    category: 'equipment',
    file: 'equipment/demeniss-elite-uniform-armor.webp',
    wikiPath: 'Demeniss_Elite_Uniform_Leather_Armor',
  },
  {
    slug: 'demenissian-elite-uniform-gloves',
    label: 'Demenissian Elite Uniform Gloves',
    category: 'equipment',
    file: 'equipment/demenissian-elite-uniform-gloves.webp',
    wikiPath: 'Demenissian_Elite_Uniform_Gloves',
  },
  {
    slug: 'demenissian-elite-uniform-boots',
    label: 'Demenissian Elite Uniform Boots',
    category: 'equipment',
    file: 'equipment/demenissian-elite-uniform-boots.webp',
    wikiPath: 'Demenissian_Elite_Uniform_Boots',
  },
  { slug: 'focused-shot', label: 'Focused Shot', category: 'skill', file: 'skills/focused-shot.webp', wikiPath: 'Focused_Shot' },
  {
    slug: 'focused-evasive-shot',
    label: 'Focused Evasive Shot',
    category: 'skill',
    file: 'skills/focused-evasive-shot.webp',
    wikiPath: 'Focused_Evasive_Shot',
  },
  {
    slug: 'focused-charged-shot',
    label: 'Focused Charged Shot',
    category: 'skill',
    file: 'skills/focused-charged-shot.webp',
    wikiPath: 'Focused_Charged_Shot',
  },
  { slug: 'evasive-shot', label: 'Evasive Shot', category: 'skill', file: 'skills/evasive-shot.webp', wikiPath: 'Evasive_Shot' },
  { slug: 'sword-flurry', label: 'Sword Flurry', category: 'skill', file: 'skills/sword-flurry.webp', wikiPath: 'Sword_Flurry' },
  { slug: 'piercing-light', label: 'Piercing Light', category: 'skill', file: 'skills/piercing-light.webp', wikiPath: 'Piercing_Light' },
  { slug: 'flight', label: 'Flight', category: 'skill', file: 'skills/flight.webp', wikiPath: 'Flight' },
  { slug: 'keen-senses', label: 'Keen Senses', category: 'skill', file: 'skills/keen-senses.webp', wikiPath: 'Keen_Senses' },
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
