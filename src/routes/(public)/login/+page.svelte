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
				</div>
			</div>
		</div>
	</div>
</section>
