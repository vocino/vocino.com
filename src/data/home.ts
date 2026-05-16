export type HomeContactChannelType =
  | 'social'
  | 'code'
  | 'stream'
  | 'professional';

export interface HomeContactLink {
  label: string;
  href: string;
  channelType: HomeContactChannelType;
  priority: number;
  handle: string;
}

export interface HomeIdentityData {
  displayName: string;
  role: string;
  tagline: string;
  location: string;
  timezone: string;
  systemId: string;
  version: string;
}

export interface HomeNowData {
  focusTitle: string;
  focusDetail: string;
  updatedAt: string;
  statusLabel: string;
}

export interface HomeLiveDataContract {
  online: boolean;
  title: string | null;
  game: string | null;
  checkedAt: string;
  health: 'ok' | 'degraded';
}

export interface HomeData {
  identity: HomeIdentityData;
  now: HomeNowData;
  contact: HomeContactLink[];
}

export const homeData: HomeData = {
  identity: {
    displayName: 'Travis Vocino',
    role: 'Product Engineer',
    tagline: 'Perfect blend of technology and magic.',
    location: 'San Francisco, CA',
    timezone: 'America/Los_Angeles',
    systemId: 'VOC-2405-0001',
    version: '1.0.0',
  },
  now: {
    focusTitle: 'Building clean interfaces that feel alive.',
    focusDetail:
      'Designing and shipping polished web experiences with strong interaction detail, clear systems, and practical performance.',
    updatedAt: '2026-05-08',
    statusLabel: 'active',
  },
  contact: [
    {
      label: 'Threads',
      href: 'https://threads.com/vocino',
      channelType: 'social',
      priority: 1,
      handle: '@vocino',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/vocino',
      channelType: 'code',
      priority: 2,
      handle: '@vocino',
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com/vocino',
      channelType: 'social',
      priority: 3,
      handle: '@vocino',
    },
    {
      label: 'Twitch',
      href: 'https://twitch.tv/vocino',
      channelType: 'stream',
      priority: 4,
      handle: '@vocino',
    },
  ],
};
