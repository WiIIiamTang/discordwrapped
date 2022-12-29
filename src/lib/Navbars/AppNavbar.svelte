<script>
	// core components
	import ProfilesDropdown from '$lib/Dropdowns/ProfilesDropdown.svelte';
	export let data;
	console.log('data from appnavbar', data);
</script>

<!-- Navbar -->
<nav
	class="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4"
>
	<div
		class="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4"
	>
		<!-- Brand -->
		<p class="text-white text-sm uppercase hidden lg:inline-block font-semibold">Server:</p>

		<ul class="flex-col md:flex-row list-none items-center hidden md:flex">
			<ProfilesDropdown {data} />
		</ul>
	</div>
</nav>
