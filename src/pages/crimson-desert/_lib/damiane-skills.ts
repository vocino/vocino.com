import type { CdSkillPriority } from './skill-ladder';

/** Pistol + musket gunslinger priorities — Spirit first, then mobility, then safety. */
export const damianeSkillPriorities: CdSkillPriority[] = [
  {
    priority: 1,
    tree: 'green',
    treeLabel: 'Spirit tree',
    steps: [
      {
        slug: 'focused-shot',
        label: 'Focused Shot',
        level: 1,
        why: 'Marks targets while you aim; release for a volley. This is why the pistol is not a tickle stick.',
        notes: 'Upgrade to L2 (Focused Evasive Shot) and L3 (Focused Charged Shot) as soon as you can afford it.',
      },
      {
        slug: 'focused-evasive-shot',
        label: 'Focused Evasive Shot',
        level: 2,
        why: 'Mark enemies while rolling. Safer burst when something is already in your face.',
      },
      {
        slug: 'focused-charged-shot',
        label: 'Focused Charged Shot',
        level: 3,
        why: 'Musket opener — charge, mark weak spots, delete the biggest thing in the pack.',
      },
    ],
  },
  {
    priority: 2,
    tree: 'blue',
    treeLabel: 'Stamina tree',
    steps: [
      {
        slug: 'evasive-shot',
        label: 'Evasive Shot',
        level: 1,
        why: 'Dodge backward and shoot. Damage while creating space — core gunslinger loop.',
      },
      {
        slug: 'flight',
        label: 'Flight',
        level: 1,
        why: 'Propeller flight for height. Musket wants line of sight; this gets it.',
        notes: 'Swift Flight after if you live in the air.',
      },
      {
        slug: 'stamina',
        label: 'Stamina',
        level: 3,
        why: 'Quick-steps and aerial stuff burn the bar. I still run out mid-fight without this.',
      },
    ],
  },
  {
    priority: 3,
    tree: 'red',
    treeLabel: 'Health tree',
    steps: [
      {
        slug: 'keen-senses',
        label: 'Keen Senses',
        level: 1,
        why: 'Telegraph help on big boss swings. Damiane dies fast when I greed a third shot.',
      },
      {
        slug: 'sword-flurry',
        label: 'Sword Flurry',
        level: 1,
        why: 'When they close the gap anyway — short rapier burst before you swap back to pistol.',
      },
      {
        slug: 'piercing-light',
        label: 'Piercing Light',
        level: 1,
        why: 'Gap-closer for the support rapier. Not the main plan, but it saves runs.',
      },
    ],
  },
];
