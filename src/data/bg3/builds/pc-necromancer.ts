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
        { id: 'cantrips', label: 'Cantrips: Bone Chill, Fire Bolt' },
        {
          id: 'spells-prep',
          label: 'Prepare: Mage Armour, Shield, Find Familiar, Magic Missile, Grease',
          tag: 'combat'
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
        { id: 'spells', label: 'Spells: Ray of Sickness, Misty Step', tag: 'both' }
      ]
    },
    {
      id: 'level-3',
      title: 'L3 — 2nd-level slots',
      items: [
        { id: 'animate-dead-scribe', label: 'Spell: Animate Dead (scribe — castable from L5)', tag: 'lore' },
        { id: 'counterspell', label: 'Spell: Counterspell', tag: 'combat' }
      ]
    },
    {
      id: 'level-4',
      title: 'L4 — Feat: +2 Intelligence',
      intro: 'With Headband + Hag Hair, the L4 ASI caps INT at 20.',
      items: [
        { id: 'feat-int', label: 'Feat: +2 INT', tag: 'combat' },
        { id: 'web', label: 'Prepare Web', tag: 'combat' }
      ]
    },
    {
      id: 'level-5',
      title: 'L5 — 3rd-level slots',
      intro: 'Animate Dead is the identity moment.',
      items: [
        { id: 'animate-dead', label: 'Animate Dead upcast at 3rd level', tag: 'lore' },
        { id: 'fear', label: 'Spell: Fear', tag: 'combat' }
      ]
    },
    {
      id: 'level-6',
      title: 'L6 — Undead Thralls',
      intro: 'Take any Death Domain dip after this level — Undead Thralls must be online first.',
      items: [
        {
          id: 'thralls',
          label: 'Undead Thralls — skeletons get extra HP and damage, +1 thrall per cast',
          tag: 'lore'
        }
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
      title: 'L8 — Feat: War Caster',
      intro: 'Advantage on concentration saves. Resilient: Constitution is the alternative.',
      items: [
        { id: 'feat-warcaster', label: 'Feat: War Caster (or Resilient: Constitution)', tag: 'combat' },
        { id: 'banishment', label: 'Prepare Banishment', tag: 'combat' }
      ]
    },
    {
      id: 'level-9',
      title: 'L9 — 5th-level slots',
      items: [
        { id: 'animate-dead-5', label: 'Animate Dead upcast at 5th level', tag: 'lore' },
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
        },
        { id: 'wall-of-fire', label: 'Prepare Wall of Fire for control', tag: 'combat' }
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
      title: 'L12 — Capstone',
      intro: 'INT is capped. Pick utility or burst.',
      items: [
        { id: 'danse-macabre', label: 'Danse Macabre — permanent from Tharchiate Codex', tag: 'lore' },
        { id: 'chain-or-dis', label: 'Spell: Chain Lightning or Disintegrate', tag: 'combat' },
        { id: 'feat-l12', label: 'Feat: Alert or Spell Sniper', tag: 'combat' }
      ]
    },
    {
      id: 'multiclass-options',
      title: 'Pure 12 vs Multiclass',
      intro: 'Pick after Wizard 6. Pure stays the default for this guide.',
      items: [
        {
          id: 'pure-12',
          label: 'Pure Wizard 12 — earliest L6 spells, highest DC, full Undead Thralls scaling',
          tag: 'both'
        },
        {
          id: 'wiz11-cleric1',
          label: 'Wizard 11 / Death Cleric 1 — Reaper twins necromancy cantrips, heavy armour. Delays L6 spells.',
          tag: 'both'
        },
        {
          id: 'wiz10-spore2',
          label: 'Wizard 10 / Spore Druid 2 — Symbiotic Entity temp HP + Halo of Spores. Loses high-level wizard spells.',
          tag: 'both'
        }
      ]
    },
    {
      id: 'scribe-priority',
      title: 'Scribing Priority',
      intro:
        'Buy every necromancy scroll from Arron, Blurg, Lorroakan, and Sorcerous Sundries. Savant cost is 25 gp per spell level. Hoard Animate Dead, Blight, and Circle of Death scrolls until you can scribe them.',
      items: [
        { id: 'l1', label: 'L1: False Life, Ray of Sickness', tag: 'lore' },
        { id: 'l2', label: 'L2: Ray of Enfeeblement, Blindness', tag: 'lore' },
        {
          id: 'l3',
          label: 'L3: Animate Dead, Vampiric Touch, Speak with Dead',
          tag: 'lore'
        },
        { id: 'l4', label: 'L4: Blight', tag: 'combat' },
        {
          id: 'l5',
          label: 'L5: Contagion, Cloudkill, Danse Macabre (Tharchiate Codex in Act 3)',
          tag: 'both'
        },
        { id: 'l6', label: 'L6: Circle of Death, Create Undead', tag: 'both' }
      ]
    }
  ],

  gear: [
    {
      id: 'gear-act1',
      title: 'Act 1 — Must-haves',
      items: [
        {
          id: 'warped-headband',
          label: 'Warped Headband of Intellect',
          note: 'Ogre encounter — sets INT to 17.',
          tag: 'combat'
        },
        {
          id: 'poisoners-robe',
          label: 'Poisoner\'s Robe or Protecty Sparkswall',
          note: 'Early AC and saves.',
          tag: 'combat'
        },
        {
          id: 'sapphire-spark',
          label: 'The Sapphire Spark or Spellsparkler',
          note: 'Cantrip damage boost.',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'gear-act2',
      title: 'Act 2 — Core',
      items: [
        {
          id: 'circle-bones',
          label: 'Circle of Bones',
          note: 'Kill Balthazar in the Gauntlet of Shar. Necromancy spell power.',
          tag: 'both'
        },
        {
          id: 'corpsegrinder',
          label: 'Corpsegrinder',
          note: 'Solid quarterstaff.',
          tag: 'combat'
        },
        {
          id: 'ring-mental-inhibition',
          label: 'Ring of Mental Inhibition',
          note: 'Save debuff for Hold spells.',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'gear-act3',
      title: 'Act 3 — Best in slot',
      items: [
        {
          id: 'staff-cherished',
          label: 'Staff of Cherished Necromancy',
          note: 'Mystic Carrion quest. Cantrip kill grants free Blight or Circle of Death.',
          tag: 'both'
        },
        {
          id: 'hood-weave',
          label: 'Hood of the Weave',
          note: '+2 spell save DC.',
          tag: 'combat'
        },
        {
          id: 'robe-weave',
          label: 'Robe of the Weave or Robe of Supreme Defences',
          tag: 'combat'
        },
        {
          id: 'markoheshkir',
          label: 'Markoheshkir',
          note: 'Top staff for general casting.',
          tag: 'combat'
        },
        {
          id: 'amulet',
          label: 'Amulet of the Devout or Spellcrux Amulet',
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
          label: 'Race: Human — for lore',
          note: 'High Elf, Gnome, or Asmodeus Tiefling are stronger mechanically if you skip the Human framing.',
          tag: 'lore'
        },
        { id: 'class', label: 'Class: Wizard (School of Necromancy at L2)' },
        {
          id: 'background',
          label: 'Background: Sage or Acolyte',
          tag: 'lore'
        }
      ]
    },
    {
      id: 'setup-abilities',
      title: 'Starting Stats',
      intro: 'Before items. Push INT to 20 with Headband, Hag Hair, and the L4 ASI.',
      items: [
        { id: 'base', label: 'INT 17, CON 16, DEX 14, WIS 10, STR 8, CHA 8', tag: 'combat' },
        {
          id: 'headband',
          label: 'Act 1: Warped Headband of Intellect sets INT to 17',
          tag: 'combat'
        },
        {
          id: 'hag-hair',
          label: 'Auntie Ethel Hair: +1 INT',
          tag: 'combat'
        },
        {
          id: 'cap',
          label: 'L4 ASI: +2 INT → INT 20',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'setup-feats',
      title: 'Feats to Consider',
      items: [
        { id: 'feat-l4', label: 'L4: +2 INT', tag: 'combat' },
        { id: 'feat-l8', label: 'L8: War Caster or Resilient: Constitution', tag: 'combat' },
        { id: 'feat-l12', label: 'L12: Alert or Spell Sniper', tag: 'combat' }
      ]
    },
    {
      id: 'setup-cantrips',
      title: 'Cantrips',
      items: [
        { id: 'bone-chill', label: 'Bone Chill — Grim Harvest finisher, no-heal rider', tag: 'both' },
        { id: 'fire-bolt', label: 'Fire Bolt — reliable ranged damage', tag: 'combat' }
      ]
    },
    {
      id: 'setup-spells',
      title: 'Level 1 Prepared Spells',
      items: [
        { id: 'mage-armour', label: 'Mage Armour' },
        { id: 'shield', label: 'Shield' },
        { id: 'find-familiar', label: 'Find Familiar' },
        { id: 'magic-missile', label: 'Magic Missile' },
        { id: 'grease', label: 'Grease' }
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
