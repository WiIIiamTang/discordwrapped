<script>
	import { Bar } from 'svelte-chartjs';
	export let current_selected_user;
	export let activities;

	// console.log(activities);
	// console.log(current_selected_user);

	$: activities_user = Object.entries(activities)
		.filter(([activity_name, objects]) => {
			return Object.keys(objects).includes(current_selected_user);
		})
		.sort((a, b) => {
			return b[1][current_selected_user] - a[1][current_selected_user];
		})
		.reduce((acc, [activity_name, objects]) => {
			acc[activity_name] = objects[current_selected_user];
			return acc;
		}, {});

	$: get_chart_data = () => {
		return {
			labels: Object.keys(activities_user),
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
					data: Object.values(activities_user).map((value) => {
						return Math.round((value / 60) * 100) / 100;
					})
				}
			]
		};
	};
</script>

<Bar
	data={get_chart_data()}
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
		maintainAspectRatio: true,
		indexAxis: 'y'
	}}
/>
