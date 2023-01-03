<script>
	import { Line } from 'svelte-chartjs';

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';
	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

	export let data;
	export let data_keys;

	let data_values_online = Object.values(data.status_time_stream).reduce((acc, curr) => {
		acc.push(curr.online);
		return acc;
	}, []);
	let data_values_offline = Object.values(data.status_time_stream).reduce((acc, curr) => {
		acc.push(curr.offline);
		return acc;
	}, []);
	let data_values_dnd = Object.values(data.status_time_stream).reduce((acc, curr) => {
		acc.push(curr.dnd);
		return acc;
	}, []);
	let data_values_idle = Object.values(data.status_time_stream).reduce((acc, curr) => {
		acc.push(curr.idle);
		return acc;
	}, []);

	export let start_key_index = 0;
	export let end_key_index = data_keys.length - 1;

	$: get_line_data = () => {
		return {
			labels: data_keys.slice(start_key_index, end_key_index),
			datasets: [
				{
					label: 'Online',
					fill: true,
					lineTension: 0.3,
					backgroundColor: 'rgba(0, 204, 0, .2)',
					borderColor: 'rgb(0, 150, 50)',
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
					pointRadius: 0,
					pointHitRadius: 10,
					data: data_values_online.slice(start_key_index, end_key_index)
				},
				{
					label: 'Offline',
					fill: true,
					lineTension: 0.3,
					backgroundColor: 'rgba(184, 185, 210, .3)',
					borderColor: 'rgb(35, 26, 136)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgb(35, 26, 136)',
					pointBackgroundColor: 'rgb(255, 255, 255)',
					pointBorderWidth: 10,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgb(0, 0, 0)',
					pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
					pointHoverBorderWidth: 2,
					pointRadius: 0,
					pointHitRadius: 10,
					data: data_values_offline.slice(start_key_index, end_key_index),
					hidden: true
				},
				{
					label: 'Do Not Disturb',
					fill: true,
					lineTension: 0.3,
					backgroundColor: 'rgba(255, 99, 132, .3)',
					borderColor: 'rgb(255, 99, 132)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgb(255, 99, 132)',
					pointBackgroundColor: 'rgb(255, 255, 255)',
					pointBorderWidth: 10,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgb(0, 0, 0)',
					pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
					pointHoverBorderWidth: 2,
					pointRadius: 0,
					pointHitRadius: 10,
					data: data_values_dnd.slice(start_key_index, end_key_index)
				},
				{
					label: 'Idle',
					fill: true,
					lineTension: 0.3,
					backgroundColor: 'rgba(255, 206, 110, .3)',
					borderColor: 'rgb(255, 206, 86)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgb(255, 206, 86)',
					pointBackgroundColor: 'rgb(255, 255, 255)',
					pointBorderWidth: 10,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgb(0, 0, 0)',
					pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
					pointHoverBorderWidth: 2,
					pointRadius: 0,
					pointHitRadius: 10,
					data: data_values_idle.slice(start_key_index, end_key_index)
				}
			]
		};
	};
</script>

<Line
	data={get_line_data()}
	options={{
		maintainAspectRatio: false, //TODO: responsive charts need to have this set to false, and the container some height.. check the others?
		responsive: true,
		plugins: {
			subtitle: {
				display: true,
				text: 'Click on the categories to filter'
			}
		}
	}}
/>
