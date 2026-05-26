import type { MarkdownHeading } from 'astro';

/** Ordered main beats — checkpoints, play bar, and next/prev navigation. */
export const BG3_GUIDE_ACTS = [
  { slug: 'how-to-use-this-guide', label: 'Start', act: 'Setup', checkpointId: 'step-0-intro' },
  { slug: 'character-creation', label: 'Create character', act: 'Setup', checkpointId: 'step-char-create' },
  { slug: 'nautiloid-to-grove', label: 'Beach & companions', act: 'Act 1', checkpointId: 'step-nautiloid' },
  { slug: 'early-act-1-route', label: 'Withers & build', act: 'Act 1', checkpointId: 'step-early-act1' },
  { slug: 'act-1-level-5-route', label: 'Level 5 push', act: 'Act 1', checkpointId: 'step-level5' },
  { slug: 'leaving-act-1', label: 'Leave Act 1', act: 'Act 1', checkpointId: 'step-leave-act1' },
  { slug: 'act-2-progression', label: 'Last Light & gear', act: 'Act 2', checkpointId: 'step-act2' },
  { slug: 'ketheric-and-myrkul', label: 'Ketheric & Myrkul', act: 'Act 2', checkpointId: 'step-ketheric' },
  { slug: 'act-3-progression', label: 'Lower City & gear', act: 'Act 3', checkpointId: 'step-act3' },
  { slug: 'endgame-nether-brain', label: 'Nether Brain', act: 'Act 3', checkpointId: 'step-finale' },
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

export function getSectionActs(): Record<string, string> {
  return Object.fromEntries(BG3_GUIDE_ACTS.map((a) => [a.slug, a.act]));
}

/** Beats grouped by act, in document order — for the jump menu optgroups. */
export function getActGroups(): Array<{ act: string; beats: Array<{ slug: string; label: string }> }> {
  const groups: Array<{ act: string; beats: Array<{ slug: string; label: string }> }> = [];
  for (const beat of BG3_GUIDE_ACTS) {
    let group = groups[groups.length - 1];
    if (!group || group.act !== beat.act) {
      group = { act: beat.act, beats: [] };
      groups.push(group);
    }
    group.beats.push({ slug: beat.slug, label: beat.label });
  }
  return groups;
}

/** Top-level headings grouped by act, falling back to "Reference" for appendix sections. */
export interface TocGroup {
  act: string;
  headings: MarkdownHeading[];
}

export function getTocGroups(headings: MarkdownHeading[]): TocGroup[] {
  const actBySlug = getSectionActs();
  const groups: TocGroup[] = [];
  for (const heading of headings.filter((h) => h.depth === 2)) {
    const act = actBySlug[heading.slug] ?? 'Reference';
    let group = groups[groups.length - 1];
    if (!group || group.act !== act) {
      group = { act, headings: [] };
      groups.push(group);
    }
    group.headings.push(heading);
  }
  return groups;
}
