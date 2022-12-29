<script>
	import ProfilesDropdown from '$lib/Dropdowns/ProfilesDropdown.svelte';
	import { page } from '$app/stores';

	let collapseShow = 'hidden';

	function toggleCollapseShow(classes) {
		collapseShow = classes;
	}

	let activeRoute = '/app/dashboard';

	export let guilds;
</script>

<nav
	class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
>
	<div
		class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
	>
		<!-- Toggler -->
		<button
			class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
			type="button"
			on:click={() => toggleCollapseShow('bg-white m-2 py-3 px-6')}
		>
			<i class="fas fa-bars" />
		</button>
		<!-- Brand -->
		<a
			class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
			href="/app/dashboard"
		>
			DiscordWrapped
		</a>
		<!-- User -->
		<ul class="md:hidden items-center flex flex-wrap list-none">
			<li class="inline-block relative">
				{#if guilds && guilds.current}
					<ProfilesDropdown {guilds} />
				{/if}
			</li>
		</ul>
		<!-- Collapse -->
		<div
			class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded {collapseShow}"
		>
			<!-- Collapse header -->
			<div class="md:min-w-full md:hidden block pb-4 mb-4">
				<div class="flex flex-wrap">
					<div class="w-6/12">
						<a
							class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
							href="/app/dashboard"
						>
							DiscordWrapped
						</a>
					</div>
					<div class="w-6/12 flex justify-end">
						<button
							type="button"
							class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
							on:click={() => toggleCollapseShow('hidden')}
						>
							<i class="fas fa-times" />
						</button>
					</div>
				</div>
			</div>

			<!-- Divider -->
			<hr class="my-4 md:min-w-full" />
			<!-- Heading -->
			<h6
				class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
			>
				Menu
			</h6>
			<!-- Navigation -->

			<ul class="md:flex-col md:min-w-full flex flex-col list-none">
				<li class="items-center">
					<a
						href="/app/dashboard"
						class="text-xs uppercase py-3 font-bold block {activeRoute === '/app/dashboard'
							? 'text-red-500 hover:text-red-600'
							: 'text-blueGray-700 hover:text-blueGray-500'}"
						on:click={() => {
							activeRoute = '/app/dashboard';
						}}
					>
						<i
							class="fas fa-tv mr-2 text-sm {activeRoute === '/app/dashboard'
								? 'opacity-75'
								: 'text-blueGray-300'}"
						/>
						Dashboard
					</a>
				</li>
			</ul>

			<!-- Divider -->
			<hr class="my-4 md:min-w-full" />
		</div>
	</div>
</nav>
