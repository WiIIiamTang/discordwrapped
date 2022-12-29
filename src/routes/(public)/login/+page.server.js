import { redirect } from '@sveltejs/kit';
import { DISCORD_ENDPOINT, PROD_DISCORD_ENDPOINT, RUNTIME_ENV } from '$env/static/private';

export const actions = {
	default: () => {
		throw redirect(303, RUNTIME_ENV === 'PROD' ? PROD_DISCORD_ENDPOINT : DISCORD_ENDPOINT);
	}
};
