<script>
	import HomeNavbar from '$lib/Navbars/HomeNavbar.svelte';
	import Footer from '$lib/Footers/Footer.svelte';
</script>

<div>
	<HomeNavbar />
	<main>
		<slot />
	</main>
	<Footer />
</div>
