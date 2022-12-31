<script>
	import ActivityChart from '$lib/Charts/ActivityChart.svelte';
	import ActivityPopularChart from '$lib/Charts/ActivityPopularChart.svelte';
	import ActivityTrendsChart from '$lib/Charts/ActivityTrendsChart.svelte';
	import CardTable from '$lib/Cards/CardTable.svelte';
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

	export let data;

	let activity_limit = 20;
	let max_activity_limit = 20;

	let popular_limit = 11;
	let max_popular_limit = 11;
</script>

<div>
	<div class="flex flex-wrap">
		<div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
			<div
				class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-300"
			>
				<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
					<div class="flex flex-wrap items-center">
						<div class="relative w-full max-w-full flex-grow flex-1">
							<h6 class="uppercase text-black-100 mb-1 text-xs font-semibold">Activities</h6>
							<h2 class="text-black text-xl font-semibold">Guild totals</h2>
						</div>
					</div>
				</div>
				<div class="p-4 flex-auto">
					<div class="relative h-400-px">
						<label>
							<input type="number" bind:value={activity_limit} min="1" max={max_activity_limit} />

							<input type="range" bind:value={activity_limit} min="1" max={max_activity_limit} />
						</label>
						{#if data.activities}
							<ActivityChart data={data.activities} {activity_limit} />
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-wrap mt-4">
		<div class="w-full h-full xl:w-8/12 mb-12 xl:mb-0 px-4">
			<div
				class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-indigo-200"
			>
				<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
					<div class="flex flex-wrap items-center">
						<div class="relative w-full max-w-full flex-grow flex-1">
							<h6 class="uppercase text-black-100 mb-1 text-xs font-semibold">Activities</h6>
							<h2 class="text-black text-xl font-semibold">Popular</h2>
						</div>
					</div>
				</div>
				<div class="p-4 flex-auto">
					<div class="relative h-fit">
						<label>
							<input type="number" bind:value={popular_limit} min="1" max={max_popular_limit} />

							<input type="range" bind:value={popular_limit} min="1" max={max_popular_limit} />
						</label>
						{#if data.popular_activities}
							<ActivityPopularChart data={data.popular_activities} {popular_limit} />
						{/if}
					</div>
				</div>
			</div>
		</div>
		<div class="w-full h-full xl:w-4/12 px-4">
			<div
				class="relative flex flex-col min-w-0 break-words w-full h-full shadow-lg rounded bg-sky-200"
			>
				<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
					<div class="flex flex-wrap items-center">
						<div class="relative w-full max-w-full flex-grow flex-1">
							<h6 class="uppercase text-black-100 mb-1 text-xs font-semibold">Activities</h6>
							<h2 class="text-black text-xl font-semibold">Trends</h2>
						</div>
					</div>
				</div>
				<div class="p-4 flex-auto">
					<div class="relative h-full">
						{#if data.trends_activities}
							<ActivityTrendsChart data={data.trends_activities} />
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="flex flex-wrap mt-4">
		<div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
			<div
				class="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-t bg-zinc-400"
			>
				<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
					<div class="flex flex-wrap items-center">
						<div class="relative w-full max-w-full flex-grow flex-1">
							<h6 class="uppercase text-black-100 mb-1 text-xs font-semibold">Activities</h6>
							<h2 class="text-black text-xl font-semibold">Top Users</h2>
						</div>
					</div>
				</div>
			</div>
			<CardTable />
		</div>
	</div>
</div>
