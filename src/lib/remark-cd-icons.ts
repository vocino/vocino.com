import type { Root, Text, Parent } from 'mdast';
import { visit } from 'unist-util-visit';
import { getCdIconPublicPath, slugToDefaultLabel } from '../pages/crimson-desert/_lib/cd-icons';
import { damianeSkillPriorities } from '../pages/crimson-desert/_lib/damiane-skills';
import { kliffSkillPriorities } from '../pages/crimson-desert/_lib/kliff-skills';
import { renderCdSkillLadderHtml } from '../pages/crimson-desert/_lib/skill-ladder';

const CD_TOKEN_RE = /\[\[cd:([a-z0-9-]+)(?:\|([^\]]+))?\]\]/gi;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function iconHtml(slug: string, label: string): string {
  const src = getCdIconPublicPath(slug);
  const safeLabel = escapeHtml(label);
  const safeSlug = escapeHtml(slug);
  return `<span class="cd-term" data-cd-slug="${safeSlug}"><img src="${src}" alt="" width="18" height="18" loading="lazy" decoding="async" class="cd-term__icon" /><span class="cd-term__label">${safeLabel}</span></span>`;
}

function splitTextNode(value: string): Array<Text | { type: 'html'; value: string }> {
  const parts: Array<Text | { type: 'html'; value: string }> = [];
  let lastIndex = 0;
  CD_TOKEN_RE.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = CD_TOKEN_RE.exec(value)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: value.slice(lastIndex, match.index) });
    }
    const slug = match[1].toLowerCase();
    if (slug === 'skill-ladder') {
      parts.push({ type: 'html', value: renderCdSkillLadderHtml(kliffSkillPriorities, getCdIconPublicPath) });
    } else if (slug === 'damiane-skill-ladder') {
      parts.push({ type: 'html', value: renderCdSkillLadderHtml(damianeSkillPriorities, getCdIconPublicPath) });
    } else {
      const label = match[2]?.trim() || slugToDefaultLabel(slug);
      parts.push({ type: 'html', value: iconHtml(slug, label) });
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < value.length) {
    parts.push({ type: 'text', value: value.slice(lastIndex) });
  }

  return parts;
}

/** Turns `[[cd:sword-of-the-wolf]]` and `[[cd:sword-of-the-wolf|Sword of the Wolf]]` into inline icon + label HTML. */
export function remarkCdIcons() {
  return (tree: Root) => {
    visit(tree, 'text', (node, index, parent) => {
      if (index === undefined || !parent) return;
      if (!CD_TOKEN_RE.test(node.value)) return;
      CD_TOKEN_RE.lastIndex = 0;
      const replacement = splitTextNode(node.value);
      if (replacement.length <= 1 && replacement[0]?.type === 'text') return;
      (parent as Parent).children.splice(index, 1, ...(replacement as Parent['children']));
    });
  };
}
