<script>
	import { Bar } from 'svelte-chartjs';
	export let data;
	$: without_total = Object.entries(data.count_by_channel)
		.filter(([key]) => key !== '_TOTAL')
		.sort(([, a], [, b]) => b - a);
	$: get_messages_data = () => {
		return {
			labels: without_total.map(([key]) => key).slice(0, 20),
			datasets: [
				{
					label: 'messages',
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
					data: without_total.map(([, value]) => value).slice(0, 20)
				}
			]
		};
	};
</script>

<Bar
	data={get_messages_data()}
	options={{
		responsive: true,
		plugins: {
			legend: {
				display: false
			}
		},
		maintainAspectRatio: true
	}}
/>
