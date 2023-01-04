import { json } from '@sveltejs/kit';
import { getArchivedStats, getAllCurrentStats } from '$lib/server/mongo.js';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ params }) {
	if (!params.date) {
		const response_all_stats = await getAllCurrentStats();

		if (!response_all_stats) {
			return json({ archive: {}, date: 'current', success: false });
		}

		return json({ archive: response_all_stats, date: 'current', success: true });
	}

	const response = await getArchivedStats(params.date);

	if (!response) {
		return json({ archive: {}, date: params.date, success: false });
	}

	return json({ archive: response, date: params.date, success: true });
}
