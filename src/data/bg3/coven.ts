import type { CheckSection } from './types';

export const coreParty: CheckSection = {
  id: 'coven-core-party',
  title: 'Party Roles',
  intro:
    'Female companions, retooled to back the Deathreaper. Respec at Withers as needed — open each build card for the L1-L12 plan.',
  items: [
    {
      id: 'core-shadowheart',
      label: 'Shadowheart — second healer + radiant support',
      note: 'You own necrotic; Shart covers Spirit Guardians (radiant) and Healing Word. +5 approval for opening the Thay book.',
      tag: 'lore'
    },
    {
      id: 'core-laezel',
      label: "Lae'zel — frontline, Githyanki mobility",
      note: 'Holds enemies in your Spirit Guardians aura. Misty Step pressure on back-line targets.',
      tag: 'combat'
    },
    {
      id: 'core-karlach',
      label: 'Karlach — throw build, damage sponge',
      note: 'Draws aggro off the dual-crossbow stance. Throw build keeps her relevant at range.',
      tag: 'combat'
    },
    {
      id: 'core-minthara',
      label: 'Minthara (optional) — Oathbreaker Paladin / Necromancy Wizard',
      note: 'Aura of Hate stacks with your Divine Strike. +5 approval for ruthless necromancy choices.',
      tag: 'both'
    },
    {
      id: 'core-jaheira',
      label: 'Jaheira (swap-in) — Circle of Spores Druid',
      note: 'If you want a second Spores caster — moral foil to your Kelemvor / Myrkul frame.',
      tag: 'lore'
    }
  ]
};

export const loreRules: CheckSection = {
  id: 'coven-lore-rules',
  title: 'Scholar Stance',
  intro:
    'Play necromancy as study, not cruelty. You serve Kelemvor (or Myrkul) — death is a domain to catalogue, not an army to recruit. Spirit Guardians and Divine Strike do the work that thralls would, without the war crimes.',
  items: [
    {
      id: 'lore-scholar-frame',
      label: 'Frame Tav as a scholar of mortality — catalogue death, do not worship it',
      tag: 'lore'
    },
    {
      id: 'lore-no-armies',
      label: 'No undead armies — Reaper twins your cantrips so you do not need bodies',
      tag: 'lore'
    },
    {
      id: 'lore-speak-dead-always',
      label: 'Use Speak with Dead as an interview tool before looting crypts and tombs',
      tag: 'lore'
    },
    {
      id: 'lore-thay-optional',
      label: 'Necromancy of Thay → Tharchiate Codex: free Danse Macabre for the rare bodies-night',
      tag: 'lore'
    },
    {
      id: 'lore-savant-scribe',
      label: 'After Wizard 2: scribe necromancy scrolls at Savant cost (25 gp per spell level)',
      tag: 'lore'
    },
    {
      id: 'lore-balthazar-kill',
      label: 'Kill Balthazar — do not side with him',
      tag: 'lore'
    },
    {
      id: 'lore-nightsong-free',
      label: 'Free Nightsong — oppose permanent forced undeath',
      tag: 'lore'
    },
    {
      id: 'lore-mystic-carrion',
      label: 'Mystic Carrion: complete the errand, destroy the jars, then kill him',
      tag: 'lore'
    },
    {
      id: 'lore-refuse-illithid',
      label: 'Refuse illithid tadpole powers — your path is mortal necromancy',
      tag: 'lore'
    }
  ]
};
