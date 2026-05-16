export type ElsewhereIcon = 'instagram' | 'threads' | 'github' | 'twitch';

export interface HomeLink {
  href: string;
  label: string;
  /** Small caption under the title (mega menu) */
  subtitle?: string;
}

export interface GamingLink {
  href: string;
  label: string;
  description?: string;
}

export interface ElsewhereLink {
  href: string;
  label: string;
  /** Caption under the title, e.g. “Social” */
  subtitle?: string;
  rel?: string;
  icon: ElsewhereIcon;
}

export interface SiteNavData {
  home: HomeLink;
  gaming: GamingLink[];
  elsewhere: ElsewhereLink[];
}

export const siteNav: SiteNavData = {
  home: { href: '/', label: 'Home', subtitle: 'vocino.com' },
  gaming: [
    {
      href: '/bg3',
      label: "Baldur's Gate 3",
      description: 'Guide hub'
    }
  ],
  elsewhere: [
    { href: 'https://instagram.com/vocino', label: 'Instagram', subtitle: 'Social', rel: 'me', icon: 'instagram' },
    { href: 'https://threads.com/vocino', label: 'Threads', subtitle: 'Social', rel: 'me', icon: 'threads' },
    { href: 'https://github.com/vocino', label: 'GitHub', subtitle: 'Code', rel: 'me', icon: 'github' },
    { href: 'https://twitch.tv/vocino', label: 'Twitch', subtitle: 'Streaming', icon: 'twitch' }
  ]
};
