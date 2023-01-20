<script>
	import Download from '$lib/AppPanels/Download.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	onMount(() => {
		if (!data.userPreferences.settings.experimental) {
			goto('/app');
		}
	});
</script>

{#if data.userPreferences.settings.experimental}
	<Download />
{/if}
