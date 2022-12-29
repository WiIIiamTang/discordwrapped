<script>
	import '../app.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { inject } from '@vercel/analytics';
	import { onMount } from 'svelte';
	import { PUBLIC_RUNTIME_ENV } from '$env/static/public';

	onMount(() => {
		inject({
			mode: PUBLIC_RUNTIME_ENV === 'DEV' ? 'development' : 'production',
			debug: PUBLIC_RUNTIME_ENV === 'DEV' ? true : false
		});
	});
</script>

<slot />
