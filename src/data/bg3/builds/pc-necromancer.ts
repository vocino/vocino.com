import type { Build } from '../types';

export const pcNecromancer: Build = {
  id: 'pc-necromancer',
  shortId: 'pc',
  name: 'Necromancer',
  pcLabel: 'Tav',
  className: 'Wizard — School of Necromancy',
  role: 'Thayvian scholar',
  summary:
    'Human necromancer for Patch 8. Death as a resource to catalogue — not worship. Pure Wizard 12, or Wizard 11 / Death Cleric 1 after L6.',

  levels: [
    {
      id: 'patch8-why',
      title: 'Why This Works in Patch 8',
      intro: 'Core is School of Necromancy for the full campaign. Optional 1-level Death Domain dip after Wizard 6.',
      items: [
        {
          id: 'savant',
          label: 'Necromancy Savant — learn necromancy scrolls for 25 gp per spell level',
          tag: 'lore'
        },
        {
          id: 'grim-harvest',
          label: 'Grim Harvest — killing with a spell heals 2 HP per spell level (3 HP if necromancy)',
          tag: 'combat'
        },
        {
          id: 'undead-thralls',
          label: 'Undead Thralls (W6) — Animate Dead always prepared, +1 corpse, undead gain WL HP + prof to damage',
          tag: 'both'
        },
        {
          id: 'inured',
          label: 'Inured to Undeath (W10) — necrotic resistance and immunity to max HP reduction',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'level-1',
      title: 'L1 — Wizard start',
      intro: 'Subclass at L2. L1 is pure Wizard.',
      items: [
        { id: 'cantrips', label: 'Cantrips: Bone Chill, Fire Bolt, Mage Hand' },
        {
          id: 'spells-prep',
          label: 'Prepare: Mage Armour, Shield, Magic Missile, Thunderwave',
          tag: 'combat'
        },
        {
          id: 'spells-book',
          label: 'In spellbook to swap: Find Familiar, Chromatic Orb',
          note: 'Scribe when you have gold; Familiar is strong as a ritual scout.'
        },
        { id: 'arcane-recovery', label: 'Arcane Recovery on short rest (slot levels = ceil(WL/2))' }
      ]
    },
    {
      id: 'level-2',
      title: 'L2 — Necromancy School',
      intro: 'Pick School of Necromancy. Grim Harvest and Savant come online.',
      items: [
        { id: 'subclass', label: 'Subclass: School of Necromancy', tag: 'lore' },
        { id: 'spells', label: 'Spells: Ray of Sickness, False Life', tag: 'lore' }
      ]
    },
    {
      id: 'level-3',
      title: 'L3 — 2nd-level slots',
      items: [
        { id: 'spells', label: 'Spells: Misty Step, Hold Person', tag: 'combat' }
      ]
    },
    {
      id: 'level-4',
      title: 'L4 — Feat: War Caster',
      intro: 'Advantage on concentration saves. Non-negotiable for Cloudkill + thrall fights.',
      items: [
        { id: 'feat-warcaster', label: 'Feat: War Caster', tag: 'combat' }
      ]
    },
    {
      id: 'level-5',
      title: 'L5 — 3rd-level slots',
      intro: 'Animate Dead is the identity moment.',
      items: [
        { id: 'animate-dead', label: 'Spell: Animate Dead', tag: 'lore' },
        { id: 'counterspell', label: 'Spell: Counterspell', tag: 'combat' },
        { id: 'fireball', label: 'Spell: Fireball', tag: 'combat' }
      ]
    },
    {
      id: 'level-6',
      title: 'L6 — Undead Thralls',
      intro: 'Take any Death Domain dip after this level — Undead Thralls must be online first.',
      items: [
        {
          id: 'thralls',
          label: 'Undead Thralls — Animate Dead always prepared, +1 skeleton per cast',
          tag: 'lore'
        },
        { id: 'vampiric-touch', label: 'Spell: Vampiric Touch (scribe priority)', tag: 'lore' }
      ]
    },
    {
      id: 'level-7',
      title: 'L7 — 4th-level slots',
      items: [
        { id: 'blight', label: 'Spell: Blight', tag: 'combat' },
        { id: 'dim-door', label: 'Spell: Dimension Door', tag: 'combat' }
      ]
    },
    {
      id: 'level-8',
      title: 'L8 — Feat: +2 Intelligence',
      intro: 'Assumes Auntie Ethel Hair (+1 INT). This ASI caps INT at 20.',
      items: [
        { id: 'int-cap', label: 'Feat: +2 INT (17 base + hair + ASI = 20)', tag: 'combat' }
      ]
    },
    {
      id: 'level-9',
      title: 'L9 — 5th-level slots',
      items: [
        { id: 'cloudkill', label: 'Spell: Cloudkill', tag: 'combat' },
        { id: 'hold-monster', label: 'Spell: Hold Monster', tag: 'combat' }
      ]
    },
    {
      id: 'level-10',
      title: 'L10 — Inured to Undeath',
      items: [
        {
          id: 'inured-feature',
          label: 'Feature: Inured to Undeath — necrotic resistance, immune to max HP reduction',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'level-11',
      title: 'L11 — 6th-level slots',
      items: [
        { id: 'create-undead', label: 'Spell: Create Undead', tag: 'lore' },
        { id: 'circle-death', label: 'Spell: Circle of Death', tag: 'both' }
      ]
    },
    {
      id: 'level-12',
      title: 'L12 — Capstone feat',
      intro: 'INT is capped. Pick survivability.',
      items: [
        { id: 'resilient-con', label: 'Feat: Resilient (Constitution)', tag: 'combat' },
        { id: 'alert', label: 'Or: Alert (+5 initiative, no surprise)', tag: 'combat' }
      ]
    },
    {
      id: 'multiclass-death-cleric',
      title: 'Multiclass: Death Domain Cleric',
      intro:
        'Patch 8 — Death Domain for Kelemvor, Laduguer, and Shar (Shadowheart only). Recommended: Wizard 11 / Cleric 1. Dip after Wizard 6.',
      items: [
        {
          id: 'reaper',
          label: 'L1 Reaper — single-target necromancy cantrips hit a second creature',
          tag: 'both'
        },
        {
          id: 'touch-death',
          label: 'L2 Touch of Death — Channel Divinity: +5 + 2× Cleric level necrotic on melee hit',
          tag: 'combat'
        },
        {
          id: 'inescapable',
          label: 'L6 Inescapable Destruction — your damage ignores necrotic resistance',
          tag: 'combat'
        },
        {
          id: 'divine-strike',
          label: 'L8 Divine Strike: Necrotic — +1d8 necrotic once per turn on melee',
          tag: 'combat'
        },
        {
          id: 'split',
          label: 'Wizard 11 / Cleric 1 — keeps 6th-level wizard spells; Reaper doubles Bone Chill',
          tag: 'both'
        }
      ]
    },
    {
      id: 'scribe-priority',
      title: 'Essential Necromancy Spells to Scribe',
      intro: 'Use Savant pricing (25 gp per spell level) on necromancy scrolls.',
      items: [
        { id: 'l1', label: 'L1: False Life, Ray of Sickness', tag: 'lore' },
        { id: 'l2', label: 'L2: Ray of Enfeeblement, Blindness', tag: 'lore' },
        {
          id: 'l3',
          label: 'L3: Animate Dead, Vampiric Touch, Speak with Dead (from book)',
          tag: 'lore'
        },
        { id: 'l4', label: 'L4: Blight', tag: 'combat' },
        {
          id: 'l5',
          label: 'L5: Contagion, Cloudkill, Danse Macabre (Act 3 unlock via Tharchiate Codex)',
          tag: 'both'
        },
        { id: 'l6', label: 'L6: Circle of Death, Create Undead', tag: 'both' }
      ]
    }
  ],

  gear: [
    {
      id: 'gear-act1',
      title: 'Act 1 — Blighted Village',
      items: [
        {
          id: 'warped-headband',
          label: 'Warped Headband of Intellect',
          note: 'Ogre encounter — sets INT to 17 until your ASIs pass it.',
          tag: 'combat'
        },
        {
          id: 'thay-book',
          label: 'Necromancy of Thay',
          note: 'Apothecary cellar. Open with Dark Amethyst from Whispering Depths.',
          tag: 'lore'
        },
        {
          id: 'hag-hair',
          label: 'Auntie Ethel Hair (+1 INT)',
          note: 'Act 1 — required for INT 20 by level 8 with +2 INT ASI.',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'gear-act2',
      title: 'Act 2 — Gauntlet of Shar & Moonrise',
      items: [
        {
          id: 'circle-bones',
          label: 'Circle of Bones',
          note: 'Kill Balthazar in the Gauntlet of Shar. Allied undead within 6 m resist B/P/S.',
          tag: 'both'
        },
        {
          id: 'spellcrux',
          label: 'Spellcrux Amulet',
          note: 'Restores one expended spell slot once per Long Rest.',
          tag: 'combat'
        },
        {
          id: 'night-walkers',
          label: 'Disintegrating Night Walkers',
          note: 'Immunity to Enwebbed/Entangled and free Misty Step.',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'gear-act3',
      title: 'Act 3 — Lower City',
      items: [
        {
          id: 'staff-cherished',
          label: 'Staff of Cherished Necromancy',
          note: 'Mystic Carrion (X:14 Y:-160). Disadvantage on saves vs your necromancy; kills grant Life Essence.',
          tag: 'both'
        },
        {
          id: 'crypt-lord-ring',
          label: 'Crypt Lord Ring',
          note: 'Find Mystic Carrion\'s Servant — keep Thrumbo alive. Create Undead 1/Long Rest.',
          tag: 'both'
        },
        {
          id: 'sporekeeper',
          label: 'Armour of the Sporekeeper',
          note: '+1 to +2 spell save DC. Stacks with staff.',
          tag: 'combat'
        },
        {
          id: 'hood-weave',
          label: 'Hood of the Weave',
          note: 'Sorcerous Sundries. +1 spell save DC.',
          tag: 'combat'
        },
        {
          id: 'cloak-weave',
          label: 'Cloak of the Weave',
          note: 'Sorcerous Sundries. +1 spell save DC.',
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
        'Thayvian scholar who treats death as a resource to catalogue. L1 is pure Wizard — Necromancy at L2.',
      items: [
        { id: 'origin', label: 'Origin: Custom Tav' },
        {
          id: 'race',
          label: 'Race: Human — Civil Militia',
          note: 'Proficiency with spears, pikes, halberds, glaives, light armour, and shields. Wizard AC without a feat.',
          tag: 'lore'
        },
        { id: 'class', label: 'Class: Wizard (School of Necromancy at L2)' },
        {
          id: 'background',
          label: 'Background: Sage — Arcana, History',
          tag: 'lore'
        }
      ]
    },
    {
      id: 'setup-abilities',
      title: 'Ability Scores (point buy)',
      intro: 'Before Human +1 all. Push INT to 20 by level 8 with Hag Hair + L8 ASI.',
      items: [
        { id: 'base', label: 'Base: STR 8, DEX 15, CON 14, INT 16, WIS 10, CHA 8' },
        {
          id: 'racial',
          label: 'After Human +1 all: DEX 16, CON 15, INT 17, WIS 11, CHA 9',
          tag: 'combat'
        },
        {
          id: 'cap',
          label: 'Hag Hair (+1 INT) + L8 +2 INT ASI → INT 20',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'setup-cantrips',
      title: 'Cantrips (3 / 3)',
      items: [
        { id: 'bone-chill', label: 'Bone Chill — Grim Harvest finisher, no-heal rider', tag: 'both' },
        { id: 'fire-bolt', label: 'Fire Bolt — reliable ranged damage', tag: 'combat' },
        { id: 'mage-hand', label: 'Mage Hand — utility and exploration', tag: 'both' }
      ]
    },
    {
      id: 'setup-spells',
      title: 'Level 1 Prepared Spells',
      items: [
        { id: 'mage-armour', label: 'Mage Armour' },
        { id: 'shield', label: 'Shield' },
        { id: 'magic-missile', label: 'Magic Missile' },
        { id: 'thunderwave', label: 'Thunderwave' },
        {
          id: 'book-swap',
          label: 'Keep in spellbook for swapping: Find Familiar, Chromatic Orb',
          note: 'Scribe when you can afford scrolls.'
        }
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
