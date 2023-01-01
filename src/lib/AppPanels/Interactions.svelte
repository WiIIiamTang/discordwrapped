<script>
	import Network from '$lib/Charts/Network.svelte';
	import InteractionChart from '$lib/Charts/InteractionChart.svelte';
	import InteractionBotChart from '$lib/Charts/InteractionBotChart.svelte';
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
		BarElement,
		RadialLinearScale
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
		BarElement,
		RadialLinearScale
	);

	export let data;
	let current_user = '';
	let interaction_users = data.interactions.nodes.map((node) => node.id);
	interaction_users.push('None');

	let graph_data = data.interactions;

	function handleSubmit() {
		alert(`answered question ${current_user}`);
	}
</script>

<div class="pb-10">
	{#if data.userPreferences.settings.interactionnetwork}
		<div class="flex flex-wrap">
			<div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
				<div
					class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-800"
				>
					<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
						<div class="flex flex-wrap items-center">
							<div class="relative w-full max-w-full flex-grow flex-1">
								<h6 class="uppercase text-white mb-1 text-xs font-semibold">Interactions</h6>
								<h2 class="text-white text-xl font-semibold">Member relationship network</h2>
								<p class="text-white text-sm">
									Bigger nodes means they spent more time with other members. Thicker lines means
									the pair spent more time with each other. Members that are closer together have
									spent more time with each other in general (if the nodes are linked).
								</p>
							</div>
						</div>
					</div>
					<div class="chartContainer h-[700px]">
						<div class="relative w-full h-full chart flex justify-center">
							{#if data}
								<Network {graph_data} />
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if data.userPreferences.settings.interactionrelationshipchart}
		<div class="flex flex-wrap">
			<div class="w-full xl:w-12/12 mb-12 xl:mb-2 px-4">
				<div
					class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-zinc-300"
				>
					<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
						<div class="flex flex-wrap items-center">
							<div class="relative w-full max-w-full flex-grow flex-1">
								<h6 class="uppercase text-black mb-1 text-xs font-semibold">Interactions</h6>
								<h2 class="text-black text-xl font-semibold">Member relationship chart</h2>
							</div>
						</div>
					</div>
					<div class="mb-0 px-4 py-3">
						<h3 class="text-sm pb-5 text-stone-600">Change the user you want to focus on.</h3>
						<form on:submit|preventDefault={handleSubmit}>
							<select bind:value={current_user}>
								{#each interaction_users as iu}
									<option value={iu}>
										{iu}
									</option>
								{/each}
							</select>
						</form>
					</div>
					<div class="chartContainer max-h-[500px] pb-10 flex justify-center">
						<div class="w-11/12 chart flex justify-center">
							<InteractionChart
								data={data.interactions}
								interaction_limit={5}
								current_user={current_user === 'None' ? '' : current_user}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<div class="flex flex-wrap">
		{#if data.userPreferences.settings.interactionbot}
			<div class="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
				<div
					class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-sky-200"
				>
					<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
						<div class="flex flex-wrap items-center">
							<div class="relative w-full max-w-full flex-grow flex-1">
								<h6 class="uppercase text-black mb-1 text-xs font-semibold">Interactions</h6>
								<h2 class="text-black text-xl font-semibold">Bot interactions</h2>
								<p class="text-black text-sm">Command usage.</p>
							</div>
						</div>
					</div>
					<div class="chartContainer h-fit">
						<div class="relative w-full h-full chart flex justify-center">
							{#if data.botInteractions}
								<InteractionBotChart botInteractions={data.botInteractions} />
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/if}

		{#if data.userPreferences.settings.interactionvoice}
			<div class="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
				<div
					class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-indigo-200"
				>
					<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
						<div class="flex flex-wrap items-center">
							<div class="relative w-full max-w-full flex-grow flex-1">
								<h6 class="uppercase text-black mb-1 text-xs font-semibold">Interactions</h6>
								<h2 class="text-black text-xl font-semibold">Voice</h2>
								<p class="text-black text-sm">Time spent in voice channels.</p>
							</div>
						</div>
					</div>
					<div class="chartContainer h-fit">
						<div class="relative w-full h-full chart flex justify-center">
							{#if data.botInteractions}
								<InteractionBotChart botInteractions={data.botInteractions} />
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
