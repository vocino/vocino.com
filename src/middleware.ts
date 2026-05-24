import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, search } = context.url;

  if (pathname !== '/' && pathname.endsWith('/')) {
    return context.redirect(`${pathname.replace(/\/+$/, '')}${search}`, 301);
  }

  return next();
});
