<script>
	import { PolarArea } from 'svelte-chartjs';
	export let data;
	export let popular_limit;

	$: get_activity_data = () => {
		return {
			labels: data.labels.slice(0, popular_limit),
			datasets: [
				{
					label: 'users',
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
					backgroundColor: [
						'rgba(200, 70, 74, 0.5)',
						'rgba(120, 191, 189, 0.5)',
						'rgba(255, 120, 50, 0.5)',
						'rgba(0, 204, 102, 0.5)',
						'rgba(204, 0, 255, 0.5)',
						'rgba(240, 255, 0, 0.5)',
						'rgba(0, 204, 170, 0.5)',
						'rgba(255, 20, 20, 0.5)',
						'rgba(102, 0, 200, 0.5)',
						'rgba(51, 102, 0, 0.5)',
						'rgba(102, 51, 0, 0.5)'
					],
					data: data.total_users.slice(0, popular_limit)
				}
			]
		};
	};
</script>

<PolarArea
	data={get_activity_data()}
	options={{
		responsive: true,
		plugins: {
			legend: {
				display: true
			},
			title: {
				display: true,
				text: 'Activities with the most users',
				font: {
					size: 14
				}
			},
			subtitle: {
				display: true,
				text: 'Click on the categories to filter'
			}
		},
		scales: {
			r: {
				ticks: {
					display: false
				}
			}
		},
		maintainAspectRatio: true
	}}
/>
