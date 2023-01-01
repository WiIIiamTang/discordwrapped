<script>
	import Codeblock from '$lib/Cards/Codeblock.svelte';
	import sanitizeHtml from 'sanitize-html';
</script>

<section class="pb-20 pt-16 relative w-full h-full min-h-screen bg-neutral-200 -mt-24">
	<div class="container mx-auto px-4">
		<div class="flex flex-wrap items-center mt-32">
			<div class="w-full md:w-5/12 px-4 pt-10 mr-auto ml-auto">
				<h3 class="text-3xl mb-2 font-semibold leading-normal">Coming soon</h3>
				<p class="text-lg font-light leading-relaxed mt-4 mb-4 text-stone-600">
					Fetch stats for your server programmatically.
				</p>
				<!-- <Codeblock
					gistURL={'https://gist.github.com/WiIIiamTang/c960bdd82f9f62dbb3d32f9668eda210'}
					title="Example"
				/>
				<Codeblock
					gistURL={'https://gist.github.com/WiIIiamTang/c960bdd82f9f62dbb3d32f9668eda210'}
					title="Example"
				/> -->
				{@html sanitizeHtml(
					'<svg xmlns="http://www.w3.org/2000/svg" width="500" height="300" font-family="Roboto" text-anchor="middle"><text font-size="15" transform="translate(261,112) rotate(6.070628704484573)" padding="2px" fill="#f200b2">hello</text><text font-size="15" transform="translate(212,142) rotate(-4.523426290044892)" padding="2px" fill="#00f2ea">world</text></svg>',
					{
						allowedTags: ['svg', 'text'],
						allowedAttributes: {
							svg: ['width', 'height', 'font-family', 'text-anchor'],
							text: ['font-size', 'transform', 'padding', 'fill']
						}
					}
				)}
			</div>
		</div>
	</div>
</section>
