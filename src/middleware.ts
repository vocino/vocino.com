import { defineMiddleware } from 'astro:middleware';

/**
 * Slashless canonical URLs (e.g. /bg3 not /bg3/).
 * Prerendered HTML is handled by Workers Assets (auto-trailing-slash + *.html files).
 * This only runs for Worker/SSR routes (APIs, future on-demand pages).
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, search } = context.url;

  if (pathname !== '/' && pathname.endsWith('/')) {
    return context.redirect(`${pathname.replace(/\/+$/, '')}${search}`, 301);
  }

  return next();
});
