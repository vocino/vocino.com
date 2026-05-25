const STORAGE_KEY = 'bg3-honour-guide-checkpoints';

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
}

function initCheckpointButtons(): void {
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-checkpoint-id]');
    if (!target?.dataset.checkpointId) return;
    const id = target.dataset.checkpointId;
    const completed = readCompleted();
    if (completed.has(id)) completed.delete(id);
    else completed.add(id);
    writeCompleted(completed);
    syncButtons();
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

function initTocActive(): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('.guide-toc__link[data-toc-slug]');
  if (!links.length) return;

  const headings = document.querySelectorAll<HTMLElement>('.guide-prose h2[id]');
  if (!headings.length) return;

  const visibleRatios = new Map<string, number>();

  const pickBestVisible = (): void => {
    if (!visibleRatios.size) return;
    const best = [...visibleRatios.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
    if (best) setActiveTocSlug(best);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.id;
        if (!id) continue;
        if (entry.isIntersecting) {
          visibleRatios.set(id, entry.intersectionRatio);
        } else {
          visibleRatios.delete(id);
        }
      }
      pickBestVisible();
    },
    { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.25, 0.5, 1] },
  );

  headings.forEach((h) => observer.observe(h));

  links.forEach((link) => {
    link.addEventListener('click', () => {
      const slug = link.dataset.tocSlug;
      if (slug) setActiveTocSlug(slug);
    });
  });

  window.addEventListener('hashchange', () => {
    setActiveTocSlug(slugFromHash());
  });

  const initial = slugFromHash();
  if (initial && document.getElementById(initial)) {
    setActiveTocSlug(initial);
  }
}

function initActJump(): void {
  const select = document.getElementById('bg3-act-jump') as HTMLSelectElement | null;
  if (!select) return;
  select.addEventListener('change', () => {
    const slug = select.value;
    if (!slug) return;
    const el = document.getElementById(slug);
    if (el) {
      setActiveTocSlug(slug);
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${slug}`);
    }
    select.value = '';
  });
}

/** Fix icon src if HTML was baked with a stale extension (e.g. .png paths after assets moved to .webp). */
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
    img.addEventListener('error', () => {
      if (img.src.endsWith('.webp')) return;
      img.src = webp;
    }, { once: true });
    img.src = webp;
  });
}

function initBg3Guide(): void {
  initCheckpointButtons();
  initActJump();
  initTocActive();
  initBg3IconSrc();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBg3Guide);
} else {
  initBg3Guide();
}
