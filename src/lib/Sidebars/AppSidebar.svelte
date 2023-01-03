<script>
	import ProfilesDropdown from '$lib/Dropdowns/ProfilesDropdown.svelte';
	import { page } from '$app/stores';

	let collapseShow = 'hidden';

	function toggleCollapseShow(classes) {
		collapseShow = classes;
	}

	let activeRoute = $page.url.pathname;

	if (activeRoute === '/app') {
		activeRoute = '/app/activities';
	}

	export let guilds;
	export let preferences;
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
			class="md:block text-left md:pb-2 text-black mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
			href="/app/activities"
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
							class="md:block text-left md:pb-2 text-slate-500 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
							href="/app/activities"
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
				class="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
			>
				Menu
			</h6>
			<!-- Navigation -->

			<ul class="md:flex-col md:min-w-full flex flex-col list-none">
				<li class="items-center">
					<a
						href="/app/activities"
						class="text-xs uppercase py-3 font-bold block {activeRoute === '/app/activities'
							? 'text-indigo-800 hover:text-indigo-600'
							: 'text-slate-800 hover:text-slate-500'}"
						on:click={() => {
							activeRoute = '/app/activities';
						}}
					>
						<i
							class="fas fa-tv mr-2 text-sm {activeRoute === '/app/activities'
								? 'opacity-75'
								: 'text-slate-300'}"
						/>
						Activities
					</a>
				</li>

				<li class="items-center">
					<a
						href="/app/interactions"
						class="text-xs uppercase py-3 font-bold block {activeRoute === '/app/interactions'
							? 'text-indigo-800 hover:text-indigo-600'
							: 'text-slate-800 hover:text-slate-500'}"
						on:click={() => {
							activeRoute = '/app/interactions';
						}}
					>
						<i
							class="fa-regular fa-map mr-2 text-sm {activeRoute === '/app/interactions'
								? 'opacity-75'
								: 'text-slate-300'}"
						/>
						Interactions
					</a>
				</li>

				<li class="items-center">
					<a
						href="/app/messages"
						class="text-xs uppercase py-3 font-bold block {activeRoute === '/app/messages'
							? 'text-indigo-800 hover:text-indigo-600'
							: 'text-slate-800 hover:text-slate-500'}"
						on:click={() => {
							activeRoute = '/app/messages';
						}}
					>
						<i
							class="fa-solid fa-list-check mr-2 text-sm {activeRoute === '/app/messages'
								? 'opacity-75'
								: 'text-slate-300'}"
						/>
						Messages
					</a>
				</li>

				<li class="items-center">
					<a
						href="/app/monitoring"
						class="text-xs uppercase py-3 font-bold block {activeRoute === '/app/monitoring'
							? 'text-indigo-800 hover:text-indigo-600'
							: 'text-slate-800 hover:text-slate-500'}"
						on:click={() => {
							activeRoute = '/app/monitoring';
						}}
					>
						<i
							class="fa-solid fa-magnifying-glass-chart mr-2 text-sm {activeRoute ===
							'/app/monitoring'
								? 'opacity-75'
								: 'text-slate-300'}"
						/>
						Monitoring
					</a>
				</li>

				<li class="items-center">
					<a
						href="/app/users"
						class="text-xs uppercase py-3 font-bold block {activeRoute === '/app/users'
							? 'text-indigo-800 hover:text-indigo-600'
							: 'text-slate-800 hover:text-slate-500'}"
						on:click={() => {
							activeRoute = '/app/users';
						}}
					>
						<i
							class="fa-solid fa-people-arrows mr-2 text-sm {activeRoute === '/app/users'
								? 'opacity-75'
								: 'text-slate-300'}"
						/>
						Users
					</a>
				</li>

				{#if preferences.settings.experimental}
					<li class="items-center">
						<a
							href="/app/download"
							class="text-xs uppercase py-3 font-bold block {activeRoute === '/app/download'
								? 'text-indigo-800 hover:text-indigo-600'
								: 'text-slate-800 hover:text-slate-500'}"
							on:click={() => {
								activeRoute = '/app/download';
							}}
						>
							<i
								class="fa-solid fa-download mr-2 text-sm {activeRoute === '/app/download'
									? 'opacity-75'
									: 'text-slate-300'}"
							/>
							Download
						</a>
					</li>
				{/if}

				<li class="items-center">
					<a
						href="/app/settings"
						class="text-xs uppercase py-3 font-bold block {activeRoute === '/app/settings'
							? 'text-indigo-800 hover:text-indigo-600'
							: 'text-slate-800 hover:text-slate-500'}"
						on:click={() => {
							activeRoute = '/app/settings';
						}}
					>
						<i
							class="fa-solid fa-gear mr-2 text-sm {activeRoute === '/app/settings'
								? 'opacity-75'
								: 'text-slate-300'}"
						/>
						Settings
					</a>
				</li>
			</ul>

			<!-- Divider -->
			<hr class="my-4 md:min-w-full" />
			<h6
				class="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
			>
				Tools
			</h6>
			<!-- Navigation -->

			<ul class="md:flex-col md:min-w-full flex flex-col list-none justify-center">
				<li class="items-center">
					<a
						href="/api_info"
						class="text-xs uppercase py-3 font-bold block text-slate-800 hover:text-slate-500"
					>
						<i class="fa-solid fa-bookmark mr-2 ml-[1px] text-sm text-slate-300" /> API Docs
					</a>
				</li>

				<li class="items-center">
					<a
						href="/manage"
						class="text-xs uppercase py-3 font-bold block text-slate-800 hover:text-slate-500"
					>
						<i class="fa-solid fa-shield mr-2 ml-0 text-sm text-slate-300" />Admin Panel
					</a>
				</li>
			</ul>
		</div>
	</div>
</nav>
