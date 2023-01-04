import { json } from '@sveltejs/kit';
import { getVoice } from '$lib/server/mongo.js';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
	const response = await getVoice();

	if (!response) {
		return json({ voice: {}, success: false });
	}

	return json({ voice: response, success: true });
}
