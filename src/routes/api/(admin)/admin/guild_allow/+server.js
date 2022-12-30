import { json } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
	return json({ guilds: ['123'] });
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function POST({ request }) {
	const { id } = await request.json();
	return json({ guilds: id, success: true });
}
