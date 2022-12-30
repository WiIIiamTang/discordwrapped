<script>
	import HomeNavbar from '$lib/Navbars/HomeNavbar.svelte';
	import Footer from '$lib/Footers/Footer.svelte';

	function handleLoginClick() {
		location.href = '/app';
	}
</script>

<div>
	<HomeNavbar />
	<main>
		<div
			class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75"
		>
			<div class="absolute top-0 w-full h-full bg-center bg-cover">
				<span id="blackOverlay" class="w-full h-full absolute opacity-100 bg-neutral-200" />
			</div>
			<div class="container relative mx-auto">
				<div class="items-center flex flex-wrap">
					<div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
						<div class="pr-12">
							<h1 class="text-black font-semibold text-5xl">Discord Wrapped</h1>
							<p class="mt-4 text-lg text-stone-800">Server stats and summaries.</p>
						</div>
					</div>
				</div>
			</div>
			<div
				class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
				style="transform: translateZ(0);"
			>
				<svg
					class="absolute bottom-0 overflow-hidden"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					version="1.1"
					viewBox="0 0 2560 100"
					x="0"
					y="0"
				>
					<polygon class="text-neutral-200 fill-current" points="2560 0 2560 100 0 100" />
				</svg>
			</div>
		</div>

		<section class="pb-20 bg-neutral-200 -mt-24">
			<div class="container mx-auto px-4">
				<div class="flex flex-wrap">
					<div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
						<div
							class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
						>
							<div class="px-4 py-5 flex-auto">
								<div
									class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400"
								>
									<i class="fas fa-award" />
								</div>
								<h6 class="text-xl font-semibold">Uncomplicated summaries and rankings</h6>
								<p class="mt-2 mb-4 text-stone-500">
									Total messages sent, time spent in voice channels, top activities in the server,
									and more.
								</p>
							</div>
						</div>
					</div>

					<div class="w-full md:w-4/12 px-4 text-center">
						<div
							class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
						>
							<div class="px-4 py-5 flex-auto">
								<div
									class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-sky-400"
								>
									<i class="fas fa-fingerprint" />
								</div>
								<h6 class="text-xl font-semibold">Understand your server better</h6>
								<p class="mt-2 mb-4 text-stone-500">
									Get insights on the most active members, channels, commands.
								</p>
							</div>
						</div>
					</div>

					<div class="pt-6 w-full md:w-4/12 px-4 text-center">
						<div
							class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
						>
							<div class="px-4 py-5 flex-auto">
								<div
									class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400"
								>
									<i class="fas fa-retweet" />
								</div>
								<h6 class="text-xl font-semibold">Detailed reports on every user</h6>
								<p class="mt-2 mb-4 text-stone-500">
									Comprehensive reviews of a user include their interactions with other members, how
									their status changes throughout the day, and summaries of their messages sent.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div class="flex flex-wrap items-center mt-32">
					<div class="w-full md:w-5/12 px-4 mr-auto ml-auto">
						<div
							class="text-stone-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white"
						>
							<i class="fas fa-user-friends text-xl" />
						</div>
						<h3 class="text-3xl mb-2 font-semibold leading-normal">Easy to use dashboard</h3>
						<p class="text-lg font-light leading-relaxed mt-4 mb-4 text-stone-600">
							The online dashboard provides an overview of key metrics and customisable graphs,
							separated into different categories.
						</p>
					</div>

					<div class="w-full md:w-4/12 px-4 mr-auto ml-auto">
						<div
							class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-red-400"
						>
							<img alt="..." src="/example1.png" class="w-full align-middle rounded-t-lg" />
							<blockquote class="relative p-8 mb-4">
								<svg
									preserveAspectRatio="none"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 583 95"
									class="absolute left-0 w-full block h-95-px -top-94-px"
								>
									<polygon points="-30,95 583,95 583,65" class="text-red-400 fill-current" />
								</svg>
								<h4 class="text-xl font-bold text-white">Custom monitoring</h4>
								<p class="text-md font-light mt-2 text-white">
									We support messages, status, voice channel, and activity tracking. Bot command
									usage can also be tracked, and most other events can be tracked on request.
								</p>
							</blockquote>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="relative py-20">
			<div
				class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
				style="transform: translateZ(0);"
			>
				<svg
					class="absolute bottom-0 overflow-hidden"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					version="1.1"
					viewBox="0 0 2560 100"
					x="0"
					y="0"
				>
					<polygon class="text-white fill-current" points="2560 0 2560 100 0 100" />
				</svg>
			</div>

			<div class="container mx-auto px-4 pb-40">
				<div class="items-center flex flex-wrap">
					<div class="w-full md:w-4/12 ml-auto mr-auto px-4 max-h-full">
						<img alt="..." class="max-w-full rounded-lg shadow-lg" src="/example2.png" />
					</div>
					<div class="w-full md:w-5/12 ml-auto mr-auto px-4">
						<div class="md:pr-12">
							<div
								class="text-red-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-red-300"
							>
								<i class="fas fa-rocket text-xl" />
							</div>
							<h3 class="text-3xl font-semibold">Build your community efficiently</h3>
							<p class="mt-4 text-lg leading-relaxed text-stone-500">
								Make use of our deeper analytics (like the network of interactions between your
								users) to understand your community better and make moderation easier.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="pb-20 relative block bg-stone-800">
			<div
				class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
				style="transform: translateZ(0);"
			>
				<svg
					class="absolute bottom-0 overflow-hidden"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					version="1.1"
					viewBox="0 0 2560 100"
					x="0"
					y="0"
				>
					<polygon class="text-stone-800 fill-current" points="2560 0 2560 100 0 100" />
				</svg>
			</div>

			<div class="container mx-auto px-4 lg:pt-24 lg:pb-64">
				<div class="flex flex-wrap text-center justify-center">
					<div class="w-full lg:w-6/12 px-4">
						<h2 class="text-4xl font-semibold text-white">Get started</h2>
						<p class="text-lg leading-relaxed mt-4 mb-4 text-stone-400">
							If you have the bot in your server, connect your Discord account so we can verify your
							identity.
						</p>
					</div>
				</div>
				<div class="flex flex-wrap mt-12 justify-center">
					<div class="w-full lg:w-3/12 px-4 text-center">
						<button
							class="bg-indigo-300 text-white active:bg-orange-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							on:click={handleLoginClick}
						>
							Click to login with Discord
						</button>
					</div>
				</div>
			</div>
		</section>
	</main>
	<Footer />
</div>
