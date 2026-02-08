import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, locals }) => {
  try {
    // Access Cloudflare runtime environment through locals
    // @ts-ignore - Cloudflare runtime types
    const runtime = locals.runtime;
    
    if (!runtime || !runtime.env) {
      return new Response(
        JSON.stringify({ 
          online: false, 
          error: 'Runtime not available',
          debug: { hasRuntime: !!runtime, hasEnv: !!(runtime?.env) }
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
    
    // Get environment variables
    const clientId = runtime.env.TWITCH_CLIENT_ID;
    const clientSecret = runtime.env.TWITCH_CLIENT_SECRET;
    const username = runtime.env.TWITCH_USERNAME || 'vocino';
    
    if (!clientId || !clientSecret) {
      return new Response(
        JSON.stringify({ 
          online: false, 
          error: 'Twitch API credentials not configured',
          debug: { hasClientId: !!clientId, hasClientSecret: !!clientSecret }
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
    
    // Check cache first (Cloudflare Cache API)
    const cacheKey = new Request(`https://vocino.com/api/twitch-status-${username}`, request);
    const cache = caches.default;
    const cachedResponse = await cache.match(cacheKey);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Get OAuth token
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
    
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    
    // Get user ID
    const userResponse = await fetch(
      `https://api.twitch.tv/helix/users?login=${username}`,
      {
        headers: {
          'Client-ID': clientId,
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
    
    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      throw new Error(`Failed to get user info: ${userResponse.status} ${errorText}`);
    }
    
    const userData = await userResponse.json();
    const userId = userData.data[0]?.id;
    
    if (!userId) {
      const response = new Response(
        JSON.stringify({ online: false }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=60',
          },
        }
      );
      if (runtime.waitUntil) {
        runtime.waitUntil(cache.put(cacheKey, response.clone()));
      }
      return response;
    }
    
    // Check stream status
    const streamResponse = await fetch(
      `https://api.twitch.tv/helix/streams?user_id=${userId}`,
      {
        headers: {
          'Client-ID': clientId,
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
    
    if (!streamResponse.ok) {
      const errorText = await streamResponse.text();
      throw new Error(`Failed to get stream status: ${streamResponse.status} ${errorText}`);
    }
    
    const streamData = await streamResponse.json();
    const stream = streamData.data[0];
    
    const responseData = {
      online: !!stream,
      game: stream?.game_name || null,
      title: stream?.title || null,
    };
    
    // Create response with cache headers
    const response = new Response(JSON.stringify(responseData), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      },
    });
    
    // Cache the response
    if (runtime.waitUntil) {
      runtime.waitUntil(cache.put(cacheKey, response.clone()));
    }
    
    return response;
  } catch (error) {
    console.error('Twitch API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        online: false, 
        error: 'Failed to fetch Twitch status',
        details: errorMessage
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
