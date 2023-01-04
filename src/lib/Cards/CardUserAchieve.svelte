<script>
	export let data;
	export let current_selected_user;

	$: categories = {
		messages: data.messages.count_by_users[current_selected_user],
		voice: data.voice.count_by_users[current_selected_user],
		activities: Object.entries(data.activities_raw)
			.filter(([key, value]) => Object.keys(value).includes(current_selected_user))
			.reduce((obj, [key, value]) => {
				obj.push([key, value[current_selected_user]]);
				return obj;
			}, []),
		status: data.status.count_by_users[current_selected_user],
		bot: data.botInteractions_raw,
		voice_state: data.voiceState.count_by_users[current_selected_user]
	};

	$: number_of_achievements = data.achievementSettings.length;

	$: success_or_fail_achievements_user = data.achievementSettings.map((achievement) => [
		achievement,
		achievement.name === 'messages' || achievement.name === 'voice'
			? categories[achievement.name] >= achievement.threshold
			: achievement.name === 'activities'
			? categories[achievement.name]
					.filter((entry) => entry[0] >= achievement.threshold)
					.flat()[1] >= achievement.threshold
			: achievement.name === 'status' && categories[achievement.name]
			? categories[achievement.name][achievement.category_name] >= achievement.threshold
			: achievement.name === 'bot'
			? categories[achievement.name][achievement.category_name].count_by_users[
					current_selected_user
			  ] >= achievement.threshold
			: achievement.name === 'voice_state' && categories[achievement.name]
			? categories[achievement.name][achievement.category_name] >= achievement.threshold
			: false,
		categories[achievement.name]
	]);

	$: percent_completed = Math.round(
		(success_or_fail_achievements_user.filter((card) => card[1]).length / number_of_achievements) *
			100
	);

	$: number_of_hidden = success_or_fail_achievements_user.filter(
		(card) => card[0].hidden && !card[1]
	).length;

	let show_completed = true;
	let show_incomplete = true;
</script>

<div class="pb-4">
	<h1 class="mb-2 text-lg">
		Completion rate: {percent_completed}%
	</h1>
	<input
		type="checkbox"
		class="border-0 px-3 py-3 mr-2 placeholder-slate-300 text-slate-600 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring ease-linear transition-all duration-150"
		id="show_completed"
		bind:checked={show_completed}
	/><label for="show_completed">Show completed</label>
	<input
		type="checkbox"
		class="border-0 px-3 py-3 mr-2 ml-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring ease-linear transition-all duration-150"
		id="show_incomplete"
		bind:checked={show_incomplete}
	/><label for="show_incomplete">Show incomplete</label>
</div>
<div class="max-h-[400px] overflow-y-auto overflow-x-hidden">
	<div>
		{#each success_or_fail_achievements_user as card}
			{#if (show_completed && card[1]) || (show_incomplete && !card[1])}
				<div
					class="w-full mx-1 h-fit py-4 shadow-lg {card[1]
						? 'bg-emerald-200 opacity-100'
						: 'bg-zinc-400 opacity-75'} rounded-lg px-4 my-4  hover:opacity-100 transform-gpu transition-all ease-in-out duration-200"
				>
					<h4 class="font-semibold uppercase">
						{card[0].custom_name ? card[0].custom_name : card[0].name}
					</h4>
					<p>
						{card[0].custom_note ? card[0].custom_note : ''}
						{card[1] ? '✓' : '✗'}
					</p>
					{#if !card[1] && card[2]}
						<p>
							Progress: {Math.round(
								card[0].category_name
									? card[0].name === 'bot'
										? (card[2][card[0].category_name].count_by_users[current_selected_user] /
												card[0].threshold) *
										  10000
										: (card[2][card[0].category_name] / card[0].threshold) * 10000
									: card[0].name === 'activities'
									? card[2].filter((entry) => entry[0] >= card[0].threshold).flat()[1]
									: (card[2] / card[0].threshold) * 10000
							) / 100 || 0}%
						</p>
					{/if}
				</div>
			{/if}
		{/each}
	</div>
</div>
