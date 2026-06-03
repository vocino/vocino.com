export interface TwitchGame {
  id: string;
  name: string;
  box_art_url: string;
  igdb_id?: string;
}

/** Replace `{width}` / `{height}` placeholders in a Twitch CDN template URL. */
export function resolveTwitchBoxArtUrl(template: string, width: number, height: number): string {
  return template.replace('{width}', String(width)).replace('{height}', String(height));
}

export async function getTwitchAppAccessToken(clientId: string, clientSecret: string): Promise<string> {
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
  return tokenData.access_token;
}

export async function fetchTwitchGames(
  clientId: string,
  accessToken: string,
  params: { ids?: string[]; names?: string[] },
): Promise<TwitchGame[]> {
  const search = new URLSearchParams();
  params.ids?.forEach((id) => search.append('id', id));
  params.names?.forEach((name) => search.append('name', name));

  const response = await fetch(`https://api.twitch.tv/helix/games?${search}`, {
    headers: {
      'Client-ID': clientId,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch Twitch games: ${response.status} ${errorText}`);
  }

  const json = (await response.json()) as { data: TwitchGame[] };
  return json.data;
}
