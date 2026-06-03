import type { MarkdownHeading } from 'astro';

/** Top-level sections only — keeps the TOC scannable on a second screen. */
export function getTocHeadings(headings: MarkdownHeading[]): MarkdownHeading[] {
  return headings.filter((h) => h.depth === 2);
}

/** Build in-page anchor for a character-scoped TOC link. */
export function getTocAnchor(idPrefix: string, slug: string): string {
  if (slug.startsWith(`${idPrefix}-`)) return slug;
  return `${idPrefix}-${slug}`;
}
