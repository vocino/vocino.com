import type { Build } from '../types';

export const pcOathbreaker: Build = {
  id: 'pc-oathbreaker',
  shortId: 'pc',
  name: 'Tav (Dark Urge)',
  className: 'Paladin — Oathbreaker',
  role: 'Frontline necrotic smiter',
  summary:
    'Dark Urge Paladin who breaks oath in Act 1 and becomes an Oathbreaker. Necrotic smites, Aura of Hate, Control Undead. Single-class, balanced difficulty — no multiclass pivots.',

  setup: [
    {
      id: 'pc-setup-character',
      title: 'Character Creation',
      intro:
        'Dark Urge origin. Pick a starting oath you can break cleanly — Devotion (innocents) or Vengeance (oaths of mercy). The subclass swap to Oathbreaker happens in Act 1.',
      items: [
        { id: 'pc-origin', label: 'Origin: Dark Urge', tag: 'lore' },
        {
          id: 'pc-race',
          label: 'Race: anything — Half-Orc or Dragonborn lean into the Bhaalist look',
          tag: 'lore'
        },
        {
          id: 'pc-class',
          label: 'Class: Paladin — start as Oath of Devotion OR Oath of Vengeance',
          note: 'Both oaths give clear break triggers in Act 1. Patch 8 lets you finalize the Oathbreaker swap mid-act.',
          tag: 'both'
        },
        {
          id: 'pc-background',
          label: 'Background: Soldier or Outlander',
          tag: 'lore'
        }
      ]
    },
    {
      id: 'pc-setup-stats',
      title: 'Starting Stats (point buy, 27)',
      intro: 'Balanced difficulty — ignore breakpoint optimization. STR + CHA is the only line that matters.',
      items: [
        { id: 'pc-stat-str', label: 'STR 16 — main attack stat for greatsword + smites', tag: 'combat' },
        { id: 'pc-stat-cha', label: 'CHA 16 — spell save DC + Aura of Hate later', tag: 'combat' },
        { id: 'pc-stat-con', label: 'CON 14 — concentration on Bestow Curse / Crown of Madness', tag: 'combat' },
        { id: 'pc-stat-wis', label: 'WIS 10', tag: 'combat' },
        { id: 'pc-stat-dex', label: 'DEX 10', tag: 'combat' },
        { id: 'pc-stat-int', label: 'INT 8', tag: 'combat' }
      ]
    },
    {
      id: 'pc-setup-fighting-style',
      title: 'Fighting Style + Feats',
      items: [
        {
          id: 'pc-fs-gwf',
          label: 'Fighting Style: Great Weapon Fighting (re-roll 1s and 2s on damage)',
          tag: 'combat'
        },
        { id: 'pc-feat-l4', label: 'L4 feat: Great Weapon Master (or Tough on Balanced)', tag: 'combat' },
        { id: 'pc-feat-l8', label: 'L8 feat: Polearm Master (if you swap to glaive) or Sentinel', tag: 'combat' }
      ]
    },
    {
      id: 'pc-setup-warning',
      title: 'Withers Restriction',
      intro:
        'Withers will not respec a Paladin who already carries the Oathbreaker subclass. Lock in your stats, fighting style, and L4 feat BEFORE you break.',
      items: [
        {
          id: 'pc-withers-lock',
          label: 'Finalize stats, fighting style, and L4 feat before triggering the oath break',
          tag: 'both'
        },
        {
          id: 'pc-respec-cost',
          label: 'Restoring an oath later costs 1,000 → 2,000 → 10,000 gold — you will not restore it',
          tag: 'lore'
        }
      ]
    }
  ],

  levels: [
    {
      id: 'pc-l1',
      title: 'L1 — Paladin · pick your starting oath',
      levelClass: 'paladin',
      milestone: true,
      items: [
        {
          id: 'pc-l1-oath',
          label: 'Starting oath: Devotion (break by killing innocents) OR Vengeance (break by sparing a sworn target)',
          tag: 'lore'
        },
        { id: 'pc-l1-divine-sense', label: 'Divine Sense, Lay on Hands', tag: 'combat' }
      ]
    },
    {
      id: 'pc-l2-3',
      title: 'L2–L3 — break the oath, become Oathbreaker',
      levelClass: 'paladin',
      milestone: true,
      intro:
        'Long rest after the break — the Oathbreaker Knight appears in camp and offers the subclass for free.',
      items: [
        { id: 'pc-l3-hellish-rebuke', label: 'L3 spell: Hellish Rebuke', tag: 'combat' },
        { id: 'pc-l3-inflict-wounds', label: 'L3 spell: Inflict Wounds', tag: 'combat' },
        {
          id: 'pc-l3-oathbreaker-feature',
          label: 'Oathbreaker Aura — undead and fiends within 3 m deal +CHA damage',
          tag: 'combat'
        },
        {
          id: 'pc-l3-control-undead',
          label: 'Channel Oath: Control Undead — dominate any undead at or below your Paladin level',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'pc-l4',
      title: 'L4 — feat',
      levelClass: 'paladin',
      items: [
        { id: 'pc-l4-feat', label: 'Feat: Great Weapon Master (-5 to hit / +10 damage toggle)', tag: 'combat' }
      ]
    },
    {
      id: 'pc-l5',
      title: 'L5 — extra attack + 2nd-level spells',
      levelClass: 'paladin',
      milestone: true,
      items: [
        { id: 'pc-l5-extra-attack', label: 'Extra Attack', tag: 'combat' },
        { id: 'pc-l5-crown', label: 'L5 spell: Crown of Madness', tag: 'combat' },
        { id: 'pc-l5-darkness', label: 'L5 spell: Darkness', tag: 'combat' }
      ]
    },
    {
      id: 'pc-l7',
      title: 'L7 — Aura of Hate',
      levelClass: 'paladin',
      milestone: true,
      items: [
        {
          id: 'pc-l7-aura',
          label: 'Aura of Hate — +CHA damage for you and nearby undead / fiends on melee hits',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'pc-l9',
      title: 'L9 — 3rd-level spells',
      levelClass: 'paladin',
      items: [
        { id: 'pc-l9-bestow-curse', label: 'L9 spell: Bestow Curse', tag: 'combat' },
        { id: 'pc-l9-animate-dead', label: 'L9 spell: Animate Dead (Oathbreaker exclusive)', tag: 'combat' },
        {
          id: 'pc-l9-animate-note',
          label: 'Animate Dead summons cost no concentration — long rest to clear them',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'pc-l11',
      title: 'L11 — Improved Divine Smite',
      levelClass: 'paladin',
      milestone: true,
      items: [
        {
          id: 'pc-l11-ids',
          label: 'Improved Divine Smite — +1d8 necrotic on every melee hit (Oathbreaker re-flavours radiant → necrotic)',
          tag: 'combat'
        }
      ]
    },
    {
      id: 'pc-prep-rules',
      title: 'Prepared Spell Rules',
      intro: 'Skip every healing or restoration spell. Potions and food cover HP — your kit is pressure, not first aid.',
      items: [
        { id: 'pc-skip-cure-wounds', label: 'Skip: Cure Wounds, Lesser Restoration', tag: 'lore' },
        { id: 'pc-keep-shield-of-faith', label: 'Keep: Shield of Faith (AC + concentration filler)', tag: 'combat' },
        { id: 'pc-keep-command', label: 'Keep: Command (Approach / Grovel)', tag: 'combat' }
      ]
    }
  ]
};
