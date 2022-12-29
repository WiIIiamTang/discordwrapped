<script>
	import AppNavbar from '$lib/Navbars/AppNavbar.svelte';
	import AppSidebar from '$lib/Sidebars/AppSidebar.svelte';
	import HeaderStats from '$lib/Headers/HeaderStats.svelte';

	export let data;
</script>

<div>
	<AppSidebar guilds={data.bot_guilds} />
	<div class="relative md:ml-64 bg-blueGray-100">
		<AppNavbar guilds={data.bot_guilds} since_date={{ date: '12/12/2023' }} />
		<HeaderStats guilds={data.bot_guilds} messages_stats={data.messages} voice_stats={data.voice} />
		<div class="px-4 md:px-10 mx-auto w-full -m-24">
			<slot />
		</div>
	</div>
</div>
