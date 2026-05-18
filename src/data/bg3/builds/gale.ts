import type { Build } from '../types';

export const gale: Build = {
  id: 'gale',
  shortId: 'gale',
  name: 'Gale',
  className: 'Wizard — School of Necromancy',
  role: 'Undead general',
  summary:
    'School of Necromancy Wizard. Builds the actual undead army the Paladin keeps small. Grim Harvest heals him on spell kills; Danse Macabre arrives after completing the Necromancy of Thay in Act 3.',
  recruit: 'Act 1 — Roadside Cliffs (waypoint hand)',
  loreFit: 'high',

  setup: [
    {
      id: 'gale-setup-respec',
      title: 'Respec Timing',
      intro:
        'Wait until Gale officially joins camp before respec — respeccing before story flags can wipe his magic-debt arc.',
      items: [
        {
          id: 'gale-setup-when',
          label: 'Respec at Withers AFTER Gale has joined camp (still Act 1)',
          tag: 'both'
        },
        {
          id: 'gale-setup-subclass',
          label: 'Pick School of Necromancy at L2',
          tag: 'lore'
        }
      ]
    },
    {
      id: 'gale-setup-features',
      title: 'Necromancy School Features',
      items: [
        {
          id: 'gale-feat-grim',
          label: 'Grim Harvest — when a spell of yours kills, heal HP (more from necromancy spells)',
          tag: 'combat'
        },
        {
          id: 'gale-feat-undead-thralls',
          label: 'Undead Thralls (L6) — your Animate Dead summons get bonus HP and damage',
          tag: 'combat'
        }
      ]
    }
  ],

  levels: [
    {
      id: 'gale-cantrips',
      title: 'Cantrips',
      levelClass: 'wizard',
      intro: 'All three are necromancy school on the Wizard list — Toll the Dead and Chill Touch are the necrotic damage staples.',
      items: [
        { id: 'gale-c-toll', label: 'Toll the Dead — necromancy, necrotic damage', tag: 'combat' },
        { id: 'gale-c-chill', label: 'Chill Touch — necromancy, necrotic + prevents healing', tag: 'combat' },
        { id: 'gale-c-mage-hand', label: 'Mage Hand — utility', tag: 'combat' }
      ]
    },
    {
      id: 'gale-l1',
      title: 'L1 spells',
      levelClass: 'wizard',
      intro: 'Necromancy Savant: pick necromancy spells for half the gold to scribe. Two of three picks below are necromancy school.',
      items: [
        { id: 'gale-l1-false-life', label: 'False Life — necromancy, temp HP', tag: 'combat' },
        { id: 'gale-l1-ray-sickness', label: 'Ray of Sickness — necromancy, poison damage + poisoned condition', tag: 'combat' },
        {
          id: 'gale-l1-familiar',
          label: 'Find Familiar — utility (conjuration, off-theme but iconic Gale)',
          note: 'Pick Raven (Help action from range) or Spider (web cover) for the death / shadow look.',
          tag: 'lore'
        }
      ]
    },
    {
      id: 'gale-l2',
      title: 'L2 spells',
      levelClass: 'wizard',
      items: [
        { id: 'gale-l2-blindness', label: 'Blindness — necromancy school', tag: 'combat' },
        { id: 'gale-l2-misty-step', label: 'Misty Step — utility, keeps him out of melee', tag: 'combat' }
      ]
    },
    {
      id: 'gale-l3',
      title: 'L3 spells',
      levelClass: 'wizard',
      milestone: true,
      intro: 'L3 is when Gale becomes the necromancer in earnest — three necromancy-school picks, all auto-prepared in the necromancy book.',
      items: [
        { id: 'gale-l3-animate', label: 'Animate Dead — necromancy, summons that persist to long rest', tag: 'combat' },
        { id: 'gale-l3-vampiric-touch', label: 'Vampiric Touch — necromancy, self-heal on hit', tag: 'combat' },
        { id: 'gale-l3-bestow', label: 'Bestow Curse — necromancy, on-target debuff (extra damage / disadvantage)', tag: 'combat' }
      ]
    },
    {
      id: 'gale-l4',
      title: 'L4 spells',
      levelClass: 'wizard',
      items: [{ id: 'gale-l4-blight', label: 'Blight', tag: 'combat' }]
    },
    {
      id: 'gale-l5',
      title: 'L5 spells',
      levelClass: 'wizard',
      milestone: true,
      items: [
        {
          id: 'gale-l5-danse',
          label: 'Danse Macabre — unlocked after completing the Necromancy of Thay (Sorcerous Sundries vault, Act 3)',
          tag: 'lore'
        }
      ]
    },
    {
      id: 'gale-l6',
      title: 'L6 spells',
      levelClass: 'wizard',
      milestone: true,
      items: [
        { id: 'gale-l6-circle-death', label: 'Circle of Death', tag: 'combat' },
        { id: 'gale-l6-create-undead', label: 'Create Undead', tag: 'combat' }
      ]
    }
  ]
};
