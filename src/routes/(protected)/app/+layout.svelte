<script>
	import AppNavbar from '$lib/Navbars/AppNavbar.svelte';
	import AppSidebar from '$lib/Sidebars/AppSidebar.svelte';
	import HeaderStats from '$lib/Headers/HeaderStats.svelte';

	export let data;
	console.log('from app/layout.svelte', data);
</script>

<div>
	<AppSidebar />
	<div class="relative md:ml-64 bg-blueGray-100">
		<AppNavbar {data} />
		<HeaderStats {data} />
		<div class="px-4 md:px-10 mx-auto w-full -m-24">
			<slot />
		</div>
	</div>
</div>
