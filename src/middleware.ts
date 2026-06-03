import { defineMiddleware } from 'astro:middleware';

/**
 * Slashless canonical URLs (e.g. /baldurs-gate-3 not /baldurs-gate-3/).
 * Prerendered HTML is handled by Workers Assets (auto-trailing-slash + *.html files).
 * This runs on Worker routes (APIs, middleware, and requests that reach the Worker).
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, search } = context.url;

  // Legacy BG3 hub slug (301 → descriptive slug for SEO).
  if (pathname === '/bg3' || pathname.startsWith('/bg3/')) {
    const dest =
      '/baldurs-gate-3' +
      pathname.slice('/bg3'.length).replace(/\/+$/, '');
    return context.redirect(`${dest}${search}`, 301);
  }

  if (pathname !== '/' && pathname.endsWith('/')) {
    return context.redirect(`${pathname.replace(/\/+$/, '')}${search}`, 301);
  }

  return next();
});
