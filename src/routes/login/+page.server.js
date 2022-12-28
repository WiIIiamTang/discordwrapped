import { redirect } from '@sveltejs/kit';
import { DISCORD_ENDPOINT } from '$env/static/private';

export const actions = {
	default: () => {
		throw redirect(303, DISCORD_ENDPOINT);
	}
};
