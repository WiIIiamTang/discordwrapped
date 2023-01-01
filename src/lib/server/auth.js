import { error } from '@sveltejs/kit';
import {
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	DISCORD_REDIRECT_URI,
	DISCORD_SCOPE,
	RUNTIME_ENV,
	PROD_DISCORD_REDIRECT_URI,
	PREVIEW_DISCORD_REDIRECT_URI,
	DISCORD_BOT_TOKEN
} from '$env/static/private';

/**
 *
 * @param {string} code: the discord auth code
 * @param {boolean} refresh: if true, refresh the token instead of getting a new one. In this case, the code param in the url is the refresh token.
 * @returns {Object} the access token response: { access_token, token_type, expires_in, refresh_token, scope }
 */
export async function getDiscordAuth(code, refresh) {
	if (!code) {
		throw error(404, 'No code provided');
	}

	const body = refresh
		? {
				// TODO: the prod, dev and preview uris are stupid. just use one (DISCORD_REDIRECT_URI)
				// and modify the value in the different environments...
				client_id: DISCORD_CLIENT_ID,
				client_secret: DISCORD_CLIENT_SECRET,
				grant_type: 'refresh_token',
				redirect_uri:
					RUNTIME_ENV === 'PROD'
						? PROD_DISCORD_REDIRECT_URI
						: RUNTIME_ENV === 'DEV'
						? DISCORD_REDIRECT_URI
						: PREVIEW_DISCORD_REDIRECT_URI,
				refresh_token: code,
				scope: DISCORD_SCOPE
		  }
		: {
				client_id: DISCORD_CLIENT_ID,
				client_secret: DISCORD_CLIENT_SECRET,
				grant_type: 'authorization_code',
				redirect_uri:
					RUNTIME_ENV === 'PROD'
						? PROD_DISCORD_REDIRECT_URI
						: RUNTIME_ENV === 'DEV'
						? DISCORD_REDIRECT_URI
						: PREVIEW_DISCORD_REDIRECT_URI,
				code: code,
				scope: DISCORD_SCOPE
		  };

	const response = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		body: new URLSearchParams(body),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});

	const data = await response.json();
	if (data.error) {
		throw error(400, `Discord error while fetching token: ${data.error}`);
	}

	return data; // { access_token, token_type, expires_in, refresh_token, scope }
}

/**
 *
 * @param {RequestEvent} event: the event object
 */
export async function refreshDiscordAuthCookies(event) {
	const { cookies } = event;
	const data = await getDiscordAuth(cookies.get('refresh_token'), true);
	const access_token_expires_in = new Date(Date.now() + data.expires_in * 1000); // 7 days
	const refresh_token_expires_in = new Date(Date.now() + 2592000000); // 30 days

	cookies.set('access_token', data.access_token, {
		path: '/',
		expires: access_token_expires_in,
		httpOnly: true,
		sameSite: 'strict',
		secure: RUNTIME_ENV === 'PRODUCTION'
	});
	cookies.set('refresh_token', data.refresh_token, {
		path: '/',
		expires: refresh_token_expires_in,
		httpOnly: true,
		sameSite: 'strict',
		secure: RUNTIME_ENV === 'PRODUCTION'
	});
}

/**
 *
 * @param {Object} data: the data object (requires cookies, access_token and refresh_token, expires_in)
 */
export async function setDiscordAuthCookies(data) {
	const { cookies } = data;
	const access_token_expires_in = new Date(Date.now() + data.expires_in * 1000); // 7 days
	const refresh_token_expires_in = new Date(Date.now() + 2592000000); // 30 days

	cookies.set('access_token', data.access_token, {
		path: '/',
		expires: access_token_expires_in,
		httpOnly: true,
		sameSite: 'lax', // needed for discord redirect
		Secure: RUNTIME_ENV === 'PRODUCTION'
	});
	cookies.set('refresh_token', data.refresh_token, {
		path: '/',
		expires: refresh_token_expires_in,
		httpOnly: true,
		sameSite: 'lax', // needed for discord redirect
		secure: RUNTIME_ENV === 'PRODUCTION'
	});
}

/**
 *
 * @param {RequestEvent} event: the event object
 * @returns {Object|null} the discord user object
 */
export async function getDiscordUser(event) {
	const { cookies } = event;

	let access_token = cookies.get('access_token');
	let refresh_token = cookies.get('refresh_token');

	// If there is no access token but there is a refresh token, refresh the access token
	if (!access_token && refresh_token) {
		await refreshDiscordAuthCookies(event);
		access_token = cookies.get('access_token');
		refresh_token = cookies.get('refresh_token');
	}

	if (access_token) {
		// If there is an access token, get the user info from the discord api
		// This makes a request everytime a protected route is loaded, to check if the token in the cookies is a valid one.
		const response = await fetch('https://discord.com/api/users/@me', {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		});
		const discord_user = await response.json();
		if (discord_user.id) {
			// user info should not be cached -- instead it's just passed to event.locals every time
			// see above on making request to the discord api for all protected routes
			return discord_user;
		}
	}

	return null;
}

/**
 *
 * @param {RequestEvent} event: the event object
 * @returns {Object|null} the discord user object
 */
export async function getDiscordUserGuilds(event) {
	const { cookies } = event;

	let access_token = cookies.get('access_token');
	let refresh_token = cookies.get('refresh_token');

	// If there is no access token but there is a refresh token, refresh the access token
	if (!access_token && refresh_token) {
		await refreshDiscordAuthCookies(event);
		access_token = cookies.get('access_token');
		refresh_token = cookies.get('refresh_token');
	}

	if (access_token) {
		// If there is an access token, get the user info from the discord api
		// This makes a request everytime a protected route is loaded, to check if the token in the cookies is a valid one.
		const response = await fetch('https://discord.com/api/users/@me/guilds', {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		});
		const discord_user_guilds = await response.json();
		if (discord_user_guilds !== undefined && discord_user_guilds.length > 0) {
			// user info should not be cached -- instead it's just passed to event.locals every time
			// see above on making request to the discord api for all protected routes
			return discord_user_guilds.map((guild) => guild.id);
		}
	}

	return null;
}

export async function getGuildInfo(id) {
	const response = await fetch(`https://discord.com/api/guilds/${id}?with_counts=true`, {
		headers: {
			Authorization: `Bot ${DISCORD_BOT_TOKEN}`
		}
	});
	const guild = await response.json();
	if (guild.id) {
		return guild;
	}
	return null;
}
