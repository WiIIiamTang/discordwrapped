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

<div>
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
								Bigger nodes means they spent more time with other members. Thicker lines means the
								pair spent more time with each other. Members that are closer together have spent
								more time with each other in general (if the nodes are linked).
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
	<div class="flex flex-wrap mt-12 pb-12">
		<div class="w-full xl:w-2/12 px-4 flex justify-center flex-col">
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
		<div class="w-full xl:w-10/12 mb-12 xl:mb-0 px-4">
			<InteractionChart
				data={data.interactions}
				interaction_limit={5}
				current_user={current_user === 'None' ? '' : current_user}
			/>
		</div>
	</div>

	<div class="flex flex-wrap">
		<div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
			<div
				class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-stone-500"
			>
				<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
					<div class="flex flex-wrap items-center">
						<div class="relative w-full max-w-full flex-grow flex-1">
							<h6 class="uppercase text-white mb-1 text-xs font-semibold">Interactions</h6>
							<h2 class="text-white text-xl font-semibold">Bot interactions</h2>
							<p class="text-white text-sm">Command usage.</p>
						</div>
					</div>
				</div>
				<div class="chartContainer h-[700px]">
					<div class="relative w-full h-full chart flex justify-center">
						{#if data.audio}
							<InteractionBotChart
								audio={data.audio}
								genshin={data.genshin}
								waifu={data.waifu}
								openai={data.openai}
								wolfram={data.wolfram}
							/>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
