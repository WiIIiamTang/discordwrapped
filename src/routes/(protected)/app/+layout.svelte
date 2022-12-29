<script>
	import AppNavbar from '$lib/Navbars/AppNavbar.svelte';
	import AppSidebar from '$lib/Sidebars/AppSidebar.svelte';
	import HeaderStats from '$lib/Headers/HeaderStats.svelte';
</script>

<div>
	<AppSidebar />
	<div class="relative md:ml-64 bg-blueGray-100">
		<AppNavbar />
		<HeaderStats />
		<div class="px-4 md:px-10 mx-auto w-full -m-24">
			<slot />
		</div>
	</div>
</div>
