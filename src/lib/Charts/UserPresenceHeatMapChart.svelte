<script>
	import { Bar } from 'svelte-chartjs';
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	dayjs.extend(utc);
	dayjs.extend(timezone);
	console.log;
	let user_timezone;

	onMount(() => {
		user_timezone = dayjs.tz.guess();
	});

	export let current_selected_user;
	export let data;
	let offline_weighting;
	let since_date = 'ALL';

	let user_data = JSON.parse(JSON.stringify(data.status_logs_raw[current_selected_user]));
	user_data.forEach((d) => {
		d.time = dayjs.utc(d.time).tz(user_timezone).format('YYYY-MM-DD HH:mm:ss');
	});

	$: {
		user_data = JSON.parse(JSON.stringify(data.status_logs_raw[current_selected_user]));
		user_data.forEach((d) => {
			d.time = dayjs.utc(d.time).tz(user_timezone).format('YYYY-MM-DD HH:mm:ss');
		});
	}

	let first_date = user_data[0].time;
	let last_date = user_data[user_data.length - 1].time;
	let diff_days = Number(dayjs.utc(last_date).diff(dayjs.utc(first_date), 'day'));
	let diff_days_pos = Math.max(-1 * diff_days, diff_days);
	let all_dates;

	$: if (current_selected_user) {
		last_date = user_data[0].time;
		first_date = user_data[user_data.length - 1].time;
		diff_days = Number(dayjs.utc(last_date).diff(dayjs.utc(first_date), 'day'));
		diff_days_pos = Math.max(-1 * diff_days, diff_days);
	}

	$: {
		all_dates = Array(diff_days_pos)
			.fill()
			.map((_, i) => {
				return dayjs.utc(first_date).add(i, 'day').format('YYYY-MM-DD');
			});
		all_dates = all_dates.filter((d) => d !== since_date);
	}

	let graph_data = {
		labels: [],
		datasets: []
	};

	$: {
		let presence_current_user_logs = user_data.slice().reverse();

		if (since_date !== 'ALL') {
			// console.log('since date is ', since_date);
			// filter out logs before since_date
			presence_current_user_logs = presence_current_user_logs.filter((log) => {
				return dayjs.utc(log.time).isAfter(dayjs.utc(since_date), 'day');
			});
		}

		// console.log(presence_current_user_logs.length);

		// process the logs to see they their weekly presences
		const days_week = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		];
		let timeline = Array(24 * 7) // 24 hours * 7 days
			.fill()
			.reduce((acc, curr, i) => {
				const date_key = `${days_week[i % 7]} ${i % 24 < 10 ? '0' : ''}${i % 24}:00`;
				acc[date_key] = {};
				acc[date_key].online = 0;
				acc[date_key].offline = 0;
				acc[date_key].idle = 0;
				acc[date_key].dnd = 0;

				return acc;
			}, {});

		let timeline_deepcopy = JSON.parse(JSON.stringify(timeline));
		presence_current_user_logs.forEach((log, i) => {
			if (i === 0) return;

			const prev_log = presence_current_user_logs[i - 1];
			const log_rounded_time = dayjs.utc(log.time).startOf('hour').format();

			// if in same hour
			if (log_rounded_time === dayjs.utc(prev_log.time).startOf('hour').format()) {
				if (timeline_deepcopy[dayjs.utc(log_rounded_time).startOf('hour').format('dddd HH:mm')]) {
					timeline_deepcopy[dayjs.utc(log_rounded_time).startOf('hour').format('dddd HH:mm')][
						prev_log.status
					] += dayjs.utc(log.time).diff(dayjs.utc(prev_log.time), 'minute');
				}
			} else {
				// if in different hour
				const prev_log_rounded_time = dayjs
					.utc(prev_log.time)

					.startOf('hour')
					.format();
				const hour_difference = dayjs
					.utc(log_rounded_time)

					.diff(dayjs.utc(prev_log_rounded_time), 'hour');

				for (let j = 1; j < hour_difference; j++) {
					const date_key = dayjs.utc(prev_log_rounded_time).add(j, 'hour');

					if (timeline_deepcopy[date_key.format('dddd HH:mm')]) {
						timeline_deepcopy[date_key.format('dddd HH:mm')][prev_log.status] += 60;
					}
				}

				if (timeline_deepcopy[dayjs.utc(prev_log_rounded_time).format('dddd HH:mm')]) {
					timeline_deepcopy[dayjs.utc(prev_log_rounded_time).format('dddd HH:mm')][
						prev_log.status
					] += 60 - dayjs.utc(prev_log.time).minute();
				}

				if (timeline_deepcopy[dayjs.utc(log_rounded_time).format('dddd HH:mm')]) {
					timeline_deepcopy[dayjs.utc(log_rounded_time).format('dddd HH:mm')][prev_log.status] +=
						dayjs.utc(log.time).minute();
				}
			}
		});

		timeline = timeline_deepcopy; // why is this needed?

		// process the timeline so that the final value for each day-hour is proportional to online/idle/dnd vs. offline time.
		Object.values(timeline).forEach((statuses) => {
			const graph_score = Object.entries(statuses).reduce((acc, curr) => {
				if (curr[0] === 'offline') return acc;
				return acc + curr[1];
			}, 0);
			statuses.score = offline_weighting
				? Math.max(0, graph_score - statuses.offline) || 0
				: graph_score;
		});

		// console.log(timeline_deepcopy);

		let scaffolding = Array(24).fill(1);

		// create the graph
		let times = days_week.reduce((acc, curr, i) => {
			acc[curr] = Array(24).fill(0);
			Object.entries(timeline)
				.filter((d) => d[0].startsWith(curr))
				.forEach((d) => {
					const hour = parseInt(d[0].split(' ')[1].split(':')[0]);
					acc[curr][hour] = d[1].score;
				});
			return acc;
		}, {});

		const flattened = Object.values(times).flat();
		const max_time = Math.max(...flattened);
		const min_time = Math.min(...flattened);
		const max_min = Math.max(1, max_time - min_time);

		let normalized_times = Object.entries(times)
			.map(([day, time_data]) => {
				return [day, time_data.map((d) => (d - min_time) / max_min)];
			})
			.reduce((acc, curr) => {
				acc[curr[0]] = curr[1];
				return acc;
			}, {});

		graph_data = {
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
						backgroundColor: normalized_times[day].map(
							(time) => `rgba(102, 255, 102, ${time < 0.1 && time > 0 ? 0.1 : time})`
						),
						borderColor: ['rgba(102, 255, 102, 1.0)']
					};
				}
			)
		};
		// console.log(graph_data);
	}
