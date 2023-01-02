<script>
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

	$: rowdata = Object.entries(data.count_by_users)
		.sort((a, b) => b[1] - a[1])
		.map((user) => {
			return {
				user: user[0],
				number_messages: user[1]
			};
		});
</script>

<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-b">
	<div class="block w-full overflow-x-auto max-h-[400px] overflow-y-auto no-scrollbar">
		<table class="items-center w-full bg-transparent border-collapse">
			<thead>
				<tr>
					<th />
					<th
						class="px-6 select-none align-middle border-0 border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
					>
						<span class="ml-1">User</span>
					</th>
					<th
						class="px-6 select-none align-middle border-0 border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
					>
						<span class="ml-1">#</span>
					</th>
				</tr>
			</thead>

			<!-- table body data-->
			<tbody>
				{#each rowdata as rowdata, i}
					<tr class="{i === 0 ? 'bg-amber-200' : 'hover:bg-slate-200 ease-linear duration-300'} ">
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
						>
							{i + 1}
						</td>
						<th
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
						>
							<span class="ml-3 font-bold">
								{rowdata.user}
							</span>
						</th>
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
						>
							{rowdata.number_messages}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
