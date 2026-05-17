import type { CheckSection } from './types';

export const coreParty: CheckSection = {
  id: 'coven-core-party',
  title: 'Core Party (female companions)',
  intro:
    'Recommended field team for this run. Respec companions at Withers to match — open their build cards for level plans when ready.',
  items: [
    {
      id: 'core-shadowheart',
      label: 'Shadowheart — Death Domain Cleric of Shar',
      note: 'Reaper doubles Toll the Dead. Second necrotic priest; covers healing.',
      tag: 'lore'
    },
    {
      id: 'core-laezel',
      label: 'Lae\'zel — Battle Master Fighter',
      note: 'Front line to hold enemies inside your Cloudkill.',
      tag: 'combat'
    },
    {
      id: 'core-karlach',
      label: 'Karlach — Berserker Barbarian',
      note: 'Draws aggro while skeletons shoot from elevation.',
      tag: 'combat'
    },
    {
      id: 'core-minthara',
      label: 'Minthara (optional) — Oathbreaker Paladin 7 / Necromancy Wizard 5',
      note: 'Aura of Hate buffs undead damage. Recruit at Grove or Moonrise.',
      tag: 'both'
    },
    {
      id: 'core-jaheira',
      label: 'Jaheira (swap-in) — Circle of Spores Druid',
      note: 'Nature control if you want a fifth — moral foil to Thay scholarship.',
      tag: 'lore'
    }
  ]
};

export const loreRules: CheckSection = {
  id: 'coven-lore-rules',
  title: 'Lore Rules',
  intro:
    'Thayvian scholar stances. Death is a resource to catalogue — not worship. These are the spine, not a completion list.',
  items: [
    {
      id: 'lore-scholar-frame',
      label: 'Frame Tav as Thay-adjacent scholar — catalogue death, do not worship it',
      tag: 'lore'
    },
    { id: 'lore-speak-dead-always', label: 'Speak with Dead before looting crypts and tombs' },
    { id: 'lore-thay-read', label: 'Read Necromancy of Thay in Act 1; keep book for Act 3 Codex' },
    { id: 'lore-danse', label: 'Permanent Danse Macabre via Tharchiate Codex — name the ghoul', tag: 'lore' },
    { id: 'lore-savant-scribe', label: 'Scribe necromancy scrolls at Savant cost (25 gp per spell level)' },
    { id: 'lore-name-thralls', label: 'Name your thralls; catalogue them like specimens' },
    { id: 'lore-balthazar-kill', label: 'Kill Balthazar for Circle of Bones — do not side with him', tag: 'both' },
    {
      id: 'lore-mystic-carrion',
      label: 'Mystic Carrion: Thrumbo errand → destroy jars → kill for staff and ring',
      tag: 'both'
    },
    { id: 'lore-nightsong-free', label: 'Free Nightsong — oppose forced undeath', tag: 'lore' },
    { id: 'lore-refuse-illithid', label: 'Refuse illithid tadpole powers — your path is mortal necromancy', tag: 'lore' }
  ]
};
