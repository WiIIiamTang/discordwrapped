<script>
	import Chart from '$lib/Charts/Chart.svelte';

	export let data;
	console.log('data from dashboard', data);
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
							<h6 class="uppercase text-black-100 mb-1 text-xs font-semibold">Overview</h6>
							<h2 class="text-black text-xl font-semibold">Sales value</h2>
						</div>
					</div>
				</div>
				<div class="p-4 flex-auto">
					<!-- Chart -->
					<div class="relative h-350-px">
						<Chart />
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-wrap mt-4">
		<div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4"><Chart /></div>
		<div class="w-full xl:w-4/12 px-4"><Chart /></div>
	</div>
</div>
