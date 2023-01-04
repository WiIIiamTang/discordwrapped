import { json } from '@sveltejs/kit';
import { getActivities } from '$lib/server/mongo.js';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
	const response = await getActivities();

	if (!response) {
		return json({ activities: {}, success: false });
	}

	return json({ activities: response, success: true });
}
