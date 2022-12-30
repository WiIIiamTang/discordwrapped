<script>
	import { Radar } from 'svelte-chartjs';
	let data = {
		labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
		datasets: [
			{
				label: 'Number of times used',
				backgroundColor: 'rgba(194, 116, 161, 0.5)',
				borderColor: 'rgb(194, 116, 161)',
				tension: 0.2,
				// black lines
				pointBackgroundColor: 'rgb(0, 0, 0)',
				data: [65, 59, 90, 81, 56, 55, 40]
			}
		]
	};
	export let genshin;
	export let waifu;
	export let wolfram;
	export let openai;
	export let audio;
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
					color: 'black'
				},
				border: {
					color: 'black'
				},
				angleLines: {
					color: 'black'
				},
				pointLabels: {
					color: 'black'
				},
				ticks: {
					color: 'red',
					display: false,
					textStrokeColor: 'black'
				}
			}
		}
	}}
/>
