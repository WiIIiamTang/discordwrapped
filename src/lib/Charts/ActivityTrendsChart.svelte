<script>
	export let data;

	$: acts = data.labels.map((label, index) => {
		return {
			label,
			diff: Math.round(data.diffs[index] / 60)
		};
	});

	// TODO: percent increases need to be calculated from archive data
	// should be the percent increase from this week's diff (so today - last week)
	// compared to last week's diff (so last week - 2 weeks ago)
</script>

<div class="flex flex-col gap-5">
	{#each acts as act, i}
		<div
			class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg w-full"
		>
			<span class="circleRank absolute rounded-full bg-sky-700 flex justify-center items-center"
				><p class="text-center text-white text-lg">{i + 1}</p></span
			>
			<div class="flex-auto p-4">
				<div class="flex flex-wrap">
					<div class="relative w-full pr-4 max-w-full flex-grow flex-1">
						<h5 class="text-slate-400 uppercase font-bold text-xs">{act.label}</h5>
						<span class="font-semibold text-sm text-slate-700">{act.diff} hours this past week</span
						>
					</div>
				</div>

				<!-- <div>
					<p class="text-sm text-slate-400 mt-4">
						<span class="mr-2 text-emerald-500">
							<i class={'fas fa-arrow-up'} />
							{0}%
						</span>
						<span class="whitespace-nowrap">Increase from last week</span>
					</p>
				</div> -->
			</div>
		</div>
	{/each}
</div>

<style>
	.circleRank {
		top: -15px;
		right: -10px;
		width: 30px;
		height: 30px;
	}
</style>
