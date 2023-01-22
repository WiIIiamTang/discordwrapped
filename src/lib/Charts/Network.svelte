<script>
	export let graph_data;
	let data = graph_data;

	import { onMount } from 'svelte';
	import { scaleLinear, scaleOrdinal } from 'd3-scale';
	import { zoom, zoomIdentity } from 'd3-zoom';
	import { schemeCategory10 } from 'd3-scale-chromatic';
	import { select, selectAll, pointer } from 'd3-selection';
	import { drag } from 'd3-drag';
	import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide } from 'd3-force';

	let d3 = {
		zoom,
		zoomIdentity,
		scaleLinear,
		scaleOrdinal,
		schemeCategory10,
		select,
		selectAll,
		pointer,
		drag,
		forceSimulation,
		forceLink,
		forceManyBody,
		forceCenter,
		forceCollide
	};

	let graph = data;

	let canvas;
	let width = 800;
	let height = 600;
	let max = 300;
	let activeNode = false;
	let max_value_in_data = graph.links.map((d) => d.value).reduce((a, b) => Math.max(a, b), 0);
	let min_value_in_data = graph.links.map((d) => d.value).reduce((a, b) => Math.min(a, b), 0);

	let links = graph.links.map((d) => Object.create(d));
	let nodes = graph.nodes.map((d) => {
		d.size = Math.pow(
			graph.links
				.filter((link) => link.source == d.id || link.target == d.id)
				.map((link) => link.value)
				.reduce((a, b) => a + Math.sqrt(b), 0),
			2
		);
		return Object.create(d);
	});

	function groupColour(context, d) {
		let nodesize = Math.sqrt(d.size) / 5;
		let radgrad = context.createRadialGradient(d.x, d.y, nodesize / 3, d.x, d.y, nodesize / 1.3);
		radgrad.addColorStop(0, '#01abfc');
		radgrad.addColorStop(0.1, '#01abfc');
		radgrad.addColorStop(1, '#01abfc00');

		let radgrad2 = context.createRadialGradient(d.x, d.y, nodesize / 3, d.x, d.y, nodesize / 1.3);
		radgrad2.addColorStop(0, '#7A17F6');
		radgrad2.addColorStop(0.1, '#7A17F6');
		radgrad2.addColorStop(1, '#7A17F600');

		let radgrad3 = context.createRadialGradient(d.x, d.y, nodesize / 3, d.x, d.y, nodesize / 1.3);
		radgrad3.addColorStop(0, '#B635E3');
		radgrad3.addColorStop(0.1, '#B635E3');
		radgrad3.addColorStop(1, '#B635E300');

		let radgrad4 = context.createRadialGradient(d.x, d.y, nodesize / 3, d.x, d.y, nodesize / 1.3);
		radgrad4.addColorStop(0, '#E4158B');
		radgrad4.addColorStop(0.1, '#E4158B');
		radgrad4.addColorStop(1, '#E4158B00');

		let radgrad5 = context.createRadialGradient(d.x, d.y, nodesize / 3, d.x, d.y, nodesize / 1.3);
		radgrad4.addColorStop(0, '#F9123B');
		radgrad4.addColorStop(0.1, '#F9123B');
		radgrad4.addColorStop(1, '#F9123B00');
		let radgrads = [radgrad, radgrad2, radgrad3, radgrad4, radgrad5];
		return radgrads[d.group % 5];
	}
	let showCard;
	let transform = d3.zoomIdentity;
	let simulation, context;
	let dpi = 1;

	onMount(() => {
		dpi = window.devicePixelRatio || 1;
		context = canvas.getContext('2d');
		resize();
		simulation = d3
			.forceSimulation(nodes)
			.force(
				'link',
				d3
					.forceLink(links)
					.id((d) => d.id)
					.distance((d) => {
						// distance should be inversely proportional to the value of the link
						const base_distance_value = 350;

						// how close do want people who interact a lot to be?
						// this will cap out at some softmax value; exponential 2^{-x} approaching 1 as you increase x.
						const close_multiplier = max_value_in_data - min_value_in_data; // lower = closer, higher = further

						// how strong should the effect of the inverse value be?
						const value_multiplier = 15; // lower = stronger (further) , higher = weaker (closer)

						return (
							base_distance_value * // base value for distance * (some fraction of it)
								Math.pow(2, -(d.value / close_multiplier)) +
							// adds on a value that is inversely proportional to the value of the link
							max_value_in_data / d.value / value_multiplier
						);
					})
			)
			.force('charge', d3.forceManyBody())
			.force('center', d3.forceCenter(width / 2, height / 2))
			.force(
				'collision',
				d3.forceCollide().radius((d) => Math.cbrt(d.size))
			)
			.on('tick', simulationUpdate);

		// title
		d3.select(context.canvas).on('mousemove', (event) => {
			const d = simulation.find(
				transform.invertX(event.offsetX * dpi),
				transform.invertY(event.offsetY * dpi),
				50
			);

			if (d) activeNode = d;
			else activeNode = false;
		});

		d3.select(context.canvas).on('click', () => {
			if (activeNode) {
				showCard = JSON.parse(JSON.stringify({ id: activeNode.id, details: activeNode.details }));
			}
		});

		d3.select(canvas)
			.call(
				d3
					.drag()
					.container(canvas)
					.subject(dragsubject)
					.on('start', dragstarted)
					.on('drag', dragged)
					.on('end', dragended)
			)
			.call(
				d3
					.zoom()
					.scaleExtent([1 / 10, 8])
					.on('zoom', zoomed)
			);
	});

	function simulationUpdate() {
		context.save();
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		context.translate(transform.x, transform.y);
		context.scale(transform.k, transform.k);

		links.forEach((d) => {
			context.beginPath();
			context.moveTo(d.source.x, d.source.y);
			context.lineTo(d.target.x, d.target.y);
			context.globalAlpha = 1.0;
			context.strokeStyle = '#FFFFFF';
			context.lineWidth =
				Math.max(
					((d.value - min_value_in_data) / (max_value_in_data - min_value_in_data)) * 1.9,
					0.01
				) * 3;
			context.stroke();
			context.globalAlpha = 1;
		});

		nodes.forEach((d, i) => {
			context.beginPath();
			context.arc(d.x, d.y, 2 + Math.sqrt(d.size) / 5, 0, 2 * Math.PI);
			context.strokeStyle = 'transparent';
			context.lineWidth = 1.5;
			context.stroke();
			context.fillStyle = groupColour(context, d);
			context.fill();
			if (d.size > max / 50) {
				context.fillStyle = 'white';
				d.id
					.split(/(?=[A-Z])/)
					.forEach((word, index) => context.fillText(word, d.x - 10, d.y + 10 * index));
			}
		});
		context.restore();
	}

	function zoomed(currentEvent) {
		transform = currentEvent.transform;
		simulationUpdate();
	}

	// Use the d3-force simulation to locate the node
	function dragsubject(currentEvent) {
		const node = simulation.find(
			transform.invertX(currentEvent.x * dpi),
			transform.invertY(currentEvent.y * dpi),
			50
		);
		if (node) {
			node.x = transform.applyX(node.x);
			node.y = transform.applyY(node.y);
		}
		return node;
	}

	function dragstarted(currentEvent) {
		if (!currentEvent.active) simulation.alphaTarget(0.3).restart();
		currentEvent.subject.fx = transform.invertX(currentEvent.subject.x);
		currentEvent.subject.fy = transform.invertY(currentEvent.subject.y);
	}

	function dragged(currentEvent) {
		currentEvent.subject.fx = transform.invertX(currentEvent.x);
		currentEvent.subject.fy = transform.invertY(currentEvent.y);
	}

	function dragended(currentEvent) {
		if (!currentEvent.active) simulation.alphaTarget(0);
		currentEvent.subject.fx = null;
		currentEvent.subject.fy = null;
	}

	function resize() {
		dpi = window.devicePixelRatio || 1;

		// ({ width, height } = canvas);
		width = canvas.offsetWidth * dpi;
		height = canvas.offsetHeight * dpi;
	}
	function fitToContainer(node) {
		dpi = window.devicePixelRatio || 1;

		// Make it visually fill the positioned parent
		node.style.height = '100%';
		node.style.width = '100%';
		// ...then set the internal size to match
		node.width = node.offsetWidth * dpi;
		node.height = node.offsetHeight * dpi;
		// node.height = node.width * 1;
		width = node.offsetWidth * dpi;
		height = node.offsetHeight * dpi;
	}

	let showModal = false;

	function toggleModal() {
		showModal = !showModal;
	}
