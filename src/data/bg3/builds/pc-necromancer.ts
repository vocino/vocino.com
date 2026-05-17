import type { Build } from '../types';

export const pcNecromancer: Build = {
  id: 'pc-necromancer',
  shortId: 'pc',
  name: 'Deathreaper',
  pcLabel: 'Tav',
  className: 'Cleric 8 (Death) · Wizard 2 (Necromancy) · Druid 2 (Spores)',
  role: 'Triangle of Death + dual hand crossbows',
  summary:
    '8 Death Domain Cleric / 2 Necromancy Wizard / 2 Spore Druid. WIS caster who twins Toll the Dead and Bone Chill via Reaper, then closes with dual hand crossbow attacks. No undead armies — necromancy as scalpel, not stampede.',

  levels: [
    {
      id: 'patch8-why',
      title: 'Why This Works in Patch 8',
      intro: 'Reach Cleric 6 before the Underdark. Wizard 2 and Druid 2 come last for Grim Harvest, Symbiotic Entity, and Halo of Spores.',
      items: [
        {
          id: 'reaper',
          label: 'Reaper (Cleric 1) — single-target necromancy cantrips hit a second creature within 1.5 m',
          tag: 'combat'
        },
        {
          id: 'touch-death',
          label: 'Touch of Death (Cleric 2) — Channel Divinity adds 5 + 2× Cleric level necrotic on melee hit',
          tag: 'combat'
        },
        {
          id: 'inescapable',
          label: 'Inescapable Destruction (Cleric 6) — your necrotic damage ignores resistance and immunity',
          tag: 'combat'
        },
        {
          id: 'divine-strike',
          label: 'Divine Strike: Necrotic (Cleric 8) — +1d8 necrotic once per turn on weapon hits',
          tag: 'combat'
        },
        {
          id: 'grim-harvest',
          label: 'Grim Harvest (Wizard 2) — killing with a spell heals 2 HP per spell level (3 if necromancy)',
          tag: 'combat'
        },
        {
          id: 'symbiotic',
          label: 'Symbiotic Entity (Druid 2) — temp HP and +1d6 necrotic on weapon hits while active',
          tag: 'combat'
        },
        {
          id: 'halo-spores',
          label: 'Halo of Spores (Druid 2) — reaction necrotic to enemies who enter your 3 m aura',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'level-1',
      title: 'L1 — Cleric (Death Domain)',
      intro: 'Start as Cleric so Reaper comes online turn one. Take all four cantrips.',
      items: [
        { id: 'cantrips', label: 'Cantrips: Bone Chill, Toll the Dead, Guidance, Bursting Sinew', tag: 'combat' },
        { id: 'subclass', label: 'Subclass: Death Domain → Reaper', tag: 'lore' },
        {
          id: 'spells-prep',
          label: 'Prepare: Bless, Command, Healing Word, Guiding Bolt, Inflict Wounds',
          tag: 'combat'
        },
        { id: 'deity', label: 'Deity: Kelemvor (scholar of mortality). Myrkul for a darker frame.', tag: 'lore' }
      ]
    },
    {
      id: 'level-2',
      title: 'L2 — Cleric · Touch of Death',
      items: [
        {
          id: 'touch-of-death',
          label: 'Channel Divinity: Touch of Death — bonus action necrotic rider on a melee hit',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'level-3',
      title: 'L3 — Cleric · 2nd-level slots',
      items: [
        { id: 'spiritual-weapon', label: 'Prepare Spiritual Weapon', tag: 'combat' },
        { id: 'sanctuary', label: 'Prepare Sanctuary', tag: 'combat' }
      ]
    },
    {
      id: 'level-4',
      title: 'L4 — Feat: Dual Wielder',
      intro: 'Unlocks dual hand crossbows and +1 AC while dual-wielding.',
      items: [
        { id: 'feat-dual', label: 'Feat: Dual Wielder', tag: 'combat' },
        { id: 'hold-person', label: 'Prepare Hold Person', tag: 'combat' }
      ]
    },
    {
      id: 'level-5',
      title: 'L5 — Cleric · 3rd-level slots',
      intro: 'Spirit Guardians is the workhorse. Reaper makes the necrotic damage non-resistible later.',
      items: [
        { id: 'spirit-guardians', label: 'Spell: Spirit Guardians (pick the Necrotic flavour)', tag: 'combat' },
        { id: 'aid', label: 'Prepare Aid — cast at 3rd before Long Rest', tag: 'combat' }
      ]
    },
    {
      id: 'level-6',
      title: 'L6 — Cleric · Inescapable Destruction',
      intro: 'Hit Cleric 6 before the Underdark.',
      items: [
        {
          id: 'inescapable-feature',
          label: 'Feature: Inescapable Destruction — your necrotic damage bypasses resistance and immunity',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'level-7',
      title: 'L7 — Cleric · 4th-level slots',
      items: [
        { id: 'banishment', label: 'Prepare Banishment', tag: 'combat' },
        { id: 'guardian-of-faith', label: 'Prepare Guardian of Faith', tag: 'combat' }
      ]
    },
    {
      id: 'level-8',
      title: 'L8 — Cleric · Divine Strike + Feat',
      intro: 'Divine Strike adds +1d8 necrotic to one weapon hit per turn. Pick War Caster for Spirit Guardians concentration.',
      items: [
        {
          id: 'divine-strike-feature',
          label: 'Feature: Divine Strike: Necrotic — +1d8 once per turn on weapon hits',
          tag: 'combat'
        },
        { id: 'feat-l8', label: 'Feat: War Caster (or Resilient: Constitution)', tag: 'combat' }
      ]
    },
    {
      id: 'level-9',
      title: 'L9 — Wizard 1',
      intro: 'First dip level. No subclass features yet — Necromancy and Grim Harvest land at Wizard 2.',
      items: [
        { id: 'wiz-cantrips', label: 'Cantrips: Booming Blade, Light, Minor Illusion', tag: 'combat' },
        {
          id: 'wiz-spells',
          label: 'Spells: Shield, Longstrider, Magic Missile, Feather Fall, Enhance Leap, Find Familiar',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'level-10',
      title: 'L10 — Wizard 2 · Necromancy School',
      items: [
        { id: 'subclass-wiz', label: 'Subclass: School of Necromancy', tag: 'lore' },
        { id: 'savant', label: 'Necromancy Savant — scribe necromancy scrolls for 25 gp per spell level', tag: 'lore' },
        { id: 'wiz-grim-harvest', label: 'Grim Harvest — spell kills heal 2 HP per spell level (3 if necromancy)', tag: 'combat' }
      ]
    },
    {
      id: 'level-11',
      title: 'L11 — Druid 1',
      items: [
        { id: 'druid-cantrips', label: 'Cantrips: Thorn Whip, Shillelagh', tag: 'combat' },
        {
          id: 'druid-spells',
          label: 'Spells: Healing Word, Thunderwave, Create or Destroy Water, Longstrider',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'level-12',
      title: 'L12 — Druid 2 · Circle of Spores',
      intro: 'Symbiotic Entity is the capstone buff. Burns one Wild Shape charge for temp HP and +1d6 necrotic on weapons.',
      items: [
        { id: 'subclass-druid', label: 'Subclass: Circle of Spores', tag: 'lore' },
        {
          id: 'symbiotic-feature',
          label: 'Feature: Symbiotic Entity — 4× Druid level temp HP, +1d6 necrotic on weapon hits',
          tag: 'combat'
        },
        {
          id: 'halo-feature',
          label: 'Feature: Halo of Spores — reaction necrotic to enemies in your aura',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'scribe-priority',
      title: 'Scribing Priority (Wizard 2)',
      intro: 'You only get Savant at character L10. Hoard necromancy scrolls until then and scribe in one sitting.',
      items: [
        { id: 'l1', label: 'L1: False Life, Ray of Sickness', tag: 'lore' },
        { id: 'l2', label: 'L2: Ray of Enfeeblement, Blindness', tag: 'lore' }
      ]
    }
  ],

  gear: [
    {
      id: 'gear-act1',
      title: 'Act 1',
      items: [
        {
          id: 'hand-crossbows-act1',
          label: 'Two Hand Crossbows (one in each hand)',
          note: 'Take any enchanted pair — even +1s carry through Act 2.',
          tag: 'combat'
        },
        {
          id: 'holy-lance-helm',
          label: 'Holy Lance Helm',
          note: 'Lady Esther / Githyanki Creche in Mountain Pass. Smites on first attack each turn.',
          tag: 'combat'
        },
        {
          id: 'luminous-armour',
          label: 'Luminous Armour (or Hide Armour +2)',
          note: 'Radiating Orb stacks on radiant hits — pairs with Coruscation Ring later.',
          tag: 'combat'
        },
        {
          id: 'hellriders-pride',
          label: "Hellrider's Pride (gloves)",
          note: 'Healing spells grant Blade Ward — Healing Word makes any ally tankier.',
          tag: 'combat'
        },
        {
          id: 'boots-striding',
          label: 'Boots of Striding',
          note: 'Concentration save advantage while at full HP.',
          tag: 'combat'
        },
        {
          id: 'periapt',
          label: 'Periapt of Wound Closure or Amulet of Misty Step',
          tag: 'combat'
        },
        {
          id: 'ring-protection',
          label: 'Ring of Protection + The Whispering Promise',
          note: 'Whispering Promise gives Bless on healed allies — chains with Hellrider\'s Pride.',
          tag: 'combat'
        },
        {
          id: 'hag-hair',
          label: 'Auntie Ethel Hair: +1 WIS',
          note: 'Pushes WIS to 18 for the rest of the run.',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'gear-act2',
      title: 'Act 2',
      items: [
        {
          id: 'hand-crossbows-act2',
          label: 'Two Hand Crossbows (upgrade pair)',
          tag: 'combat'
        },
        {
          id: 'circlet-mental-anguish',
          label: 'Circlet of Mental Anguish (or Holy Lance Helm)',
          note: 'Frightened enemies take +1d4 psychic.',
          tag: 'combat'
        },
        {
          id: 'fleshmelter-cloak',
          label: 'Fleshmelter Cloak',
          note: 'Acid reaction on melee hits.',
          tag: 'combat'
        },
        {
          id: 'luminous-gloves',
          label: 'Luminous Gloves',
          note: 'Stack more Radiating Orb with each radiant hit.',
          tag: 'combat'
        },
        {
          id: 'amulet-misty-step',
          label: 'Amulet of Misty Step or Amulet of the Harpers',
          tag: 'combat'
        },
        {
          id: 'callous-glow-ring',
          label: 'Callous Glow Ring + Ring of Mental Inhibition',
          note: 'Bonus radiant damage to illuminated enemies; debuff for Hold Person.',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'gear-act3',
      title: 'Act 3',
      items: [
        {
          id: 'hand-crossbows-act3',
          label: 'Two Hand Crossbows (best-in-slot pair)',
          tag: 'combat'
        },
        {
          id: 'hood-weave',
          label: 'Hood of the Weave (or Hat of the Sharp Caster)',
          note: '+2 spell save DC. Sorcerous Sundries.',
          tag: 'combat'
        },
        {
          id: 'cloak-weave',
          label: 'Cloak of the Weave',
          note: '+1 spell save DC.',
          tag: 'combat'
        },
        {
          id: 'gemini-gloves',
          label: 'Gemini Gloves (or Gloves of Dexterity)',
          tag: 'combat'
        },
        {
          id: 'armour-agility',
          label: 'Armour of Agility',
          note: 'No DEX cap on AC; fits the dual-crossbow stat line.',
          tag: 'combat'
        },
        {
          id: 'helldusk-boots',
          label: 'Helldusk Boots',
          tag: 'combat'
        },
        {
          id: 'amulet-devout',
          label: 'Amulet of the Devout (or Spell Savant Amulet)',
          note: '+2 spell save DC and Channel Divinity recharge.',
          tag: 'combat'
        },
        {
          id: 'coruscation-callous',
          label: 'Coruscation Ring + Callous Glow Ring',
          note: 'Radiant hits stack Radiating Orb; illuminated enemies take +2 radiant.',
          tag: 'combat'
        }
      ]
    }
  ],

  setup: [
    {
      id: 'setup-character',
      title: 'Character Creation',
      intro:
        'Death Domain scholar who studies mortality. EIP recommends Wood / Drow Half-Elf — we keep Human for the run\'s lore.',
      items: [
        { id: 'origin', label: 'Origin: Custom Tav' },
        {
          id: 'race',
          label: 'Race: Human — Civil Militia',
          note: 'Proficiency with spears, pikes, halberds, glaives, light armour, and shields. Free martial profs cover any melee swap-ins.',
          tag: 'lore'
        },
        {
          id: 'class',
          label: 'Class: Cleric — Death Domain (Patch 8)',
          note: 'Multiclass to Wizard 2 at character L10, Spore Druid 2 at L12.',
          tag: 'combat'
        },
        {
          id: 'background',
          label: 'Background: Acolyte (Insight, Religion)',
          tag: 'lore'
        },
        {
          id: 'deity',
          label: 'Deity: Kelemvor — scholar of mortality',
          note: 'Myrkul or Velsharoon if you want a darker frame.',
          tag: 'lore'
        }
      ]
    },
    {
      id: 'setup-abilities',
      title: 'Starting Stats (point buy, 27)',
      intro: 'BG3 has no racial ability bonuses since Patch 5 — assign +2 / +1 freely. Push WIS to 18 with Hag Hair in Act 1.',
      items: [
        { id: 'base', label: 'Base before ASI: STR 8, DEX 14, CON 14, INT 10, WIS 15, CHA 8' },
        {
          id: 'racial',
          label: 'Custom +2 WIS, +1 DEX → WIS 17, DEX 15, CON 14',
          tag: 'combat'
        },
        {
          id: 'hag',
          label: 'Auntie Ethel Hair (+1 WIS) → WIS 18 in Act 1',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'setup-feats',
      title: 'Feats to Consider',
      intro: 'Only Cleric levels grant feats on this build — L4 and L8.',
      items: [
        { id: 'feat-l4', label: 'L4: Dual Wielder (mandatory — two hand crossbows)', tag: 'combat' },
        { id: 'feat-l8', label: 'L8: War Caster (or Resilient: Constitution)', tag: 'combat' }
      ]
    },
    {
      id: 'setup-cantrips',
      title: 'Cantrips (L1 — Cleric)',
      items: [
        { id: 'bone-chill', label: 'Bone Chill — no-heal rider; Reaper twins it', tag: 'both' },
        { id: 'toll-dead', label: 'Toll the Dead — Triangle of Death core; Reaper twins it', tag: 'both' },
        { id: 'guidance', label: 'Guidance — out-of-combat ability check boost', tag: 'both' },
        { id: 'bursting-sinew', label: 'Bursting Sinew — AoE necrotic detonation on a corpse', tag: 'combat' }
      ]
    },
    {
      id: 'setup-spells',
      title: 'Level 1 Prepared Spells',
      items: [
        { id: 'bless', label: 'Bless' },
        { id: 'command', label: 'Command' },
        { id: 'healing-word', label: 'Healing Word' },
        { id: 'guiding-bolt', label: 'Guiding Bolt' },
        { id: 'inflict-wounds', label: 'Inflict Wounds' }
      ]
    },
    {
      id: 'setup-complete-section',
      title: 'Setup Completion',
      items: [
        { id: 'setup-complete', label: 'Mark setup complete and hide Setup tab' }
      ]
    }
  ]
};
