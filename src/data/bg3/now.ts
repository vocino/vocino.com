import type { CheckItem, CheckSection } from './types';

/** Lists shown by the "Don't Leave Act Without" act selector. */
export const dontLeaveByAct: Record<'act1' | 'act2' | 'act3', CheckItem[]> = {
  act1: [
    {
      id: 'act1-headband',
      label: 'Warped Headband of Intellect',
      note: 'Ogre encounter — INT 17 until your ASIs pass it.',
      tag: 'combat'
    },
    {
      id: 'act1-thay-book',
      label: 'Necromancy of Thay + Dark Amethyst',
      note: 'Apothecary cellar + Whispering Depths. Read in Act 1; keep for Act 3.',
      tag: 'lore'
    },
    {
      id: 'act1-hag-hair',
      label: 'Auntie Ethel Hair (+1 INT)',
      note: 'Needed for INT 20 by level 8 with +2 INT ASI.',
      tag: 'combat'
    },
    {
      id: 'act1-animate-dead-scroll',
      label: 'Scribe Animate Dead before L5',
      note: 'Savant: 25 gp per spell level on necromancy scrolls.',
      tag: 'both'
    },
    {
      id: 'act1-recruits',
      label: 'Recruit Shadowheart, Lae\'zel, Karlach',
      note: 'Female core party. Minthara optional (Grove or Moonrise).',
      tag: 'lore'
    }
  ],
  act2: [
    {
      id: 'act2-circle-bones',
      label: 'Circle of Bones — kill Balthazar',
      note: 'Gauntlet of Shar. Siding with him loses the helm.',
      tag: 'both'
    },
    {
      id: 'act2-spellcrux',
      label: 'Spellcrux Amulet',
      note: 'Restore one spell slot per Long Rest.',
      tag: 'combat'
    },
    {
      id: 'act2-night-walkers',
      label: 'Disintegrating Night Walkers',
      note: 'Immunity to Enwebbed/Entangled + free Misty Step.',
      tag: 'combat'
    },
    {
      id: 'act2-nightsong',
      label: 'Free Nightsong',
      note: 'A Kelemvor or Myrkul scholar opposes forced undeath.',
      tag: 'lore'
    },
    {
      id: 'act2-create-undead',
      label: 'Scribe Create Undead',
      note: 'Ghouls for your thrall roster before Act 3.',
      tag: 'both'
    }
  ],
  act3: [
    {
      id: 'act3-carrion',
      label: 'Mystic Carrion — staff + ring route',
      note: 'Thrumbo\'s errand → destroy four jars → kill Carrion. Philgrave\'s Mansion.',
      tag: 'both'
    },
    {
      id: 'act3-tharchiate',
      label: 'Tharchiate Codex — permanent Danse Macabre',
      note: 'Sorcerous Sundries vault. Read Necromancy of Thay in Act 1 first.',
      tag: 'lore'
    },
    {
      id: 'act3-staff',
      label: 'Staff of Cherished Necromancy',
      note: 'Mystic Carrion at X:14 Y:-160.',
      tag: 'both'
    },
    {
      id: 'act3-crypt-ring',
      label: 'Crypt Lord Ring',
      note: 'Find Mystic Carrion\'s Servant — keep Thrumbo alive.',
      tag: 'both'
    },
    {
      id: 'act3-weave-gear',
      label: 'Hood of the Weave + Cloak of the Weave + Sporekeeper armour',
      note: 'Sorcerous Sundries — stack spell save DC with staff.',
      tag: 'combat'
    },
    {
      id: 'act3-circle-death',
      label: 'Scribe Circle of Death',
      note: 'L11 spike. Buy scrolls at Sorcerous Sundries.',
      tag: 'both'
    }
  ]
};

