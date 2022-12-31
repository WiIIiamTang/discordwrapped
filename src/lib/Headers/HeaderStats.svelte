<script>
	import CardStats from '$lib/Cards/CardStats.svelte';

	export let guilds;
	export let messages_stats;
	export let voice_stats;
	export let messages_stats_week_ago;
	export let voice_stats_week_ago;

	// calcuate the percent difference between now and week ago for messages and voice
	let percent_diff_messages = 0;
	let percent_diff_voice = 0;
	$: {
		percent_diff_messages = messages_stats
			? ((messages_stats.count_by_channel._TOTAL -
					messages_stats_week_ago.count_by_channel._TOTAL) /
					messages_stats_week_ago.count_by_channel._TOTAL) *
			  100
			: 0;
		percent_diff_messages = Math.round(percent_diff_messages * 100) / 100;
	}
	$: {
		percent_diff_voice = voice_stats
			? ((voice_stats.count_by_channel._TOTAL - voice_stats_week_ago.count_by_channel._TOTAL) /
					voice_stats_week_ago.count_by_channel._TOTAL) *
			  100
			: 0;
		percent_diff_voice = Math.round(percent_diff_voice * 100) / 100;
	}

	// TODO: show the percent difference in terms of the gains this week compared to the week before (so can show the red/green arrows).
</script>

<!-- Header -->
<div class="relative bg-indigo-300 md:pt-32 pb-32 pt-12">
	<div class="px-4 md:px-10 mx-auto w-full">
		<div>
			<!-- Card stats -->
			{#if guilds && guilds.current}
				<div class="flex flex-wrap">
					<div class="w-full lg:w-12/12 xl:w-4/12 px-4 flex space-y-5 flex-col">
						<div>
							<CardStats
								statSubtitle="Members"
								statTitle={guilds.current.member_count}
								statIconColor="bg-red-500"
								statIconName="fas fa-users"
							/>
						</div>
						<div>
							<CardStats
								statSubtitle="Online users"
								statTitle={guilds.current.presence_count}
								statIconName="fas fa-network-wired"
								statIconColor="bg-orange-500"
							/>
						</div>
					</div>
					{#if messages_stats}
						<div class="w-full lg:w-12/12 xl:w-4/12 px-4 flex align-middle">
							<CardStats
								statSubtitle="Messages sent"
								statTitle={messages_stats.count_by_channel._TOTAL}
								statArrow={true ? 'up' : 'down'}
								statPercent={percent_diff_messages}
								statPercentColor={true ? 'text-emerald-500' : 'text-red-500'}
								statDescripiron="Since last week"
								statIconName="far fa-envelope"
								statIconColor="bg-pink-500"
							/>
						</div>
					{/if}
					{#if voice_stats}
						<div class="w-full lg:w-12/12 xl:w-4/12 px-4 flex align-middle">
							<CardStats
								statSubtitle="Hours in voice channels"
								statTitle={Math.round(voice_stats.count_by_channel._TOTAL / 60)}
								statArrow={true ? 'up' : 'down'}
								statPercent={percent_diff_voice}
								statPercentColor={true ? 'text-emerald-500' : 'text-red-500'}
								statDescripiron="Since last week"
								statIconName="fas fa-microphone"
								statIconColor="bg-emerald-500"
							/>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>
