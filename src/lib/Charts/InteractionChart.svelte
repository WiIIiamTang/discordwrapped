<script>
	import { Bar } from 'svelte-chartjs';
	export let data;
	export let interaction_limit;
	export let current_user;

	let users = data.nodes.map((node) => node.id);
	let links = {};
	users.forEach((u) => {
		// add each of this users links to the links object
		links[u] = data.links
			.filter((l) => l.source == u || l.target == u)
			.map((l) => {
				return l.source == u
					? { user: l.target, value: l.value / 60 }
					: { user: l.source, value: l.value / 60 };
			})
			// sort by value, descending
			.sort((a, b) => b.value - a.value);
	});

	links[''] = [];

	$: get_interaction_data = () => {
		return {
			// the labels is just the keys for the current_user in links
			labels: links[current_user].map((l) => l.user).slice(0, interaction_limit),
			datasets: [
				{
					label: 'hours',
					fill: true,
					lineTension: 0.3,
					backgroundColor: 'rgba(225, 204,230, .9)',
					borderColor: 'rgb(205, 130, 158)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgb(205, 130,1 58)',
					pointBackgroundColor: 'rgb(255, 255, 255)',
					pointBorderWidth: 10,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgb(0, 0, 0)',
					pointHoverBorderColor: 'rgba(220, 220, 220,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					// the data is just the values for the current_user in links
					data: links[current_user].map((l) => l.value).slice(0, interaction_limit)
				}
			]
		};
	};
</script>

<Bar
	data={get_interaction_data()}
	options={{
		responsive: true,
		plugins: {
			legend: {
				display: false
			},
			title: {
				display: true,
				text: `Top user interactions for ${current_user}`
			}
		},
		maintainAspectRatio: true
	}}
/>
