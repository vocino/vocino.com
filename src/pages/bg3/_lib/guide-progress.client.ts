const STORAGE_KEY = 'bg3-honour-guide-checkpoints';
const LAST_SECTION_KEY = 'bg3-honour-guide-last-section';
const CHECKLIST_PREFIX = 'bg3-checklist-';

interface GuideAct {
  slug: string;
  label: string;
  checkpointId: string;
}

function readCompleted(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function writeCompleted(ids: Set<string>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

function parseGuideActs(): GuideAct[] {
  const dock = document.querySelector<HTMLElement>('[data-guide-acts]');
  const raw = dock?.dataset.guideActs;
  if (!raw) return [];
  try {
    return JSON.parse(raw) as GuideAct[];
  } catch {
    return [];
  }
}

function getActBySlug(slug: string, acts: GuideAct[]): GuideAct | undefined {
  return acts.find((a) => a.slug === slug);
}

function getNextAct(slug: string, acts: GuideAct[]): GuideAct | undefined {
  const i = acts.findIndex((a) => a.slug === slug);
  return i >= 0 && i < acts.length - 1 ? acts[i + 1] : undefined;
}

function sectionLabelForSlug(slug: string): string {
  const bar = document.querySelector<HTMLElement>('[data-bg3-play-bar]');
  if (!bar?.dataset.sectionLabels) return slug.replace(/-/g, ' ');
  try {
    const map = JSON.parse(bar.dataset.sectionLabels) as Record<string, string>;
    return map[slug] ?? slug.replace(/-/g, ' ');
  } catch {
    return slug.replace(/-/g, ' ');
  }
}

function actForSlug(slug: string): string | null {
  const bar = document.querySelector<HTMLElement>('[data-bg3-play-bar]');
  if (!bar?.dataset.sectionActs) return null;
  try {
    const map = JSON.parse(bar.dataset.sectionActs) as Record<string, string>;
    return map[slug] ?? null;
  } catch {
    return null;
  }
}

function saveLastSection(slug: string): void {
  try {
    localStorage.setItem(LAST_SECTION_KEY, slug);
  } catch {
    /* ignore */
  }
}

function readLastSection(): string | null {
  try {
    return localStorage.getItem(LAST_SECTION_KEY);
  } catch {
    return null;
  }
}

let currentSectionSlug: string | null = null;

function setCurrentSection(slug: string | null): void {
  if (!slug) return;
  currentSectionSlug = slug;
  saveLastSection(slug);

  const el = document.querySelector<HTMLElement>('[data-current-section]');
  if (el) el.textContent = sectionLabelForSlug(slug);

  const actEl = document.querySelector<HTMLElement>('[data-current-act]');
  if (actEl) actEl.textContent = actForSlug(slug) ?? 'Playing now';

  syncStepHighlight(slug);
  updateNextNavigation(slug);
  updateResumeBanner(slug);
  updateActionDock(slug);
}

function syncButtons(): void {
  const completed = readCompleted();
  document.querySelectorAll<HTMLButtonElement>('[data-checkpoint-id]').forEach((btn) => {
    const id = btn.dataset.checkpointId;
    if (!id) return;
    const done = completed.has(id);
    btn.setAttribute('aria-pressed', done ? 'true' : 'false');
    btn.classList.toggle('is-done', done);
    const label = btn.querySelector('.bg3-checkpoint__action');
    if (label) label.textContent = done ? 'Done' : 'Mark done';
  });
  syncProgressCount();
  syncStepCompleteState();
  if (currentSectionSlug) updateActionDock(currentSectionSlug);
}

function syncProgressCount(): void {
  const el = document.querySelector<HTMLElement>('[data-checkpoint-progress]');

  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-checkpoint-id]');
  const total = buttons.length;
  const done = [...buttons].filter((btn) => btn.classList.contains('is-done')).length;
  if (el) el.textContent = `${done} / ${total}`;

  const fill = document.querySelector<HTMLElement>('[data-progress-fill]');
  if (fill) fill.style.width = total ? `${Math.round((done / total) * 100)}%` : '0';
}

function syncStepCompleteState(): void {
  const completed = readCompleted();
  const acts = parseGuideActs();

  document.querySelectorAll<HTMLElement>('.bg3-step[id]').forEach((step) => {
    const slug = step.id;
    const act = getActBySlug(slug, acts);
    const checkpointId = act?.checkpointId;
    const done = checkpointId ? completed.has(checkpointId) : false;
    step.classList.toggle('is-complete', done);
  });
}

function syncStepHighlight(slug: string): void {
  document.querySelectorAll<HTMLElement>('.bg3-step[id]').forEach((step) => {
    step.classList.toggle('is-current', step.id === slug);
  });
}

function toggleCheckpoint(id: string): void {
  const completed = readCompleted();
  if (completed.has(id)) completed.delete(id);
  else completed.add(id);
  writeCompleted(completed);
  syncButtons();
}

function initCheckpointButtons(): void {
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-checkpoint-id]');
    if (target?.dataset.checkpointId) {
      toggleCheckpoint(target.dataset.checkpointId);
      return;
    }
    const dockBtn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-dock-checkpoint]');
    if (dockBtn?.dataset.checkpointId) {
      toggleCheckpoint(dockBtn.dataset.checkpointId);
    }
  });
  syncButtons();
}

