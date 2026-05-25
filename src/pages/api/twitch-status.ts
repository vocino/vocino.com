import type { APIRoute } from 'astro';
import { getWorkerEnvVar } from '../../lib/cloudflare-env';

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  try {
    const clientId = getWorkerEnvVar('TWITCH_CLIENT_ID');
    const clientSecret = getWorkerEnvVar('TWITCH_CLIENT_SECRET');
    const username = getWorkerEnvVar('TWITCH_USERNAME') || 'vocino';

    if (!clientId || !clientSecret) {
      return new Response(
        JSON.stringify({
          online: false,
          error: 'Twitch API credentials not configured',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=30',
          },
        }
      );
    }

    let cachedResponse: Response | null = null;
    let cacheKey: Request | null = null;

    if (typeof caches !== 'undefined') {
      cacheKey = new Request(`https://vocino.com/api/twitch-status-${username}`, request);
      cachedResponse = (await caches.default.match(cacheKey)) ?? null;

      if (cachedResponse) {
        return cachedResponse;
      }
    }

    const tokenResponse = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(`Failed to get OAuth token: ${tokenResponse.status} ${errorText}`);
    }

    const tokenData = (await tokenResponse.json()) as { access_token: string };
    const accessToken = tokenData.access_token;

    const userResponse = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
      headers: {
        'Client-ID': clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      throw new Error(`Failed to get user info: ${userResponse.status} ${errorText}`);
    }

    const userData = (await userResponse.json()) as { data: Array<{ id?: string }> };
    const userId = userData.data[0]?.id;

    if (!userId) {
      const response = new Response(JSON.stringify({ online: false }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60',
        },
      });
      const ctx = locals.cfContext;
      if (ctx?.waitUntil && cacheKey) {
        ctx.waitUntil(caches.default.put(cacheKey, response.clone()));
      }
      return response;
    }

    const streamResponse = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
      headers: {
        'Client-ID': clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!streamResponse.ok) {
      const errorText = await streamResponse.text();
      throw new Error(`Failed to get stream status: ${streamResponse.status} ${errorText}`);
    }

    const streamData = (await streamResponse.json()) as {
      data: Array<{ game_name?: string; title?: string }>;
    };
    const stream = streamData.data[0];

    const responseData = {
      online: !!stream,
      game: stream?.game_name || null,
      title: stream?.title || null,
    };

    const response = new Response(JSON.stringify(responseData), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      },
    });

    const ctx = locals.cfContext;
    if (ctx?.waitUntil && cacheKey) {
      ctx.waitUntil(caches.default.put(cacheKey, response.clone()));
    }

    return response;
  } catch (error) {
    console.error('Twitch API error:', error);
    return new Response(
      JSON.stringify({
        online: false,
        error: 'Failed to fetch Twitch status',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=30',
        },
      }
    );
  }
};
