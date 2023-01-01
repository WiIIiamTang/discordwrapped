<script>
	import gistLoader from 'easy-gist-async';
	import { beforeUpdate, tick } from 'svelte';
	beforeUpdate(async () => {
		await tick();
		gistLoader();
	});
	export let gistURL = '';
</script>

<div data-gist={gistURL} />
