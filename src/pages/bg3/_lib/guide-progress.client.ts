/** Minimal TOC support: highlight the section you're reading, close the mobile drawer on tap. */

function setActiveTocSlug(slug: string | null): void {
  document.querySelectorAll<HTMLAnchorElement>('.guide-toc__link[data-toc-slug]').forEach((link) => {
    link.classList.toggle('is-active', Boolean(slug && link.dataset.tocSlug === slug));
  });
}

function initTocActive(): void {
  const links = document.querySelectorAll('.guide-toc__link[data-toc-slug]');
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
        if (entry.isIntersecting) visibleRatios.set(id, entry.intersectionRatio);
        else visibleRatios.delete(id);
      }
      pickBestVisible();
    },
    { rootMargin: '-12% 0px -68% 0px', threshold: [0, 0.25, 0.5, 1] },
  );

  headings.forEach((h) => observer.observe(h));
}

function initDrawerClose(): void {
  const panel = document.getElementById('bg3-toc-panel') as HTMLDetailsElement | null;
  if (!panel) return;
  panel.querySelectorAll<HTMLAnchorElement>('.guide-toc__link').forEach((link) => {
    link.addEventListener('click', () => {
      panel.open = false;
    });
  });
}

function initBg3Guide(): void {
  initTocActive();
  initDrawerClose();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBg3Guide);
} else {
  initBg3Guide();
}
