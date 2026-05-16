import type { CheckSection } from './types';

export const setupSections: CheckSection[] = [
  {
    id: 'setup-character',
    title: 'Character Creation',
    intro: 'L1 is pure Wizard — Necromancy subclass is picked at L2.',
    items: [
      { id: 'setup-origin', label: 'Origin: Custom (not an origin companion)' },
      { id: 'setup-race', label: 'Race: Human — +1 skill (Versatility), Light Armour + Shield proficiency', tag: 'lore' },
      { id: 'setup-class', label: 'Class: Wizard (subclass at L2)' },
      { id: 'setup-background', label: 'Background: Sage — Arcana + History', tag: 'lore' }
    ]
  },
  {
    id: 'setup-abilities',
    title: 'Ability Points (27 / 27)',
    intro: 'BG3 (Patch 5+) has no racial ASI — you assign +2 / +1 yourself. Put them on INT and CHA.',
    items: [
      { id: 'abi-str', label: 'STR 8' },
      { id: 'abi-dex', label: 'DEX 13 (alt: 14 for one more AC with Mage Armor)' },
      { id: 'abi-con', label: 'CON 14' },
      { id: 'abi-int', label: 'INT 15 + 2 (assign) = 17 — caster stat' },
      { id: 'abi-wis', label: 'WIS 10' },
      { id: 'abi-cha', label: 'CHA 12 + 1 (assign) = 13 — dialogue floor' }
    ]
  },
  {
    id: 'setup-skills',
    title: 'Skill Proficiencies',
    intro: 'Sage = Arcana + History (locked). Wizard = pick 2 of {Arcana, History, Insight, Investigation, Medicine, Religion}. Human = +1 of any.',
    items: [
      { id: 'skill-sage', label: 'Sage (locked): Arcana, History' },
      { id: 'skill-wizard-1', label: 'Wizard pick 1: Investigation', tag: 'lore' },
      { id: 'skill-wizard-2', label: 'Wizard pick 2: Religion', tag: 'lore' },
      { id: 'skill-human', label: 'Human (Versatility): Intimidation — fear-coded dialogue', tag: 'lore' }
    ]
  },
  {
    id: 'setup-cantrips',
    title: 'Cantrips (3 / 3)',
    items: [
      { id: 'cantrip-bone-chill', label: 'Bone Chill — no-heal rider, on-theme', tag: 'lore' },
      { id: 'cantrip-toll-dead', label: 'Toll the Dead — best wizard cantrip damage, lore-perfect', tag: 'both' },
      { id: 'cantrip-mage-hand', label: 'Mage Hand — utility + dialogue + cheese', tag: 'both' }
    ]
  },
  {
    id: 'setup-spells',
    title: 'Spells (6 / 6)',
    items: [
      { id: 'spell-mage-armour', label: 'Mage Armor (24h AC 13 + DEX)' },
      { id: 'spell-shield', label: 'Shield (reaction +5 AC)' },
      { id: 'spell-false-life', label: 'False Life — temp HP, on-theme', tag: 'lore' },
      { id: 'spell-ray-sickness', label: 'Ray of Sickness — necrotic + Poisoned', tag: 'lore' },
      { id: 'spell-familiar', label: 'Find Familiar — Raven for blind, Imp for scout' },
      { id: 'spell-sleep', label: 'Sleep — fight-ender in Act 1' }
    ]
  },
  {
    id: 'setup-complete-section',
    title: 'Setup Completion',
    items: [
      { id: 'setup-complete', label: 'Mark setup complete and hide Setup tab' }
    ]
  }
];