function setActiveTocSlug(slug: string | null): void {
  document.querySelectorAll<HTMLAnchorElement>('.guide-toc__link[data-toc-slug]').forEach((link) => {
    link.classList.toggle('is-active', Boolean(slug && link.dataset.tocSlug === slug));
  });
}

function slugFromHash(): string | null {
  const raw = location.hash.replace(/^#/, '');
  return raw || null;
}

function scrollToSection(slug: string): void {
  const el = document.getElementById(slug);
  if (!el) return;
  setActiveTocSlug(slug);
  setCurrentSection(slug);
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', `#${slug}`);
}

function updateNextNavigation(slug: string): void {
  const acts = parseGuideActs();
  const next = getNextAct(slug, acts);

  const playNext = document.querySelector<HTMLAnchorElement>('[data-play-next]');
  const hint = document.querySelector<HTMLElement>('[data-next-hint]');
  const dockNext = document.querySelector<HTMLAnchorElement>('[data-dock-next]');
  const dockNextLabel = document.querySelector<HTMLElement>('[data-dock-next-label]');

  if (next) {
    if (playNext) {
      playNext.hidden = false;
      playNext.href = `#${next.slug}`;
      playNext.setAttribute('aria-label', `Go to next step: ${next.label}`);
    }
    if (hint) {
      hint.hidden = false;
      hint.textContent = `Up next: ${next.label}`;
    }
    if (dockNext) {
      dockNext.hidden = false;
      dockNext.href = `#${next.slug}`;
    }
    if (dockNextLabel) dockNextLabel.textContent = next.label;
  } else {
    playNext?.setAttribute('hidden', '');
    hint?.setAttribute('hidden', '');
    dockNext?.setAttribute('hidden', '');
  }
}

function updateResumeBanner(currentSlug: string): void {
  const banner = document.querySelector<HTMLElement>('[data-resume-banner]');
  const label = document.querySelector<HTMLElement>('[data-resume-label]');
  const btn = document.querySelector<HTMLButtonElement>('[data-resume-btn]');
  if (!banner || !label || !btn) return;

  const last = readLastSection();
  if (!last || last === currentSlug || !document.getElementById(last)) {
    banner.hidden = true;
    return;
  }

  banner.hidden = false;
  label.textContent = sectionLabelForSlug(last);
  btn.onclick = () => scrollToSection(last);
}

function updateActionDock(slug: string): void {
  const dock = document.querySelector<HTMLElement>('[data-action-dock]');
  const dockDone = document.querySelector<HTMLButtonElement>('[data-dock-checkpoint]');
  const dockLabel = document.querySelector<HTMLElement>('[data-dock-checkpoint-label]');
  if (!dock) return;

  const acts = parseGuideActs();
  const act = getActBySlug(slug, acts);
  const stepEl = document.getElementById(slug);
  const inlineBtn = stepEl?.querySelector<HTMLButtonElement>('[data-checkpoint-id]');

  if (!act?.checkpointId || !inlineBtn) {
    dock.hidden = true;
    return;
  }

  const completed = readCompleted();
  const done = completed.has(act.checkpointId);
  const rect = inlineBtn.getBoundingClientRect();
  const btnVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

  dock.hidden = btnVisible && window.innerWidth < 900;
  if (dock.hidden) return;

  if (dockDone) {
    dockDone.hidden = false;
    dockDone.dataset.checkpointId = act.checkpointId;
    dockDone.classList.toggle('is-done', done);
    dockDone.setAttribute('aria-pressed', done ? 'true' : 'false');
  }
  if (dockLabel) dockLabel.textContent = done ? 'Done ✓' : 'Mark done';
}

function initActionDockScroll(): void {
  let ticking = false;
  const onScroll = (): void => {
    if (ticking || !currentSectionSlug) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateActionDock(currentSectionSlug!);
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}

function initTocActive(): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('.guide-toc__link[data-toc-slug]');
  if (!links.length) return;

  const headings = document.querySelectorAll<HTMLElement>('.guide-prose h2[id]');
  if (!headings.length) return;

  const visibleRatios = new Map<string, number>();

  const pickBestVisible = (): void => {
    if (!visibleRatios.size) return;
    const best = [...visibleRatios.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
    if (best) {
      setActiveTocSlug(best);
      setCurrentSection(best);
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.id;
        if (!id) continue;
        if (entry.isIntersecting) visibleRatios.set(id, entry.intersectionRatio);
        else visibleRatios.delete(id);
      }
      pickBestVisible();
    },
    { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.25, 0.5, 1] },
  );

  headings.forEach((h) => observer.observe(h));

  links.forEach((link) => {
    link.addEventListener('click', () => {
      const slug = link.dataset.tocSlug;
      if (slug) scrollToSection(slug);
    });
  });

  document.querySelectorAll<HTMLAnchorElement>('[data-play-next], [data-dock-next]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href?.startsWith('#')) return;
      e.preventDefault();
      scrollToSection(href.slice(1));
    });
  });

  window.addEventListener('hashchange', () => {
    const slug = slugFromHash();
    if (slug && document.getElementById(slug)) scrollToSection(slug);
  });

  const initial = slugFromHash();
  if (initial && document.getElementById(initial)) {
    setActiveTocSlug(initial);
    setCurrentSection(initial);
  } else {
    const first = headings[0]?.id;
    if (first) setCurrentSection(first);
  }
}

