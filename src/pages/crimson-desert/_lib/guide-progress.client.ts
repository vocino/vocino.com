/** TOC scroll-spy and mobile drawer — scoped to visible Kliff panel. */

function setActiveTocSlug(slug: string | null): void {
  document.querySelectorAll<HTMLAnchorElement>('.cd-hub .guide-toc__link[data-toc-slug]').forEach((link) => {
    link.classList.toggle('is-active', Boolean(slug && link.dataset.tocSlug === slug));
  });
}

function getVisibleKliffPanel(): HTMLElement | null {
  const panel = document.querySelector<HTMLElement>('[data-cd-panel="kliff"]');
  if (!panel || panel.hasAttribute('hidden')) return null;
  return panel;
}

function initTocActive(): void {
  let observer: IntersectionObserver | null = null;

  const bind = (): void => {
    observer?.disconnect();
    const panel = getVisibleKliffPanel();
    if (!panel) {
      setActiveTocSlug(null);
      return;
    }

    const headings = panel.querySelectorAll<HTMLElement>('.guide-prose h2[id]');
    if (!headings.length) return;

    const visibleRatios = new Map<string, number>();

    const pickBestVisible = (): void => {
      if (!visibleRatios.size) return;
      const best = [...visibleRatios.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
      if (best) setActiveTocSlug(best);
    };

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!id) continue;
          if (entry.isIntersecting) visibleRatios.set(id, entry.intersectionRatio);
          else visibleRatios.delete(id);
        }
        pickBestVisible();
      },
      { rootMargin: '-12% 0px -68% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    headings.forEach((h) => observer?.observe(h));
  };

  bind();
  document.addEventListener('cd-tab-change', bind);
}

function initDrawerClose(): void {
  const panel = document.getElementById('cd-toc-panel') as HTMLDetailsElement | null;
  if (!panel) return;
  panel.querySelectorAll<HTMLAnchorElement>('.guide-toc__link').forEach((link) => {
    link.addEventListener('click', () => {
      panel.open = false;
    });
  });
}

function initCdGuide(): void {
  initTocActive();
  initDrawerClose();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCdGuide);
} else {
  initCdGuide();
}

export {};
