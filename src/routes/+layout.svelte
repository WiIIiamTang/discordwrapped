<script>
	import '../app.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { inject } from '@vercel/analytics';
	import { onMount } from 'svelte';
	import { PUBLIC_RUNTIME_ENV } from '$env/static/public';
	import { navigating, page } from '$app/stores';
	import { browser } from '$app/environment';
	import { webVitals } from '$lib/vitals.js';
	import Loading from '$lib/Spinners/Loading.svelte';

	onMount(() => {
		inject({
			mode: PUBLIC_RUNTIME_ENV === 'DEV' ? 'development' : 'production',
			debug: PUBLIC_RUNTIME_ENV === 'DEV' ? true : false
		});
	});

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;
	$: if (browser && analyticsId && PUBLIC_RUNTIME_ENV === 'PROD') {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});
	}
</script>

{#if ($navigating && $navigating.to.url.pathname.startsWith('/app') && !$navigating.from.url.pathname.startsWith('/app')) || ($navigating && !$navigating.to.url.pathname.startsWith('/app') && $navigating.from.url.pathname.startsWith('/app'))}
	<div
		class="bg-neutral-200 w-full h-screen flex flex-col justify-center content-center items-center"
	>
		<Loading />
	</div>
{:else}
	<slot />
{/if}
