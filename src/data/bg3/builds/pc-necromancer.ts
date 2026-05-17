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

  glance: {
    split: '8 / 2 / 2',
    classes: ['Cleric', 'Wizard', 'Druid'],
    dominantStat: 'WIS',
    feats: ['L4 War Caster', 'L8 Dual Wielder']
  },

  levels: [
    {
      id: 'patch8-why',
      title: 'Why This Works in Patch 8',
      intro: 'Cleric first so Reaper comes online at L1. Hit Cleric 6 before the Underdark. Wizard 2 and Druid 2 close it out.',
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
          label: 'Divine Strike: Necrotic (Cleric 8) — +1d8 necrotic once per turn on weapon hits (pair with two hand crossbows)',
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
      intro: 'Cantrips and subclass at L1. No spell prep yet — preparation lands at L2.',
      levelClass: 'cleric',
      milestone: true,
      items: [
        { id: 'cantrips', label: 'Cantrips: Bone Chill, Toll the Dead, Guidance, Bursting Sinew (take all 4)', tag: 'combat' },
        { id: 'subclass', label: 'Subclass: Death Domain → Reaper', tag: 'lore' },
        { id: 'deity', label: 'Deity: Tiamat (EIP\'s flavour pick — any works)', tag: 'lore' }
      ]
    },
    {
      id: 'level-2',
      title: 'L2 — Cleric · Touch of Death',
      levelClass: 'cleric',
      items: [
        {
          id: 'spells-prep',
          label: 'Prepare: Bless, Command, Healing Word, Guiding Bolt, Inflict Wounds',
          tag: 'combat'
        },
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
      levelClass: 'cleric',
      items: [
        { id: 'spiritual-weapon', label: 'Prepare Spiritual Weapon', tag: 'combat' },
        { id: 'sanctuary', label: 'Prepare Sanctuary', tag: 'combat' }
      ]
    },
    {
      id: 'level-4',
      title: 'L4 — Feat: War Caster',
      intro: 'Concentration save advantage is mandatory for Spirit Guardians at L5.',
      levelClass: 'cleric',
      milestone: true,
      items: [
        { id: 'hold-person', label: 'Prepare Hold Person', tag: 'combat' },
        { id: 'aid-enhance', label: 'Then prepare Aid or Enhance Ability', tag: 'combat' },
        { id: 'cantrip-produce-flame', label: 'Cantrip: Produce Flame', tag: 'combat' },
        { id: 'feat-warcaster', label: 'Feat: War Caster', tag: 'combat' }
      ]
    },
    {
      id: 'level-5',
      title: 'L5 — Cleric · 3rd-level slots',
      intro: 'Spirit Guardians is the workhorse — Inescapable Destruction (L6) makes it bypass necrotic resistance.',
      levelClass: 'cleric',
      items: [
        { id: 'spirit-guardians', label: 'Prepare Spirit Guardians', tag: 'combat' }
      ]
    },
    {
      id: 'level-6',
      title: 'L6 — Cleric · Inescapable Destruction',
      intro: 'Hit Cleric 6 before the Underdark. Glyph of Warding is the headline 3rd-level pick.',
      levelClass: 'cleric',
      milestone: true,
      items: [
        { id: 'glyph-of-warding', label: 'Prepare Glyph of Warding', tag: 'combat' },
        { id: 'revivify', label: 'Extras: Revivify, Mass Healing Word', tag: 'combat' },
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
      intro: 'The new Level IV spells are not great. Prep any previous spell that fits the next fight.',
      levelClass: 'cleric',
      items: [
        { id: 'l7-refresh', label: 'Refresh prepared list from L1-L3 spells', tag: 'combat' }
      ]
    },
    {
      id: 'level-8',
      title: 'L8 — Feat: Dual Wielder + Divine Strike',
      intro: 'L4 spells still aren\'t great — keep the prep flexible. The feat and the feature are the milestone.',
      levelClass: 'cleric',
      milestone: true,
      items: [
        {
          id: 'divine-strike-feature',
          label: 'Feature: Divine Strike: Necrotic — +1d8 once per turn on weapon hits (use the two hand crossbows)',
          tag: 'combat'
        },
        { id: 'feat-dual', label: 'Feat: Dual Wielder', tag: 'combat' }
      ]
    },
    {
      id: 'level-9',
      title: 'L9 — Wizard 1',
      intro: 'First dip. You can now learn scrolls — Circle of Death and Dethrone are chef\'s kiss.',
      levelClass: 'wizard',
      items: [
        { id: 'wiz-cantrips', label: 'Cantrips: Booming Blade, Light, Minor Illusion', tag: 'combat' },
        {
          id: 'wiz-spells',
          label: 'Spells: Shield, Longstrider, Magic Missile (the core three) + Feather Fall, Enhance Leap, free pick',
          tag: 'combat'
        },
        {
          id: 'wiz-scrolls',
          label: 'Hunt scrolls: Circle of Death, Dethrone',
          tag: 'lore'
        }
      ]
    },
    {
      id: 'level-10',
      title: 'L10 — Wizard 2 · Necromancy School',
      levelClass: 'wizard',
      milestone: true,
      items: [
        { id: 'subclass-wiz', label: 'Subclass: School of Necromancy', tag: 'lore' },
        { id: 'savant', label: 'Necromancy Savant — scribe necromancy scrolls for 25 gp per spell level', tag: 'lore' },
        { id: 'wiz-spells-l10', label: 'Spells: free choice (not crucial for the build)' },
        { id: 'wiz-grim-harvest', label: 'Passive: Grim Harvest — spell kills heal 2 HP / level (3 if necromancy)', tag: 'combat' }
      ]
    },
    {
      id: 'level-11',
      title: 'L11 — Druid 1',
      levelClass: 'druid',
      items: [
        { id: 'druid-cantrips', label: 'Cantrips: Thorn Whip, Shillelagh', tag: 'combat' },
        {
          id: 'druid-spells',
          label: 'Spells: Longstrider, Healing Word, Thunderwave, Create or Destroy Water',
          tag: 'combat'
        },
        {
          id: 'replace-wiz-longstrider',
          label: 'Replace Wizard\'s Longstrider with something else (Druid covers it)',
          tag: 'combat'
        },
        {
          id: 'replace-cleric-healing',
          label: 'Replace Cleric\'s Healing Word with something else (Druid covers it)',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'level-12',
      title: 'L12 — Druid 2 · Circle of Spores',
      intro: 'Symbiotic Entity is the capstone buff. Burns a Wild Shape charge for temp HP and +1d6 necrotic on weapons.',
      levelClass: 'druid',
      milestone: true,
      items: [
        { id: 'subclass-druid', label: 'Subclass: Circle of the Spores', tag: 'lore' },
        { id: 'druid-l12-spells', label: 'Interesting adds: Ice Knife, Faerie Fire', tag: 'combat' },
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
      title: 'Scrolls to Hunt + Scribe',
      intro:
        'You can learn scrolls from Wizard 1 (char L9). Savant pricing (25 gp per level) kicks in at Wizard 2 (char L10). Hoard everything until then.',
      items: [
        { id: 'l1', label: 'L1: False Life, Ray of Sickness', tag: 'lore' },
        { id: 'l2', label: 'L2: Ray of Enfeeblement, Blindness', tag: 'lore' },
        { id: 'circle-death', label: 'L6: Circle of Death (chef\'s kiss)', tag: 'lore' },
        { id: 'dethrone', label: 'L5: Dethrone (chef\'s kiss)', tag: 'lore' }
      ]
    }
  ],

  gear: [
    {
      id: 'gear-act1',
      title: 'Act 1',
      items: [
        {
          id: 'weapon-staff-act1',
          label: 'Main hand staff: Melf\'s First Staff, Sorrow, or Blood of Lathander',
          note: 'Cast from the staff; swap to crossbows for the off-action.',
          tag: 'combat'
        },
        {
          id: 'offhand-act1',
          label: 'Off-hand: Safeguard Shield (or any shield)',
          tag: 'combat'
        },
        {
          id: 'hand-crossbows-act1',
          label: 'Ranged: two hand crossbows (any enchanted pair)',
          note: 'Dual Wielder at L8 makes this the burst rotation.',
          tag: 'combat'
        },
        {
          id: 'holy-lance-helm',
          label: 'Helm: Holy Lance Helm (or Warped Headband of Intellect for scroll casting, Circlet of Psionic Revenge)',
          note: 'Lady Esther / Githyanki Creche in Mountain Pass. Smites on first attack each turn.',
          tag: 'combat'
        },
        {
          id: 'luminous-armour',
          label: 'Armour: Luminous Armour (or Hide Armour +2 / any Medium)',
          note: 'Radiating Orb stacks on radiant hits.',
          tag: 'combat'
        },
        {
          id: 'hellriders-pride',
          label: 'Gloves: Hellrider\'s Pride',
          note: 'Healing spells grant Blade Ward.',
          tag: 'combat'
        },
        {
          id: 'boots-striding',
          label: 'Boots: Boots of Striding',
          note: 'Concentration save advantage while at full HP.',
          tag: 'combat'
        },
        {
          id: 'periapt',
          label: 'Amulet: Periapt of Wound Closure or Amulet of Misty Step',
          tag: 'combat'
        },
        {
          id: 'ring-protection',
          label: 'Rings: Ring of Protection + The Whispering Promise (or Sunwalker\'s Gift, Coruscation Ring)',
          tag: 'combat'
        },
        {
          id: 'hag-hair',
          label: 'Auntie Ethel Hair: +1 WIS → 18',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'gear-act2',
      title: 'Act 2',
      items: [
        {
          id: 'weapon-staff-act2',
          label: 'Main hand staff: Blood of Lathander, Melf\'s First Staff, or Sorrow',
          tag: 'combat'
        },
        {
          id: 'offhand-act2',
          label: 'Off-hand: Melf\'s First Staff, Incandescent Staff, or Sentinel Shield',
          tag: 'combat'
        },
        {
          id: 'hand-crossbows-act2',
          label: 'Ranged: two hand crossbows (upgrade pair)',
          tag: 'combat'
        },
        {
          id: 'circlet-mental-anguish',
          label: 'Helm: Circlet of Mental Anguish (or Holy Lance Helm, Fistbreaker Helm, Circlet of Hunting)',
          note: 'Frightened enemies take +1d4 psychic — chain off Fear / Cause Fear.',
          tag: 'combat'
        },
        {
          id: 'armour-act2',
          label: 'Armour: Luminous Armour',
          tag: 'combat'
        },
        {
          id: 'fleshmelter-cloak',
          label: 'Cloak: Fleshmelter Cloak',
          note: 'Last Light Inn. Acid reaction on melee hits.',
          tag: 'combat'
        },
        {
          id: 'luminous-gloves',
          label: 'Gloves: Luminous Gloves (or Hellrider\'s Pride)',
          tag: 'combat'
        },
        {
          id: 'boots-act2',
          label: 'Boots: Boots of Striding (keep)',
          tag: 'combat'
        },
        {
          id: 'amulet-misty-step',
          label: 'Amulet: Amulet of Misty Step, Amulet of the Harpers, or Periapt of Wound Closure',
          tag: 'combat'
        },
        {
          id: 'callous-glow-ring',
          label: 'Rings: Callous Glow Ring + Ring of Mental Inhibition (or Ring of Spiteful Thunder, Ring of Protection)',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'gear-act3',
      title: 'Act 3',
      items: [
        {
          id: 'weapon-staff-act3',
          label: 'Main hand staff: Markoheshkir (BiS) or Staff of Cherished Necromancy',
          tag: 'combat'
        },
        {
          id: 'offhand-act3',
          label: 'Off-hand: Staff of Cherished Necromancy or Markoheshkir',
          tag: 'combat'
        },
        {
          id: 'hand-crossbows-act3',
          label: 'Ranged: two hand crossbows (best-in-slot pair)',
          tag: 'combat'
        },
        {
          id: 'hood-weave',
          label: 'Helm: Hood of the Weave (or Holy Lance Helm, Hat of the Sharp Caster)',
          note: '+2 spell save DC. Sorcerous Sundries.',
          tag: 'combat'
        },
        {
          id: 'armour-agility',
          label: 'Armour: Armour of Agility',
          note: 'No DEX cap on AC.',
          tag: 'combat'
        },
        {
          id: 'cloak-weave',
          label: 'Cloak: Cloak of the Weave',
          note: '+1 spell save DC.',
          tag: 'combat'
        },
        {
          id: 'gemini-gloves',
          label: 'Gloves: Gloves of Dexterity, Gemini Gloves, or Luminous Gloves',
          tag: 'combat'
        },
        {
          id: 'helldusk-boots',
          label: 'Boots: Helldusk Boots',
          tag: 'combat'
        },
        {
          id: 'amulet-devout',
          label: 'Amulet: Amulet of the Devout (or Fey Semblance Amulet, Spell Savant Amulet)',
          note: 'Channel Divinity recharge on a short rest is the killer line.',
          tag: 'combat'
        },
        {
          id: 'coruscation-callous',
          label: 'Rings: Coruscation Ring + Callous Glow Ring',
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
        'Death Domain scholar who studies mortality. EIP\'s optimal race is Wood Elf or Wood Half-Elf (Fleet of Foot). We keep Human for the run\'s lore — the speed loss is minor; Civil Militia gives free martial proficiency.',
      items: [
        { id: 'origin', label: 'Origin: Custom Tav' },
        {
          id: 'race',
          label: 'Race: Human — Civil Militia',
          note: 'EIP recommends Wood Elf or Wood Half-Elf for the +1.5 m movement from Fleet of Foot. Human trades that for shield + martial proficiencies.',
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
          label: 'Deity: Tiamat (EIP\'s flavour pick) — any works mechanically',
          note: 'Kelemvor or Myrkul if you want a more grounded scholar of mortality.',
          tag: 'lore'
        }
      ]
    },
    {
      id: 'setup-abilities',
      title: 'Starting Stats (point buy, 27)',
      intro: 'BG3 has no racial ability bonuses since Patch 5 — assign +2 / +1 freely. WIS for casting, DEX for hand crossbows.',
      items: [
        { id: 'base', label: 'Base before ASI: STR 8, DEX 15, CON 14, INT 10, WIS 15, CHA 8' },
        {
          id: 'racial',
          label: 'Custom +2 WIS, +1 DEX → WIS 17, DEX 16, CON 14',
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
      title: 'Feats',
      intro: 'Only Cleric levels grant feats on this build — L4 and L8.',
      items: [
        { id: 'feat-l4', label: 'L4: War Caster (concentration save advantage)', tag: 'combat' },
        { id: 'feat-l8', label: 'L8: Dual Wielder (mandatory for two hand crossbows)', tag: 'combat' }
      ]
    },
    {
      id: 'setup-cantrips',
      title: 'Cantrips (L1 — Cleric)',
      items: [
        { id: 'bone-chill', label: 'Bone Chill — Triangle of Death (low AC); Reaper twins it', tag: 'both' },
        { id: 'toll-dead', label: 'Toll the Dead — Triangle of Death (low WIS); Reaper twins it', tag: 'both' },
        { id: 'guidance', label: 'Guidance — out-of-combat ability check boost', tag: 'both' },
        { id: 'bursting-sinew', label: 'Bursting Sinew — Triangle of Death (low DEX); detonates a corpse', tag: 'combat' }
      ]
    },
    {
      id: 'setup-spells',
      title: 'Starting Prepared Spells (by L2)',
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
