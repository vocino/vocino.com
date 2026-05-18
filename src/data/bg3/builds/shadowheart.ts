import type { Build } from '../types';

export const shadowheart: Build = {
  id: 'shadowheart',
  shortId: 'shart',
  name: 'Shadowheart',
  className: 'Cleric — Death Domain (Shar)',
  role: 'Necrotic nuker',
  summary:
    'Death Domain Cleric of Shar — Reaper twins necromancy cantrips at L1, Touch of Death rides melee hits, Inescapable Destruction lets her necrotic damage ignore resistance from L6. Stays Shar-aligned through the Nightsong arc.',
  recruit: 'Act 1 — Nautiloid pod / beach',
  loreFit: 'high',

  setup: [
    {
      id: 'shart-setup-respec',
      title: 'Respec Timing',
      intro:
        'Wait until Shadowheart has officially committed to Shar before respeccing — respeccing before story flags fire can wipe arc choices. Patch 8 added Death Domain so this is a fresh subclass pick.',
      items: [
        {
          id: 'shart-setup-when',
          label: 'Early Act 2 — after she commits to Shar, BEFORE the Gauntlet of Shar',
          tag: 'lore'
        },
        {
          id: 'shart-setup-class',
          label: 'Withers respec → Cleric, then pick Death Domain',
          tag: 'both'
        }
      ]
    },
    {
      id: 'shart-setup-features',
      title: 'Death Domain Features',
      items: [
        {
          id: 'shart-feat-reaper',
          label: 'Reaper (L1) — single-target necromancy cantrips hit a second creature within 1.5 m',
          tag: 'combat'
        },
        {
          id: 'shart-feat-touch-of-death',
          label: 'Touch of Death (L2) — Channel Divinity adds 5 + 2× Cleric level necrotic on a melee hit',
          tag: 'combat'
        },
        {
          id: 'shart-feat-inescapable',
          label: 'Inescapable Destruction (L6) — her necrotic damage ignores resistance and immunity',
          tag: 'combat'
        }
      ]
    }
  ],

  levels: [
    {
      id: 'shart-cantrips',
      title: 'Cantrips',
      levelClass: 'cleric',
      items: [
        { id: 'shart-c-toll', label: 'Toll the Dead — Reaper twins it', tag: 'combat' },
        { id: 'shart-c-chill', label: 'Chill Touch — Reaper twins it', tag: 'combat' }
      ]
    },
    {
      id: 'shart-l1',
      title: 'L1 spells',
      levelClass: 'cleric',
      items: [
        { id: 'shart-l1-inflict', label: 'Inflict Wounds', tag: 'combat' },
        { id: 'shart-l1-ray-sickness', label: 'Ray of Sickness', tag: 'combat' },
        { id: 'shart-l1-bane', label: 'Bane', tag: 'combat' }
      ]
    },
    {
      id: 'shart-l2',
      title: 'L2 spells',
      levelClass: 'cleric',
      items: [
        { id: 'shart-l2-blindness', label: 'Blindness', tag: 'combat' },
        { id: 'shart-l2-rofe', label: 'Ray of Enfeeblement', tag: 'combat' }
      ]
    },
    {
      id: 'shart-l3',
      title: 'L3 spells',
      levelClass: 'cleric',
      milestone: true,
      items: [
        { id: 'shart-l3-animate', label: 'Animate Dead', tag: 'combat' },
        { id: 'shart-l3-bestow', label: 'Bestow Curse', tag: 'combat' }
      ]
    },
    {
      id: 'shart-l4',
      title: 'L4 spells',
      levelClass: 'cleric',
      items: [{ id: 'shart-l4-blight', label: 'Blight', tag: 'combat' }]
    },
    {
      id: 'shart-l5',
      title: 'L5 spells',
      levelClass: 'cleric',
      milestone: true,
      items: [{ id: 'shart-l5-contagion', label: 'Contagion', tag: 'combat' }]
    }
  ]
};
