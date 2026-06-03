import type { PhrasingContent, Root, Table, TableCell, TableRow } from 'mdast';
import { visit } from 'unist-util-visit';

function textFromPhrasing(nodes: PhrasingContent[]): string {
  let out = '';
  for (const node of nodes) {
    if (node.type === 'text') out += node.value;
    else if (node.type === 'inlineCode') out += node.value;
    else if ('children' in node && Array.isArray(node.children)) {
      out += textFromPhrasing(node.children as PhrasingContent[]);
    }
  }
  return out.trim();
}

function cellText(cell: TableCell): string {
  return textFromPhrasing(cell.children as PhrasingContent[]);
}

function tableVariant(firstHeader: string): string {
  const key = firstHeader.toLowerCase();
  if (/stat|character level|^level$|^slot$|^class$|^item|^feat/.test(key)) return 'guide-table--reference';
  return 'guide-table--data';
}

/** Adds mobile labels on cells and classes tables for second-screen parsing. */
export function remarkGuideTables() {
  return (tree: Root) => {
    visit(tree, 'table', (node: Table) => {
      const rows = node.children.filter((r): r is TableRow => r.type === 'tableRow');
      if (!rows.length) return;

      const headerTexts = rows[0].children
        .filter((c): c is TableCell => c.type === 'tableCell')
        .map(cellText);

      const variant = tableVariant(headerTexts[0] ?? '');

      node.data ??= {};
      node.data.hProperties ??= {};
      const existing = node.data.hProperties.className;
      const classes = Array.isArray(existing)
        ? existing.map(String)
        : typeof existing === 'string'
          ? [existing]
          : [];
      node.data.hProperties.className = [...classes, 'guide-table', variant];

      for (const row of rows.slice(1)) {
        row.children.forEach((cell, colIndex) => {
          if (cell.type !== 'tableCell') return;
          cell.data ??= {};
          cell.data.hProperties ??= {};
          cell.data.hProperties.dataLabel = headerTexts[colIndex] ?? '';
        });
      }
    });
  };
}
