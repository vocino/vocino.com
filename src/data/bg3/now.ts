import type { CheckItem, CheckSection } from './types';

export const oathBreak: CheckSection = {
  id: 'oath-break',
  title: 'How and When to Break Your Oath',
  intro:
    'Start as Devotion (innocents) or Vengeance (mercy). Pick one of the two break paths below in Act 1, then long-rest to summon the Oathbreaker Knight in camp.',
  items: [
    {
      id: 'oath-tiefling-trap',
      label: 'Path A — Tieflings holding Lae\'zel: promise not to attack, then attack after dialogue ends',
      note: 'Killing innocents breaks Devotion. Works whether or not you take Lae\'zel.',
      tag: 'lore'
    },
    {
      id: 'oath-alfira',
      label: 'Path B (canonical Dark Urge) — let the Alfira camp night play out',
      note: 'The forced murder breaks your oath instantly and grants the Deathstalker Mantle from Sceleritas Fel.',
      tag: 'lore'
    },
    {
      id: 'oath-sazza',
      label: 'Path C — free Sazza for an easy Vengeance break',
      note: 'Use this only if you skipped Alfira and want to break Vengeance instead of Devotion.',
      tag: 'lore'
    },
    {
      id: 'oath-knight',
      label: 'Long rest — Oathbreaker Knight appears in camp; accept the subclass (free)',
      tag: 'both'
    },
    {
      id: 'oath-no-restore',
      label: 'Do not restore the oath later — 1,000 → 2,000 → 10,000 gold and you do not need it',
      tag: 'lore'
    }
  ]
};

export const withersTiming: CheckSection = {
  id: 'withers-timing',
  title: 'Withers Respec Timing',
  intro:
    'Withers recruits in the Dank Crypt (Act 1). Respecs cost 100 gold per character and reset to L1 while keeping XP. Two hard rules:',
  items: [
    {
      id: 'withers-pc-lock',
      label: 'Lock your Paladin BEFORE breaking the oath',
      note: 'Withers cannot respec a Paladin who already has the Oathbreaker subclass.',
      tag: 'both'
    },
    {
      id: 'withers-shart',
      label: 'Shadowheart → Cleric (Death Domain) early Act 2, after Shar commit, before the Gauntlet of Shar',
      note: 'Respec after the story flag so her arc holds. Death Domain gives Reaper at L1 — bring it to Nightsong.',
      tag: 'both'
    },
    {
      id: 'withers-gale',
      label: 'Gale → Wizard (Necromancy) after he joins camp in Act 1',
      note: 'Pick School of Necromancy at L2 — Grim Harvest is the engine.',
      tag: 'both'
    },
    {
      id: 'withers-no-early',
      label: 'Never respec a companion before they have officially joined camp',
      note: 'Respeccing before story flags fire can wipe arc choices.',
      tag: 'both'
    }
  ]
};

export const loreByAct: Record<'act1' | 'act2' | 'act3', CheckItem[]> = {
  act1: [
    {
      id: 'lore-a1-thay-keep',
      label: 'Keep the Necromancy of Thay from the Apothecary Basement (Blighted Village)',
      note: 'Open it with the Dark Amethyst from the Whispering Depths Matriarch. Do NOT sell or destroy it — Gale\'s Danse Macabre depends on it.',
      tag: 'lore'
    },
    {
      id: 'lore-a1-alfira',
      label: 'Let the Dark Urge Alfira camp scene trigger',
      tag: 'lore'
    },
    {
      id: 'lore-a1-sazza',
      label: 'Free Sazza if you skipped Alfira and want the easy Vengeance break',
      tag: 'lore'
    }
  ],
  act2: [
    {
      id: 'lore-a2-nightsong',
      label: 'Shadowheart: kill the Nightsong → becomes Dark Justiciar',
      note: 'Loot the Dark Justiciar Half-Plate (Very Rare on kill), Helmet, and Gauntlets.',
      tag: 'lore'
    },
    {
      id: 'lore-a2-balthazar-loot',
      label: 'Gale: loot Circle of Bones from Balthazar',
      tag: 'lore'
    },
    {
      id: 'lore-a2-isobel',
      label: 'Dark Urge: kill Isobel (or let Marcus take her) to trigger early Slayer form',
      tag: 'lore'
    },
    {
      id: 'lore-a2-dammon',
      label: 'Buy from Dammon at Last Light Inn BEFORE letting Isobel die',
      note: 'The Flawed Helldusk Armour craft requires he stays alive.',
      tag: 'lore'
    }
  ],
  act3: [
    {
      id: 'lore-a3-thay-finish',
      label: 'Sorcerous Sundries vault — finish the Necromancy of Thay to unlock Danse Macabre',
      tag: 'lore'
    },
    {
      id: 'lore-a3-mystic-carrion',
      label: "Mystic Carrion: complete his errand in Philgrave's Mansion, then kill him",
      note: 'Loot Staff of Cherished Necromancy, Armour of the Sporekeeper, and the Crypt Lord Ring.',
      tag: 'lore'
    },
    {
      id: 'lore-a3-bhaal',
      label: 'Accept Bhaal in the Temple of Bhaal — defeat Orin',
      tag: 'lore'
    }
  ]
};

