<script>
	import { Bar } from 'svelte-chartjs';

	let scaffolding = Array(24).fill(1);

	let times = {
		Sunday: [
			200, 100, 300, 400, 500, 600, 800, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
			100, 100, 100, 100, 900
		],
		Monday: [
			100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
			100, 100, 100, 100, 100
		],
		Tuesday: [
			100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
			100, 100, 100, 100, 100
		],
		Wednesday: [
			100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
			100, 100, 100, 100, 100
		],
		Thursday: [
			100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
			100, 100, 100, 100, 100
		],
		Friday: [
			100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
			100, 100, 100, 100, 100
		],
		Saturday: [
			100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
			100, 100, 100, 100, 100
		]
	};

	const flattened = Object.values(times).flat();
	const max_time = Math.max(...flattened);
	const min_time = Math.min(...flattened);
	const max_min = max_time - min_time;

	let normalized_times = Object.entries(times)
		.map(([day, time_data]) => {
			return [day, time_data.map((d) => (d - min_time) / max_min)];
		})
		.reduce((acc, curr) => {
			acc[curr[0]] = curr[1];
			return acc;
		}, {});

	console.log(normalized_times);

	let data = {
		labels: Array(24)
			.fill()
			.map((_, i) => `${i}:00`),
		datasets: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
			(day) => {
				return {
					label: day,
					barPercentage: 1.0,
					categoryPercentage: 1.0,
					data: scaffolding,
					backgroundColor: normalized_times[day].map((time) => `rgba(102, 255, 102, ${time})`),
					borderColor: ['rgba(102, 255, 102, 0.1)']
					// borderColor: [
					// 	'rgba(255, 134, 159, 1)',
					// 	'rgba(98,  182, 239, 1)',
					// 	'rgba(255, 218, 128, 1)',
					// 	'rgba(113, 205, 205, 1)',
					// 	'rgba(170, 128, 252, 1)',
					// 	'rgba(255, 177, 101, 1)'
					// ]
				};
			}
		)
	};
</script>

<Bar
	{data}
	options={{
		responsive: true,
		scales: {
			x: { stacked: true },
			y: { stacked: true, display: false }
		},
		maintainAspectRatio: false,
		plugins: {
			tooltip: {
				callbacks: {
					label: function (tooltipItems) {
						// console.log(tooltipItems);
						return tooltipItems.dataset.label;
					}
				}
			}
		}
	}}
/>
