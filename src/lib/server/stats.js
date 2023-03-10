/**
 * process data for charts
 * should be done server side ( *.server.js)
 */
import { getActivitiesExceptions } from '$lib/server/mongo.js';
import { stopwords } from '$lib/server/stopwords.js';
import { getUserById } from '$lib/server/auth.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export function processStatusLogsRaw(data) {
	// reverse each array
	Object.values(data).forEach((userlog) => {
		userlog.reverse();
	});

	return data;
}

export function processStatusLogs(data, startdate, minutes = false) {
	const user_logs = data.count_by_users;
	const tracking_since_date = dayjs.utc(startdate).add(2, 'day'); // add 2 days because the first days were not complete
	const today_date = dayjs.utc();
	let timeline;

	if (!minutes) {
		timeline = Array(24 * today_date.diff(tracking_since_date, 'day'))
			.fill()
			.reduce((acc, curr, i) => {
				const date_key = tracking_since_date.add(i, 'hour').format();
				acc[date_key] = {};
				acc[date_key].online = 0;
				acc[date_key].offline = 0;
				acc[date_key].idle = 0;
				acc[date_key].dnd = 0;

				return acc;
			}, {});

		let timeline_deepcopy = JSON.parse(JSON.stringify(timeline));
		const timeline_deepcopy2 = JSON.parse(JSON.stringify(timeline));

		Object.values(user_logs).forEach((userlog) => {
			// update the timeline hashmap with the user_logs data
			const counter = {};
			let rounded_date_key;

			userlog.forEach((log, i) => {
				// const date_key = dayjs.utc(log.time);
				// round the date_key to the nearest hour, because the timeline is hourly
				// rounded_date_key = date_key.startOf('hour').format();
				// if (!counter[rounded_date_key]) {
				// 	counter[rounded_date_key] = {
				// 		online: 0,
				// 		offline: 0,
				// 		idle: 0,
				// 		dnd: 0
				// 	};
				// }

				// TODO: skip log if its older than a month??

				// counter[rounded_date_key][log.status] += 1;
				if (i === 0) return;

				const prev_log = userlog[i - 1];
				const log_rounded_time = dayjs.utc(log.time).startOf('hour').format();

				// if in same hour
				if (log_rounded_time === dayjs.utc(prev_log.time).startOf('hour').format()) {
					if (timeline_deepcopy[log_rounded_time]) {
						timeline_deepcopy[log_rounded_time][prev_log.status] += dayjs
							.utc(log.time)
							.diff(dayjs.utc(prev_log.time), 'minute');
					}
				} else {
					// if in different hour
					const prev_log_rounded_time = dayjs.utc(prev_log.time).startOf('hour').format();
					const hour_difference = dayjs
						.utc(log_rounded_time)
						.diff(dayjs.utc(prev_log_rounded_time), 'hour');

					for (let j = 1; j < hour_difference; j++) {
						const date_key = dayjs.utc(prev_log_rounded_time).add(j, 'hour').format();

						if (timeline_deepcopy[date_key]) {
							timeline_deepcopy[date_key][prev_log.status] += 60;
						}
					}

					if (timeline_deepcopy[prev_log_rounded_time]) {
						timeline_deepcopy[prev_log_rounded_time][prev_log.status] +=
							60 - dayjs.utc(prev_log.time).minute();
					}

					if (timeline_deepcopy[log_rounded_time]) {
						timeline_deepcopy[log_rounded_time][prev_log.status] += dayjs.utc(log.time).minute();
					}
				}
			});

			// Since users can have multiple statuses change within the same hour, we aggregate the statuses
			// and pick the most common status to set 1 for that hour...

			// This is not acutally accurate since the user could have been online for 8 minutes and offline for 50 minutes
			// and switch between online/dnd alot.
			// Object.entries(timeline).forEach(([date_key]) => {
			// 	if (!counter[date_key]) {
			// 		timeline[date_key].offline += 1;
			// 		return;
			// 	}

			// 	// if everything in counter statuses is	0, then set to offline
			// 	if (Object.values(counter[date_key]).every((val) => val === 0)) {
			// 		timeline[date_key].offline += 1;
			// 	} else {
			// 		const max = Math.max(...Object.values(counter[date_key]));
			// 		const status = Object.keys(counter[date_key]).find(
			// 			(key) => counter[date_key][key] === max
			// 		);

			// 		timeline[date_key][status] += 1;
			// 	}
			// });

			// go through the timeline and take the status with most minutes and set it as the status for that hour
			Object.values(timeline_deepcopy).forEach((status_obj) => {
				const most_minutes = Math.max(...Object.values(status_obj));
				// if all statuses are 0, set offline to 1
				if (most_minutes === 0) {
					status_obj.offline = 1;
					return;
				}
				const most_minutes_status = Object.keys(status_obj).find(
					(key) => status_obj[key] === most_minutes
				);
				Object.keys(status_obj).forEach((key) => {
					status_obj[key] = key === most_minutes_status ? 1 : 0;
				});
			});

			// copy timeline_deepcopy values to timeline
			Object.entries(timeline_deepcopy).forEach(([date_key, status_obj]) => {
				Object.entries(status_obj).forEach(([status, count]) => {
					timeline[date_key][status] += count;
				});
			});

			// reset timeline_deepcopy
			timeline_deepcopy = JSON.parse(JSON.stringify(timeline_deepcopy2));
		});
	}
	return timeline;
}

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
		// .map(async (word) =>
		// 	word[0].length === 18 && !isNaN(word[0])
		// 		? [`@${(await getUserById(word[0])).username}`, word[1]]
		// 		: word
		// )
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
