import { json } from '@sveltejs/kit';
import {
	insertGuildAllowlist,
	getGuildAllowlist,
	deleteGuildAllowlist
} from '$lib/server/mongo.js';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
	const response = await getGuildAllowlist();
	return json({
		guilds: response,
		success: true // true when getGuildAllowlist does not throw an error.
	});
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function POST({ request }) {
	const { id } = await request.json();
	const response_success = await insertGuildAllowlist(id);
	return json({ guilds: id, success: response_success });
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function DELETE({ request }) {
	const { id } = await request.json();
	const response_success = await deleteGuildAllowlist(id);
	return json({ guilds: id, success: response_success });
}
