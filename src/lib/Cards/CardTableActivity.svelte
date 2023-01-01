<script>
	import { onMount } from 'svelte';

	export let color = 'dark';
	export let data;

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

	const full_data = Object.keys(data.data)
		.map((activity) => {
			return Object.keys(data.ranks[activity]).map((user) => {
				const dataobj = {
					activity: activity,
					user: user,
					hours: Math.round((data.data[activity][user] / 60) * 100) / 100,
					rank: data.ranks[activity][user]['rank'],
					percent: data.ranks[activity][user]['percent']
				};
				dataobj['searchterms'] = `${dataobj.activity.toLowerCase()} ${dataobj.user.toLowerCase()} ${
					dataobj.hours
				} ${dataobj.rank} ${dataobj.percent}`;
				return dataobj;
			});
		})
		.flat();

	$: table_data = Object.keys(data.data)
		.map((activity) => {
			return Object.keys(data.ranks[activity]).map((user) => {
				const dataobj = {
					activity: activity,
					user: user,
					hours: Math.round((data.data[activity][user] / 60) * 100) / 100,
					rank: data.ranks[activity][user]['rank'],
					percent: data.ranks[activity][user]['percent']
				};
				dataobj['searchterms'] = `${dataobj.activity.toLowerCase()} ${dataobj.user.toLowerCase()} ${
					dataobj.hours
				} ${dataobj.rank} ${dataobj.percent}`;
				return dataobj;
			});
		})
		.flat();

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

		table_data = table_data.sort(sort);
	};

	$: filtertable = (query) => {
		if (!query || query === '') {
			table_data = full_data;
			sortBy.ascending = !sortBy.ascending;
			sort(sortBy.col);
			return;
		}

		const searchterm = query.toLowerCase();
		console.log('seraching for', searchterm);

		table_data = full_data.filter((row) => {
			return row.searchterms.includes(searchterm);
		});
		sortBy.ascending = !sortBy.ascending;
		sort(sortBy.col);
	};

	let searchterm = '';
	let timer;

	const debounce = (term) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			filtertable(term);
		}, 500);
	};

	onMount(() => {
		sort('percent');
	});
</script>

<div
	class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-b {color ===
	'light'
		? 'bg-white'
		: 'bg-zinc-400 text-black'}"
>
	<div class="rounded-t mb-0 px-4 py-3 border-0">
		<div class="flex flex-wrap items-center">
			<div class="relative w-full px-4 max-w-full flex-grow flex-1">
				<!-- Search bar -->
				<input
					type="text"
					class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
					placeholder="Search"
					bind:value={searchterm}
					on:input={debounce(searchterm)}
				/>
			</div>
		</div>
	</div>
	<div class="block w-full overflow-x-auto max-h-[400px] overflow-y-auto">
		<table class="items-center w-full bg-transparent border-collapse">
			<thead class="sticky top-[-1px] z-30">
				<tr>
					<th
						class="px-6 select-none align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color ===
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
						class="px-6 select-none align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color ===
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
						class="px-6  select-none align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color ===
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
						class="px-6 select-none align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color ===
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
				{#each table_data as rowdata}
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
								{#if rowdata.rank === 1}<i class="fas fa-circle text-amber-300 mr-2" />
								{:else if rowdata.rank === 2}<i class="fas fa-circle text-neutral-200 mr-2" />
								{:else if rowdata.rank === 3}<i class="fas fa-circle text-stone-500 mr-2" />
								{/if}{rowdata.rank}
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
											style="width:100%;"
											class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r to-rose-400 via-purple-700 from-indigo-800"
										/>
										<div
											style="transform: translateX(-{Math.min(
												99,
												100 - rowdata.percent
											)}%); width: {100 - rowdata.percent}%;"
											class="z-20 bg-indigo-200 w-full"
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
