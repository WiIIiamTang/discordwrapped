<script>
	export let messages;
	export let voice;
	export let current_selected_user;
	export let voiceState;
</script>

<div class="flex flex-wrap h-full w-full justify-start flex-col gap-2">
	{#if current_selected_user && messages.count_by_users[current_selected_user]}
		<div class="flex flex-row gap-4">
			<p class="text-lg font-bold">Total number of messages sent:</p>
			<span class="mt-auto text-slate-700"
				>{messages.count_by_users[current_selected_user]
					? messages.count_by_users[current_selected_user]
					: 0}
			</span>
		</div>
	{/if}

	{#if current_selected_user && voice.count_by_users[current_selected_user]}
		<div class="flex flex-row gap-4">
			<p class="text-lg font-bold">Total hours spent in voice channels:</p>
			<span class="mt-auto text-slate-700">
				{voice.count_by_users[current_selected_user]
					? Math.round((voice.count_by_users[current_selected_user] / 60) * 100) / 100
					: 0}
			</span>
		</div>
	{/if}

	{#if current_selected_user && voiceState.count_by_users[current_selected_user]}
		<div class="flex flex-row gap-4">
			<p class="text-lg font-bold">Voice states breakdown:</p>
			<ul class="text-slate-700">
				{#each Object.entries(voiceState.count_by_users[current_selected_user]) as state}
					<li>{state[0]}: {Math.round((state[1] / 60) * 100) / 100} hours</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
