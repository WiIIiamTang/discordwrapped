/**
 * process data for charts
 * should be done server side ( *.server.js)
 */
import { getActivitiesExceptions } from '$lib/server/mongo.js';

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
