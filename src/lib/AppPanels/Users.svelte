<script>
	import UserActivityChart from '$lib/Charts/UserActivityChart.svelte';
	import UserStatusChart from '$lib/Charts/UserStatusChart.svelte';
	import UserMessageVoiceChart from '$lib/Charts/UserMessageVoiceChart.svelte';
	import CardUserAchieve from '$lib/Cards/CardUserAchieve.svelte';
	import UserPresenceHeatMapChart from '$lib/Charts/UserPresenceHeatMapChart.svelte';

	export let data;
	let current_selected_user = data.user.username;

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

	let sorted_members = data.bot_guilds.current.members.sort((a, b) => {
		return a.user.username.localeCompare(b.user.username);
	});
</script>

<div class="flex flex-wrap">
	<div class="w-full lg:w-12/12 px-4 sticky top-0 z-10">
		<div
			class="relative flex flex-row py-4 justify-center gap-2 min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-300 border-0"
		>
			<div class="w-1/2">
				<p class="text-center py-3">Select a user:</p>
				<select class="w-full" bind:value={current_selected_user}>
					{#each sorted_members as member}
						<option value={member.user.username}
							>{member.user.username} {member.nick ? ` [${member.nick}]` : ''}</option
						>
					{/each}
				</select>
			</div>
		</div>
	</div>
	{#if data.userPreferences.settings.usersactivity}
		<div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4 mt-2">
			<div
				class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-300"
			>
				<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
					<div class="flex flex-wrap items-center">
						<div class="relative w-full max-w-full flex-grow flex-1">
							<h6 class="uppercase text-black-100 mb-1 text-xs font-semibold">Users</h6>
							<h2 class="text-black text-xl font-semibold">Activity</h2>
						</div>
					</div>
				</div>

				<div class="p-4 flex-auto ">
					<div
						class="relative 2xl:h-[600px] h-[500px] flex w-full flex-col xl:flex-row justify-center items-center"
					>
						{#if current_selected_user}
							<div class="w-6/12 h-full flex justify-center items-center">
								<UserActivityChart {current_selected_user} activities={data.activities_raw} />
							</div>
							<div class="w-6/12 h-full">
								<UserStatusChart {current_selected_user} status={data.status} />
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
	<div class="flex flex-wrap w-full">
		{#if data.userPreferences.settings.usersmessages}
			<div class="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
				<div
					class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-300"
				>
					<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
						<div class="flex flex-wrap items-center">
							<div class="relative w-full max-w-full flex-grow flex-1">
								<h6 class="uppercase text-black-100 mb-1 text-xs font-semibold">Users</h6>
								<h2 class="text-black text-xl font-semibold">Messages&Voice</h2>
							</div>
						</div>
					</div>
					<div class="p-4 flex-auto w-full">
						<div class="relative h-[499px]">
							<UserMessageVoiceChart
								messages={data.messages}
								voice={data.voice}
								{current_selected_user}
								voiceState={data.voiceState}
							/>
						</div>
					</div>
				</div>
			</div>
		{/if}
		{#if data.userPreferences.settings.usersachieve}
			<div class="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
				<div
					class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-300"
				>
					<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
						<div class="flex flex-wrap items-center">
							<div class="relative w-full max-w-full flex-grow flex-1">
								<h6 class="uppercase text-black-100 mb-1 text-xs font-semibold">Users</h6>
								<h2 class="text-black text-xl font-semibold">Achievements</h2>
								<p class="text-slate-600 text-sm">Custom milestones set by your server.</p>
							</div>
						</div>
					</div>
					<div class="p-4 flex-auto">
						<div class="relative h-full">
							<CardUserAchieve {current_selected_user} {data} />
						</div>
					</div>
				</div>
			</div>
		{/if}
		{#if data.userPreferences.settings.usersheatmap && data.status_logs_raw[current_selected_user]}
			<div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
				<div
					class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-300"
				>
					<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
						<div class="flex flex-wrap items-center">
							<div class="relative w-full max-w-full flex-grow flex-1">
								<h6 class="uppercase text-black-100 mb-1 text-xs font-semibold">Users</h6>
								<h2 class="text-black text-xl font-semibold">Presence Heatmap</h2>
								<p class="text-sm">
									Darker means more active during that timeslot. Times are automatically adjusted to
									your timezone.
								</p>
							</div>
						</div>
					</div>
					<div class="p-4 flex-auto">
						<div class="relative xl:h-[500px] h-[400px]">
							<UserPresenceHeatMapChart {current_selected_user} {data} />
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
