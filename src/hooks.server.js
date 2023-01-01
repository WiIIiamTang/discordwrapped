import { getDiscordUser, getDiscordUserGuilds } from '$lib/server/auth.js';
import { getMemberAllowlist, getGuildAllowlist, getAdmins } from '$lib/server/mongo.js';
import { ratelimit } from '$lib/server/ratelimit.js';
import { redis } from '$lib/server/redis.js';
import { redirect, error } from '@sveltejs/kit';
import { RUNTIME_ENV } from '$env/static/private';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/app') || event.url.pathname.startsWith('/api/data')) {
		event.locals.user = await getDiscordUser(event);
		const guild_allowlist = await getGuildAllowlist();
		event.locals.bot_guilds = guild_allowlist;

		if (!event.locals.user) {
			throw redirect(303, '/login');
		} else {
			const member_allowlist = await getMemberAllowlist();
			const member_guilds = await getDiscordUserGuilds(event);
			if (
				member_allowlist &&
				member_guilds &&
				(!member_allowlist.includes(event.locals.user.id) ||
					!member_guilds.some((guild) => guild_allowlist.includes(guild)))
			) {
				throw redirect(302, '/unauthorized');
			}
		}
	} else if (event.url.pathname.startsWith('/unauthorized')) {
		event.locals.user = null;
		event.cookies.delete('access_token', { path: '/' });
		event.cookies.delete('refresh_token', { path: '/' });
	} else if (
		event.url.pathname.startsWith('/api/admin') ||
		event.url.pathname.startsWith('/manage')
	) {
		event.locals.user = await getDiscordUser(event);
		const admins = await getAdmins();
		if (
			!admins ||
			!event.locals.user ||
			!admins.includes(event.locals.user.id) ||
			!event.cookies.get('access_token')
		) {
			throw redirect(307, '/unauthorized_admin');
		}
	}

	if (event.cookies.get('access_token') || event.cookies.get('refresh_token')) {
		event.locals.hasCookies = true;
	}

	if (event.url.pathname.startsWith('/api/data')) {
		if (RUNTIME_ENV !== 'PREVIEW') {
			const rate_res = await ratelimit(redis, event);
			if (!rate_res) {
				throw error(429, 'rate limited');
			}
		} else {
			throw error(403, 'data api not available in preview');
		}
	}

	if (event.url.pathname.startsWith('/api/admin')) {
		const rate_res = await ratelimit(redis, event, 20);
		if (!rate_res) {
			throw error(429, 'rate limited');
		}
	}

	const response = await resolve(event);
	return response;
}