function initActJump(): void {
  const select = document.getElementById('bg3-act-jump') as HTMLSelectElement | null;
  if (!select) return;
  select.addEventListener('change', () => {
    const slug = select.value;
    if (!slug) return;
    scrollToSection(slug);
    select.value = '';
  });
}

function initTocToggle(): void {
  const btn = document.querySelector<HTMLButtonElement>('[data-toc-toggle]');
  const panel = document.getElementById('bg3-toc-panel') as HTMLDetailsElement | null;
  if (!btn || !panel) return;

  btn.addEventListener('click', () => {
    panel.open = !panel.open;
    btn.setAttribute('aria-expanded', panel.open ? 'true' : 'false');
    if (panel.open) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  panel.addEventListener('toggle', () => {
    btn.setAttribute('aria-expanded', panel.open ? 'true' : 'false');
  });

  panel.querySelectorAll<HTMLAnchorElement>('.guide-toc__link').forEach((link) => {
    link.addEventListener('click', () => {
      panel.open = false;
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

async function copyText(text: string, btn?: HTMLElement): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  if (!btn) return;
  btn.classList.add('is-copied');
  const prev = btn.textContent;
  btn.textContent = '✓';
  window.setTimeout(() => {
    btn.classList.remove('is-copied');
    btn.textContent = prev;
  }, 1200);
}

function initCopyValues(): void {
  document.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-copy]');
    if (!btn?.dataset.copy) return;
    e.preventDefault();
    void copyText(btn.dataset.copy, btn);
  });

  document.querySelectorAll<HTMLTableCellElement>('.guide-table--reference td:nth-child(2)').forEach((cell) => {
    if (cell.querySelector('.bg3-copy-value, .bg3-term')) return;
    const text = cell.textContent?.trim();
    if (!text || text.length > 20) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'bg3-copy-value bg3-copy-value--inline';
    btn.dataset.copy = text.replace(/\s+/g, ' ');
    btn.setAttribute('aria-label', `Copy ${text}`);
    btn.textContent = text;
    cell.textContent = '';
    cell.appendChild(btn);
  });
}

function initChecklists(): void {
  document.querySelectorAll<HTMLElement>('[data-checklist-id]').forEach((list) => {
    const id = list.dataset.checklistId;
    if (!id) return;
    const key = `${CHECKLIST_PREFIX}${id}`;

    let saved: Record<string, boolean> = {};
    try {
      const raw = localStorage.getItem(key);
      if (raw) saved = JSON.parse(raw) as Record<string, boolean>;
    } catch {
      saved = {};
    }

    const inputs = list.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    inputs.forEach((input, index) => {
      const itemKey = String(index);
      input.checked = Boolean(saved[itemKey]);
      input.addEventListener('change', () => {
        saved[itemKey] = input.checked;
        try {
          localStorage.setItem(key, JSON.stringify(saved));
        } catch {
          /* ignore */
        }
      });
    });
  });
}

function initMissableFilter(): void {
  const heading = document.getElementById('unique-and-missable-index');
  if (!heading) return;

  const wrap = heading.nextElementSibling;
  if (!wrap?.classList.contains('guide-table-wrap')) return;

  const filter = document.createElement('div');
  filter.className = 'bg3-missable-filter';
  filter.innerHTML = `
    <label class="visually-hidden" for="bg3-missable-q">Filter missables</label>
    <input id="bg3-missable-q" class="bg3-missable-filter__input" type="search" placeholder="Filter NPCs, items, acts…" autocomplete="off" />
    <p class="bg3-missable-filter__hint">Shows rows matching any column</p>
  `;
  heading.insertAdjacentElement('afterend', filter);

  const input = filter.querySelector<HTMLInputElement>('#bg3-missable-q');
  const rows = wrap.querySelectorAll<HTMLTableRowElement>('tbody tr');
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    rows.forEach((row) => {
      const text = row.textContent?.toLowerCase() ?? '';
      row.hidden = Boolean(q && !text.includes(q));
    });
  });
}

function initBg3IconSrc(): void {
  document.querySelectorAll<HTMLElement>('.bg3-term[data-bg3-slug]').forEach((term) => {
    const slug = term.dataset.bg3Slug;
    const img = term.querySelector<HTMLImageElement>('.bg3-term__icon');
    if (!slug || !img) return;
    const base = `/assets/images/bg3/`;
    const current = img.getAttribute('src') ?? '';
    if (!current.startsWith(base)) return;
    const rel = current.slice(base.length);
    if (!rel.endsWith('.png')) return;
    const webp = `${base}${rel.replace(/\.png$/, '.webp')}`;
    img.addEventListener(
      'error',
      () => {
        if (img.src.endsWith('.webp')) return;
        img.src = webp;
      },
      { once: true },
    );
    img.src = webp;
  });
}

function initBg3Guide(): void {
  initCheckpointButtons();
  initActJump();
  initTocActive();
  initTocToggle();
  initCopyValues();
  initChecklists();
  initMissableFilter();
  initActionDockScroll();
  initBg3IconSrc();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBg3Guide);
} else {
  initBg3Guide();
}
