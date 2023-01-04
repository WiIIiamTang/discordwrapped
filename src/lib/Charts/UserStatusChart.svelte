<script>
	import { Doughnut } from 'svelte-chartjs';
	export let current_selected_user;
	export let status;
	$: status_total =
		current_selected_user && status.count_by_users[current_selected_user]
			? Object.values(status.count_by_users[current_selected_user]).reduce((acc, value) => {
					return acc + value;
			  }, 0)
			: 1;

	$: data =
		current_selected_user && status.count_by_users[current_selected_user]
			? {
					labels: ['dnd', 'online', 'idle', 'offline'],
					datasets: [
						{
							label: '%',
							data: [
								status.count_by_users[current_selected_user].dnd
									? (status.count_by_users[current_selected_user].dnd / status_total) * 100
									: 0 / status_total,

								status.count_by_users[current_selected_user].online
									? (status.count_by_users[current_selected_user].online / status_total) * 100
									: 0 / status_total,

								status.count_by_users[current_selected_user].idle
									? (status.count_by_users[current_selected_user].idle / status_total) * 100
									: 0 / status_total,

								status.count_by_users[current_selected_user].offline
									? (status.count_by_users[current_selected_user].offline / status_total) * 100
									: 0 / status_total
							],
							backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1'],
							hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5']
						}
					]
			  }
			: {};
</script>

<Doughnut
	{data}
	options={{
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true
			},
			subtitle: {
				display: true,
				text: 'Click on the categories to filter'
			},
			title: {
				display: true,
				text: `Status proportions for ${current_selected_user}`
			}
		}
	}}
/>
