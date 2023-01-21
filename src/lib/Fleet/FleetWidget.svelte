<script>
	export let discordAccountId;
	export let username;
	export let connected = false;
	export let version;
	export let notifications = [];

	let showWidget = false;

	function handleClickLogo() {
		showWidget = !showWidget;
	}
</script>

<div
	id="fleet-widget"
	class={`fixed ${
		showWidget
			? 'h-64 w-64 px-4 py-4 max-w-xs opacity-90 text-opacity-100'
			: 'px-0 py-0 h-0 w-0 opacity-0 text-opacity-0'
	} transition-all backdrop-blur-sm shadow-lg duration-500 ease-in-out bottom-0 right-0 z-40 bg-transparent rounded-3xl border-sky-900 border-2 mr-2 mb-2`}
>
	<div
		class="flex h-full w-full break-before-auto text-xs flex-col flex-wrap justify-center items-center"
	>
		{#if showWidget}
			{#if connected}
				<div>
					<div
						class={`flex flex-col justify-center items-center ${
							showWidget ? 'visible' : 'hidden'
						} h-1/2 w-full`}
					>
						<h2 class="font-semibold text-md text-sky-900">
							Hi {username ? username : discordAccountId}
						</h2>
						<div>
							<img src={'/ship-line.svg'} alt="ship" class="w-14 h-14" />
						</div>
					</div>
					<div>
						<div class="flex flex-col gap-4 max-h-24 w-full overflow-y-auto">
							{#if notifications.length === 0}
								<div class="mt-2">No notifications.</div>
							{:else}
								{#each notifications as n}
									<div
										class="flex flex-col w-full gap-2 px-1 py-1 justify-center items-center border border-slate-700 rounded-md shadow-sm"
									>
										<div>
											<p class="text-slate-600 text-center">
												{n.notificationMessage}
											</p>
										</div>
										<div class="flex flex-row w-full justify-between">
											<div>{n.createdAt.split('T')[0]}</div>
											<div>{n.serviceNameIdentifier}</div>
										</div>
									</div>
								{/each}
							{/if}
						</div>
					</div>
				</div>
			{:else}
				<div>Unable to connect to the fleet network - try again later.</div>
			{/if}
		{/if}
		<div class="mt-auto text-xs text-slate-600 flex flex-row items-center gap-2 w-full">
			{#if version}
				<p>{version}</p>
			{/if}
			<!-- <p>
				<a href="https://fleet.williamtang.me"> fleet.williamtang.me </a>
			</p> -->
		</div>
	</div>
</div>
<button
	on:click={handleClickLogo}
	class={`fixed cursor-pointer ${
		!showWidget && 'hover:border-white hover:bg-slate-600'
	} transition-all duration-500 ease-in-out bottom-0 right-0 z-50 bg-slate-700 rounded-full border-sky-900 border mr-2 mb-2`}
>
	<img src={'/billbotlogo.png'} alt="billbot-fleet logo" class="w-14 h-14 px-1 py-1" />
</button>
