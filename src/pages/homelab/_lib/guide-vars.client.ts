import {
  clearGuideVarsStorage,
  DEFAULT_GUIDE_VARS,
  deriveHostsFromDomain,
  loadGuideVarsFromStorage,
  mergeGuideVars,
  saveGuideVarsToStorage,
  substituteText,
  type GuideVars,
} from './guide-vars';

const PROSE_SELECTOR = '.guide-prose';
const TEMPLATE_ATTR = 'data-var-template';
const SUBSTITUTABLE_SELECTOR =
  'p, li, td, th, blockquote, h2, h3, h4, h5, h6, pre > code, .stack-diagram__label, .stack-diagram__host';

/** Original text for Shiki-highlighted code (Text nodes cannot carry data attributes). */
const highlightedTextTemplates = new WeakMap<Text, string>();

function isHighlightedCodeBlock(el: HTMLElement): boolean {
  return el.matches('pre > code') && el.querySelector('span') !== null;
}

function collectTemplates(root: ParentNode): void {
  root.querySelectorAll<HTMLElement>(SUBSTITUTABLE_SELECTOR).forEach((el) => {
    if (el.closest('nav, form, .guide-vars, .guide-toc')) return;
    if (!el.hasAttribute(TEMPLATE_ATTR)) {
      el.setAttribute(TEMPLATE_ATTR, el.textContent ?? '');
    }

    if (isHighlightedCodeBlock(el)) {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let textNode: Text | null;
      while ((textNode = walker.nextNode() as Text | null)) {
        if (!textNode.textContent) continue;
        if (!highlightedTextTemplates.has(textNode)) {
          highlightedTextTemplates.set(textNode, textNode.textContent);
        }
      }
    }
  });
}

function applySubstituteToHighlightedCode(code: HTMLElement, vars: GuideVars): void {
  const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
  let textNode: Text | null;
  while ((textNode = walker.nextNode() as Text | null)) {
    const template = highlightedTextTemplates.get(textNode);
    if (template === undefined) continue;
    textNode.textContent = substituteText(template, vars);
  }
}

function setElementFromTemplate(el: HTMLElement, vars: GuideVars): void {
  const template = el.getAttribute(TEMPLATE_ATTR) ?? '';
  if (isHighlightedCodeBlock(el)) {
    applySubstituteToHighlightedCode(el, vars);
    return;
  }
  el.textContent = substituteText(template, vars);
}

function applyVarsToDom(root: ParentNode, vars: GuideVars): void {
  root.querySelectorAll<HTMLElement>(`[${TEMPLATE_ATTR}]`).forEach((el) => {
    if (el.closest('nav, form, .guide-vars, .guide-toc')) return;
    setElementFromTemplate(el, vars);
  });
}

function dispatchVarsChange(vars: GuideVars): void {
  document.dispatchEvent(new CustomEvent('homelab-vars-change', { detail: vars }));
}

function readFormVars(form: HTMLFormElement): GuideVars {
  const data = new FormData(form);
  return mergeGuideVars({
    mediaHost: String(data.get('mediaHost') ?? ''),
    mediaHostIp: String(data.get('mediaHostIp') ?? ''),
    nasHost: String(data.get('nasHost') ?? ''),
    domain: String(data.get('domain') ?? ''),
    watchHost: String(data.get('watchHost') ?? ''),
    requestHost: String(data.get('requestHost') ?? ''),
    puid: String(data.get('puid') ?? ''),
    pgid: String(data.get('pgid') ?? ''),
    tz: String(data.get('tz') ?? ''),
    nasPath: String(data.get('nasPath') ?? ''),
    configPath: String(data.get('configPath') ?? ''),
    nfsMediaExport: String(data.get('nfsMediaExport') ?? ''),
    nfsBackupExport: String(data.get('nfsBackupExport') ?? ''),
  });
}

function fillForm(form: HTMLFormElement, vars: GuideVars): void {
  for (const [key, value] of Object.entries(vars)) {
    const input = form.elements.namedItem(key);
    if (input instanceof HTMLInputElement) {
      input.value = value;
    }
  }
}

