import { json } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
	return json({ members: ['123'] });
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function POST({ request }) {
	const { id } = await request.json();
	return json({ guilds: id, success: true });
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function DELETE({ request }) {
	const { id } = await request.json();
	return json({ guilds: id, success: true });
}
