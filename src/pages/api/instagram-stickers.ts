import type { APIRoute } from 'astro';
import { getWorkerEnvVar } from '../../lib/cloudflare-env';

export const prerender = false;

/**
 * Instagram Graph API — fetches your own media and filters by hashtag in the caption.
 *
 * Setup (Meta for Developers):
 * - Instagram account must be Business or Creator, linked to a Facebook Page.
 * - Add the Instagram product; request permissions to read that IG account’s media.
 * - Use a long‑lived User or Page access token that includes the Instagram account.
 * - INSTAGRAM_USER_ID is the Instagram Business/Creator scoped user id (numeric string),
 *   from Graph API Explorer: GET /me/accounts → instagram_business_account.id
 *
 * @see https://developers.facebook.com/docs/instagram-platform/instagram-graph-api
 */

const GRAPH_VERSION = 'v21.0';
const CACHE_KEY_PATH = '/api/instagram-stickers';

type IgMedia = {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
  location?: { name?: string; city?: string; street?: string } | null;
  children?: { data?: IgMedia[] };
};

type StickerPost = {
  id: string;
  permalink: string;
  imageUrl: string;
  caption: string;
  location: string | null;
  timestamp: string | null;
};

function hasHashtag(caption: string | undefined, rawTag: string): boolean {
  if (!caption) return false;
  const tag = rawTag.replace(/^#/, '');
  const re = new RegExp(`(^|\\s)#${tag}\\b`, 'i');
  return re.test(caption);
}

function pickImageUrl(m: IgMedia): string | null {
  const t = m.media_type;
  if (t === 'IMAGE' && m.media_url) return m.media_url;
  if ((t === 'VIDEO' || t === 'REELS') && (m.thumbnail_url || m.media_url)) {
    return m.thumbnail_url || m.media_url || null;
  }
  if (t === 'CAROUSEL_ALBUM' && m.children?.data?.length) {
    const first = m.children.data[0];
    return pickImageUrl(first);
  }
  return null;
}

function formatLocation(loc: IgMedia['location']): string | null {
  if (!loc) return null;
  const parts = [loc.city, loc.name].filter(Boolean);
  if (parts.length) return parts.join(' · ');
  return null;
}

export const GET: APIRoute = async ({ request, locals }) => {
  const accessToken = getWorkerEnvVar('INSTAGRAM_ACCESS_TOKEN');
  const userId = getWorkerEnvVar('INSTAGRAM_USER_ID');
  const hashtag = (getWorkerEnvVar('INSTAGRAM_HASHTAG') || 'vocino').replace(/^#/, '');

  if (!accessToken || !userId) {
    return new Response(
      JSON.stringify({
        configured: false,
        stickers: [] as StickerPost[],
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=120',
        },
      }
    );
  }

  let cacheKey: Request | undefined;
  if (typeof caches !== 'undefined') {
    cacheKey = new Request(`https://vocino.com${CACHE_KEY_PATH}-${hashtag}`, request);
    const hit = await caches.default.match(cacheKey);
    if (hit) return hit;
  }

  const fields = [
    'id',
    'caption',
    'media_type',
    'media_url',
    'thumbnail_url',
    'permalink',
    'timestamp',
    'location{name,city,street}',
    'children{media_url,media_type,thumbnail_url}',
  ].join(',');

  const stickers: StickerPost[] = [];
  let nextUrl: string | null =
    `https://graph.facebook.com/${GRAPH_VERSION}/${encodeURIComponent(userId)}/media?fields=${encodeURIComponent(fields)}&limit=50&access_token=${encodeURIComponent(accessToken)}`;

  try {
    let pages = 0;
    while (nextUrl && stickers.length < 12 && pages < 4) {
      pages += 1;
      const res = await fetch(nextUrl);
      const body = (await res.json()) as {
        data?: IgMedia[];
        paging?: { next?: string };
        error?: { message?: string };
      };

      if (!res.ok || body.error) {
        throw new Error(body.error?.message || `Instagram API error: ${res.status}`);
      }

      const items = body.data || [];
      for (const m of items) {
        if (!hasHashtag(m.caption, hashtag)) continue;
        const imageUrl = pickImageUrl(m);
        if (!imageUrl || !m.permalink) continue;
        stickers.push({
          id: m.id,
          permalink: m.permalink,
          imageUrl,
          caption: (m.caption || '').trim(),
          location: formatLocation(m.location),
          timestamp: m.timestamp || null,
        });
        if (stickers.length >= 12) break;
      }

      nextUrl = body.paging?.next || null;
    }

    const payload = JSON.stringify({
      configured: true,
      stickers,
    });

    const response = new Response(payload, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=900',
      },
    });

    const ctx = locals.cfContext;
    if (ctx?.waitUntil && cacheKey) {
      ctx.waitUntil(caches.default.put(cacheKey, response.clone()));
    }

    return response;
  } catch (error) {
    console.error('Instagram stickers API error:', error);
    return new Response(
      JSON.stringify({
        configured: true,
        stickers: [] as StickerPost[],
        error: 'Failed to load Instagram posts',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60',
        },
      }
    );
  }
};
