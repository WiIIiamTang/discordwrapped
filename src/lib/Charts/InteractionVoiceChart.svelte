<script>
	import { Bar } from 'svelte-chartjs';
	export let voicedata;

	// TODO: move to server/stats.js

	let counts = voicedata.count_by_channel;
	let sorted_counts = Object.entries(counts)
		.sort(([, a], [, b]) => b - a)
		.filter(([k, v]) => k !== '_TOTAL')
		.slice(0, 5)
		.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

	let channels = Object.keys(sorted_counts);
	let totals = Object.keys(sorted_counts).map((key) => sorted_counts[key] / 60);

	$: get_voice_data = () => {
		return {
			labels: channels,
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
					data: totals
				}
			]
		};
	};
</script>

<Bar
	data={get_voice_data()}
	options={{
		responsive: true,
		plugins: {
			legend: {
				display: false
			},
			title: {
				display: true,
				text: 'Culmulative hours spent in voice channels'
			}
		},
		maintainAspectRatio: true
	}}
/>
