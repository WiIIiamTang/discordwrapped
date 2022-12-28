import { redirect } from '@sveltejs/kit';
import { getDiscordAuth, setDiscordAuthCookies } from '$lib/server/auth.js';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ url, cookies }) {
	// If a user tries to login to discord for the first time, they will be redirected to this page.
	// The cookies need to be set at this point, before passing auth control to the hooks.
	const data = await getDiscordAuth(url.searchParams.get('code'), false);
	await setDiscordAuthCookies({ cookies, ...data });

	throw redirect(302, '/app');
}
