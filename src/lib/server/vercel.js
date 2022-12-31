import { VERCEL_ACCESS_TOKEN } from '$env/static/private';
import { error } from '@sveltejs/kit';

export async function getLatestDeploymentDate() {
	const res = await fetch('https://api.vercel.com/v6/deployments?limit=20&app=discordwrapped', {
		headers: {
			Authorization: `Bearer ${VERCEL_ACCESS_TOKEN}`
		},
		method: 'GET'
	});

	const deployments = await res.json();
	if (!deployments.deployments) {
		throw error(404, 'Deployments not found');
	}

	// sort by ready timestamp (most recent first)
	deployments.deployments.sort((a, b) => {
		return b.ready - a.ready;
	});

	// convert the timestamp to a date
	const date = new Date(deployments.deployments[0].ready)
		.toLocaleDateString('en-CA', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		})
		.replaceAll('/', '.')
		.replaceAll('-', '.');

	return date;
}