</script>

<svelte:window on:resize={resize} />

<div on:resize={resize} class="h-full networkChartContainer flex flex-row">
	{#if activeNode}
		<breadcrumb id="nodeDetails" class="absolute top-1 left-1 text-white">
			<strong>{activeNode.id.split(/(?=[A-Z])/).join(' ')}</strong>
			<br />
			{#if activeNode.details}
				{#each Object.entries(activeNode.details) as detail}
					{detail[0]}:
					{detail[1]}
					<br />
				{/each}
			{/if}
		</breadcrumb>
	{/if}
	<canvas use:fitToContainer bind:this={canvas} id="networkCanvas" />
	<button
		class="bg-sky-500 absolute top-1 right-4 h-fit text-white active:bg-sky-700 font-bold uppercase text-sm px-3 py-2 rounded-full shadow hover:shadow-lg hover:scale-105 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
		type="button"
		on:click={toggleModal}
	>
		<i class="fas fa-question" />
	</button>
	{#if showModal}
		<div
			class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
		>
			<div class="relative w-auto my-6 mx-auto max-w-sm">
				<!--content-->
				<div
					class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
				>
					<!--header-->
					<div
						class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t"
					>
						<h3 class="text-3xl font-semibold">Help</h3>
					</div>
					<!--body-->
					<div class="relative p-6 flex-auto">
						<p class="my-4 text-slate-500 text-lg leading-relaxed">
							Scroll to zoom in and out. Drag and drop on empty space to pan, drag and drop on a
							node to move it. Hover over a node for more details. Members who have spent less than
							an hour with others are not shown.
						</p>
						<br />
						<p class="my-4 text-slate-500 text-lg leading-relaxed">
							You might need to refresh the page if you resize your window to reset the chart.
						</p>
					</div>
					<!--footer-->
					<div
						class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"
					>
						<button
							class="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							on:click={toggleModal}
						>
							OK
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="opacity-25 fixed inset-0 z-40 bg-black" />
	{/if}
</div>

<style>
	#nodeDetails {
		background-color: rgba(0, 0, 0, 0.5);
		padding: 0.5rem;
		border-radius: 0.5rem;
	}
</style>
