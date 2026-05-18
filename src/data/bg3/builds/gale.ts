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
      items: [
        { id: 'gale-c-toll', label: 'Toll the Dead', tag: 'combat' },
        { id: 'gale-c-chill', label: 'Chill Touch', tag: 'combat' },
        { id: 'gale-c-mage-hand', label: 'Mage Hand', tag: 'combat' }
      ]
    },
    {
      id: 'gale-l1',
      title: 'L1 spells',
      levelClass: 'wizard',
      items: [
        { id: 'gale-l1-false-life', label: 'False Life', tag: 'combat' },
        { id: 'gale-l1-ray-sickness', label: 'Ray of Sickness', tag: 'combat' },
        { id: 'gale-l1-familiar', label: 'Find Familiar', tag: 'combat' }
      ]
    },
    {
      id: 'gale-l2',
      title: 'L2 spells',
      levelClass: 'wizard',
      items: [{ id: 'gale-l2-blindness', label: 'Blindness', tag: 'combat' }]
    },
    {
      id: 'gale-l3',
      title: 'L3 spells',
      levelClass: 'wizard',
      milestone: true,
      items: [
        { id: 'gale-l3-animate', label: 'Animate Dead', tag: 'combat' },
        { id: 'gale-l3-vampiric-touch', label: 'Vampiric Touch', tag: 'combat' }
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
