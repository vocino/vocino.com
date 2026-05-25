/**
 * Unique / missable items and route-critical pickups for Honour Mode.
 */

export interface MissableItem {
  id: string;
  name: string;
  iconSlug?: string;
  act: 1 | 2 | 3;
  stepId: string;
  location: string;
  lockout?: string;
  why: string;
  priority: 'critical' | 'high' | 'optional';
}

export const missableItems: MissableItem[] = [
  {
    id: 'rolan-grove',
    name: 'Rolan (Last Light vendor chain)',
    act: 1,
    stepId: 'grove-onboarding',
    location: 'Emerald Grove',
    lockout: 'Rolan leaves if you side against tieflings or fail to keep him in the grove.',
    why: 'Mattis and other Act 2 Last Light vendors depend on Rolan staying.',
    priority: 'critical',
  },
  {
    id: 'barcus-windmill',
    name: 'Barcus Wroot',
    act: 1,
    stepId: 'act1-early-route',
    location: 'Blighted Village windmill',
    lockout: 'Dies if not freed within about one long rest after you meet him.',
    why: 'Locks quests and his Act 2 trader inventory.',
    priority: 'critical',
  },
  {
    id: 'phalar-aluve',
    name: 'Phalar Aluve',
    iconSlug: 'phalar-aluve',
    act: 1,
    stepId: 'act1-gear',
    location: 'Rosymorn Monastery Trail (116, -192)',
    why: 'Party-wide Shriek buff for control and damage spikes.',
    priority: 'high',
  },
  {
    id: 'drakethroat-glaive',
    name: 'Drakethroat Glaive',
    iconSlug: 'drakethroat-glaive',
    act: 2,
    stepId: 'act2-gear',
    location: 'Roah at Last Light (Act 2)',
    why: 'Daily cold enchant on weapons and Astarion\'s bow.',
    priority: 'high',
  },
  {
    id: 'true-loves-rings',
    name: "True Love's Embrace / Caress",
    act: 2,
    stepId: 'act2-gear',
    location: 'Reithwin Town',
    why: 'Enables Warding Bond + Arcane Ward tank combo on Shadowheart/Gale.',
    priority: 'high',
  },
  {
    id: 'callous-glow-ring',
    name: 'Callous Glow Ring',
    act: 2,
    stepId: 'act2-gear',
    location: 'House of Hope (-821, -752)',
    why: 'Radiant Orb stacking pivot for your tank.',
    priority: 'high',
  },
  {
    id: 'birthright',
    name: 'Birthright',
    iconSlug: 'birthright',
    act: 3,
    stepId: 'act3-gear',
    location: 'Rolan in Lower City',
    why: '+2 Charisma capstone for face and spell DC.',
    priority: 'high',
  },
  {
    id: 'markoheshkir',
    name: "Markoheshkir's Staff",
    iconSlug: 'markoheshkir',
    act: 3,
    stepId: 'act3-gear',
    location: 'Sorcerous Sundries (4970, 705)',
    why: 'Free ice casts and daily ice proficiency.',
    priority: 'high',
  },
];

export function getMissablesForAct(act: 1 | 2 | 3): MissableItem[] {
  return missableItems.filter((item) => item.act === act);
}

export function getMissablesForStep(stepId: string): MissableItem[] {
  return missableItems.filter((item) => item.stepId === stepId);
}
