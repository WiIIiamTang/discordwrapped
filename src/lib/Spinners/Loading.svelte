<script>
	import { onMount } from 'svelte';

	export let color = '#32266d';
	export let unit = 'px';
	export let duration = '1.2s';
	export let size = '120';
	export let pause = false;
	export let moonSize = +size / 7;
	export let top = +size / 2 - moonSize / 2;

	let fact = '';

	onMount(async () => {
		const res = await fetch('https://dog-api.kinduff.com/api/facts');
		const data = await res.json();
		if (!data.success) {
			fact = '';
		}
		fact = data.facts[0];
	});
</script>

<div class="text-slate-500 my-2 text-lg">Loading...</div>
<div class="spinContainer">
	<div
		class="wrapper"
		class:pause-animation={pause}
		style="--size: {size}{unit}; --color: {color}; --moonSize: {top}{unit}; --duration: {duration};"
	>
		<div class="circle-one" class:pause-animation={pause} />
		<div class="circle-two" class:pause-animation={pause} />
	</div>
</div>
<div class="text-slate-500 my-8 text-md w-3/5 text-center">{fact}</div>

<style>
	.wrapper {
		height: var(--size);
		width: var(--size);
		border-radius: 100%;
		animation: moonStretchDelay var(--duration) 0s infinite linear;
		animation-fill-mode: forwards;
		position: relative;
	}
	.circle-one {
		top: var(--moonSize);
		background-color: var(--color);
		width: calc(var(--size) / 7);
		height: calc(var(--size) / 7);
		border-radius: 100%;
		animation: moonStretchDelay var(--duration) 0s infinite linear;
		animation-fill-mode: forwards;
		opacity: 0.8;
		position: absolute;
	}
	.circle-two {
		opacity: 0.1;
		border: calc(var(--size) / 7) solid var(--color);
		height: var(--size);
		width: var(--size);
		border-radius: 100%;
		box-sizing: border-box;
	}
	.pause-animation {
		animation-play-state: paused;
	}
	@keyframes moonStretchDelay {
		100% {
			transform: rotate(360deg);
		}
	}
</style>