</script>

<div class="h-[95%]">
	<div class="flex flex-wrap justify-between items-center">
		<div>
			<input
				type="checkbox"
				class="border-0 px-3 py-3 mr-2 placeholder-slate-300 text-slate-600 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring ease-linear transition-all duration-150"
				id="show_offlineweighting"
				bind:checked={offline_weighting}
			/><label for="show_offlineweighting"
				>Include offline weights <button
					class="text-xl ml-1 font-semibold"
					on:mouseenter={() => {
						document.querySelector('#hover_offline').classList.remove('hidden_offline');
					}}
					on:mouseleave={() => {
						document.querySelector('#hover_offline').classList.add('hidden_offline');
					}}>(?)</button
				></label
			>
			<p class="hidden_offline absolute z-10 bg-zinc-400 rounded px-1 mt-2" id="hover_offline">
				WARNING: This will include the time the user spent offline during a given timeslot in the
				activity score calculation. By doing this, the heatmap can more accurately show the user's
				activity during the day. However, this might not represent well users who have been offline
				extensively.
			</p>
		</div>
		<div>
			<label for="show_sincedate">Show activity after: {since_date}</label>
			<select id="show_sincedate" bind:value={since_date} class="w-fit h-fit">
				<option value="ALL">ALL</option>
				{#each all_dates as date}
					<option value={date}>
						{date}
					</option>
				{/each}
			</select>
		</div>
	</div>
	<Bar
		data={graph_data}
		options={{
			responsive: true,
			scales: {
				x: { stacked: true },
				y: {
					stacked: true,
					display: true,
					ticks: {
						callback: function (value, index, ticks) {
							if (index === 7) {
								return '';
							}
							return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
								index % 7
							];
						},
						padding: 1,
						count: 8
					}
				}
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
				},
				legend: {
					display: false
				},
				subtitle: {
					display: true,
					text: 'The y-axis shows the day of the week, while the x-axis shows the time (rounded to the hour).'
				},
				title: {
					display: true,
					text: 'User presences by day of the week and hour.'
				}
			}
		}}
	/>
</div>

<style>
	.hidden_offline {
		display: none;
	}
</style>
