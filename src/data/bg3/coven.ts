import type { CheckSection } from './types';

export const coreParty: CheckSection = {
  id: 'coven-core-party',
  title: 'Party Roles',
  intro:
    'Recommended field team for this run. Respec companions at Withers to match — open their build cards for level plans when ready.',
  items: [
    {
      id: 'core-shadowheart',
      label: 'Shadowheart — Aid, Spirit Guardians, healing',
      note: '+5 approval for opening the Thay book.',
      tag: 'lore'
    },
    {
      id: 'core-laezel',
      label: 'Lae\'zel — frontline, Githyanki mobility',
      note: '−5 approval for thralls in dialogue scenes.',
      tag: 'combat'
    },
    {
      id: 'core-karlach',
      label: 'Karlach — throw build, damage sponge',
      note: '−5 approval for raising corpses in town.',
      tag: 'combat'
    },
    {
      id: 'core-minthara',
      label: 'Minthara (optional) — Oathbreaker Paladin 7 / Necromancy Wizard 5',
      note: '+5 approval for ruthless necromancy choices. Recruit at Grove or Moonrise.',
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
  title: 'Scholar Stance',
  intro:
    'Play necromancy as study, not cruelty. Permit temporary animation for protection and research, then release thralls. Oppose permanent forced undeath. The Thay book is a primary source; Danse Macabre from the Tharchiate Codex is the culmination of your thesis.',
  items: [
    {
      id: 'lore-scholar-frame',
      label: 'Frame Tav as Thay-adjacent scholar — catalogue death, do not worship it',
      tag: 'lore'
    },
    {
      id: 'lore-release-thralls',
      label: 'Animate for protection and research, then release thralls',
      tag: 'lore'
    },
    {
      id: 'lore-speak-dead-always',
      label: 'Use Speak with Dead as an interview tool before looting crypts and tombs',
      tag: 'lore'
    },
    { id: 'lore-thay-read', label: 'Read Necromancy of Thay in Act 1; keep the book as a primary source through Act 2', tag: 'lore' },
    { id: 'lore-danse', label: 'Permanent Danse Macabre via Tharchiate Codex — the culmination of your thesis', tag: 'lore' },
    { id: 'lore-savant-scribe', label: 'Scribe necromancy scrolls at Savant cost (25 gp per spell level)' },
    { id: 'lore-name-thralls', label: 'Name your thralls; catalogue them like specimens' },
    { id: 'lore-balthazar-kill', label: 'Kill Balthazar for Circle of Bones — do not side with him', tag: 'both' },
    {
      id: 'lore-mystic-carrion',
      label: 'Mystic Carrion: complete his errand, destroy the four jars, then kill him',
      tag: 'both'
    },
    { id: 'lore-nightsong-free', label: 'Free Nightsong — oppose permanent forced undeath', tag: 'lore' },
    { id: 'lore-refuse-illithid', label: 'Refuse illithid tadpole powers — your path is mortal necromancy', tag: 'lore' }
  ]
};
