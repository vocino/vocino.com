/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />
/// <reference path="../worker-configuration.d.ts" />

/** Cloudflare Workers Cache API */
interface CacheStorage {
  readonly default: Cache;
}

interface ImportMetaEnv {
  readonly TWITCH_CLIENT_ID?: string;
  readonly TWITCH_CLIENT_SECRET?: string;
  readonly TWITCH_USERNAME?: string;
  readonly INSTAGRAM_ACCESS_TOKEN?: string;
  readonly INSTAGRAM_USER_ID?: string;
  readonly INSTAGRAM_HASHTAG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    cfContext?: ExecutionContext;
  }
}
