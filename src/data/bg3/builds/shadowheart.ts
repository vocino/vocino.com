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
      intro:
        'Reaper twins necromancy-school cantrips on a second target. Chill Touch is Wizard / Sorcerer only — Cleric uses the Patch 8 additions instead.',
      items: [
        { id: 'shart-c-toll', label: 'Toll the Dead — necromancy, Reaper twins it', tag: 'combat' },
        { id: 'shart-c-bone', label: 'Bone Chill — necromancy, Reaper twins it (Patch 8 cleric cantrip)', tag: 'combat' },
        { id: 'shart-c-guidance', label: 'Guidance — utility for skill checks', tag: 'combat' }
      ]
    },
    {
      id: 'shart-l1',
      title: 'L1 spells',
      levelClass: 'cleric',
      intro: 'Death Domain auto-prepares False Life and Ray of Sickness (free, on top of prep limit). Inflict Wounds and Bane are extra preps.',
      items: [
        { id: 'shart-l1-ray-sickness', label: 'Ray of Sickness (auto-prepared by Death Domain)', tag: 'combat' },
        { id: 'shart-l1-false-life', label: 'False Life (auto-prepared by Death Domain)', tag: 'combat' },
        { id: 'shart-l1-inflict', label: 'Inflict Wounds (prepare manually)', tag: 'combat' },
        { id: 'shart-l1-bane', label: 'Bane (prepare manually — debuff stacks with Inescapable Destruction setups)', tag: 'combat' }
      ]
    },
    {
      id: 'shart-l2',
      title: 'L2 spells',
      levelClass: 'cleric',
      intro: 'Death Domain auto-prepares Blindness and Ray of Enfeeblement.',
      items: [
        { id: 'shart-l2-blindness', label: 'Blindness (auto-prepared)', tag: 'combat' },
        { id: 'shart-l2-rofe', label: 'Ray of Enfeeblement (auto-prepared)', tag: 'combat' }
      ]
    },
    {
      id: 'shart-l3',
      title: 'L3 spells',
      levelClass: 'cleric',
      milestone: true,
      intro: 'Death Domain auto-prepares Animate Dead and Vampiric Touch. Bestow Curse is a manual prep.',
      items: [
        { id: 'shart-l3-animate', label: 'Animate Dead (auto-prepared)', tag: 'combat' },
        { id: 'shart-l3-vampiric', label: 'Vampiric Touch (auto-prepared) — sustains her in melee at the Touch of Death range', tag: 'combat' },
        { id: 'shart-l3-bestow', label: 'Bestow Curse (prepare manually — necromancy school)', tag: 'combat' }
      ]
    },
    {
      id: 'shart-l4',
      title: 'L4 spells',
      levelClass: 'cleric',
      intro: 'Death Domain auto-prepares Blight and Death Ward.',
      items: [
        { id: 'shart-l4-blight', label: 'Blight (auto-prepared)', tag: 'combat' },
        { id: 'shart-l4-death-ward', label: 'Death Ward (auto-prepared) — a free Strength-of-the-Grave for the rest of the party', tag: 'combat' }
      ]
    },
    {
      id: 'shart-l5',
      title: 'L5 spells',
      levelClass: 'cleric',
      milestone: true,
      intro: 'Death Domain auto-prepares Antilife Shell and Cloudkill. Contagion is a manual prep.',
      items: [
        { id: 'shart-l5-cloudkill', label: 'Cloudkill (auto-prepared) — recurring necrotic-flavour poison AoE, the L5 workhorse', tag: 'combat' },
        { id: 'shart-l5-contagion', label: 'Contagion (prepare manually — necromancy, lingering disease)', tag: 'combat' }
      ]
    }
  ]
};
