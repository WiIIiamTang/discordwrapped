<script>
	import { Bar } from 'svelte-chartjs';
	export let data;
	export let activity_limit;

	$: get_activity_data = () => {
		return {
			labels: data.labels.slice(0, activity_limit),
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
					data: data.totals.slice(0, activity_limit)
				}
			]
		};
	};
</script>

<Bar
	data={get_activity_data()}
	options={{
		responsive: true,
		plugins: {
			legend: {
				display: false
			},
			title: {
				display: true,
				text: 'Culmulative hours spent on activities'
			}
		},
		maintainAspectRatio: true
	}}
/>
