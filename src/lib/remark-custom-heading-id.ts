import type { Heading, Root } from 'mdast';
import { visit } from 'unist-util-visit';

/** Pandoc-style custom IDs: `## Title {#my-anchor}` */
const CUSTOM_ID_RE = /\s*\{#([^}]+)\}\s*$/;

export function remarkCustomHeadingId() {
  return (tree: Root) => {
    visit(tree, 'heading', (node: Heading) => {
      const last = node.children[node.children.length - 1];
      if (last?.type !== 'text') return;

      const match = CUSTOM_ID_RE.exec(last.value);
      if (!match) return;

      last.value = last.value.slice(0, match.index);
      const id = match[1];

      node.data ??= {};
      (node.data as { id?: string }).id = id;
      const hProps = ((node.data as { hProperties?: Record<string, string> }).hProperties ??= {});
      hProps.id = id;
    });
  };
}
