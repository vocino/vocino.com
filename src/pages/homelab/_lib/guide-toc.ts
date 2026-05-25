import type { MarkdownHeading } from 'astro';

/** Top-level sections only — keeps the TOC scannable without nested h3 clutter. */
export function getTocHeadings(headings: MarkdownHeading[]): MarkdownHeading[] {
  return headings.filter((h) => h.depth === 2);
}
