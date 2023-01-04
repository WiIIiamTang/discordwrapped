import { json } from '@sveltejs/kit';
import { getStatus } from '$lib/server/mongo.js';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
	const response = await getStatus();

	if (!response) {
		return json({ status: {}, success: false });
	}

	return json({ status: response, success: true });
}
