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
  act: string;
  headings: MarkdownHeading[];
}

/** Top-level headings grouped by act, falling back to "Reference" for appendix sections. */
export function getTocGroups(headings: MarkdownHeading[]): TocGroup[] {
  const groups: TocGroup[] = [];
  for (const heading of headings.filter((h) => h.depth === 2)) {
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
