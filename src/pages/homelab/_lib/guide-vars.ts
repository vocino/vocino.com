export interface GuideVars {
  mediaHost: string;
  mediaHostIp: string;
  nasHost: string;
  domain: string;
  watchHost: string;
  requestHost: string;
  puid: string;
  pgid: string;
  tz: string;
  nasPath: string;
  configPath: string;
  nfsMediaExport: string;
  nfsBackupExport: string;
}

export const GUIDE_VARS_STORAGE_KEY = 'vocino-homelab-guide-vars';

export const DEFAULT_GUIDE_VARS: GuideVars = {
  mediaHost: 'MEDIA_HOST',
  mediaHostIp: 'MEDIA_HOST_IP',
  nasHost: 'NAS_HOST',
  domain: 'example.com',
  watchHost: 'watch.example.com',
  requestHost: 'request.example.com',
  puid: '999',
  pgid: '999',
  tz: 'America/Los_Angeles',
  nasPath: '/mnt/nas',
  configPath: '/opt/media',
  nfsMediaExport: '/volume/Media',
  nfsBackupExport: '/volume/Backup',
};

export interface SubstitutionRule {
  find: string | RegExp;
  replace: (vars: GuideVars) => string;
}

/** Ordered most-specific first to avoid partial replacements. */
export function buildSubstitutionRules(_vars?: GuideVars): SubstitutionRule[] {
  return [
    { find: 'watch.example.com', replace: (v) => v.watchHost },
    { find: 'request.example.com', replace: (v) => v.requestHost },
    { find: 'MEDIA_HOST_IP', replace: (v) => v.mediaHostIp },
    { find: 'MEDIA_HOST', replace: (v) => v.mediaHost },
    { find: 'NAS_HOST', replace: (v) => v.nasHost },
    { find: 'https://watch.example.com', replace: (v) => `https://${v.watchHost}` },
    {
      find: /JELLYFIN_PublishedServerUrl=https:\/\/watch\.example\.com/g,
      replace: (v) => `JELLYFIN_PublishedServerUrl=https://${v.watchHost}`,
    },
    {
      find: '"applicationUrl": "https://request.example.com"',
      replace: (v) => `"applicationUrl": "https://${v.requestHost}"`,
    },
    { find: 'example.com', replace: (v) => v.domain },
    { find: 'PUID=999', replace: (v) => `PUID=${v.puid}` },
    { find: 'PGID=999', replace: (v) => `PGID=${v.pgid}` },
    { find: '-u 999:999', replace: (v) => `-u ${v.puid}:${v.pgid}` },
    { find: 'user: "999:999"', replace: (v) => `user: "${v.puid}:${v.pgid}"` },
    { find: 'America/Los_Angeles', replace: (v) => v.tz },
    { find: '/volume/Backup', replace: (v) => v.nfsBackupExport },
    { find: '/volume/Media', replace: (v) => v.nfsMediaExport },
    { find: '/mnt/nas', replace: (v) => v.nasPath },
    { find: '/opt/media', replace: (v) => v.configPath },
  ];
}

export function substituteText(template: string, vars: GuideVars): string {
  let result = template;
  for (const rule of buildSubstitutionRules(vars)) {
    const replacement = rule.replace(vars);
    if (typeof rule.find === 'string') {
      result = result.split(rule.find).join(replacement);
    } else {
      result = result.replace(rule.find, replacement);
    }
  }
  return result;
}

export function mergeGuideVars(partial: Partial<GuideVars>): GuideVars {
  return { ...DEFAULT_GUIDE_VARS, ...partial };
}

export function loadGuideVarsFromStorage(): GuideVars | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(GUIDE_VARS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<GuideVars>;
    return mergeGuideVars(parsed);
  } catch {
    return null;
  }
}

export function saveGuideVarsToStorage(vars: GuideVars): void {
  localStorage.setItem(GUIDE_VARS_STORAGE_KEY, JSON.stringify(vars));
}

export function clearGuideVarsStorage(): void {
  localStorage.removeItem(GUIDE_VARS_STORAGE_KEY);
}

/** When domain changes, update watch/request if they still match old defaults. */
export function deriveHostsFromDomain(
  domain: string,
  current: Pick<GuideVars, 'watchHost' | 'requestHost'>,
  previousDomain: string
): Pick<GuideVars, 'watchHost' | 'requestHost'> {
  const prevWatch = `watch.${previousDomain}`;
  const prevRequest = `request.${previousDomain}`;
  return {
    watchHost: current.watchHost === prevWatch ? `watch.${domain}` : current.watchHost,
    requestHost: current.requestHost === prevRequest ? `request.${domain}` : current.requestHost,
  };
}

export const GUIDE_VAR_FIELDS: {
  key: keyof GuideVars;
  label: string;
  placeholder: string;
  group: 'hosts' | 'domain' | 'ids' | 'paths';
  hint?: string;
}[] = [
  { key: 'mediaHost', label: 'Media host name', placeholder: 'MEDIA_HOST', group: 'hosts' },
  { key: 'mediaHostIp', label: 'Media host IP', placeholder: '192.168.1.100', group: 'hosts', hint: 'LAN IP for browse URLs' },
  { key: 'nasHost', label: 'NAS host', placeholder: 'NAS_HOST', group: 'hosts' },
  { key: 'domain', label: 'Domain', placeholder: 'example.com', group: 'domain' },
  { key: 'watchHost', label: 'Watch hostname', placeholder: 'watch.example.com', group: 'domain' },
  { key: 'requestHost', label: 'Request hostname', placeholder: 'request.example.com', group: 'domain' },
  { key: 'puid', label: 'PUID', placeholder: '999', group: 'ids' },
  { key: 'pgid', label: 'PGID', placeholder: '999', group: 'ids' },
  { key: 'tz', label: 'Timezone', placeholder: 'America/Los_Angeles', group: 'ids' },
  { key: 'nasPath', label: 'NAS mount path', placeholder: '/mnt/nas', group: 'paths' },
  { key: 'configPath', label: 'Config path', placeholder: '/opt/media', group: 'paths' },
  { key: 'nfsMediaExport', label: 'NFS media export', placeholder: '/volume/Media', group: 'paths' },
  { key: 'nfsBackupExport', label: 'NFS backup export', placeholder: '/volume/Backup', group: 'paths' },
];
