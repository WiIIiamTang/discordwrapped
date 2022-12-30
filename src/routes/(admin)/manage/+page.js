/**
 * @type {import('./$types').PageLoad}
 */
export async function load({ fetch }) {
	return {
		guilds_allow: await fetch(`/api/admin/guild_allow`).then((res) => res.json()),
		members_allow: await fetch(`/api/admin/member_allow`).then((res) => res.json())
	};
}
