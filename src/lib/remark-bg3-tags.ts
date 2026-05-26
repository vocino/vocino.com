import type { Root, Text } from 'mdast';
import { visit } from 'unist-util-visit';

const TAG_REPLACEMENTS: { pattern: RegExp; html: string }[] = [
  {
    pattern: /\*\*Critical path\*\*:?/gi,
    html: '<span class="bg3-tag bg3-tag--critical">Critical path</span>',
  },
  {
    pattern: /\*\*Optional\*\*:?/gi,
    html: '<span class="bg3-tag bg3-tag--optional">Optional</span>',
  },
  {
    pattern: /\*\*Skip default\*\*:?/gi,
    html: '<span class="bg3-tag bg3-tag--skip">Skip default</span>',
  },
  {
    pattern: /\*\*Skip\*\*:?/gi,
    html: '<span class="bg3-tag bg3-tag--skip">Skip</span>',
  },
  {
    pattern: /\*\*Missable:\*\*/gi,
    html: '<span class="bg3-tag bg3-tag--missable">Missable</span>',
  },
  {
    pattern: /\*\*Level gate\*\*:?/gi,
    html: '<span class="bg3-tag bg3-tag--gate">Level gate</span>',
  },
];

function transformText(value: string): Array<Text | { type: 'html'; value: string }> | null {
  let work = value;
  let changed = false;
  for (const { pattern, html } of TAG_REPLACEMENTS) {
    if (pattern.test(work)) {
      changed = true;
      pattern.lastIndex = 0;
      work = work.replace(pattern, html);
    }
    pattern.lastIndex = 0;
  }
  if (!changed) return null;
  return [{ type: 'html', value: work }];
}

/** Turns guide vocabulary like **Critical path** into scannable tag chips. */
export function remarkBg3Tags() {
  return (tree: Root) => {
    visit(tree, 'text', (node, index, parent) => {
      if (index === undefined || !parent) return;
      const replacement = transformText(node.value);
      if (!replacement) return;
      parent.children.splice(index, 1, ...(replacement as typeof parent.children));
    });
  };
}
