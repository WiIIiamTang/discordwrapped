<script>
	export let data;
</script>

<footer class="block py-12">
	<div class="w-full mx-auto px-4">
		<hr class="mb-4 border-b-1 border-slate-200" />
		<div class="flex flex-wrap items-center md:justify-between justify-center">
			<div class="w-full md:w-4/12 px-4">
				<div class="text-sm text-slate-400 py-1 text-center md:text-left flex flex-row gap-4">
					<a href="/" class="text-sm py-1"> Home </a>
					<form action="/logout" method="POST">
						<button type="submit" class=" text-sm py-1">Logout</button>
					</form>
				</div>
			</div>
			<div class="w-full md:w-8/12 px-4">
				<ul class="flex flex-wrap list-none md:justify-end justify-center">
					{#if data}
						<li>
							<p class="text-slate-400 text-sm block py-1 px-3">
								diswrapped-{data.sha}-{data.date}
							</p>
						</li>
					{/if}
				</ul>
			</div>
		</div>
	</div>
</footer>
