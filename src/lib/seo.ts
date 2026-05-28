import type { JsonLdObject, SeoBreadcrumbItem, SeoPageType } from '../data/seo';
import { siteSeo } from '../data/seo';

interface BuildSeoTitleOptions {
  pageType: SeoPageType;
  title?: string;
  hubName?: string;
}

interface BuildSchemaOptions {
  pageType: SeoPageType;
  title: string;
  description: string;
  canonicalUrl: string;
  hubName?: string;
  breadcrumb?: SeoBreadcrumbItem[];
  publishedTime?: string;
  modifiedTime?: string;
}

function withLeadingSlash(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

export function normalizeCanonicalPath(pathname: string): string {
  let path = withLeadingSlash(pathname);

  // Astro file-build prerender paths (build.format: 'file')
  if (path === '/index.html' || path === '/index') {
    return '/';
  }

  path = path.replace(/\.html$/i, '');

  if (path === '' || path === '/') {
    return '/';
  }

  return path.replace(/\/+$/, '');
}

export function toAbsoluteUrl(pathname: string): string {
  return new URL(pathname, siteSeo.siteUrl).toString();
}

export function buildSeoTitle({ pageType, title, hubName }: BuildSeoTitleOptions): string {
  if (pageType === 'home') {
    return title ?? siteSeo.defaultTitle;
  }

  if (pageType === 'hub') {
    return `${title ?? hubName ?? siteSeo.siteName} | ${siteSeo.siteName}`;
  }

  if (pageType === 'article') {
    if (title && hubName) {
      return `${title} | ${hubName} | ${siteSeo.siteName}`;
    }

    if (title) {
      return `${title} | ${siteSeo.siteName}`;
    }

    return siteSeo.defaultTitle;
  }

  if (title) {
    return `${title} | ${siteSeo.siteName}`;
  }

  return siteSeo.defaultTitle;
}

function buildBreadcrumbSchema(items: SeoBreadcrumbItem[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(normalizeCanonicalPath(item.path)),
    })),
  };
}

function buildWebSiteSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteSeo.siteName,
    url: siteSeo.siteUrl,
    inLanguage: 'en-US',
  };
}

function buildPersonSchema(description: string): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteSeo.person.name,
    url: siteSeo.person.url,
    sameAs: [...siteSeo.person.sameAs],
    jobTitle: siteSeo.person.jobTitle,
    description,
    email: siteSeo.person.email,
  };
}

export function buildDefaultSchemas({
  pageType,
  title,
  description,
  canonicalUrl,
  hubName,
  breadcrumb,
  publishedTime,
  modifiedTime,
}: BuildSchemaOptions): JsonLdObject[] {
  const webPageType = pageType === 'hub' ? 'CollectionPage' : 'WebPage';
  const baseWebPageSchema: JsonLdObject = {
    '@context': 'https://schema.org',
    '@type': webPageType,
    name: title,
    description,
    url: canonicalUrl,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: siteSeo.siteName,
      url: siteSeo.siteUrl,
    },
  };

  const schemaPayloads: JsonLdObject[] = [baseWebPageSchema];

  if (pageType === 'home') {
    schemaPayloads.unshift(buildWebSiteSchema());
    schemaPayloads.push(buildPersonSchema(description));
  }

  if (pageType === 'hub' && hubName) {
    schemaPayloads.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${hubName} topic hub`,
      url: canonicalUrl,
      description,
    });
  }

  if (pageType === 'article') {
    schemaPayloads.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      mainEntityOfPage: canonicalUrl,
      author: {
        '@type': 'Person',
        name: siteSeo.person.name,
        url: siteSeo.person.url,
      },
      publisher: {
        '@type': 'Person',
        name: siteSeo.person.name,
        url: siteSeo.person.url,
      },
      ...(publishedTime ? { datePublished: publishedTime } : {}),
      ...(modifiedTime ? { dateModified: modifiedTime } : {}),
    });
  }

  if (breadcrumb && breadcrumb.length > 1) {
    schemaPayloads.push(buildBreadcrumbSchema(breadcrumb));
  }

  return schemaPayloads;
}
