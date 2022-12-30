import { PUBLIC_DEV_HOST, PUBLIC_PROD_HOST, PUBLIC_RUNTIME_ENV } from '$env/static/public';

/**
 * @type {import('./$types').PageLoad}
 */
export async function load() {
	const host = PUBLIC_RUNTIME_ENV === 'DEV' ? PUBLIC_DEV_HOST : PUBLIC_PROD_HOST;
	return {
		guilds_allow: await fetch(`${host}/api/admin/guild_allow`).then((res) => res.json()),
		members_allow: await fetch(`${host}/api/admin/member_allow`).then((res) => res.json())
	};
}
