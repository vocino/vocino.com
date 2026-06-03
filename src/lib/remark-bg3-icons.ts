import type { Root, Text, Parent } from 'mdast';
import { visit } from 'unist-util-visit';
import { getBg3IconPublicPath, slugToDefaultLabel } from '../pages/baldurs-gate-3/_lib/bg3-icons';

function resolveIconSrc(slug: string): string {
  return getBg3IconPublicPath(slug);
}

const BG3_ICON_RE = /\[\[bg3:([a-z0-9-]+)(?:\|([^\]]+))?\]\]/gi;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function iconHtml(slug: string, label: string): string {
  const src = resolveIconSrc(slug);
  const safeLabel = escapeHtml(label);
  const safeSlug = escapeHtml(slug);
  return `<span class="bg3-term" data-bg3-slug="${safeSlug}"><img src="${src}" alt="" width="24" height="24" loading="lazy" decoding="async" class="bg3-term__icon" /><span class="bg3-term__label">${safeLabel}</span></span>`;
}

function splitTextNode(value: string): Array<Text | { type: 'html'; value: string }> {
  const parts: Array<Text | { type: 'html'; value: string }> = [];
  let lastIndex = 0;
  BG3_ICON_RE.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = BG3_ICON_RE.exec(value)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: value.slice(lastIndex, match.index) });
    }
    const slug = match[1].toLowerCase();
    const label = match[2]?.trim() || slugToDefaultLabel(slug);
    parts.push({ type: 'html', value: iconHtml(slug, label) });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < value.length) {
    parts.push({ type: 'text', value: value.slice(lastIndex) });
  }

  return parts;
}

/** Turns `[[bg3:hold-person]]` and `[[bg3:hold-person|Hold Person]]` into inline icon + label HTML. */
export function remarkBg3Icons() {
  return (tree: Root) => {
    visit(tree, 'text', (node, index, parent) => {
      if (index === undefined || !parent) return;
      if (!BG3_ICON_RE.test(node.value)) return;
      BG3_ICON_RE.lastIndex = 0;
      const replacement = splitTextNode(node.value);
      if (replacement.length <= 1 && replacement[0]?.type === 'text') return;
      (parent as Parent).children.splice(index, 1, ...(replacement as Parent['children']));
    });
  };
}
