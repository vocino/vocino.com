/** Ordered main beats — checkpoints, play bar, and next/prev navigation. */
export const BG3_GUIDE_ACTS = [
  { slug: 'how-to-use-this-guide', label: 'Start', checkpointId: 'step-0-intro' },
  { slug: 'character-creation', label: 'Create character', checkpointId: 'step-char-create' },
  { slug: 'nautiloid-to-grove', label: 'Act 1 start', checkpointId: 'step-nautiloid' },
  { slug: 'early-act-1-route', label: 'Early Act 1', checkpointId: 'step-early-act1' },
  { slug: 'act-1-level-5-route', label: 'Level 5 push', checkpointId: 'step-level5' },
  { slug: 'leaving-act-1', label: 'Leave Act 1', checkpointId: 'step-leave-act1' },
  { slug: 'act-2-progression', label: 'Act 2', checkpointId: 'step-act2' },
  { slug: 'ketheric-and-myrkul', label: 'Ketheric', checkpointId: 'step-ketheric' },
  { slug: 'act-3-progression', label: 'Act 3', checkpointId: 'step-act3' },
  { slug: 'endgame-nether-brain', label: 'Finale', checkpointId: 'step-finale' },
] as const;

export type Bg3GuideActSlug = (typeof BG3_GUIDE_ACTS)[number]['slug'];

export function getActBySlug(slug: string) {
  return BG3_GUIDE_ACTS.find((a) => a.slug === slug);
}

export function getNextAct(slug: string) {
  const i = BG3_GUIDE_ACTS.findIndex((a) => a.slug === slug);
  return i >= 0 && i < BG3_GUIDE_ACTS.length - 1 ? BG3_GUIDE_ACTS[i + 1] : undefined;
}

export function getSectionLabels(): Record<string, string> {
  return Object.fromEntries(BG3_GUIDE_ACTS.map((a) => [a.slug, a.label]));
}
