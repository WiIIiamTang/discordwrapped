<script>
	import HomeNavbar from '$lib/Navbars/HomeNavbar.svelte';
	import Footer from '$lib/Footers/Footer.svelte';

	export let data;
</script>

<div>
	<HomeNavbar login_link={data.login_link} />
	<main>
		<slot />
	</main>
	<Footer />
</div>
