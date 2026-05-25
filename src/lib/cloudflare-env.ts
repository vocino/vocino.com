import { env } from 'cloudflare:workers';

export type WorkerEnvKeys =
  | 'TWITCH_CLIENT_ID'
  | 'TWITCH_CLIENT_SECRET'
  | 'TWITCH_USERNAME'
  | 'INSTAGRAM_ACCESS_TOKEN'
  | 'INSTAGRAM_USER_ID'
  | 'INSTAGRAM_HASHTAG';

/** Read a secret/var from the Workers binding, with import.meta.env fallback for local tooling. */
export function getWorkerEnvVar(key: WorkerEnvKeys): string | undefined {
  const bound = (env as unknown as Record<string, unknown>)[key];
  if (typeof bound === 'string' && bound.length > 0) return bound;

  const local = import.meta.env[key];
  return typeof local === 'string' && local.length > 0 ? local : undefined;
}
