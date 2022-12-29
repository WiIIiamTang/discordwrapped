import { MONGO_API_KEY, MONGO_API_ENDPOINT } from '$env/static/private';
import { error } from '@sveltejs/kit';

export async function getMemberAllowlist() {
	const data = JSON.stringify({
		collection: 'config',
		database: 'billbot',
		dataSource: 'Cluster0',
		filter: {
			setting: 'member_allowlist'
		}
	});

	const res = await fetch(`${MONGO_API_ENDPOINT}/action/findOne`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'api-key': MONGO_API_KEY,
			'Access-Control-Request-Headers': '*'
		},
		body: data
	});

	const member_allowlist = await res.json();

	if (!member_allowlist.document) {
		throw error(404, 'Member allowlist not found');
	}

	return member_allowlist.document.ids;
}
