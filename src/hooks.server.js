import { getDiscordUser } from '$lib/server/auth.js';
import { getMemberAllowlist } from './lib/server/mongo.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/app')) {
		event.locals.user = await getDiscordUser(event);

		if (!event.locals.user) {
			throw redirect(303, '/login');
		} else {
			const member_allowlist = await getMemberAllowlist();
			if (!member_allowlist.includes(event.locals.user.id)) {
				throw redirect(302, '/unauthorized');
			}
		}
	} else if (event.url.pathname.startsWith('/unauthorized')) {
		event.locals.user = null;
		event.cookies.delete('access_token', { path: '/' });
		event.cookies.delete('refresh_token', { path: '/' });
	}

	const response = await resolve(event);
	return response;
}
