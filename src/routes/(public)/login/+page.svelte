<script>
	let showModal = false;

	function toggleModal() {
		showModal = !showModal;
	}
</script>

<section class="relative w-full h-full py-40 min-h-screen">
	<div class="absolute top-0 w-full h-full bg-neutral-200 bg-no-repeat bg-full" />
	<div class="container mx-auto px-4 h-full">
		<div class="flex content-center items-center justify-center h-full">
			<div class="w-full lg:w-4/12 px-4">
				<div
					class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-300 border-0"
				>
					<div class="rounded-t mb-0 px-6 py-6">
						<div class="text-center mb-3">
							<h6 class="text-slate-700 text-lg font-bold">Sign in with Discord</h6>
							<i class="fab fa-discord text-5xl text-slate-500" />
						</div>

						<hr class="mt-6 border-b-1 border-slate-300" />
					</div>
					<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
						<div class="text-slate-500 text-center mb-3 font-bold">
							<small>Click the button below to be redirected.</small>
						</div>

						<div class="text-center mt-6">
							<form method="POST" action="/login">
								<button
									class="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
									type="submit"
								>
									Go
								</button>
							</form>
						</div>
					</div>
				</div>
				<div class="flex flex-wrap mt-6 relative">
					<div class="w-1/2">
						<a href="/faq" class="text-slate-500">
							<small>Unable to login?</small>
						</a>
					</div>
					<div class="w-1/2 text-right">
						<a href="#safety" class="text-slate-500" on:click={() => toggleModal()}>
							<small>Safety tip</small>
						</a>
					</div>
				</div>
				{#if showModal}
					<div
						class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
					>
						<div class="relative w-auto my-6 mx-auto max-w-3xl">
							<!--content-->
							<div
								class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
							>
								<!--header-->
								<div
									class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t"
								>
									<h3 class="text-3xl font-semibold">Some things to double-check...</h3>
								</div>
								<!--body-->
								<div class="relative p-6 flex-auto">
									<p class="my-4 text-slate-500 text-lg leading-relaxed">
										If you're logging in with Discord, check that the domain starts with <code
											>https://discord.com</code
										>.
									</p>
									<p class="my-4 text-slate-500 text-lg leading-relaxed">
										Check that the external application is called "billbot". It should be active
										since Sep 15, 2021. Verify that it will redirect you back to this website. These
										are the permissions it will ask for:
									</p>
									<ul class="my-4 text-slate-500 text-lg leading-relaxed list-disc">
										<li class="mx-6">Username, avatar, banner</li>
										<li class="mx-6">Know what servers you're in</li>
									</ul>
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
		</div>
	</div>
</section>
