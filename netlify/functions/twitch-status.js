// Netlify Serverless Function for Twitch Live Status
// 
// SETUP:
// 1. Set environment variables in Netlify dashboard:
//    - TWITCH_CLIENT_ID
//    - TWITCH_CLIENT_SECRET
// 2. This function can be called from your static site
//
// Note: You can use this function even if your site is hosted on GitHub Pages
// Just deploy this function separately on Netlify and call it from your site

exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Get query parameters
  const { username } = event.queryStringParameters || {};
  
  if (!username) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Username parameter is required' })
    };
  }

  // Get credentials from environment variables
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('Twitch credentials not configured in environment variables');
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Server configuration error' })
    };
  }

  try {
    // Get App Access Token (valid for ~60 days, but we'll refresh each time for simplicity)
    // In production, you might want to cache this token
    const tokenResponse = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
      })
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get access token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Get user ID from username
    const userResponse = await fetch(
      `https://api.twitch.tv/helix/users?login=${encodeURIComponent(username)}`,
      {
        headers: {
          'Client-ID': clientId,
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user: ${userResponse.status}`);
    }

    const userData = await userResponse.json();

    if (!userData.data || userData.data.length === 0) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=60' // Cache for 60 seconds
        },
        body: JSON.stringify({ isLive: false })
      };
    }

    const userId = userData.data[0].id;

    // Check if user is currently streaming
    const streamResponse = await fetch(
      `https://api.twitch.tv/helix/streams?user_id=${userId}`,
      {
        headers: {
          'Client-ID': clientId,
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    if (!streamResponse.ok) {
      throw new Error(`Failed to fetch stream: ${streamResponse.status}`);
    }

    const streamData = await streamResponse.json();
    const isLive = streamData.data && streamData.data.length > 0;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60' // Cache for 60 seconds
      },
      body: JSON.stringify({ isLive })
    };
  } catch (error) {
    console.error('Error checking Twitch status:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Internal server error', isLive: false })
    };
  }
};
