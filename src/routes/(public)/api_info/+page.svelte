<script>
	import Codeblock from '$lib/Cards/Codeblock.svelte';
</script>

<section class="pb-20 pt-16 relative w-full h-full min-h-screen bg-neutral-200 -mt-24">
	<div class="container mx-auto px-4">
		<div class="flex flex-wrap items-center mt-32">
			<div class="w-full md:w-5/12 px-4 pt-10 mr-auto ml-auto">
				<p class="text-lg font-light leading-relaxed mt-4 mb-4 text-stone-600">
					Fetch stats for your server programmatically.
				</p>

				<h3 class="text-3xl mb-2 font-semibold leading-normal">API Info</h3>
				<p>
					If you'd like to save your server's data for use elsewhere, you can use this service. The
					base URL for the api is <code>/api</code>. An early version of the Downloads page allows
					you to use this easily. If you can't use the dashboard, keep on reading!
				</p>
				<br />
				<p>
					You <strong>must</strong> be authenticated (logged into Discord on this site) to use this api.
					This means the cookies must be set in the request if you're using it elsewhere. For example,
					if you're consuming this api in your script, you can set the cookies when sending the request:
				</p>
				<br />
				<Codeblock
					gistURL={'https://gist.github.com/WiIIiamTang/5409452b469e8354f6d19f551d3de847'}
					title="Example"
				/>

				<h3 class="text-3xl mb-2 font-semibold leading-normal">Limits</h3>
				<p>
					This is not meant for use in real time applications or other programs that would make a
					lot of requests. Because of this, users have a limit on the number of requests they can
					make per minute.
				</p>
				<ul class="list-inside list-disc ml-2">
					<li>On <code>/admin</code> endpoints, you are limited to 20 requests per minute.</li>
					<li>On <code>/data</code> endpoints, you are limited to 4 requests per minute.</li>
				</ul>
				<br />
				<p>
					The limit of requests is <i>shared</i> across all endpoints, per minute. For example, if
					you make 11 requests in a minute to <code>/admin</code>, you will be rate limited on
					<code>/data</code>
					endpoints because it's over 4 per minute already.
				</p>

				<div class="mb-2 mt-10 pt-4 border-t-2 border-neutral-300">
					<h3 class="text-3xl  font-semibold leading-normal">Admin</h3>
					<code class="text-sm">/admin</code>
				</div>
				<p>
					Only users that are admins can use this endpoint. Otherwise, the request is redirected to
					<code>/unauthorized_admin</code> with status of 307.
				</p>
				<div class="mb-2 mt-1">
					<h3 class="text-xl mb-1 font-semibold leading-normal">Get guild allowlist</h3>
					<span class="bg-emerald-500 rounded-xl px-2 border-emerald-600 border-2">GET</span>
					<code class="text-sm">/admin/guild_allow</code>
				</div>
				<p>Returns the list of guilds on the allowlist for billbot and DiscordWrapped.</p>
				<br />
				<p>Example response:</p>
				<Codeblock
					gistURL={'https://gist.github.com/WiIIiamTang/b819a6a047b44b3b5ea538eae996a6df'}
				/>

				<div class="mb-2 mt-1">
					<h3 class="text-xl mb-1 font-semibold leading-normal">Add guild to allowlist</h3>
					<span class="bg-sky-500 rounded-xl px-2 border-sky-600 border-2">POST</span>
					<code class="text-sm">/admin/guild_allow</code>
				</div>
				<p>Add a guild to the allowlist. JSON params:</p>
				<div class="relative overflow-x-auto rounded-lg border-2">
					<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead
							class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#333] dark:text-gray-400"
						>
							<tr>
								<th scope="col" class="px-6 py-3"> Param </th>
								<th scope="col" class="px-6 py-3"> Type </th>
								<th scope="col" class="px-6 py-3"> Description </th>
							</tr>
						</thead>
						<tbody>
							<tr class="bg-white border-b dark:bg-[#333] dark:border-gray-700">
								<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
									id
								</th>
								<td class="px-6 py-4"> String </td>
								<td class="px-6 py-4"> The guild id to add to the allowlist. </td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="mb-2 mt-4">
					<h3 class="text-xl mb-1 font-semibold leading-normal">Delete guild from allowlist</h3>
					<span class="bg-rose-300 rounded-xl px-2 border-rose-400 border-2">DELETE</span>
					<code class="text-sm">/admin/guild_allow</code>
				</div>
				<p>Delete a guild from the allowlist. JSON params:</p>
				<div class="relative overflow-x-auto rounded-lg border-2">
					<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead
							class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#333] dark:text-gray-400"
						>
							<tr>
								<th scope="col" class="px-6 py-3"> Param </th>
								<th scope="col" class="px-6 py-3"> Type </th>
								<th scope="col" class="px-6 py-3"> Description </th>
							</tr>
						</thead>
						<tbody>
							<tr class="bg-white border-b dark:bg-[#333] dark:border-gray-700">
								<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
									id
								</th>
								<td class="px-6 py-4"> String </td>
								<td class="px-6 py-4"> The guild id to add to the allowlist. </td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="mb-2 mt-4">
					<h3 class="text-xl mb-1 font-semibold leading-normal">Get member allowlist</h3>
					<span class="bg-emerald-500 rounded-xl px-2 border-emerald-600 border-2">GET</span>
					<code class="text-sm">/admin/member_allow</code>
				</div>
				<p>Returns the list of members on the allowlist for billbot and DiscordWrapped.</p>
				<br />
				<p>Example response:</p>
				<Codeblock
					gistURL={'https://gist.github.com/WiIIiamTang/c0758dbb3696d2ed415c7eb6ee14a220'}
				/>

				<div class="mb-2 mt-1">
					<h3 class="text-xl mb-1 font-semibold leading-normal">Add member to allowlist</h3>
					<span class="bg-sky-500 rounded-xl px-2 border-sky-600 border-2">POST</span>
					<code class="text-sm">/admin/member_allow</code>
				</div>
				<p>Add a member to the allowlist. JSON params:</p>
				<div class="relative overflow-x-auto rounded-lg border-2">
					<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead
							class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#333] dark:text-gray-400"
						>
							<tr>
								<th scope="col" class="px-6 py-3"> Param </th>
								<th scope="col" class="px-6 py-3"> Type </th>
								<th scope="col" class="px-6 py-3"> Description </th>
							</tr>
						</thead>
						<tbody>
							<tr class="bg-white border-b dark:bg-[#333] dark:border-gray-700">
								<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
									id
								</th>
								<td class="px-6 py-4"> String </td>
								<td class="px-6 py-4"> The member id to add to the allowlist. </td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="mb-2 mt-4">
					<h3 class="text-xl mb-1 font-semibold leading-normal">Delete member from allowlist</h3>
					<span class="bg-rose-300 rounded-xl px-2 border-rose-400 border-2">DELETE</span>
					<code class="text-sm">/admin/member_allow</code>
				</div>
				<p>Delete a member from the allowlist. JSON params:</p>
				<div class="relative overflow-x-auto rounded-lg border-2">
					<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead
							class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#333] dark:text-gray-400"
						>
							<tr>
								<th scope="col" class="px-6 py-3"> Param </th>
								<th scope="col" class="px-6 py-3"> Type </th>
								<th scope="col" class="px-6 py-3"> Description </th>
							</tr>
						</thead>
						<tbody>
							<tr class="bg-white border-b dark:bg-[#333] dark:border-gray-700">
								<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
									id
								</th>
								<td class="px-6 py-4"> String </td>
								<td class="px-6 py-4"> The member id to add to the allowlist. </td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="mb-2 mt-4">
					<h3 class="text-xl mb-1 font-semibold leading-normal">Get Guild Achievements</h3>
					<span class="bg-emerald-500 rounded-xl px-2 border-emerald-600 border-2">GET</span>
					<code class="text-sm">{'/admin/achievements/{guild_id}'}</code>
				</div>
				<p>
					Returns the list of achievements for the specified guild. If an id is not included, the
					response will still be OK, but the <code>success</code> will be false. If the id is not valid
					(no guild achievements were found), this will return a 404 error. Notify your admin if this
					happens - a guild entry needs to be manually added to the database to start tracking custom
					achievements.
				</p>
				<br />

				<p>Example of a successful response:</p>
				<Codeblock
					gistURL={'https://gist.github.com/WiIIiamTang/05f7fb1c334af612638aff576e370cf3'}
				/>

				<div class="mb-2 mt-1">
					<h3 class="text-xl mb-1 font-semibold leading-normal">Add achievement to guild</h3>
					<span class="bg-sky-500 rounded-xl px-2 border-sky-600 border-2">POST</span>
					<code class="text-sm">/admin/achievements</code>
				</div>
				<p>Add a custom achievement to your guild. JSON params:</p>
				<div class="relative overflow-x-auto rounded-lg border-2">
					<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead
							class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#333] dark:text-gray-400"
						>
							<tr>
								<th scope="col" class="px-6 py-3"> Param </th>
								<th scope="col" class="px-6 py-3"> Type </th>
								<th scope="col" class="px-6 py-3"> Description </th>
							</tr>
						</thead>
						<tbody>
							<tr class="bg-white border-b dark:bg-[#333] dark:border-gray-700">
								<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
									name
								</th>
								<td class="px-6 py-4"> String </td>
								<td class="px-6 py-4">
									The stat category the achievement is tracking. This can be one of: messages,
									voice, activities, status, bot, voice_state</td
								>
							</tr>
							<tr class="bg-white border-b dark:bg-[#333] dark:border-gray-700">
								<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
									custom_name
								</th>
								<td class="px-6 py-4"> String </td>
								<td class="px-6 py-4">
									The achievement name. This is displayed to the user, and not <code>name</code>.
								</td>
							</tr>
							<tr class="bg-white border-b dark:bg-[#333] dark:border-gray-700">
								<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
									custom_note
								</th>
								<td class="px-6 py-4"> String </td>
								<td class="px-6 py-4"> The achievement description.</td>
							</tr>
							<tr class="bg-white border-b dark:bg-[#333] dark:border-gray-700">
								<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
									threshold
								</th>
								<td class="px-6 py-4"> String </td>
								<td class="px-6 py-4">
									An integer representing the threshold the user should meet in order to "complete"
									the achievement (e.g., "200" if you want to create an achievement after sending
									200 messages)</td
								>
							</tr>
							<tr class="bg-white border-b dark:bg-[#333] dark:border-gray-700">
								<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
									category_name?
								</th>
								<td class="px-6 py-4"> String </td>
								<td class="px-6 py-4">
									This <strong>must</strong> be included in the body data if the achievement
									<code>name</code>
									is one of the following: status, voice_state, bot. It defines the
									<i>sub-category</i> to track in that category name (e.g., "online" for the status category,
									"self_mute" for the voice_state category, "audio" for the bot category)
								</td>
							</tr>
							<tr class="bg-white border-b dark:bg-[#333] dark:border-gray-700">
								<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
									guild_id
								</th>
								<td class="px-6 py-4"> String </td>
								<td class="px-6 py-4"> The guild id to create the achievement in. </td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="mb-2 mt-4">
					<h3 class="text-xl mb-1 font-semibold leading-normal">Delete achievement from guild</h3>
					<span class="bg-rose-300 rounded-xl px-2 border-rose-400 border-2">DELETE</span>
					<code class="text-sm">/admin/achievements</code>
				</div>
				<p>
					Delete an achievement from a guild. The full achievement data must be provided and match
					on all fields. JSON params:
				</p>
				<div class="relative overflow-x-auto rounded-lg border-2">
					<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead
							class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#333] dark:text-gray-400"
						>
							<tr>
								<th scope="col" class="px-6 py-3"> Param </th>
								<th scope="col" class="px-6 py-3"> Type </th>
								<th scope="col" class="px-6 py-3"> Description </th>
							</tr>
						</thead>
						<tbody>
							<tr class="bg-white border-b dark:bg-[#333] dark:border-gray-700">
								<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
									name
								</th>
								<td class="px-6 py-4"> String </td>
								<td class="px-6 py-4">
									The stat category the achievement is tracking. This can be one of: messages,
									voice, activities, status, bot, voice_state</td
								>
							</tr>
							<tr class="bg-white border-b dark:bg-[#333] dark:border-gray-700">
								<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
									custom_name
								</th>
								<td class="px-6 py-4"> String </td>
								<td class="px-6 py-4">
									The achievement name. This is displayed to the user, and not <code>name</code>.
								</td>
							</tr>
							<tr class="bg-white border-b dark:bg-[#333] dark:border-gray-700">
								<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
									custom_note
								</th>
								<td class="px-6 py-4"> String </td>
								<td class="px-6 py-4"> The achievement description.</td>
							</tr>
							<tr class="bg-white border-b dark:bg-[#333] dark:border-gray-700">
								<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
									threshold
								</th>
								<td class="px-6 py-4"> String </td>
								<td class="px-6 py-4">
									An integer representing the threshold the user should meet in order to "complete"
									the achievement (e.g., "200" if you want to create an achievement after sending
									200 messages)</td
								>
							</tr>
							<tr class="bg-white border-b dark:bg-[#333] dark:border-gray-700">
								<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
									category_name?
								</th>
								<td class="px-6 py-4"> String </td>
								<td class="px-6 py-4">
									This <strong>must</strong> be included in the body data if the achievement
									<code>name</code>
									is one of the following: status, voice_state, bot. It defines the
									<i>sub-category</i> to track in that category name (e.g., "online" for the status category,
									"self_mute" for the voice_state category, "audio" for the bot category)
								</td>
							</tr>
							<tr class="bg-white border-b dark:bg-[#333] dark:border-gray-700">
								<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
									guild_id
								</th>
								<td class="px-6 py-4"> String </td>
								<td class="px-6 py-4"> The guild id from which to delete the achievement. </td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="mb-2 mt-12 pt-4 border-t-2 border-neutral-300">
					<h3 class="text-3xl  font-semibold leading-normal">Data</h3>
					<code class="text-sm">/data</code>
				</div>
				<p>
					Only authenticated users can access this endpoint. Their ids must be on the allowlist.
					Otherwise, the request will be redirected to <code>/unauthorized</code> with a status code
					of 302. If applicable, your browser cookies for the current login session will also be
					reset at this point.
					<br />
					Currently only returns data from one server (the guild id does <i>not</i> need to be set).
				</p>
				<div class="mb-2 mt-2">
					<h3 class="text-xl mb-1 font-semibold leading-normal">Get data archive</h3>
					<div class="flex flex-row items-center">
						<span class="bg-emerald-500 mr-2 rounded-xl px-2 border-emerald-600 border-2">GET</span>
						<div class="flex flex-col">
							<code class="text-sm">{'/data/archive/{date}'}</code>
							<code class="text-sm">{'/data/archive'}</code>
						</div>
					</div>
				</div>
				<p>
					Returns the complete data for the guild. If a date is specified, returns the complete data
					recorded at that date.
				</p>
				<br />
				<p>Query string params:</p>
				<div class="relative overflow-x-auto rounded-lg border-2">
					<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead
							class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#333] dark:text-gray-400"
						>
							<tr>
								<th scope="col" class="px-6 py-3"> Param </th>
								<th scope="col" class="px-6 py-3"> Type </th>
								<th scope="col" class="px-6 py-3"> Description </th>
							</tr>
						</thead>
						<tbody>
							<tr class="bg-white border-b dark:bg-[#333] dark:border-gray-700">
								<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
									date
								</th>
								<td class="px-6 py-4"> String </td>
								<td class="px-6 py-4">
									The date must be formatted like {'YYYY-MM-DD'}, such as 2022-12-24.
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<p class="mt-1">Example response:</p>
				<Codeblock
					gistURL={'https://gist.github.com/WiIIiamTang/757d6b169f1e2b55be739c0be758b38e'}
				/>

				<div class="mb-2 mt-4">
					<h3 class="text-xl mb-1 font-semibold leading-normal">Get messages</h3>
					<div class="flex flex-row items-center">
						<span class="bg-emerald-500 mr-2 rounded-xl px-2 border-emerald-600 border-2">GET</span>
						<div class="flex flex-col">
							<code class="text-sm">{'/data/messages'}</code>
						</div>
					</div>
				</div>
				<p>Returns the current messages data object (see <code>/data/archive</code>).</p>

				<div class="mb-2 mt-4">
					<h3 class="text-xl mb-1 font-semibold leading-normal">Get activities</h3>
					<div class="flex flex-row items-center">
						<span class="bg-emerald-500 mr-2 rounded-xl px-2 border-emerald-600 border-2">GET</span>
						<div class="flex flex-col">
							<code class="text-sm">{'/data/activities'}</code>
						</div>
					</div>
				</div>
				<p>Returns the current activities data object (see <code>/data/archive</code>).</p>

				<div class="mb-2 mt-4">
					<h3 class="text-xl mb-1 font-semibold leading-normal">Get status</h3>
					<div class="flex flex-row items-center">
						<span class="bg-emerald-500 mr-2 rounded-xl px-2 border-emerald-600 border-2">GET</span>
						<div class="flex flex-col">
							<code class="text-sm">{'/data/status'}</code>
						</div>
					</div>
				</div>
				<p>Returns the current status data object (see <code>/data/archive</code>).</p>

				<div class="mb-2 mt-4">
					<h3 class="text-xl mb-1 font-semibold leading-normal">Get voice</h3>
					<div class="flex flex-row items-center">
						<span class="bg-emerald-500 mr-2 rounded-xl px-2 border-emerald-600 border-2">GET</span>
						<div class="flex flex-col">
							<code class="text-sm">{'/data/voice'}</code>
						</div>
					</div>
				</div>
				<p>Returns the current voice data object (see <code>/data/archive</code>).</p>
			</div>
		</div>
	</div>
</section>
