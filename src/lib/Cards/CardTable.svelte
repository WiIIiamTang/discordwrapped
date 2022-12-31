<script>
	export let color = 'dark';

	let sample_data = [
		{
			activity: 'BLeague of Legends',
			user: 'John Doe',
			hours: 1231,
			rank: 1,
			percent: 93
		},
		{
			activity: 'ALeague of Legends',
			user: 'John Doe II',
			hours: 123,
			rank: 2,
			percent: 7
		}
	];

	let sortBy = {
		col: 'percent',
		ascending: true
	};

	$: sort = (column) => {
		if (sortBy.col == column) {
			sortBy.ascending = !sortBy.ascending;
		} else {
			sortBy.col = column;
			sortBy.ascending = true;
		}

		let sortModifier = sortBy.ascending ? 1 : -1;

		let sort = (a, b) =>
			a[column] < b[column] ? -1 * sortModifier : a[column] > b[column] ? 1 * sortModifier : 0;

		sample_data = sample_data.sort(sort);
	};
</script>

<div
	class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded {color === 'light'
		? 'bg-white'
		: 'bg-zinc-400 text-black'}"
>
	<!-- <div class="rounded-t mb-0 px-4 py-3 border-0">
		<div class="flex flex-wrap items-center">
			<div class="relative w-full px-4 max-w-full flex-grow flex-1">
				<h3 class="font-semibold text-lg {color === 'light' ? 'text-slate-700' : 'text-black'}">
					few users
				</h3>
			</div>
		</div>
	</div> -->
	<div class="rounded-t mb-0 px-4 border-0" />
	<div class="block w-full overflow-x-auto">
		<table class="items-center w-full bg-transparent border-collapse">
			<thead>
				<tr>
					<th
						class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color ===
						'light'
							? 'bg-slate-50 text-slate-500 border-slate-100'
							: 'bg-zinc-400 text-black border-zinc-400'}"
						on:click={sort('user')}
					>
						{#if sortBy.col === 'user' && sortBy.ascending}
							<i class="fas fa-sort-up" />
						{:else if sortBy.col === 'user' && !sortBy.ascending}
							<i class="fas fa-sort-down" />
						{:else}
							<i class="fas fa-sort" />
						{/if}
						<span class="ml-1">User</span>
					</th>
					<th
						class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color ===
						'light'
							? 'bg-slate-50 text-slate-500 border-slate-100'
							: 'bg-zinc-400 text-black border-zinc-400'}"
						on:click={sort('activity')}
					>
						{#if sortBy.col === 'activity' && sortBy.ascending}
							<i class="fas fa-sort-up" />
						{:else if sortBy.col === 'activity' && !sortBy.ascending}
							<i class="fas fa-sort-down" />
						{:else}
							<i class="fas fa-sort" />
						{/if}
						<span class="ml-1">Activity</span>
					</th>
					<th
						class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color ===
						'light'
							? 'bg-slate-50 text-slate-500 border-slate-100'
							: 'bg-zinc-400 text-black border-zinc-400'}"
						on:click={sort('hours')}
					>
						{#if sortBy.col === 'hours' && sortBy.ascending}
							<i class="fas fa-sort-up" />
						{:else if sortBy.col === 'hours' && !sortBy.ascending}
							<i class="fas fa-sort-down" />
						{:else}
							<i class="fas fa-sort" />
						{/if}
						<span class="ml-1">Hours</span>
					</th>
					<th
						class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color ===
						'light'
							? 'bg-slate-50 text-slate-500 border-slate-100'
							: 'bg-zinc-400 text-black border-zinc-400'}"
						on:click={sort('rank')}
					>
						{#if sortBy.col === 'rank' && sortBy.ascending}
							<i class="fas fa-sort-up" />
						{:else if sortBy.col === 'rank' && !sortBy.ascending}
							<i class="fas fa-sort-down" />
						{:else}
							<i class="fas fa-sort" />
						{/if}
						<span class="ml-1">Rank in activity</span>
					</th>
					<th
						class="px-6 cursor-pointer select-none align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color ===
						'light'
							? 'bg-slate-50 text-slate-500 border-slate-100'
							: 'bg-zinc-400 text-black border-zinc-400'}"
						on:click={sort('percent')}
					>
						{#if sortBy.col === 'percent' && sortBy.ascending}
							<i class="fas fa-sort-up" />
						{:else if sortBy.col === 'percent' && !sortBy.ascending}
							<i class="fas fa-sort-down" />
						{:else}
							<i class="fas fa-sort" />
						{/if}
						<span class="ml-1">% of activity total hours</span>
					</th>
				</tr>
			</thead>

			<!-- table body data-->
			<tbody>
				{#each sample_data as rowdata}
					<tr>
						<th
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
						>
							<span class="ml-3 font-bold {color === 'light' ? 'btext-slate-600' : 'text-whit'}">
								{rowdata.user}
							</span>
						</th>
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
						>
							{rowdata.activity}
						</td>
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
						>
							{rowdata.hours}
						</td>
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
						>
							<div>
								{#if rowdata.rank === 1}<i
										class="fas fa-circle text-amber-300 mr-2"
									/>{/if}{rowdata.rank}
							</div>
						</td>
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
						>
							<div class="flex items-center">
								<span class="mr-2">{rowdata.percent}%</span>
								<div class="relative w-full">
									<div class="overflow-hidden h-2 text-xs flex rounded bg-indigo-200">
										<div
											style="width: {rowdata.percent}%;"
											class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
										/>
									</div>
								</div>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
