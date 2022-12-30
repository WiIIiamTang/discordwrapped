<script>
	import ActivityChart from '$lib/Charts/ActivityChart.svelte';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		Filler,
		BarElement
	} from 'chart.js';

	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		Filler,
		BarElement
	);

	export let data;

	let activity_limit = 20;
	let max_activity_limit = 20;
</script>

<div>
	<div class="flex flex-wrap">
		<div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
			<div
				class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-200"
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
		<div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
			<div
				class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-200"
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
					<div class="relative h-500-px">
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
		<div class="w-full xl:w-4/12 px-4">
			<div
				class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-200"
			>
				<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
					<div class="flex flex-wrap items-center">
						<div class="relative w-full max-w-full flex-grow flex-1">
							<h6 class="uppercase text-black-100 mb-1 text-xs font-semibold">Activities</h6>
							<h2 class="text-black text-xl font-semibold">Rising trends</h2>
						</div>
					</div>
				</div>
				<div class="p-4 flex-auto">
					<div class="relative h-500-px">
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
</div>
