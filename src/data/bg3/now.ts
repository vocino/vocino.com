import type { CheckItem, CheckSection, TriangleCard } from './types';

/** Pinned combat reference at the top of the Now tab. Not a checklist. */
export const triangleOfDeath: TriangleCard = {
  id: 'triangle-of-death',
  title: 'Triangle of Death',
  intro: 'Pick the cantrip that matches the enemy\'s weakest stat. Reaper twins the single-target ones on a second creature within 1.5 m.',
  rows: [
    { stat: 'low DEX', cantrip: 'Bursting Sinew' },
    { stat: 'low AC',  cantrip: 'Bone Chill' },
    { stat: 'low WIS', cantrip: 'Toll the Dead' }
  ]
};

/** Lists shown by the "Don't Leave Act Without" act selector. */
export const dontLeaveByAct: Record<'act1' | 'act2' | 'act3', CheckItem[]> = {
  act1: [
    {
      id: 'act1-hand-crossbows',
      label: 'A pair of Hand Crossbows (any enchanted)',
      note: 'Dual Wielder at L4 turns these into the build\'s real damage.',
      tag: 'combat'
    },
    {
      id: 'act1-holy-lance',
      label: 'Holy Lance Helm',
      note: 'Mountain Pass — Lady Esther / Githyanki Creche. Smites on first attack each turn.',
      tag: 'combat'
    },
    {
      id: 'act1-luminous',
      label: 'Luminous Armour',
      note: 'Radiating Orb stacks on radiant hits — pairs with Coruscation Ring later.',
      tag: 'combat'
    },
    {
      id: 'act1-hag-hair',
      label: 'Auntie Ethel Hair (+1 WIS)',
      note: 'Pushes WIS to 18 for the rest of the run.',
      tag: 'combat'
    },
    {
      id: 'act1-recruits',
      label: "Recruit Shadowheart, Lae'zel, Karlach",
      note: 'Female core party. Minthara optional (Grove or Moonrise).',
      tag: 'lore'
    }
  ],
  act2: [
    {
      id: 'act2-fleshmelter',
      label: 'Fleshmelter Cloak',
      note: 'Last Light Inn. Acid reaction on melee hits.',
      tag: 'combat'
    },
    {
      id: 'act2-circlet-anguish',
      label: 'Circlet of Mental Anguish',
      note: 'Frightened enemies take +1d4 psychic — chain off Fear / Cause Fear.',
      tag: 'combat'
    },
    {
      id: 'act2-callous-glow',
      label: 'Callous Glow Ring + Ring of Mental Inhibition',
      note: 'Bonus radiant to lit enemies; save debuff for Hold Person.',
      tag: 'combat'
    },
    {
      id: 'act2-cleric-6',
      label: 'Be Cleric 6 before the Underdark',
      note: 'Inescapable Destruction makes your necrotic damage ignore resistance.',
      tag: 'combat'
    },
    {
      id: 'act2-nightsong',
      label: 'Free Nightsong',
      note: 'A scholar of mortality opposes permanent forced undeath.',
      tag: 'lore'
    }
  ],
  act3: [
    {
      id: 'act3-weave-gear',
      label: 'Hood of the Weave + Cloak of the Weave',
      note: 'Sorcerous Sundries — stack spell save DC.',
      tag: 'combat'
    },
    {
      id: 'act3-armour-agility',
      label: 'Armour of Agility',
      note: 'No DEX cap on AC; fits the dual-crossbow stat line.',
      tag: 'combat'
    },
    {
      id: 'act3-helldusk-boots',
      label: 'Helldusk Boots',
      tag: 'combat'
    },
    {
      id: 'act3-amulet-devout',
      label: 'Amulet of the Devout (or Spell Savant Amulet)',
      note: 'Channel Divinity recharge on a short rest is the killer line.',
      tag: 'combat'
    },
    {
      id: 'act3-coruscation',
      label: 'Coruscation Ring',
      note: 'Stacks more Radiating Orb with Luminous Armour / Gloves.',
      tag: 'combat'
    },
    {
      id: 'act3-tharchiate',
      label: 'Tharchiate Codex — permanent Danse Macabre (optional)',
      note: 'Read Necromancy of Thay in Act 1 first. Free skeletons if you ever want bodies.',
      tag: 'lore'
    }
  ]
};

