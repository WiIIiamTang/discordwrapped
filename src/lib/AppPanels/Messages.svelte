<script>
	import MessagesChannelChart from '$lib/Charts/MessagesChannelChart.svelte';
	import CardMessagesUser from '$lib/Cards/CardMessagesUser.svelte';
	import CardMessagesFreq from '$lib/Cards/CardMessagesFreq.svelte';
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

	let cloud;
</script>

<div class="pb-6">
	{#if data.userPreferences.settings.messageschannel}
		<div class="flex flex-wrap">
			<div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
				<div
					class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-300"
				>
					<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
						<div class="flex flex-wrap items-center">
							<div class="relative w-full max-w-full flex-grow flex-1">
								<h6 class="uppercase text-black-100 mb-1 text-xs font-semibold">Messages</h6>
								<h2 class="text-black text-xl font-semibold">Total messages sent by channel</h2>
							</div>
						</div>
					</div>
					<div class="p-4 flex-auto">
						<div class="relative h-400-px">
							{#if data.messages}
								<MessagesChannelChart data={data.messages} />
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
	<div class="flex flex-wrap">
		{#if data.userPreferences.settings.messagesuser}
			<div class="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
				<div
					class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-300"
				>
					<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
						<div class="flex flex-wrap items-center">
							<div class="relative w-full max-w-full flex-grow flex-1">
								<h6 class="uppercase text-black-100 mb-1 text-xs font-semibold">Messages</h6>
								<h2 class="text-black text-xl font-semibold">Top users by number of messages</h2>
							</div>
						</div>
					</div>
					<div class="p-4 flex-auto">
						<div class="relative h-400-px">
							{#if data.messages}
								<CardMessagesUser data={data.messages} />
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/if}
		{#if data.userPreferences.settings.messagesfrequentwords}
			<div class="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
				<div
					class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-300"
				>
					<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
						<div class="flex flex-wrap items-center">
							<div class="relative w-full max-w-full flex-grow flex-1">
								<h6 class="uppercase text-black-100 mb-1 text-xs font-semibold">Messages</h6>
								<h2 class="text-black text-xl font-semibold">Frequent Words</h2>
							</div>
						</div>
						<select class="mt-5" bind:value={cloud}>
							<option value="grid">Grid</option>
							<option value="cloud">cloud</option>
						</select>
					</div>
					<div class="p-4 flex-auto">
						<div class="relative h-[500px]">
							{#if data.words}
								<CardMessagesFreq data={data.words} cloud={cloud === 'cloud'} />
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<!-- <div>Messages: total messages, channels, word cloud of words.</div> -->
