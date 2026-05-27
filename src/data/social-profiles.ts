/**
 * Canonical outbound social profiles (homepage nav + analytics).
 * When adding a link on any page or hub, register here and set `data-social-platform`
 * on the anchor — see CLAUDE.md → "Analytics and outbound social links".
 */
export interface SocialProfile {
  /** Stable id for analytics (`data-social-platform`). */
  id: 'instagram' | 'threads' | 'github' | 'twitch';
  label: string;
  href: string;
}

/** Display order matches homepage social nav. */
export const socialProfiles: SocialProfile[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/vocino',
  },
  {
    id: 'threads',
    label: 'Threads',
    href: 'https://threads.com/vocino',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/vocino',
  },
  {
    id: 'twitch',
    label: 'Twitch',
    href: 'https://twitch.tv/vocino',
  },
];

export const twitchProfile = socialProfiles.find((p) => p.id === 'twitch')!;

export const homepageSocialProfiles = socialProfiles.filter((p) => p.id !== 'twitch');
