import type { Build } from '../types';

export const pcShadowSorcerer: Build = {
  id: 'pc-shadow-sorcerer',
  shortId: 'pc',
  name: 'Tav (Dark Urge)',
  className: 'Sorcerer — Shadow Magic',
  role: 'Backline CC + shadow caster',
  focus: ['Cold', 'Necrotic', 'Control'],
  summary:
    "Innate shadow magic in the blood — no oath to break, no holy magic to swear off. Strength of the Grave narratively explains why Tav keeps surviving the urges. Twinned Hold Person, free Darkness from L3, and a Hound of Ill Omen at L6. Single-class through L12.",

  setup: [
    {
      id: 'pc-setup-character',
      title: 'Character Creation',
      intro:
        'Dark Urge origin. Frame the urges as Bhaal whispering through the same well of darkness that powers your spellcasting — innate, not sworn.',
      items: [
        { id: 'pc-origin', label: 'Origin: Dark Urge', tag: 'lore' },
        {
          id: 'pc-race',
          label: 'Race: Drow, Half-Drow, or Tiefling — all lean into the shadow / Bhaalspawn look',
          tag: 'lore'
        },
        {
          id: 'pc-class',
          label: 'Class: Sorcerer — Shadow Magic',
          note: 'No multiclass. Stays Sorcerer L1 through L12.',
          tag: 'both'
        },
        {
          id: 'pc-background',
          label: 'Background: Haunted One or Outlander',
          tag: 'lore'
        }
      ]
    },
    {
      id: 'pc-setup-stats',
      title: 'Starting Stats (point buy, 27)',
      intro: 'CHA for the saves, CON for concentration + Strength of the Grave, DEX for AC and initiative.',
      items: [
        { id: 'pc-stat-cha', label: 'CHA 17 — spell save DC and attack rolls', tag: 'combat' },
        { id: 'pc-stat-con', label: 'CON 14 — concentration and the Strength of the Grave save', tag: 'combat' },
        { id: 'pc-stat-dex', label: 'DEX 14 — AC and initiative', tag: 'combat' },
        { id: 'pc-stat-wis', label: 'WIS 10', tag: 'combat' },
        { id: 'pc-stat-int', label: 'INT 10', tag: 'combat' },
        { id: 'pc-stat-str', label: 'STR 8', tag: 'combat' }
      ]
    },
    {
      id: 'pc-setup-feats',
      title: 'Feats',
      intro: 'Sorcerer grants feats at L4, L8, L12. Resilient (CON) is the single biggest gain for a concentration caster.',
      items: [
        { id: 'pc-feat-l4', label: 'L4 feat: Resilient (CON) — proficiency in CON saves + sets CON to 15', tag: 'combat' },
        { id: 'pc-feat-l8', label: 'L8 feat: ASI +2 CHA → 19 (or Alert for initiative)', tag: 'combat' },
        { id: 'pc-feat-l12', label: 'L12 feat: ASI +1 CHA → 20 (cap)', tag: 'combat' }
      ]
    },
    {
      id: 'pc-setup-metamagic',
      title: 'Metamagic Picks',
      intro: 'Two at L3, one more at L10. Twinned Hold Person ends most encounters before they start.',
      items: [
        { id: 'pc-meta-twinned', label: 'L3 — Twinned Spell (Hold Person on two targets is the workhorse)', tag: 'combat' },
        { id: 'pc-meta-quickened', label: 'L3 — Quickened Spell (cast a leveled spell as a bonus action)', tag: 'combat' },
        { id: 'pc-meta-heightened', label: 'L10 — Heightened Spell (disadvantage on one save against your spell)', tag: 'combat' }
      ]
    }
  ],

  levels: [
    {
      id: 'pc-l1',
      title: 'L1 — Sorcerer · Shadow Magic',
      levelClass: 'sorcerer',
      milestone: true,
      items: [
        {
          id: 'pc-l1-eyes',
          label: 'Eyes of the Dark — Superior Darkvision; learn Darkness for free at L3',
          tag: 'combat'
        },
        {
          id: 'pc-l1-grave',
          label: 'Strength of the Grave — at 0 HP, CON save (DC 5 + damage) to drop to 1 HP instead',
          note: 'Once per long rest. Does not work on radiant or critical kills.',
          tag: 'combat'
        },
        {
          id: 'pc-l1-cantrips',
          label: 'Cantrips: Chill Touch, Ray of Frost, Mage Hand, Minor Illusion',
          note: 'All shadow / cold / necromancy on the Sorcerer list. No fire cantrips on this run.',
          tag: 'combat'
        },
        {
          id: 'pc-l1-spells',
          label: 'Spells: Shield, Ray of Sickness',
          note: 'Ray of Sickness is necromancy-school poison — the only L1 necromancy on the Sorcerer list.',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'pc-l2',
      title: 'L2 — Font of Magic',
      levelClass: 'sorcerer',
      items: [
        { id: 'pc-l2-font', label: 'Font of Magic — sorcery points equal to your Sorcerer level', tag: 'combat' },
        {
          id: 'pc-l2-spell-mage-armor',
          label: 'Spell pick: Mage Armor (utility — no shadow-themed L1 left to grab)',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'pc-l3',
      title: 'L3 — Metamagic + 2nd-level slots',
      levelClass: 'sorcerer',
      milestone: true,
      items: [
        { id: 'pc-l3-metamagic', label: 'Metamagic: Twinned Spell, Quickened Spell', tag: 'combat' },
        { id: 'pc-l3-darkness', label: 'Free spell: Darkness (from Eyes of the Dark)', tag: 'lore' },
        {
          id: 'pc-l3-hold-person',
          label: 'Spell pick: Hold Person (the Twinned target — paralyse two enemies on one slot)',
          tag: 'combat'
        },
        {
          id: 'pc-l3-spell-replace',
          label: 'Spell replace (L3 ability): swap Ray of Sickness → Mirror Image',
          note: 'Sorcerer can replace one known spell on level-up. Mirror Image is illusion — keeps the shadow / mind-trick theme.',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'pc-l4',
      title: 'L4 — feat',
      levelClass: 'sorcerer',
      items: [
        { id: 'pc-l4-feat', label: 'Feat: Resilient (CON)', tag: 'combat' },
        {
          id: 'pc-l4-cantrip',
          label: 'New cantrip: Poison Spray (necromancy-flavoured poison) or Blade Ward (defensive)',
          note: 'Bone Chill / Toll the Dead are NOT on the Sorcerer list — Shadowheart and Gale carry those. Poison Spray is the closest necrotic-coded Sorcerer cantrip.',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'pc-l5',
      title: 'L5 — 3rd-level slots',
      levelClass: 'sorcerer',
      milestone: true,
      items: [
        {
          id: 'pc-l5-fear',
          label: 'Spell pick: Fear (necromancy-coded CC — pairs with the shadow aesthetic)',
          tag: 'combat'
        },
        {
          id: 'pc-l5-counterspell-note',
          label: 'Counterspell is on the Sorcerer list too — pick it up at L6 if you want it',
          note: 'Hunger of Hadar is Warlock / Druid in BG3, NOT Sorcerer. Skip it on Tav.',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'pc-l6',
      title: 'L6 — Hound of Ill Omen',
      levelClass: 'sorcerer',
      milestone: true,
      items: [
        {
          id: 'pc-l6-hound',
          label: 'Hound of Ill Omen — 3 sorcery points: summon a shadow hound that knocks prone and forces disadvantage on saves against your spells',
          tag: 'combat'
        },
        {
          id: 'pc-l6-sleet-storm',
          label: 'Spell pick: Sleet Storm (cold + heavy obscurement — the perfect Shadow Sorcerer AoE)',
          note: 'Vampiric Touch is Warlock / Wizard in BG3, NOT Sorcerer. Gale carries Vampiric Touch instead.',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'pc-l7',
      title: 'L7 — 4th-level slots',
      levelClass: 'sorcerer',
      items: [
        {
          id: 'pc-l7-greater-invis',
          label: 'Spell pick: Greater Invisibility (shadow / stealth flavour, the L7 winner)',
          tag: 'combat'
        },
        {
          id: 'pc-l7-ice-storm',
          label: 'Alt pick: Ice Storm (cold AoE) — or Dimension Door if you want a shadow-step utility',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'pc-l8',
      title: 'L8 — feat',
      levelClass: 'sorcerer',
      items: [
        { id: 'pc-l8-feat', label: 'Feat: ASI +2 CHA → 19 (or Alert)', tag: 'combat' }
      ]
    },
    {
      id: 'pc-l9',
      title: 'L9 — 5th-level slots',
      levelClass: 'sorcerer',
      milestone: true,
      items: [
        {
          id: 'pc-l9-hold-monster',
          label: 'Spell pick: Hold Monster (Twinned at L5 = paralyse two bosses)',
          tag: 'combat'
        },
        {
          id: 'pc-l9-cone-of-cold',
          label: 'Spell pick: Cone of Cold (the lore-headline AoE — pure Shadow Sorcerer signature)',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'pc-l10',
      title: 'L10 — new metamagic',
      levelClass: 'sorcerer',
      items: [
        { id: 'pc-l10-metamagic', label: 'Metamagic: Heightened Spell', tag: 'combat' },
        { id: 'pc-l10-cantrip', label: 'New cantrip: pick anything (Friends for out-of-combat charm)', tag: 'combat' }
      ]
    },
    {
      id: 'pc-l11',
      title: 'L11 — 6th-level slots',
      levelClass: 'sorcerer',
      milestone: true,
      items: [
        {
          id: 'pc-l11-freezing-sphere',
          label: "Spell pick: Otiluke's Freezing Sphere (cold, lore-headline) — Disintegrate as the force-damage backup",
          note: 'Skip Chain Lightning and Sunbeam — lightning and radiant are off-theme.',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'pc-l12',
      title: 'L12 — feat',
      levelClass: 'sorcerer',
      milestone: true,
      items: [
        { id: 'pc-l12-feat', label: 'Feat: ASI +1 CHA → 20 (cap)', tag: 'combat' }
      ]
    }
  ]
};
