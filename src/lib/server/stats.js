/**
 * process data for charts
 * should be done server side ( *.server.js)
 */
import { getActivitiesExceptions } from '$lib/server/mongo.js';

export async function ObjSortByTotal(o, limit = 20) {
	const exceptions = await getActivitiesExceptions();
	return Object.entries(o)
		.sort(([, a], [, b]) => b._TOTAL - a._TOTAL)
		.filter((d) => !exceptions.includes(d[0]))
		.slice(0, limit)
		.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
}

export function processActivities(data) {
	const labels = Object.keys(data);
	const totals = labels.map((label) => data[label]._TOTAL / 60);
	return {
		labels,
		totals
	};
}
