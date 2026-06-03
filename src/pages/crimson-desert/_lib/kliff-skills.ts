import type { CdSkillPriority } from './skill-ladder';

export const kliffSkillPriorities: CdSkillPriority[] = [
  {
    priority: 1,
    tree: 'blue',
    treeLabel: 'Blue tree',
    steps: [
      {
        slug: 'stamina',
        label: 'Stamina',
        level: 5,
        why: 'Guard breaks less. Less standing around between swings waiting for the bar to come back.',
        notes: 'Wolf Sign — I want 200+ total before I wander far from Hernand.',
      },
      {
        slug: 'grapple',
        label: 'Grapple',
        level: 2,
        why: 'Cliff throws still work on elites. Lariat is ugly but it clears space.',
      },
      {
        slug: 'forward-slash',
        label: 'Forward Slash',
        level: 1,
        why: 'Basic hit after you commit. Nothing cute, just damage.',
      },
    ],
  },
  {
    priority: 2,
    tree: 'red',
    treeLabel: 'Red tree',
    steps: [
      {
        slug: 'axiom-force',
        label: 'Axiom Force',
        level: 2,
        why: 'Aerial Maneuver cuts down a lot of cliff backtracking. Worth it even if you ignore most of red.',
      },
    ],
  },
  {
    priority: 3,
    tree: 'green',
    treeLabel: 'Green tree',
    steps: [
      {
        slug: 'force-palm',
        label: 'Force Palm',
        level: 1,
        why: 'Healing Force Palm fixes the horse after a bad jump. I have the receipts.',
      },
    ],
  },
];
