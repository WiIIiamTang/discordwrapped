<script>
	import AppNavbar from '$lib/Navbars/AppNavbar.svelte';
	import AppSidebar from '$lib/Sidebars/AppSidebar.svelte';
	import HeaderStats from '$lib/Headers/HeaderStats.svelte';
	import AppFooter from '$lib/Footers/AppFooter.svelte';

	import { navigating } from '$app/stores';
	import LoadingApp from '$lib/Spinners/LoadingApp.svelte';

	import FleetWidget from '$lib/Fleet/FleetWidget.svelte';

	export let data = {};
</script>

<div>
	<AppSidebar guilds={data.bot_guilds} preferences={data.userPreferences} isDemo={true} />
	<div class="relative md:ml-64 bg-slate-100">
		<AppNavbar guilds={data.bot_guilds} since_date={data.tracking_since} isDemo={true} />
		<HeaderStats
			guilds={data.bot_guilds}
			messages_stats={data.messages}
			voice_stats={data.voice}
			messages_stats_week_ago={data.archived_stats_week_ago.messages}
			voice_stats_week_ago={data.archived_stats_week_ago.voice}
		/>
		<div class="px-4 md:px-10 mx-auto w-full -m-24">
			<div
				class="absolute top-0 z-50 text-4xl font-bold bg-repeat h-full w-[90%] pointer-events-none opacity-10"
				style="background-image: url(/DEMO.png)"
			/>
			{#if $navigating && $navigating.to.url.pathname.startsWith('/demo') && $navigating.from.url.pathname.startsWith('/demo')}
				<div class="w-full h-full flex justify-center items-center overflow-hidden">
					<LoadingApp duration={'1.5s'} />
					<LoadingApp duration={'3s'} size={100} />
					<LoadingApp duration={'2.5s'} size={70} />
					<LoadingApp duration={'1.5s'} size={40} />
					<LoadingApp duration={'4s'} size={80} />
				</div>
			{:else}
				<slot />
			{/if}
			{#if data.latestDeployment}
				<AppFooter data={{ date: data.latestDeployment }} />
			{/if}
		</div>
	</div>
</div>
<FleetWidget discordAccountId={'123'} username={'DEMO'} connected={false} version={'DEMO'} />
