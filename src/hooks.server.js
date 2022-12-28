import { getDiscordUser } from '$lib/server/auth.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/app')) {
		event.locals.user = await getDiscordUser(event);

		if (!event.locals.user) {
			throw redirect(303, '/');
		}
	}

	const response = await resolve(event);
	return response;
}
