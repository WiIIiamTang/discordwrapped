<script>
	import MonitorTimelineChart from '$lib/Charts/MonitorTimelineChart.svelte';
	import CardPresenceLogs from '$lib/Cards/CardPresenceLogs.svelte';
	import {
		Chart as ChartJS,
		Title,
		SubTitle,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		Filler,
		BarElement,
		RadialLinearScale,
		ArcElement
	} from 'chart.js';

	ChartJS.register(
		Title,
		SubTitle,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		Filler,
		BarElement,
		RadialLinearScale,
		ArcElement
	);
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import tz from 'dayjs/plugin/timezone';
	import { onMount } from 'svelte';
	dayjs.extend(utc);
	dayjs.extend(tz);

	export let data;

	let timezone;

	// convert the keys dates.
	// TODO: select timezone from user preferences?
	onMount(() => {
		timezone = 'America/New_York';
	});

	let data_keys = Object.keys(data.status_time_stream).map((key) => {
		return dayjs.utc(dayjs(key)).tz(timezone).format('MM/DD/YYYY HH:mm');
	});

	let start_key_index = 0;
	let end_key_index = Object.keys(data_keys).length - 1;

	let selected_user = '';
	let view_mode = 'all';
</script>

<div class="pb-6">
	<div class="flex flex-wrap">
		{#if data.userPreferences.settings.monitoruserpresence}
			<div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
				<div
					class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-300"
				>
					<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
						<div class="flex flex-wrap items-center">
							<div class="relative w-full max-w-full flex-grow flex-1">
								<h6 class="uppercase text-black-100 mb-1 text-xs font-semibold">Monitoring</h6>
								<h2 class="text-black text-xl font-semibold">Timeline of user presences</h2>
								<p class="text-sm">Approximations rounded to the hour.</p>
							</div>
						</div>
					</div>
					<div class="flex flex-wrap justify-center">
						<div class="w-full xl:w-6/12 mt-2 flex justify-center items-center">
							<label for="start" class="mr-1">Start:</label>
							<select id="start" bind:value={start_key_index}>
								{#each data_keys as key, i}
									{#if i % 24 == 0}
										<option value={i}>{key.replace('00:00', '').trim()}</option>
									{/if}
								{/each}
							</select>
						</div>

						<div class="w-full xl:w-6/12 mt-2 flex justify-center items-center">
							<label for="end" class="mr-1">End: </label>
							<select id="end" bind:value={end_key_index}>
								{#each data_keys as key, i}
									{#if i % 24 == 0}
										<option value={i}>{key.replace('00:00', '').trim()}</option>
									{/if}
								{/each}
								{#if (data_keys.length - 1) % 24 !== 0}
									<option value={data_keys.length - 1}>{data_keys[data_keys.length - 1]}</option>
								{/if}
							</select>
						</div>
					</div>
					<div class="p-4 flex-auto">
						<div class="relative 2xl:h-[600px] h-[500px]">
							<MonitorTimelineChart {data} {start_key_index} {end_key_index} {data_keys} />
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
	<div class="flex flex-wrap">
		{#if data.userPreferences.settings.monitoruserpresencelog}
			<div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
				<div
					class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-300"
				>
					<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
						<div class="flex flex-wrap items-center">
							<div class="relative w-full max-w-full flex-grow flex-1">
								<h6 class="uppercase text-black-100 mb-1 text-xs font-semibold">Monitoring</h6>
								<h2 class="text-black text-xl font-semibold">User presence logs</h2>
							</div>
						</div>
					</div>
					<div class="flex flex-wrap">
						<div class="w-full xl:w-10/12 flex mt-2 justify-center items-center">
							<label for="userl" class="mr-1">User:</label>
							<select id="userl" bind:value={selected_user}>
								{#each Object.keys(data.status_logs_raw) as user}
									<option value={user}>{user}</option>
								{/each}
							</select>
						</div>
						<div class="w-full xl:w-1/12 mt-2 flex justify-center items-center">
							<label for="viewl" class="mr-1">View:</label>
							<select id="viewl" bind:value={view_mode}>
								<option value="all">All</option>
								<option value="compact">Compact</option>
							</select>
						</div>
					</div>
					<div class="p-4 flex-auto">
						<div class="relative h-fit">
							<CardPresenceLogs {data} {selected_user} {view_mode} />
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