export const criticalQuests: CheckSection = {
  id: 'now-critical-quests',
  title: 'Critical Quest Decisions',
  intro: 'Scholar stances — not completionist. Each one shapes the Deathreaper kit or the run\'s tone.',
  items: [
    {
      id: 'quest-creche-helm',
      label: 'Mountain Pass: get the Holy Lance Helm',
      note: 'Lady Esther / Githyanki Creche. Smites on first attack — core for hand crossbow openers.',
      tag: 'combat'
    },
    {
      id: 'quest-cleric-six',
      label: 'Hit Cleric 6 before entering the Underdark / Shadow-Cursed Lands',
      note: 'Inescapable Destruction is the build\'s scaling spike.',
      tag: 'combat'
    },
    {
      id: 'quest-nightsong',
      label: 'Free Nightsong',
      note: 'A Kelemvor / Myrkul-flavoured scholar opposes forced undeath.',
      tag: 'lore'
    },
    {
      id: 'quest-thay-chain',
      label: 'Necromancy of Thay → Tharchiate Codex (optional)',
      note: 'Read book in Act 1, keep it. Codex in Sorcerous Sundries vault permanently teaches Danse Macabre.',
      tag: 'lore'
    },
    {
      id: 'quest-refuse-tadpole',
      label: 'Refuse illithid tadpole powers',
      note: 'Your path is mortal necromancy — not aberrant ascension.',
      tag: 'lore'
    }
  ]
};

export const combatLoop: CheckSection = {
  id: 'now-combat-loop',
  title: 'Combat Loop',
  intro: 'Triangle of Death first; hand crossbows close at L8 once Dual Wielder + Divine Strike land.',
  items: [
    {
      id: 'combat-pre-fight',
      label: 'Pre-fight: Aid at 3rd level, Longstrider, Bless on the front line',
      tag: 'combat'
    },
    {
      id: 'combat-spirit-guardians',
      label: 'Open with Spirit Guardians + Spiritual Weapon',
      note: 'Inescapable Destruction (Cleric 6) makes necrotic ignore resistance — pair with the necrotic flavour where available.',
      tag: 'combat'
    },
    {
      id: 'combat-triangle-pick',
      label: 'Triangle of Death — pick the cantrip that matches the weak stat',
      note: 'Bursting Sinew vs low DEX · Bone Chill vs low AC · Toll the Dead vs low WIS.',
      tag: 'combat'
    },
    {
      id: 'combat-triangle',
      label: 'Cantrip rotation: Toll the Dead → Bone Chill → Bursting Sinew',
      note: 'Reaper (Cleric 1) twins single-target cantrips on a second creature within 1.5 m.',
      tag: 'combat'
    },
    {
      id: 'combat-skeletons',
      label: 'Bonus action: Spiritual Weapon swing + Healing Word as needed',
      tag: 'combat'
    },
    {
      id: 'combat-crossbows',
      label: 'L8+: hand crossbows with Divine Strike: Necrotic (+1d8 once per turn)',
      note: 'Touch of Death (Channel Divinity) adds 5 + 2× Cleric level necrotic on a single melee hit.',
      tag: 'combat'
    },
    {
      id: 'combat-grim-harvest',
      label: 'L10+: finish low-HP enemies with Toll the Dead for Grim Harvest healing',
      note: '+3 HP per spell level (necromancy) every time a spell lands the killing blow.',
      tag: 'combat'
    },
    {
      id: 'combat-symbiotic',
      label: 'L12: Symbiotic Entity for temp HP + Halo of Spores reactions',
      tag: 'combat'
    },
    {
      id: 'combat-concentration',
      label: 'Concentration: Spirit Guardians or Hold Person. Drop it for Glyph of Warding setup or Hold Monster later.',
      tag: 'combat'
    }
  ]
};

