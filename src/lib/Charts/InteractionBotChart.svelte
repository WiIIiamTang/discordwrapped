<script>
	import { Radar } from 'svelte-chartjs';

	export let botInteractions;

	let data = {
		labels: Object.keys(botInteractions),
		datasets: [
			{
				label: 'Number of times used',
				backgroundColor: 'rgba(194, 116, 161, 0.5)',
				borderColor: 'rgb(194, 116, 161)',
				tension: 0.5,
				pointHoverRadius: 10,
				pointHitRadius: 10,
				pointHoverBackgroundColor: 'rgb(200, 150, 175)',
				pointRadius: 6,
				// black lines
				pointBackgroundColor: 'rgb(0, 0, 0)',
				data: Object.values(botInteractions)
			}
		]
	};

	let data_max = Math.max(...Object.values(botInteractions));
</script>

<Radar
	{data}
	options={{
		responsive: true,
		plugins: {
			legend: {
				display: false
			}
		},
		scales: {
			r: {
				beginAtZero: true,
				grid: {
					color: 'darkgrey'
				},
				border: {
					color: 'darkgrey'
				},
				angleLines: {
					color: 'darkgrey'
				},
				pointLabels: {
					color: 'black',
					font: {
						size: 14
					}
				},
				ticks: {
					color: 'black',
					display: true,
					textStrokeColor: 'black',
					backdropColor: 'rgba(255, 255, 255, 0.2)'
				},
				max: Math.ceil(data_max / 5) * 5 + 5
			}
		}
	}}
/>
