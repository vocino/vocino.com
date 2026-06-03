import type { MarkdownHeading } from 'astro';

/** Maps each top-level section slug to its act, for grouping the table of contents. */
const SECTION_ACTS: Record<string, string> = {
  'character-creation': 'Setup',
  'nautiloid-to-grove': 'Act 1',
  'early-act-1-route': 'Act 1',
  'act-1-level-5-route': 'Act 1',
  'leaving-act-1': 'Act 1',
  'act-2-progression': 'Act 2',
  'ketheric-and-myrkul': 'Act 2',
  'act-3-progression': 'Act 3',
  'endgame-nether-brain': 'Act 3',
};

export interface TocGroup {
  /** Act/section label, or '' for flat (non-act-structured) content like build pages. */
  act: string;
  headings: MarkdownHeading[];
}

/**
 * Top-level headings grouped by act (for the Act-structured guides). Content that
 * maps to no act — e.g. the per-class build pages — returns a single flat group
 * with an empty `act`, so the TOC renders a plain section list.
 */
export function getTocGroups(headings: MarkdownHeading[]): TocGroup[] {
  const topLevel = headings.filter((h) => h.depth === 2);
  const hasActStructure = topLevel.some((h) => h.slug in SECTION_ACTS);

  if (!hasActStructure) {
    return topLevel.length > 0 ? [{ act: '', headings: topLevel }] : [];
  }

  const groups: TocGroup[] = [];
  for (const heading of topLevel) {
    const act = SECTION_ACTS[heading.slug] ?? 'Reference';
    let group = groups[groups.length - 1];
    if (!group || group.act !== act) {
      group = { act, headings: [] };
      groups.push(group);
    }
    group.headings.push(heading);
  }
  return groups;
}
