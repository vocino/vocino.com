/**
 * Maps guide slugs to local icon paths under /assets/images/bg3/.
 * Icons sourced from https://bg3.wiki/ (see guide attribution).
 */

export type Bg3IconCategory = 'spell' | 'item' | 'condition' | 'feat' | 'action';

export interface Bg3IconEntry {
  slug: string;
  label: string;
  category: Bg3IconCategory;
  /** Path relative to /assets/images/bg3/ */
  file: string;
  wikiPath?: string;
}

const entries: Bg3IconEntry[] = [
  { slug: 'hold-person', label: 'Hold Person', category: 'spell', file: 'spells/hold-person.webp', wikiPath: 'Hold_Person' },
  { slug: 'hold-monster', label: 'Hold Monster', category: 'spell', file: 'spells/hold-monster.webp', wikiPath: 'Hold_Monster' },
  { slug: 'hypnotic-pattern', label: 'Hypnotic Pattern', category: 'spell', file: 'spells/hypnotic-pattern.webp', wikiPath: 'Hypnotic_Pattern' },
  { slug: 'greater-invisibility', label: 'Greater Invisibility', category: 'spell', file: 'spells/greater-invisibility.webp', wikiPath: 'Greater_Invisibility' },
  { slug: 'haste', label: 'Haste', category: 'spell', file: 'spells/haste.webp', wikiPath: 'Haste' },
  { slug: 'bless', label: 'Bless', category: 'spell', file: 'spells/bless.webp', wikiPath: 'Bless' },
  { slug: 'sanctuary', label: 'Sanctuary', category: 'spell', file: 'spells/sanctuary.webp', wikiPath: 'Sanctuary' },
  { slug: 'calm-emotions', label: 'Calm Emotions', category: 'spell', file: 'spells/calm-emotions.webp', wikiPath: 'Calm_Emotions' },
  { slug: 'shield', label: 'Shield', category: 'spell', file: 'spells/shield.webp', wikiPath: 'Shield_(spell)' },
  { slug: 'misty-step', label: 'Misty Step', category: 'spell', file: 'spells/misty-step.webp', wikiPath: 'Misty_Step' },
  { slug: 'ray-of-frost', label: 'Ray of Frost', category: 'spell', file: 'spells/ray-of-frost.webp', wikiPath: 'Ray_of_Frost' },
  { slug: 'spirit-guardians', label: 'Spirit Guardians', category: 'spell', file: 'spells/spirit-guardians.webp', wikiPath: 'Spirit_Guardians' },
  { slug: 'magic-missile', label: 'Magic Missile', category: 'spell', file: 'spells/magic-missile.webp', wikiPath: 'Magic_Missile' },
  { slug: 'counterspell', label: 'Counterspell', category: 'spell', file: 'spells/counterspell.webp', wikiPath: 'Counterspell' },
  { slug: 'command', label: 'Command', category: 'spell', file: 'spells/command.webp', wikiPath: 'Command' },
  { slug: 'booming-blade', label: 'Booming Blade', category: 'spell', file: 'spells/booming-blade.webp', wikiPath: 'Booming_Blade' },
  { slug: 'shadow-blade', label: 'Shadow Blade', category: 'spell', file: 'spells/shadow-blade.webp', wikiPath: 'Shadow_Blade' },
  { slug: 'divine-smite', label: 'Divine Smite', category: 'spell', file: 'spells/divine-smite.webp', wikiPath: 'Divine_Smite' },
  { slug: 'pass-without-trace', label: 'Pass Without Trace', category: 'spell', file: 'spells/pass-without-trace.webp', wikiPath: 'Pass_Without_Trace' },
  { slug: 'create-water', label: 'Create Water', category: 'spell', file: 'spells/create-water.webp', wikiPath: 'Create_Water' },
  { slug: 'healing-word', label: 'Healing Word', category: 'spell', file: 'spells/healing-word.webp', wikiPath: 'Healing_Word' },
  { slug: 'armor-of-agathys', label: 'Armor of Agathys', category: 'spell', file: 'spells/armor-of-agathys.webp', wikiPath: 'Armor_of_Agathys' },
  { slug: 'wall-of-fire', label: 'Wall of Fire', category: 'spell', file: 'spells/wall-of-fire.webp', wikiPath: 'Wall_of_Fire' },
  { slug: 'globe-of-invulnerability', label: 'Globe of Invulnerability', category: 'spell', file: 'spells/globe-of-invulnerability.webp', wikiPath: 'Globe_of_Invulnerability' },
  { slug: 'cloud-of-daggers', label: 'Cloud of Daggers', category: 'spell', file: 'spells/cloud-of-daggers.webp', wikiPath: 'Cloud_of_Daggers' },
  { slug: 'sleet-storm', label: 'Sleet Storm', category: 'spell', file: 'spells/sleet-storm.webp', wikiPath: 'Sleet_Storm' },
  { slug: 'aid', label: 'Aid', category: 'spell', file: 'spells/aid.webp', wikiPath: 'Aid' },
  { slug: 'protection-from-evil-and-good', label: 'Protection from Evil and Good', category: 'spell', file: 'spells/protection-from-evil-and-good.webp', wikiPath: 'Protection_from_Evil_and_Good' },
  { slug: 'arcane-lock', label: 'Arcane Lock', category: 'spell', file: 'spells/arcane-lock.webp', wikiPath: 'Arcane_Lock' },
  { slug: 'phalar-aluve', label: 'Phalar Aluve', category: 'item', file: 'items/phalar-aluve.webp', wikiPath: 'Phalar_Aluve' },
  { slug: 'titanstring-bow', label: 'Titanstring Bow', category: 'item', file: 'items/titanstring-bow.webp', wikiPath: 'Titanstring_Bow' },
  { slug: 'drakethroat-glaive', label: 'Drakethroat Glaive', category: 'item', file: 'items/drakethroat-glaive.webp', wikiPath: 'Drakethroat_Glaive' },
  { slug: 'birthright', label: 'Birthright', category: 'item', file: 'items/birthright.webp', wikiPath: 'Birthright' },
  { slug: 'markoheshkir', label: "Markoheshkir's Staff", category: 'item', file: 'items/markoheshkir.webp', wikiPath: 'Markoheshkir' },
  { slug: 'sussur-bloom', label: 'Sussur Bloom', category: 'item', file: 'items/sussur-bloom.webp', wikiPath: 'Sussur_Bloom' },
  { slug: 'sharpshooter', label: 'Sharpshooter', category: 'feat', file: 'feats/sharpshooter.webp', wikiPath: 'Sharpshooter' },
  { slug: 'alert', label: 'Alert', category: 'feat', file: 'feats/alert.webp', wikiPath: 'Alert_(Feat)' },
  { slug: 'savage-attacker', label: 'Savage Attacker', category: 'feat', file: 'feats/savage-attacker.webp', wikiPath: 'Savage_Attacker' },
  { slug: 'tavern-brawler', label: 'Tavern Brawler', category: 'feat', file: 'feats/tavern-brawler.webp', wikiPath: 'Tavern_Brawler' },
];

const bySlug = new Map(entries.map((e) => [e.slug, e]));

export function getBg3Icon(slug: string): Bg3IconEntry | undefined {
  return bySlug.get(slug.toLowerCase());
}

export function getBg3IconPublicPath(slug: string): string {
  const entry = getBg3Icon(slug);
  if (entry) return `/assets/images/bg3/${entry.file}`;
  return '/assets/images/bg3/fallback/spell.webp';
}

export function slugToDefaultLabel(slug: string): string {
  return getBg3Icon(slug)?.label ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export const bg3IconEntries = entries;

export const bg3WikiAttribution =
  'Spell, item, and ability icons are from the Baldur\'s Gate 3 Wiki (bg3.wiki), used for reference.';