function getCopyTextForPre(pre: HTMLPreElement): string {
  const code = pre.querySelector('code');
  if (!code) return pre.textContent ?? '';
  const template = code.getAttribute(TEMPLATE_ATTR);
  if (template) {
    const form = document.querySelector<HTMLFormElement>('#guide-vars-form');
    const vars = form ? readFormVars(form) : { ...DEFAULT_GUIDE_VARS };
    return substituteText(template, vars);
  }
  return code.textContent ?? '';
}

function initCopyButtons(root: ParentNode): void {
  root.querySelectorAll<HTMLPreElement>('pre').forEach((pre) => {
    if (pre.querySelector('.guide-copy-btn')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'guide-copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code block');
    btn.addEventListener('click', async () => {
      const text = getCopyTextForPre(pre);
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied';
        setTimeout(() => {
          btn.textContent = 'Copy';
        }, 2000);
      } catch {
        btn.textContent = 'Failed';
      }
    });
    pre.classList.add('guide-pre--copyable');
    pre.appendChild(btn);
  });
}

function initScrollSpy(): void {
  const tocLinks = document.querySelectorAll<HTMLAnchorElement>('.guide-toc a[data-toc-slug]');
  if (!tocLinks.length) return;

  const slugToLink = new Map<string, HTMLAnchorElement>();
  tocLinks.forEach((link) => {
    const slug = link.dataset.tocSlug;
    if (slug) slugToLink.set(slug, link);
  });

  const headings = document.querySelectorAll<HTMLElement>('.guide-prose h2[id]');
  if (!headings.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const id = visible[0]?.target.id;
      if (!id) return;
      tocLinks.forEach((l) => l.classList.remove('is-active'));
      slugToLink.get(id)?.classList.add('is-active');
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: [0, 0.25, 0.5, 1] }
  );

  headings.forEach((h) => observer.observe(h));
}

export function initHomelabGuide(): void {
  const prose = document.querySelector(PROSE_SELECTOR);
  const form = document.querySelector<HTMLFormElement>('#guide-vars-form');
  if (!prose || !form) return;

  let vars = loadGuideVarsFromStorage() ?? { ...DEFAULT_GUIDE_VARS };
  let previousDomain = vars.domain;

  fillForm(form, vars);
  collectTemplates(document);
  applyVarsToDom(document, vars);
  initCopyButtons(prose);
  initScrollSpy();

  let debounce: ReturnType<typeof setTimeout> | undefined;

  const apply = () => {
    vars = readFormVars(form);
    applyVarsToDom(document, vars);
    saveGuideVarsToStorage(vars);
    dispatchVarsChange(vars);
  };

  form.addEventListener('input', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;

    if (target.name === 'domain') {
      const current = readFormVars(form);
      const derived = deriveHostsFromDomain(target.value, current, previousDomain);
      const watchInput = form.elements.namedItem('watchHost');
      const requestInput = form.elements.namedItem('requestHost');
      if (watchInput instanceof HTMLInputElement) watchInput.value = derived.watchHost;
      if (requestInput instanceof HTMLInputElement) requestInput.value = derived.requestHost;
      previousDomain = target.value;
    }

    clearTimeout(debounce);
    debounce = setTimeout(apply, 150);
  });

  form.addEventListener('reset', () => {
    setTimeout(() => {
      vars = { ...DEFAULT_GUIDE_VARS };
      previousDomain = vars.domain;
      clearGuideVarsStorage();
      applyVarsToDom(document, vars);
      dispatchVarsChange(vars);
    }, 0);
  });

  document.querySelector('#guide-vars-generate-secret')?.addEventListener('click', () => {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
    const msg = document.querySelector('#guide-vars-secret-hint');
    if (msg) {
      msg.textContent = `Generated (copy from a code block after substituting): ${hex}`;
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomelabGuide);
} else {
  initHomelabGuide();
}