export const gearByAct: Record<'act1' | 'act2' | 'act3', CheckItem[]> = {
  act1: [
    {
      id: 'gear-a1-thay',
      label: 'Necromancy of Thay + Dark Amethyst',
      note: 'Keep both. The Dark Amethyst unlocks the book; the book is required for Danse Macabre in Act 3.',
      tag: 'lore'
    },
    {
      id: 'gear-a1-sword-of-justice',
      label: 'Sword of Justice (Paladin Anders, Mountain Pass)',
      tag: 'combat'
    },
    {
      id: 'gear-a1-everburn',
      label: 'Everburn Blade (Commander Zhalk, Nautiloid)',
      tag: 'combat'
    },
    {
      id: 'gear-a1-deathstalker',
      label: 'Deathstalker Mantle (Sceleritas Fel, after the Alfira camp night)',
      note: 'Invisibility on a creature kill. The Dark Urge-only cloak.',
      tag: 'lore'
    }
  ],
  act2: [
    {
      id: 'gear-a2-dj-plate',
      label: 'Dark Justiciar Half-Plate, Helmet, Gauntlets',
      note: 'Loot from killing the Nightsong as Shadowheart.',
      tag: 'combat'
    },
    {
      id: 'gear-a2-ritual-dagger',
      label: 'Ritual Dagger of Shar',
      note: '+1 dagger, +1d4 necrotic. Sharran Sanctuary.',
      tag: 'combat'
    },
    {
      id: 'gear-a2-circle-bones',
      label: 'Circle of Bones (Balthazar)',
      tag: 'combat'
    },
    {
      id: 'gear-a2-flawed-helldusk',
      label: 'Flawed Helldusk Armour (Dammon, Last Light Inn)',
      note: 'Crafted by Dammon — buy before letting Isobel die.',
      tag: 'combat'
    }
  ],
  act3: [
    {
      id: 'gear-a3-cherished',
      label: 'Staff of Cherished Necromancy (Mystic Carrion)',
      tag: 'combat'
    },
    {
      id: 'gear-a3-sporekeeper',
      label: 'Armour of the Sporekeeper (Mystic Carrion)',
      tag: 'combat'
    },
    {
      id: 'gear-a3-crypt-lord',
      label: 'Crypt Lord Ring (Mystic Carrion questline)',
      note: 'Grants Create Undead once per Long Rest.',
      tag: 'combat'
    },
    {
      id: 'gear-a3-bhaalist',
      label: 'Bhaalist Armour (Murder Tribunal)',
      note: 'Aura of Murder — enemies within 2 m take double piercing. Centerpiece of the build.',
      tag: 'combat'
    }
  ]
};

export const pitfalls: CheckSection = {
  id: 'pitfalls',
  title: 'What to Avoid',
  items: [
    {
      id: 'avoid-thay',
      label: 'Do not sell or destroy the Necromancy of Thay in Act 1',
      note: "Gale's Danse Macabre depends on completing it in the Sorcerous Sundries vault.",
      tag: 'lore'
    },
    {
      id: 'avoid-dammon',
      label: 'Do not leave Last Light Inn without buying from Dammon if you plan to let Isobel die',
      tag: 'lore'
    },
    {
      id: 'avoid-early-respec',
      label: 'Do not respec companions before they have officially joined camp',
      note: 'Can wipe story flags.',
      tag: 'lore'
    },
    {
      id: 'avoid-animate-rest',
      label: 'Long rest after casting Animate Dead',
      note: 'Summons persist until Long Rest and cost no concentration — let them run until you sleep.',
      tag: 'combat'
    }
  ]
};
