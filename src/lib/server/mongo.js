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

// async function _insertOne(data) {
// 	return fetch(`${MONGO_API_ENDPOINT}/action/insertOne`, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			'api-key': MONGO_API_KEY,
// 			'Access-Control-Request-Headers': '*'
// 		},
// 		body: data
// 	});
// }

async function _updateOne(data) {
	return fetch(`${MONGO_API_ENDPOINT}/action/updateOne`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'api-key': MONGO_API_KEY,
			'Access-Control-Request-Headers': '*'
		},
		body: data
	});
}

export async function updateUserPreferences(id, settings) {
	const res = await _updateOne(
		JSON.stringify({
			collection: 'preferences',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				userid: id
			},
			update: {
				$set: {
					userid: id,
					settings: settings
				}
			},
			upsert: true
		})
	);

	const response = await res.json();

	if (!response.matchedCount && !response.upsertedId) {
		return false;
	}

	return true;
}

export async function getUserPreferences(id) {
	const res = await _findOne(
		JSON.stringify({
			collection: 'preferences',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				userid: id
			}
		})
	);

	const user = await res.json();

	if (!user.document) {
		const settings = {
			activityguildtotals: true,
			activitypopular: true,
			activitytrends: true,
			activitytopusers: true,
			interactionnetwork: true,
			interactionrelationshipchart: true,
			interactionbot: true,
			interactionvoice: true,
			messageschannel: true,
			messagesuser: true,
			messagesfrequentwords: true,
			monitoruserpresence: true,
			monitoruserpresencelog: true,
			usersactivity: true,
			usersmessages: true,
			usersachieve: true,
			experimental: false
		};
		return { userid: id, settings };
	}

	return user.document;
}

export async function getArchivedStats(date) {
	const res = await _findOne(
		JSON.stringify({
			collection: 'stats_archive',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				date: date
			}
		})
	);

	const stats = await res.json();

	if (!stats.document) {
		throw error(404, 'Stats not found');
	}

	return stats.document;
}

export async function getAchievementSettings(id) {
	const res = await _findOne(
		JSON.stringify({
			collection: 'config',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				setting: 'achievements',
				guild: id
			}
		})
	);

	const settings = await res.json();

	if (!settings.document) {
		throw error(404, 'Achievment Settings not found');
	}

	return settings.document.achievements;
}

export async function getStatus() {
	const res = await _findOne(
		JSON.stringify({
			collection: 'stats',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				category: 'status'
			}
		})
	);

	const status = await res.json();

	if (!status.document) {
		throw error(404, 'Status not found');
	}

	return status.document;
}

export async function getStatusTimeStream() {
	const res = await _findOne(
		JSON.stringify({
			collection: 'stats',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				category: 'status_time_stream'
			}
		})
	);

	const status = await res.json();

	if (!status.document) {
		throw error(404, 'Status not found');
	}

	return status.document;
}

export async function getVoiceState() {
	const res = await _findOne(
		JSON.stringify({
			collection: 'stats',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				category: 'voice_state'
			}
		})
	);

	const voiceState = await res.json();

	if (!voiceState.document) {
		throw error(404, 'Voice state not found');
	}

	return voiceState.document;
}

export async function getWords() {
	const res = await _findOne(
		JSON.stringify({
			collection: 'stats',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				category: 'words'
			}
		})
	);

	const words = await res.json();

	if (!words.document) {
		throw error(404, 'Words not found');
	}

	return words.document;
}

export async function getAudio() {
	const res = await _findOne(
		JSON.stringify({
			collection: 'stats',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				category: 'audio'
			}
		})
	);

	const audio = await res.json();

	if (!audio.document) {
		throw error(404, 'Audio not found');
	}

	return audio.document;
}

export async function getOpenai() {
	const res = await _findOne(
		JSON.stringify({
			collection: 'stats',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				category: 'openai'
			}
		})
	);

	const openai = await res.json();

	if (!openai.document) {
		throw error(404, 'OpenAI not found');
	}

	return openai.document;
}

export async function getWolfram() {
	const res = await _findOne(
		JSON.stringify({
			collection: 'stats',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				category: 'wolfram'
			}
		})
	);

	const wolfram = await res.json();

	if (!wolfram.document) {
		throw error(404, 'Wolfram not found');
	}

	return wolfram.document;
}

export async function getGenshin() {
	const res = await _findOne(
		JSON.stringify({
			collection: 'stats',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				category: 'genshin'
			}
		})
	);

	const genshin = await res.json();

	if (!genshin.document) {
		throw error(404, 'Genshin not found');
	}

	return genshin.document;
}

export async function getWaifu() {
	const res = await _findOne(
		JSON.stringify({
			collection: 'stats',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				category: 'waifu'
			}
		})
	);

	const waifu = await res.json();

	if (!waifu.document) {
		throw error(404, 'Waifu not found');
	}

	return waifu.document;
}

export async function getInteractions() {
	const res = await _findOne(
		JSON.stringify({
			collection: 'stats',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				category: 'interaction_voice'
			}
		})
	);

	const interactions = await res.json();

	if (!interactions.document) {
		throw error(404, 'Interactions not found');
	}

	return interactions.document.count_by_users.pairs;
}

export async function getTrackingTime() {
	const res = await _findOne(
		JSON.stringify({
			collection: 'stats',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				category: 'tracking_time'
			}
		})
	);

	const tracking_time = await res.json();

	if (!tracking_time.document) {
		throw error(404, 'Tracking time not found');
	}

	return tracking_time.document.tracking_since;
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

export async function getAdmins() {
	const res = await _findOne(
		JSON.stringify({
			collection: 'config',
			database: 'billbot',
			dataSource: 'Cluster0',
			filter: {
				setting: 'admins'
			}
		})
	);

	const admins = await res.json();

	if (!admins.document) {
		throw error(404, 'Admins not found');
	}

	return admins.document.ids;
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
