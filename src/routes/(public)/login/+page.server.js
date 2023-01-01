import { redirect } from '@sveltejs/kit';
import {
	DISCORD_ENDPOINT,
	PROD_DISCORD_ENDPOINT,
	RUNTIME_ENV,
	PREVIEW_DISCORD_ENDPOINT
} from '$env/static/private';

export const actions = {
	default: () => {
		throw redirect(
			303,
			RUNTIME_ENV === 'PROD'
				? PROD_DISCORD_ENDPOINT
				: RUNTIME_ENV === 'DEV'
				? DISCORD_ENDPOINT
				: PREVIEW_DISCORD_ENDPOINT
		);
	}
};
