import type { CheckItem, CheckSection } from './types';

export const darkUrgeOrigin: CheckSection = {
  id: 'origin',
  title: 'Dark Urge + Shadow Magic',
  intro:
    "The shadow magic is innate — Tav has no oath to break and no holy magic to swear off. The Dark Urge cutscenes still fire on their own schedule; just play them out and collect the rewards.",
  items: [
    {
      id: 'origin-alfira',
      label: 'Let the Alfira camp night play out — Sceleritas Fel grants the Deathstalker Mantle',
      note: 'The Dark Urge-only invisibility cloak. No oath consequence since Tav is a Sorcerer.',
      tag: 'lore'
    },
    {
      id: 'origin-isobel',
      label: 'Act 2: kill Isobel (or let Marcus take her) to trigger early Slayer form',
      tag: 'lore'
    },
    {
      id: 'origin-grave',
      label: 'Roleplay Strength of the Grave as Bhaal refusing to let you die',
      note: 'Once per long rest, a 0-HP hit drops you to 1 HP instead. Save it for the urge scenes — narratively, the god keeps his vessel alive.',
      tag: 'lore'
    },
    {
      id: 'origin-bhaal',
      label: 'Act 3: accept Bhaal in the Temple of Bhaal, defeat Orin',
      tag: 'lore'
    }
  ]
};

export const withersTiming: CheckSection = {
  id: 'withers-timing',
  title: 'Withers Respec Timing',
  intro:
    'Withers recruits in the Dank Crypt (Act 1). Respecs cost 100 gold per character and reset to L1 while keeping XP. Tav has no special timing constraint — the Sorcerer can be respecced freely.',
  items: [
    {
      id: 'withers-shart',
      label: 'Shadowheart → Cleric (Death Domain) early Act 2, after the Shar commit, before the Gauntlet of Shar',
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
      id: 'withers-minthara',
      label: 'Minthara (optional) — confirm she stays single-class Oathbreaker Paladin',
      note: 'Default kit works. Only respec to clean up her L1 stats if recruited mid-Act 1.',
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
      note: "Open it with the Dark Amethyst from the Whispering Depths Matriarch. Do NOT sell or destroy it — Gale's Danse Macabre depends on it.",
      tag: 'lore'
    },
    {
      id: 'lore-a1-mage-armor',
      label: 'Cast Mage Armor on Tav every long rest from L2 onward',
      tag: 'combat'
    },
    {
      id: 'lore-a1-recruit-minthara',
      label: 'Decide on Minthara before leaving Act 1 — Grove massacre recruits her here; otherwise spare her at Moonrise in Act 2',
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
      id: 'gear-a1-spellsparkler',
      label: 'Spellsparkler (Arfur\'s Storage, Toymaker basement)',
      note: 'Quarterstaff that grants Lightning Charges on every spell — best Act 1 staff for Tav and Gale.',
      tag: 'combat'
    },
    {
      id: 'gear-a1-hag-hair',
      label: 'Auntie Ethel Hair → +1 CHA on Tav (CHA 18 in Act 1)',
      tag: 'combat'
    },
    {
      id: 'gear-a1-deathstalker',
      label: 'Deathstalker Mantle (Sceleritas Fel, after the Alfira camp night)',
      note: 'Invisibility on a creature kill. The Dark Urge-only cloak.',
      tag: 'lore'
    },
    {
      id: 'gear-a1-everburn',
      label: 'Everburn Blade / Sword of Justice — pass to the flex frontline',
      note: 'Nautiloid + Mountain Pass martial drops. Not for Tav; equip them on Lae\'zel, Astarion, or Minthara.',
      tag: 'combat'
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
      label: 'Bhaalist Armour (Murder Tribunal) — give it to the frontline carrier',
      note: 'Aura of Murder doubles piercing damage inside 2 m. Tav is a Sorcerer with no medium-armour proficiency — Minthara, Lae\'zel, or Astarion wears it.',
      tag: 'combat'
    },
    {
      id: 'gear-a3-markoheshkir',
      label: 'Markoheshkir (Sorcerous Sundries vault) — best-in-slot staff for Tav',
      tag: 'combat'
    },
    {
      id: 'gear-a3-robe-weave',
      label: 'Robe of the Weave + Cloak of the Weave (Sorcerous Sundries)',
      note: '+1 spell save DC each — stack on Tav and Gale.',
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