export const criticalQuests: CheckSection = {
  id: 'now-critical-quests',
  title: 'Critical Quest Decisions',
  intro: 'Scholar stances — not completionist. Wrong choices cost key necromancy gear.',
  items: [
    {
      id: 'quest-thay-chain',
      label: 'Necromancy of Thay chain',
      note: 'Read in Act 1, keep book. Act 3: Tharchiate Codex in Sorcerous Sundries vault → permanent Danse Macabre.',
      tag: 'lore'
    },
    {
      id: 'quest-balthazar',
      label: 'Kill Balthazar in Gauntlet of Shar',
      note: 'Loot Circle of Bones. Siding with him loses the helm.',
      tag: 'both'
    },
    {
      id: 'quest-carrion',
      label: 'Mystic Carrion — jars then kill',
      note: 'Complete Thrumbo\'s errand, destroy four jars, kill Carrion. Staff + ring in one outcome.',
      tag: 'both'
    },
    {
      id: 'quest-nightsong',
      label: 'Free Nightsong',
      note: 'Opposes forced undeath — fits Kelemvor / Myrkul scholar framing.',
      tag: 'lore'
    }
  ]
};

export const combatLoop: CheckSection = {
  id: 'now-combat-loop',
  title: 'Combat Loop',
  intro: 'Phone-second-screen reminders between fights.',
  items: [
    {
      id: 'combat-aid',
      label: 'Cast Aid at 3rd level before Long Rest, then Animate Dead',
      note: 'Undead inherit the max HP increase.',
      tag: 'combat'
    },
    {
      id: 'combat-skeletons',
      label: 'Skeletons (bows) in open fights; zombies in tight corridors',
      tag: 'combat'
    },
    {
      id: 'combat-grim-harvest',
      label: 'Finish low-HP enemies with Bone Chill for Grim Harvest healing',
      tag: 'combat'
    },
    {
      id: 'combat-life-essence',
      label: 'Staff of Cherished Necromancy: cantrip kill → free Blight or Circle of Death via Life Essence',
      tag: 'both'
    }
  ]
};

export const beforeLongRest: CheckSection = {
  id: 'now-before-rest',
  title: 'Before Long Rest',
  items: [
    {
      id: 'rest-aid-animate',
      label: 'Aid (3rd level) then recast Animate Dead',
      note: 'Thralls inherit Aid max HP.',
      tag: 'combat'
    },
    { id: 'rest-animate-dead', label: 'Recast Animate Dead if Aid already active (24h)' },
    { id: 'rest-speak-dead', label: 'Speak with Dead on fresh corpses', tag: 'lore' },
    {
      id: 'rest-scribe',
      label: 'Scribe necromancy scrolls (Savant: 25 gp per spell level)',
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
    { id: 'levelup-scribe', label: 'Scribe hoarded necromancy scrolls into spellbook' },
    { id: 'levelup-prepared', label: 'Refresh prepared list for tomorrow\'s fights' },
    { id: 'levelup-gear', label: 'Audit gear for new slot unlocks' },
    {
      id: 'levelup-w6-dip',
      label: 'At Wizard 6: decide pure 12 vs Death Domain dip after this level',
      tag: 'lore'
    }
  ]
};

export const beforeLeaving: CheckSection = {
  id: 'now-before-leaving',
  title: 'Before Leaving Area',
  items: [
    { id: 'leave-loot', label: 'Sweep crates, urns, hidden walls' },
    { id: 'leave-speak-dead', label: 'Speak with Dead on nameable corpses', tag: 'lore' },
    { id: 'leave-vendors', label: 'Buy necromancy scrolls and reagents' },
    { id: 'leave-camp-stash', label: 'Send heavies to camp stash' }
  ]
};

export const thayReading: CheckSection = {
  id: 'now-thay-reading',
  title: 'Necromancy of Thay',
  intro:
    'Act 1: read the book, accept whispers, keep it. Act 3: Tharchiate Codex in Sorcerous Sundries vault permanently teaches Danse Macabre.',
  items: [
    { id: 'thay-act1-read', label: 'Act 1: Open with Dark Amethyst and read the book', tag: 'lore' },
    { id: 'thay-act1-keep', label: 'Act 1: Keep Necromancy of Thay in inventory through Act 2', tag: 'lore' },
    {
      id: 'thay-act3-codex',
      label: 'Act 3: Read Tharchiate Codex in Sorcerous Sundries vault',
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
    { id: 'approval-karlach-raise-town', label: 'Karlach −5 for raising corpses in town', tag: 'lore' },
    { id: 'approval-laezel-undead', label: 'Lae\'zel −5 for thralls in dialogue scenes', tag: 'lore' },
    {
      id: 'approval-minthara-dark',
      label: 'Minthara +5 for ruthless / necromancy choices',
      tag: 'lore'
    }
  ]
};
