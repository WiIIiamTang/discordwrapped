import { json } from '@sveltejs/kit';
import { getMessages } from '$lib/server/mongo.js';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
	const response = await getMessages();

	if (!response) {
		return json({ messages: {}, success: false });
	}

	return json({ messages: response, success: true });
}
