import { json } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ params }) {
	if (!params.date) {
		return json({ archive: 'archive', date: 'up_to_date' });
	}

	return json({ archive: 'archive', date: params.date });
}
