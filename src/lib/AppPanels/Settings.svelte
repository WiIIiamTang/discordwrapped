<script>
	import { page } from '$app/stores';

	export let data;

	let form_data = {};

	if ($page.form) {
		form_data = { ...$page.form };
	}

	$: {
		if ($page.form && $page.form.saved) {
			data.userPreferences.settings = $page.form;
		}
	}
</script>

<div class="flex flex-wrap">
	{#if $page.form}
		<div class="w-full lg:w-12/12 px-4">
			<div
				class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg {$page
					.form.saved
					? 'bg-green-200'
					: 'bg-red-200'} border-0"
			>
				<p class="text-center {$page.form.saved ? 'text-emerald-800' : 'text-red-800'} py-3">
					{$page.form.saved
						? 'Settings saved!'
						: 'Something went wrong when saving your preferences. Try again later.'}
				</p>
			</div>
		</div>
	{/if}
	<div class="w-full lg:w-12/12 px-4">
		<div
			class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0"
		>
			<div class="rounded-t bg-white mb-0 px-6 py-6">
				<div class="text-center flex justify-between">
					<h6 class="text-slate-700 text-xl font-bold">Settings</h6>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				<form action="?/settingssave" method="POST">
					<h6 class="text-slate-400 text-sm mt-3  font-bold uppercase">User Information</h6>
					<p class="mb-6 text-sm text-slate-400">
						Shows who you are currently logged in as. The info cannot be changed from this website.
						These fields won't be submitted in the form.
					</p>
					<div class="flex flex-wrap">
						<div class="w-full lg:w-6/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="grid-username"
								>
									Username
								</label>
								<input
									id="grid-username"
									type="text"
									class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									value={data.user.username}
									disabled
								/>
							</div>
						</div>
						<div class="w-full lg:w-6/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="grid-discriminator"
								>
									Discriminator
								</label>
								<input
									id="grid-discriminator"
									type="text"
									class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									value={data.user.discriminator}
									disabled
								/>
							</div>
						</div>
						<div class="w-full lg:w-6/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block uppercase text-slate-600 text-xs font-bold mb-2" for="grid-id">
									ID
								</label>
								<input
									id="grid-id"
									type="text"
									class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									value={data.user.id}
									disabled
								/>
							</div>
						</div>
						<div class="w-full lg:w-6/12 px-4">
							<div class="relative w-full mb-3">
								<p class="block uppercase text-slate-600 text-xs font-bold mb-2">Avatar</p>
								<div>
									{#if data.user.avatar}
										<img
											class="rounded-full w-12 h-12 align-middle border-none shadow-lg"
											alt="user avatar profile pic"
											src={`https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.png`}
										/>
									{:else}
										<img
											class="rounded-full w-12 h-12 align-middle border-none shadow-lg"
											alt="user avatar placeholder pic"
											src="/placeholder.png"
										/>
									{/if}
								</div>
							</div>
						</div>
					</div>

					<hr class="mt-6 border-b-1 border-slate-300" />

					<h6 class="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
						Card Display: Activities
					</h6>
					<div class="flex flex-wrap">
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="activity-guild-totals"
								>
									Guild totals
								</label>
								<input
									id="activity-guild-totals"
									name="activityguildtotals"
									type="checkbox"
									class="border-0 w-full px-3 py-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow focus:outline-none focus:outline-0 ease-linear transition-all duration-150"
									bind:checked={data.userPreferences.settings.activityguildtotals}
								/>
							</div>
						</div>
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="card-popular"
								>
									Popular
								</label>
								<input
									id="card-popular"
									name="activitypopular"
									type="checkbox"
									class="border-0 px-3 py-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									bind:checked={data.userPreferences.settings.activitypopular}
								/>
							</div>
						</div>
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="card-trends"
								>
									Trends
								</label>
								<input
									id="card-trends"
									type="checkbox"
									name="activitytrends"
									class="border-0 px-3 py-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									bind:checked={data.userPreferences.settings.activitytrends}
								/>
							</div>
						</div>
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="card-top-users"
								>
									Top Users
								</label>
								<input
									id="card-top-users"
									type="checkbox"
									name="activitytopusers"
									class="border-0 px-3 py-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									bind:checked={data.userPreferences.settings.activitytopusers}
								/>
							</div>
						</div>
					</div>
					<hr class="mt-6 border-b-1 border-slate-300" />

					<h6 class="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
						Card Display: Interactions
					</h6>
					<div class="flex flex-wrap">
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="card-network"
								>
									Network
								</label>
								<input
									id="card-network"
									name="interactionnetwork"
									type="checkbox"
									class="border-0 w-full px-3 py-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
									bind:checked={data.userPreferences.settings.interactionnetwork}
								/>
							</div>
						</div>
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="card-relationship-chart"
								>
									Relationships
								</label>
								<input
									id="card-relationship-chart"
									name="interactionrelationshipchart"
									type="checkbox"
									class="border-0 px-3 py-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									bind:checked={data.userPreferences.settings.interactionrelationshipchart}
								/>
							</div>
						</div>
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block uppercase text-slate-600 text-xs font-bold mb-2" for="card-bot">
									Bot
								</label>
								<input
									id="card-bot"
									type="checkbox"
									name="interactionbot"
									class="border-0 px-3 py-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									bind:checked={data.userPreferences.settings.interactionbot}
								/>
							</div>
						</div>
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="card-voice"
								>
									Voice
								</label>
								<input
									id="card-voice"
									type="checkbox"
									name="interactionvoice"
									class="border-0 px-3 py-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									bind:checked={data.userPreferences.settings.interactionvoice}
								/>
							</div>
						</div>
					</div>
					<hr class="mt-6 border-b-1 border-slate-300" />

					<h6 class="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
						Card Display: Messages
					</h6>
					<div class="flex flex-wrap">
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="card-messageschannel"
								>
									Channel totals
								</label>
								<input
									id="card-messageschannel"
									name="messageschannel"
									type="checkbox"
									class="border-0 w-full px-3 py-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
									bind:checked={data.userPreferences.settings.messageschannel}
								/>
							</div>
						</div>
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="card-messagesuser"
								>
									Top Users
								</label>
								<input
									id="card-messagesuser"
									name="messagesuser"
									type="checkbox"
									class="border-0 w-full px-3 py-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
									bind:checked={data.userPreferences.settings.messagesuser}
								/>
							</div>
						</div>
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="card-freq"
								>
									Frequent Words
								</label>
								<input
									id="card-freq"
									name="messagesfrequentwords"
									type="checkbox"
									class="border-0 w-full px-3 py-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
									bind:checked={data.userPreferences.settings.messagesfrequentwords}
								/>
							</div>
						</div>
					</div>
					<hr class="mt-6 border-b-1 border-slate-300" />

					<h6 class="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
						Card Display: Monitoring
					</h6>
					<div class="flex flex-wrap">
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="card-monitoruserpresence"
								>
									Line Chart
								</label>
								<input
									id="card-monitoruserpresence"
									name="monitoruserpresence"
									type="checkbox"
									class="border-0 w-full px-3 py-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
									bind:checked={data.userPreferences.settings.monitoruserpresence}
								/>
							</div>
						</div>
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="card-monitoruserpresencelog"
								>
									User Logs
								</label>
								<input
									id="card-monitoruserpresencelog"
									name="monitoruserpresencelog"
									type="checkbox"
									class="border-0 w-full px-3 py-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
									bind:checked={data.userPreferences.settings.monitoruserpresencelog}
								/>
							</div>
						</div>
					</div>
					<hr class="mt-6 border-b-1 border-slate-300" />

					<h6 class="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">Card Display: Users</h6>
					<div class="flex flex-wrap">
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="card-usersactivity"
								>
									Activity
								</label>
								<input
									id="card-usersactivity"
									name="usersactivity"
									type="checkbox"
									class="border-0 w-full px-3 py-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
									bind:checked={data.userPreferences.settings.usersactivity}
								/>
							</div>
						</div>
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="card-usersmessages"
								>
									Messages&Voice
								</label>
								<input
									id="card-usersmessages"
									name="usersmessages"
									type="checkbox"
									class="border-0 w-full px-3 py-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
									bind:checked={data.userPreferences.settings.usersmessages}
								/>
							</div>
						</div>
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="card-usersachieve"
								>
									Achievements
								</label>
								<input
									id="card-usersachieve"
									name="usersachieve"
									type="checkbox"
									class="border-0 w-full px-3 py-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
									bind:checked={data.userPreferences.settings.usersachieve}
								/>
							</div>
						</div>
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="card-usersheatmap"
								>
									Heatmap
								</label>
								<input
									id="card-usersheatmap"
									name="usersheatmap"
									type="checkbox"
									class="border-0 w-full px-3 py-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
									bind:checked={data.userPreferences.settings.usersheatmap}
								/>
							</div>
						</div>
					</div>
					<hr class="mt-6 border-b-1 border-slate-300" />

					<h6 class="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">Misc</h6>
					<div class="flex flex-wrap">
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label
									class="block uppercase text-slate-600 text-xs font-bold mb-2"
									for="card-experimental"
								>
									Experimental features
								</label>
								<input
									id="card-experimental"
									name="experimental"
									type="checkbox"
									class="border-0 w-full px-3 py-4 placeholder-slate-300 text-slate-600 bg-slate-100 rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
									bind:checked={data.userPreferences.settings.experimental}
								/>
							</div>
						</div>
						{#if data.userPreferences.settings.experimental}
							<div class="flex items-center justify-center">
								<p class="text-amber-600 text-sm text-center mt-2">
									These are not stable and may not work as expected.
								</p>
							</div>
						{/if}
					</div>
					<hr class="mt-6 border-b-1 border-slate-300" />

					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4">
							<div class="relative w-full my-3 flex justify-center">
								<button
									type="submit"
									class="bg-indigo-300 mt-5 w-1/2 text-slate-700 active:bg-slate-50 text-xs font-bold uppercase px-4 py-4 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
									><p class="text-slate-800">Save settings</p></button
								>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
