<script>
	export let data;
	export let selected_user;
	export let view_mode = 'all';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import tz from 'dayjs/plugin/timezone';
	import { onMount } from 'svelte';
	dayjs.extend(utc);
	dayjs.extend(tz);

	let timezone;

	// convert the keys dates.
	// TODO: select timezone from user preferences?
	// TODO: can we do this in the parent component, where its already being done?
	onMount(() => {
		timezone = dayjs.tz.guess();
	});

	$: data_logs = selected_user ? data.status_logs_raw[selected_user] : [];

	let colors = {
		online: 'bg-emerald-300',
		idle: 'bg-amber-300',
		offline: 'bg-zinc-300',
		dnd: 'bg-red-300'
	};

	$: filtertable = (query) => {
		if (!query || query === '') {
			data_logs = selected_user ? data.status_logs_raw[selected_user] : [];
			return;
		}

		const searchterm = query.toLowerCase();
		data_logs = selected_user
			? // ? Object.entries(data.status_logs_raw)
			  // 		.map(([user, userlogs]) => {
			  // 			return [
			  // 				user,
			  // 				userlogs.filter((log) => {
			  // 					return (
			  // 						log.status.toLowerCase().includes(searchterm) ||
			  // 						dayjs
			  // 							.utc(dayjs(log.time))
			  // 							.tz(timezone)
			  // 							.format('MM/DD/YYYY HH:mm')
			  // 							.includes(searchterm) ||
			  // 						user.toLowerCase().includes(searchterm)
			  // 					);
			  // 				})
			  // 			];
			  // 		})
			  // 		.reduce((acc, [user, userlogs]) => {
			  // 			acc[user] = userlogs;
			  // 			return acc;
			  // 		}, {})[selected_user]

			  /**
			   * If you need to filter the ENTIRE object, then above code will work. For now, we go with the below.
			   * The above option will be needed if we add in a feature to include ALL users at once.
			   */
			  data.status_logs_raw[selected_user].filter((log) => {
					return (
						log.status.toLowerCase().includes(searchterm) ||
						dayjs
							.utc(dayjs(log.time))
							.tz(timezone)
							.format('MM/DD/YYYY HH:mm')
							.includes(searchterm) ||
						selected_user.toLowerCase().includes(searchterm)
					);
			  })
			: [];
	};

	$: searchterm = !selected_user ? 'No user selected' : '';
	let timer;

	let searching = false;

	const debounce = (term) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			filtertable(term);
			searching = false;
		}, 1000);
	};

	$: diffs = data_logs.map((log, i) => {
		if (i === data_logs.length - 1) {
			return 0;
		}
		return computeTimeDiff(log, i);
	});

	const computeTimeDiff = (log, i) => {
		const currentDiff =
			-1 *
			dayjs
				.utc(dayjs(data_logs[i + 1].time))
				.tz(timezone)
				.diff(dayjs.utc(dayjs(log.time)).tz(timezone), 'minute');
		return currentDiff;
	};

	$: show_time_diffs = view_mode === 'all' ? true : false;
</script>

<div class="relative w-full px-12 max-w-full flex-grow flex-1 flex justify-center items-center">
	<!-- Search bar -->
	<input
		type="text"
		class="px-3 py-3 w-11/12 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline"
		placeholder="Search"
		bind:value={searchterm}
		on:input={() => {
			searching = true;
			debounce(searchterm);
		}}
	/>
</div>
<div>
	{#if searching}
		<div class="flex flex-row justify-center items-center text-amber-700 font-semibold">
			Filtering logs...
		</div>
	{/if}
</div>
<div
	class="flex flex-col max-h-[400px] overflow-auto mt-8 {view_mode === 'compact'
		? 'gap-1'
		: 'gap-4'}"
>
	{#if data_logs && diffs}
		{#each data_logs as log, i}
			<div
				class="logCardMonitoring h-fit hover:scale-[101%] transform-gpu transition-all duration-100 ease-linear shadow-lg flex flex-row justify-between rounded px-4 py-4 text-center border-gray-500 mx-12 border-2 {colors[
					log.status
				]}"
			>
				<p>
					<span class="font-semibold">{selected_user}</span> changed their status: {log.status}
				</p>
				<p>Time registered: {dayjs.utc(dayjs(log.time)).tz(timezone).format('MM/DD/YYYY HH:mm')}</p>
			</div>
			<div>
				<!-- This computes the time between this log and the next -->
				{#if i !== data_logs.length - 1 && show_time_diffs && diffs}
					<div
						class="w-full divide-slate-400 grid grid-cols-2 divide-x-2 mb-2 {diffs[i] > 720
							? 'h-[80px]'
							: diffs[i] > 360
							? 'h-[60px]'
							: diffs[i] > 180
							? 'h-[40px]'
							: diffs[i] > 60
							? 'h-[20px]'
							: 'h-[5px]'}"
					>
						<div />
						<div />
					</div>
					<div class="flex flex-row justify-center items-center text-amber-700 font-semibold">
						{diffs[i] > 60 ? Math.round((diffs[i] / 60) * 1000) / 1000 : diffs[i]}{' '}
						{diffs[i] > 60 ? 'hours' : 'minutes'}
					</div>
					<div
						class="w-full grid grid-cols-2 mt-2 divide-x-2 divide-slate-400 {diffs[i] > 720
							? 'h-[80px]'
							: diffs[i] > 360
							? 'h-[60px]'
							: diffs[i] > 180
							? 'h-[40px]'
							: diffs[i] > 60
							? 'h-[20px]'
							: 'h-[5px]'}"
					>
						<div />
						<div />
					</div>
				{/if}
			</div>
			{#if i === data_logs.length - 1}
				<div
					class="logCardMonitoring h-fit shadow-lg flex flex-row justify-between rounded px-4 py-4 text-center border-gray-500 mx-12 border-2 bg-gray-400"
				>
					<p>
						<span class="font-semibold">You reached the end!</span>
					</p>
				</div>
			{/if}
		{/each}
	{/if}
</div>
