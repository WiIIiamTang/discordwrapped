<script>
	import sanitizeHtml from 'sanitize-html';
	import { onMount } from 'svelte';
	export let data;
	export let cloud = false;

	let cachelife = 60 * 30; // 0.5hr
	let rendercloud = '';

	onMount(async () => {
		let cached = localStorage.getItem('rendercloud');
		let expired = true;

		if (cached) {
			cached = JSON.parse(cached);
			expired = parseInt(Date.now() / 1000) - cached.cachetime > cachelife;
		}

		if (cached && !expired) {
			rendercloud = cached.rendercloud;
		} else {
			const text = data
				.filter((word) => !word[0].startsWith('tenor.com'))
				.map((word) => {
					return Array(word[1]).fill(word[0]);
				})
				.flat()
				.join(' ');

			const html = await fetch('https://quickchart.io/wordcloud', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					format: 'svg',
					fontFamily: 'Roboto',
					fontScale: 15,
					scale: 'linear',
					text: text,
					removeStopwords: true
				})
			}).then((res) => res.text());

			rendercloud = html;
			localStorage.setItem(
				'rendercloud',
				JSON.stringify({ rendercloud, cachetime: parseInt(Date.now() / 1000) })
			);
		}
	});
</script>

{#if !cloud}
	<div class="grid 2xl:grid-cols-3 xl:grid-cols-2 gap-4 h-full overflow-auto no-scrollbar">
		{#each data as item}
			<div class="text-zinc-700 h-20 shadow-md flex justify-between pr-3 bg-slate-200 rounded px-2">
				{#if item[0].startsWith('tenor.com')}
					<img class="h-full" src="https://{item[0]}.gif" alt="tenor gif" />
				{:else}
					<p
						class="{item[0].startsWith('@') &&
							'text-indigo-600'} font-bold 2xl:text-sm text-lg overflow-x-auto"
					>
						{item[0]}
					</p>
				{/if}
				<span class="text-sm text-slate-500">{item[1]}</span>
			</div>
		{/each}
	</div>
{:else}
	<div class="h-full w-full resize-x overflow-auto no-scrollbar">
		{@html sanitizeHtml(rendercloud, {
			allowedTags: ['svg', 'text'],
			allowedAttributes: {
				svg: ['width', 'height', 'font-family', 'text-anchor'],
				text: ['font-size', 'transform', 'padding', 'fill']
			}
		}).replace('width="600" height="600"', 'viewBox="0 0 600 600"')}
	</div>
{/if}
