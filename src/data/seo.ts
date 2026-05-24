export type SeoPageType = 'home' | 'hub' | 'article' | 'generic';

export interface SeoBreadcrumbItem {
  name: string;
  path: string;
}

export type JsonLdObject = Record<string, unknown>;

export const siteSeo = {
  siteName: 'Vocino',
  siteUrl: 'https://vocino.com',
  locale: 'en_US',
  defaultTitle: 'Vocino — Perfect blend of technology and magic',
  defaultDescription:
    'Personal website of Travis Vocino — maker, nerd tchotchke collector, and creative technologist.',
  defaultOgImagePath: '/assets/images/og-image.png',
  defaultOgImageAlt: 'Vocino site preview image',
  twitterHandle: '@vocino',
  person: {
    name: 'Travis Vocino',
    url: 'https://vocino.com',
    sameAs: [
      'https://www.threads.com/@vocino',
      'https://instagram.com/vocino',
      'https://github.com/vocino',
    ],
    jobTitle: 'Maker',
    email: 'travis@vocino.com',
  },
} as const;
