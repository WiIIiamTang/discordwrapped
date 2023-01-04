import { json } from '@sveltejs/kit';
import {
	insertMemberAllowlist,
	getMemberAllowlist,
	deleteMemberAllowlist
} from '$lib/server/mongo.js';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
	const response = await getMemberAllowlist();
	return json({
		members: response,
		success: true // true when getMemberAllowlist does not throw an error.
	});
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function POST({ request }) {
	const { id } = await request.json();
	const response_success = await insertMemberAllowlist(id);
	return json({ members: id, success: response_success });
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function DELETE({ request }) {
	const { id } = await request.json();
	const response_success = await deleteMemberAllowlist(id);
	return json({ members: id, success: response_success });
}