export const beforeLongRest: CheckSection = {
  id: 'now-before-rest',
  title: 'Before Long Rest',
  items: [
    {
      id: 'rest-aid-animate',
      label: 'Cast Aid at 3rd level (party max HP +10 for 24 h)',
      tag: 'combat'
    },
    { id: 'rest-prep-spells', label: 'Refresh prepared list for tomorrow\'s fights' },
    { id: 'rest-speak-dead', label: 'Speak with Dead on fresh corpses', tag: 'lore' },
    {
      id: 'rest-scribe',
      label: 'Scribe necromancy scrolls once you hit Wizard 2 (Savant: 25 gp per spell level)',
      tag: 'lore'
    },
    { id: 'rest-shadowheart', label: 'Talk to Shadowheart after Thay book reads (+5 approval)', tag: 'lore' }
  ]
};

export const afterLevelUp: CheckSection = {
  id: 'now-after-level',
  title: 'After Level Up',
  items: [
    { id: 'levelup-spells', label: 'Pick new spells from the level roadmap' },
    { id: 'levelup-prepared', label: 'Refresh prepared list for tomorrow\'s fights' },
    { id: 'levelup-gear', label: 'Audit gear for new slot unlocks' },
    {
      id: 'levelup-cleric-six',
      label: 'Cleric 6 (char L6): plan the Wizard 2 / Druid 2 dips at L9-L12',
      tag: 'combat'
    },
    {
      id: 'levelup-wiz-two',
      label: 'Wizard 2 (char L10): scribe every hoarded necromancy scroll',
      tag: 'lore'
    }
  ]
};

export const beforeLeaving: CheckSection = {
  id: 'now-before-leaving',
  title: 'Before Leaving Area',
  items: [
    { id: 'leave-loot', label: 'Sweep crates, urns, hidden walls for scrolls and gold' },
    { id: 'leave-speak-dead', label: 'Speak with Dead on nameable corpses', tag: 'lore' },
    { id: 'leave-vendors', label: 'Buy necromancy scrolls and reagents (hoard for Wizard 2)' },
    { id: 'leave-camp-stash', label: 'Send heavy armour and camp supplies to camp stash' },
    { id: 'leave-gold', label: 'Check gold for scribing', tag: 'lore' }
  ]
};

export const thayReading: CheckSection = {
  id: 'now-thay-reading',
  title: 'Necromancy of Thay (optional)',
  intro:
    'Not core for Deathreaper, but the Tharchiate Codex permanently teaches Danse Macabre — free skeletons on the rare night you want bodies on the field.',
  items: [
    { id: 'thay-act1-read', label: 'Act 1: open Necromancy of Thay with Dark Amethyst and read it', tag: 'lore' },
    { id: 'thay-act1-keep', label: 'Keep the book through Act 2 — Codex needs it', tag: 'lore' },
    {
      id: 'thay-act3-codex',
      label: 'Act 3: read Tharchiate Codex in Sorcerous Sundries vault',
      note: 'Permanently learn Danse Macabre.',
      tag: 'lore'
    }
  ]
};

export const approvalGates: CheckSection = {
  id: 'now-approval-gates',
  title: 'Approval Gates (female party)',
  items: [
    { id: 'approval-shart-thay', label: 'Shadowheart +5 for opening the Thay book', tag: 'lore' },
    { id: 'approval-shart-kelemvor', label: 'Shadowheart approval shifts on the Shar / Selûne / Kelemvor turn', tag: 'lore' },
    { id: 'approval-karlach-mercy', label: 'Karlach +5 for mercy moves; −5 for cruelty in town', tag: 'lore' },
    { id: 'approval-laezel-decisive', label: "Lae'zel +5 for decisive answers; −5 for hesitation", tag: 'lore' },
    {
      id: 'approval-minthara-dark',
      label: 'Minthara +5 for ruthless / necromancy choices',
      tag: 'lore'
    }
  ]
};
