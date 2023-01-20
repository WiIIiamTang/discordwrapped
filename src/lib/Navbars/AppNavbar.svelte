<script>
	// core components
	import ProfilesDropdown from '$lib/Dropdowns/ProfilesDropdown.svelte';

	export let guilds;
	export let since_date;
	export let isDemo = false;
</script>

<!-- Navbar -->
<nav
	class="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4"
>
	<div
		class="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4"
	>
		<!-- Brand -->
		<p class="text-white text-sm uppercase hidden lg:inline-block font-semibold">
			{#if guilds && guilds.current}
				<span class="text-slate-700 font-bold"> Server: </span><span class="text-slate-700"
					>{guilds.current.name}</span
				>
			{/if}
		</p>
		{#if since_date}
			<p class="text-white text-sm uppercase hidden lg:inline-block font-semibold">
				<span class="text-slate-700 font-bold">Tracking since: </span><span class="text-slate-700">
					{since_date.toLocaleDateString('en-CA')}</span
				>
			</p>
		{/if}
		<ul class="flex-col md:flex-row list-none items-center hidden md:flex">
			{#if guilds && guilds.current}
				<ProfilesDropdown {guilds} {isDemo} />
			{/if}
		</ul>
	</div>
</nav>
