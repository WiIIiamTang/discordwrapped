import { MONGO_API_KEY, MONGO_API_ENDPOINT } from '$env/static/private';
import { error } from '@sveltejs/kit';

async function _findOne(data) {
	return fetch(`${MONGO_API_ENDPOINT}/action/findOne`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'api-key': MONGO_API_KEY,
			'Access-Control-Request-Headers': '*'
		},
		body: data
	});
}

export async function getMessages() {
	const res = await _findOne(
		JSON.stringify({
			collection: 'stats',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				category: 'messages'
			}
		})
	);

	const messages = await res.json();

	if (!messages.document) {
		throw error(404, 'Messages not found');
	}

	return messages.document;
}

export async function getVoice() {
	const res = await _findOne(
		JSON.stringify({
			collection: 'stats',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				category: 'voice'
			}
		})
	);

	const voice = await res.json();

	if (!voice.document) {
		throw error(404, 'Voice not found');
	}

	return voice.document;
}

export async function getActivitiesExceptions() {
	const res = await _findOne(
		JSON.stringify({
			collection: 'config',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				setting: 'activity_exclusion'
			}
		})
	);

	const exceptions = await res.json();

	if (!exceptions.document) {
		throw error(404, 'Activities exceptions not found');
	}

	return exceptions.document.activities;
}

export async function getActivities() {
	const res = await _findOne(
		JSON.stringify({
			collection: 'stats',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				category: 'activity'
			}
		})
	);

	const activities = await res.json();

	if (!activities.document) {
		throw error(404, 'Activities not found');
	}

	return activities.document.count_by_users;
}

export async function getGuildAllowlist() {
	const res = await _findOne(
		JSON.stringify({
			collection: 'config',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				setting: 'guild_allowlist'
			}
		})
	);

	const guild_allowlist = await res.json();

	if (!guild_allowlist.document) {
		throw error(404, 'Guild allowlist not found');
	}

	return guild_allowlist.document.ids;
}

export async function getMemberAllowlist() {
	const res = await _findOne(
		JSON.stringify({
			collection: 'config',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				setting: 'member_allowlist'
			}
		})
	);

	const member_allowlist = await res.json();

	if (!member_allowlist.document) {
		throw error(404, 'Member allowlist not found');
	}

	return member_allowlist.document.ids;
}
