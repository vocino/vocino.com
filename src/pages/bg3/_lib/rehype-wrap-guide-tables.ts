import type { Element, Root } from 'hast';
import { visit } from 'unist-util-visit';

function classList(node: Element): string[] {
  const raw = node.properties?.className;
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === 'string') return [raw];
  return [];
}

/** Wraps tables in a scroll/card container for mobile second-screen use. */
export function rehypeWrapGuideTables() {
  return (tree: Root) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table' || index === undefined || !parent) return;

      const classes = classList(node);
      const variant = classes.find((c) => c.startsWith('guide-table--')) ?? 'guide-table--data';

      const wrapper: Element = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['guide-table-wrap', variant],
        },
        children: [node],
      };

      parent.children[index] = wrapper;
    });
  };
}
