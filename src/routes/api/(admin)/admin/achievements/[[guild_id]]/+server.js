import { json } from '@sveltejs/kit';
import { getAchievementSettings, insertAchievement, deleteAchievement } from '$lib/server/mongo.js';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ params }) {
	if (!params.guild_id) return json({ guild: null, achievements: [], success: false });

	const guild_id = params.guild_id;
	const response = await getAchievementSettings(guild_id);

	if (response) {
		return json({
			guild: guild_id,
			achievements: response,
			success: true
		});
	}

	return json({
		guild: guild_id,
		achievements: [],
		success: false
	});
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function POST({ request }) {
	const { name, custom_name, custom_note, threshold, category_name, guild_id } =
		await request.json();
	const data = {
		name,
		custom_name,
		custom_note,
		threshold
	};
	if (category_name) data.category_name = category_name;

	const response_success = await insertAchievement(guild_id, data);

	return json({
		guild: guild_id,
		achievements: data,
		success: response_success
	});
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function DELETE({ request }) {
	const { name, custom_name, custom_note, threshold, category_name, guild_id } =
		await request.json();
	const data = {
		name,
		custom_name,
		custom_note,
		threshold
	};
	if (category_name) data.category_name = category_name;
	const response_success = await deleteAchievement(guild_id, data);

	return json({
		guild: guild_id,
		achievements: data,
		success: response_success
	});
}
