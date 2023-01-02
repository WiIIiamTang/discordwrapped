/**
 * process data for charts
 * should be done server side ( *.server.js)
 */
import { getActivitiesExceptions } from '$lib/server/mongo.js';
import { stopwords } from '$lib/server/stopwords.js';
import { getUserById } from '$lib/server/auth.js';

export async function processWords(data) {
	// count freq of all words together
	const combined = Object.values(data.count_by_users).reduce((acc, cur) => {
		Object.keys(cur).forEach((word) => {
			if (acc[word]) {
				acc[word] += cur[word];
			} else {
				acc[word] = cur[word];
			}
		});
		return acc;
	}, {});

	const sorted = await Promise.all(
		Object.entries(combined)
			.sort((a, b) => b[1] - a[1])
			.filter((word) => !stopwords.includes(word[0]))
			.slice(0, 100)
			.map(async (word) =>
				word[0].length === 18 && !isNaN(word[0])
					? [`@${(await getUserById(word[0])).username}`, word[1]]
					: word
			)
	);
	return sorted;
}

export function processBotInteractions(data) {
	/**
	 * data is an object containing the bot commands. so far,
	 * genshin, waifu, wolfram, openai, and audio commands.
	 */

	// get the total number of commands for each category
	const totals = Object.keys(data).reduce((acc, cur) => {
		acc[cur] = data[cur].count_by_channel._TOTAL;
		return acc;
	}, {});

	return totals;
}

export function processInteractions(data) {
	const graph_data = { nodes: [], links: [] };

	// flatten the pairs objects in data
	const flattened = data.reduce((acc, cur) => {
		const { user1, user2, time } = cur;
		acc.push({ id: user1, value: Math.round((time / 60 + Number.EPSILON) * 100) / 100 });
		acc.push({ id: user2, value: Math.round((time / 60 + Number.EPSILON) * 100) / 100 });
		return acc;
	}, []);

	// combine duplicate objects by id in flattened array
	// There shouldn't be any duplicates but just in case
	const combined = flattened.reduce((acc, cur) => {
		const { id, value } = cur;
		const existing = acc.find((d) => d.id === id);
		if (existing) {
			existing.value += value;
		} else {
			acc.push({ id, value });
		}
		return acc;
	}, []);

	// for nodes, take the total hours spent from the combined array for an id.
	// group is used for the color of the node
	graph_data.nodes = combined.map((d) => ({
		id: d.id,
		group: 0,
		details: {
			total_hours_spent: combined
				.filter((p) => p.id === d.id)
				.reduce((acc, cur) => acc + cur.value, 0)
		}
	}));

	const max_hours = Math.max(...graph_data.nodes.map((d) => d.details.total_hours_spent));
	const min_hours = Math.min(...graph_data.nodes.map((d) => d.details.total_hours_spent));

	// assign a group to all nodes based on the percentile of their total hours spent
	graph_data.nodes = graph_data.nodes.map((d) => {
		const percentile = (d.details.total_hours_spent - min_hours) / (max_hours - min_hours);
		if (percentile < 0.1) {
			d.group = 3;
		} else if (percentile < 0.5) {
			d.group = 0;
		} else if (percentile < 0.85) {
			d.group = 2;
		} else {
			d.group = 1;
		}
		return d;
	});

	// filter out users who have less than 1 hour of interaction
	graph_data.nodes = graph_data.nodes.filter((d) => d.details.total_hours_spent > 1);

	// for links, take the values from the original data
	graph_data.links = data.map((d) => ({
		source: d.user1,
		target: d.user2,
		value: d.time
	}));

	// make sure the links are only between nodes that exist in graph_data.nodes
	graph_data.links = graph_data.links.filter((d) => {
		const source = graph_data.nodes.find((p) => p.id === d.source);
		const target = graph_data.nodes.find((p) => p.id === d.target);
		return source && target;
	});

	return graph_data;
}

export async function ObjSortBy(o, limit = 20, key = '_TOTAL') {
	const exceptions = await getActivitiesExceptions();
	return Object.entries(o)
		.sort(([, a], [, b]) => (key ? b[key] - a[key] : 0))
		.filter((d) => !exceptions.includes(d[0]))
		.slice(0, limit)
		.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
}

export function processActivitiesPopular(data) {
	// this just counts how many users are in each activity, excluding the _TOTAL key
	const labels = Object.keys(data);
	const total_users = labels.map((label) => {
		return Object.keys(data[label]).length - 1;
	});
	// sort by total users
	const sorted_total_users = total_users.sort((a, b) => b - a);
	const sorted_labels = labels.sort(
		(a, b) => Object.keys(data[b]).length - Object.keys(data[a]).length
	);

	return {
		labels: sorted_labels,
		total_users: sorted_total_users
	};
}

export function processActivitiesUserTable(data) {
	// for each key, convert the user hours to a percentage of the total
	const percents = Object.keys(data).reduce((acc, cur) => {
		const _TOTAL = data[cur]._TOTAL;
		acc[cur] = Object.keys(data[cur]).reduce((acc2, cur2) => {
			if (cur2 !== '_TOTAL') {
				acc2[cur2] = Math.round((data[cur][cur2] / _TOTAL) * 100);
			}
			return acc2;
		}, {});
		return acc;
	}, {});

	// assign ranks to each user based on percentage
	const ranks = Object.keys(data).reduce((acc, cur) => {
		acc[cur] = Object.keys(data[cur]).reduce((acc2, cur2) => {
			if (cur2 !== '_TOTAL') {
				acc2[cur2] = {
					percent: percents[cur][cur2],
					rank: Object.keys(percents[cur]).filter((d) => data[cur][d] > data[cur][cur2]).length + 1
				};
			}
			return acc2;
		}, {});
		return acc;
	}, {});

	return { ranks, data };
}

export function processActivitiesTrends(data, archive_data) {
	// get the difference between TOTALS for each activity
	const diffs = {};

	Object.keys(data).forEach((label) => {
		const current = data[label]._TOTAL;
		const archive = archive_data.activity.count_by_users[label]
			? archive_data.activity.count_by_users[label]._TOTAL
			: 0;
		diffs[label] = current - archive;
	});

	// take the top
	const sorted = Object.entries(diffs)
		.sort(([, a], [, b]) => b - a)
		.slice(0, 5)
		.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

	return {
		labels: Object.keys(sorted),
		diffs: Object.values(sorted)
	};
}

export function processActivities(data) {
	const labels = Object.keys(data);
	const totals = labels.map((label) => data[label]._TOTAL / 60);
	return {
		labels,
		totals
	};
}
