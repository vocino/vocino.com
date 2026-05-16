import type { CheckSection } from './types';

/** Each level is a section so it gets its own collapsible card + the per-section X/Y counter. */
export const levels: CheckSection[] = [
  {
    id: 'level-1',
    title: 'L1 — Wizard start',
    intro: 'Subclass is picked at L2, not now. L1 is pure Wizard.',
    items: [
      { id: 'l1-cantrips', label: 'Cantrips: Bone Chill, Toll the Dead, Mage Hand' },
      { id: 'l1-spells', label: 'Spells: Mage Armor, Shield, False Life, Ray of Sickness, Find Familiar, Sleep' },
      { id: 'l1-arcane-recovery', label: 'Arcane Recovery (short rest, recover slot levels = ceil(WL/2))' },
      { id: 'l1-ritual', label: 'Cast Find Familiar as ritual for an Imp / Raven scout', tag: 'lore' }
    ]
  },
  {
    id: 'level-2',
    title: 'L2 — Necromancy School',
    intro: 'The subclass spike. Pick School of Necromancy here.',
    items: [
      { id: 'l2-subclass', label: 'Subclass: School of Necromancy', tag: 'lore' },
      { id: 'l2-grim-harvest', label: 'Feature: Grim Harvest (heal 2x spell level on kill, 3x for Necromancy spells)' },
      { id: 'l2-savant', label: 'Feature: Necromancy Savant (scribe necromancy scrolls at half cost / time)', tag: 'lore' },
      { id: 'l2-spells', label: 'Spells: Blindness, Ray of Enfeeblement' }
    ]
  },
  {
    id: 'level-3',
    title: 'L3 — Mobility + control',
    items: [
      { id: 'l3-spells', label: 'Spells: Misty Step, Phantasmal Force' },
      { id: 'l3-alt', label: 'Alt picks: Web (control), Mirror Image (defence)' }
    ]
  },
  {
    id: 'level-4',
    title: 'L4 — First feat',
    intro: 'Lore picks lean Actor / Lucky; combat picks lean War Caster / Resilient (CON).',
    items: [
      { id: 'l4-feat-warcaster', label: 'Option: War Caster (concentration save advantage)', tag: 'combat' },
      { id: 'l4-feat-alert', label: 'Option: Alert (no surprise, +5 initiative)', tag: 'combat' },
      { id: 'l4-feat-resilient-con', label: 'Option: Resilient CON (+1 CON, CON save prof)', tag: 'combat' },
      { id: 'l4-feat-lucky', label: 'Option: Lucky (3 reroll dice per long rest)' },
      { id: 'l4-feat-actor', label: 'Option: Actor (+1 CHA, advantage on Deception/Performance)', tag: 'lore' },
      { id: 'l4-feat-int', label: 'Option: +2 INT (only if you didn’t start at 17)', tag: 'combat' },
      { id: 'l4-spells', label: 'Spells: Mirror Image, Web' }
    ]
  },
  {
    id: 'level-5',
    title: 'L5 — Undead online',
    intro: 'Animate Dead is the identity moment. You stop being a wizard and start being a necromancer.',
    items: [
      { id: 'l5-animate-dead', label: 'Spell: Animate Dead (zombie or skeleton, 24h)', tag: 'lore' },
      { id: 'l5-alt', label: 'Pair pick: Bestow Curse or Counterspell' }
    ]
  },
  {
    id: 'level-6',
    title: 'L6 — Undead Thralls',
    intro: 'The second subclass spike. Your undead get bigger and you get a third skeleton.',
    items: [
      { id: 'l6-thralls', label: 'Feature: Undead Thralls (animate +1 skeleton; undead get +WL HP and proficiency on damage rolls)', tag: 'lore' },
      { id: 'l6-vampiric-touch', label: 'Spell: Vampiric Touch (concentration, on-theme single target drain)', tag: 'lore' },
      { id: 'l6-feign-death', label: 'Spell: Feign Death (utility + RP)', tag: 'lore' }
    ]
  },
  {
    id: 'level-7',
    title: 'L7 — 4th level pressure',
    items: [
      { id: 'l7-blight', label: 'Spell: Blight (best raw single-target necrotic)' },
      { id: 'l7-fear', label: 'Spell: Fear (control + lore-on-theme)', tag: 'lore' },
      { id: 'l7-alt', label: 'Alt: Greater Invisibility, Dimension Door, Polymorph' }
    ]
  },
  {
    id: 'level-8',
    title: 'L8 — +2 INT',
    intro: 'No good feat beats capping INT here. Take it.',
    items: [
      { id: 'l8-int-cap', label: 'Feat: +2 INT (caps to 20)', tag: 'combat' },
      { id: 'l8-counterspell', label: 'Spell: Counterspell' },
      { id: 'l8-dim-door', label: 'Spell: Dimension Door' }
    ]
  },
  {
    id: 'level-9',
    title: 'L9 — 5th level control',
    items: [
      { id: 'l9-cloudkill', label: 'Spell: Cloudkill (poison cloud, concentration, big damage)' },
      { id: 'l9-hold-monster', label: 'Spell: Hold Monster (auto-crit setup for thralls)', tag: 'combat' },
      { id: 'l9-alt', label: 'Alt: Animate Objects, Wall of Stone' }
    ]
  },
  {
    id: 'level-10',
    title: 'L10 — Inured to Undeath',
    intro: 'The third subclass spike. Necrotic immunity + HP-max protection.',
    items: [
      { id: 'l10-inured', label: 'Feature: Inured to Undeath (necrotic immunity, HP max can’t be reduced)', tag: 'lore' },
      { id: 'l10-circle-death', label: 'Spell: Circle of Death (8d6 necrotic, 60 ft radius)', tag: 'both' },
      { id: 'l10-create-undead', label: 'Spell: Create Undead (ghouls)', tag: 'lore' }
    ]
  },
  {
    id: 'level-11',
    title: 'L11 — 6th level damage',
    items: [
      { id: 'l11-disintegrate', label: 'Spell: Disintegrate (huge force damage + no corpse)' },
      { id: 'l11-eyebite', label: 'Spell: Eyebite (concentration, sleep / fear / sicken)', tag: 'lore' }
    ]
  },
  {
    id: 'level-12',
    title: 'L12 — Capstone feat',
    intro: 'INT is capped. Take Resilient (CON) for concentration, or +2 CON if you already have prof.',
    items: [
      { id: 'l12-resilient-con', label: 'Feat: Resilient (CON) — prof on CON saves', tag: 'combat' },
      { id: 'l12-feat-con', label: 'Or: +2 CON (HP + concentration)', tag: 'combat' },
      { id: 'l12-globe', label: 'Spell: Globe of Invulnerability' },
      { id: 'l12-otto', label: 'Spell: Otto’s Irresistible Dance' }
    ]
  }
];
