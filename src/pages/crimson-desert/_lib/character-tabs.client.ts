/** Character tab switching with hash routing (#kliff, #damiane, #oongka). */

const VALID_IDS = new Set(['kliff', 'damiane', 'oongka']);
const DEFAULT_ID = 'kliff';

/** Tab id from `#kliff`, `#damiane`, or a section hash like `#damiane-equipment`. */
function characterIdFromHash(hash: string): string {
  const raw = hash.replace(/^#/, '').toLowerCase();
  if (!raw) return DEFAULT_ID;
  if (VALID_IDS.has(raw)) return raw;

  for (const id of VALID_IDS) {
    if (raw.startsWith(`${id}-`)) return id;
  }

  return DEFAULT_ID;
}

function normalizeHash(): string {
  return characterIdFromHash(window.location.hash);
}

function selectTab(root: HTMLElement, id: string, updateHash: boolean): void {
  const tabs = root.querySelectorAll<HTMLButtonElement>('[data-cd-tab]');
  const panels = root.querySelectorAll<HTMLElement>('[data-cd-panel]');

  tabs.forEach((tab) => {
    const active = tab.dataset.cdTab === id;
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
    tab.tabIndex = active ? 0 : -1;
  });

  panels.forEach((panel) => {
    const active = panel.dataset.cdPanel === id;
    if (active) panel.removeAttribute('hidden');
    else panel.setAttribute('hidden', '');
  });

  if (updateHash) {
    const next = `#${id}`;
    if (window.location.hash !== next) {
      window.location.hash = id;
    }
  }

  document.dispatchEvent(new CustomEvent('cd-tab-change', { detail: { id } }));
}

function initScrollVeil(): void {
  const root = document.querySelector<HTMLElement>('[data-cd-tabs]');
  const bar = root?.querySelector<HTMLElement>('.cd-tabs__bar');
  if (!root || !bar) return;

  const hub = root.closest<HTMLElement>('.cd-hub');

  const readChromeTopPx = (): number => {
    const raw =
      getComputedStyle(hub ?? document.documentElement).getPropertyValue('--cd-chrome-top').trim() || '5rem';
    const value = parseFloat(raw);
    if (Number.isNaN(value)) return 80;
    return raw.endsWith('rem') ? value * parseFloat(getComputedStyle(document.documentElement).fontSize) : value;
  };

  const update = (): void => {
    root.classList.toggle('cd-tabs--stuck', bar.getBoundingClientRect().top <= readChromeTopPx() + 1);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

function initCharacterTabs(): void {
  const root = document.querySelector<HTMLElement>('[data-cd-tabs]');
  if (!root) return;

  const applyFromHash = (): void => selectTab(root, normalizeHash(), false);

  root.querySelectorAll<HTMLButtonElement>('[data-cd-tab]').forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.cdTab;
      if (id) selectTab(root, id, true);
    });

    tab.addEventListener('keydown', (event) => {
      const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-cd-tab]')];
      const index = tabs.indexOf(tab);
      if (index < 0) return;

      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;

      event.preventDefault();
      const id = tabs[next]?.dataset.cdTab;
      if (id) {
        selectTab(root, id, true);
        tabs[next]?.focus();
      }
    });
  });

  window.addEventListener('hashchange', applyFromHash);
  applyFromHash();
  initScrollVeil();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCharacterTabs);
} else {
  initCharacterTabs();
}

export {};
