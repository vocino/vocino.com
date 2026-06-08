import type { APIRoute } from 'astro';

export const prerender = true;
import { getHubIndexablePaths } from '../data/hubs';
import { siteSeo } from '../data/seo';
import { normalizeCanonicalPath, toAbsoluteUrl } from '../lib/seo';
import { getHubBySlug } from '../data/hubs';
import { getPublishedBg3Entries } from './baldurs-gate-3/_lib/bg3-catalogue';

interface SitemapEntry {
  path: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
}

const baseEntries: SitemapEntry[] = [
  {
    path: '/',
    changefreq: 'monthly',
    priority: '1.0',
  },
];

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function renderEntry(entry: SitemapEntry): string {
  const canonicalPath = normalizeCanonicalPath(entry.path);
  const url = toAbsoluteUrl(canonicalPath);
  return [
    '  <url>',
    `    <loc>${escapeXml(url)}</loc>`,
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
    '  </url>',
  ].join('\n');
}

export const GET: APIRoute = async () => {
  const hubEntries: SitemapEntry[] = getHubIndexablePaths().map((path) => ({
    path,
    changefreq: 'monthly',
    priority: '0.8',
  }));

  // Nested bg3 catalogue pages (builds + playthrough advice).
  const bg3Hub = getHubBySlug('baldurs-gate-3');
  const bg3Pages = await getPublishedBg3Entries();
  const bg3Entries: SitemapEntry[] = bg3Pages.map((entry) => ({
    path: `/${bg3Hub.slug}/${entry.id}`,
    changefreq: 'monthly',
    priority: '0.7',
  }));

  // Nested Star Wars pages (live game/topic sections).
  const starWarsHub = getHubBySlug('star-wars');
  const starWarsEntries: SitemapEntry[] = [
    {
      path: `/${starWarsHub.slug}/outlaws`,
      changefreq: 'monthly',
      priority: '0.7',
    },
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...[...baseEntries, ...hubEntries, ...bg3Entries, ...starWarsEntries].map(renderEntry),
    '</urlset>',
  ].join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': `index, follow, noarchive`,
      'X-Sitemap-Site': siteSeo.siteUrl,
    },
  });
};
