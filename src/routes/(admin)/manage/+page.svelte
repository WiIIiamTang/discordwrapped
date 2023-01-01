<script>
	export let data;
	export let form;

	let userin = data;
</script>

{#if !userin}
	<a href="/login">Login</a>
{:else}
	<div class="h-screen w-full bg-neutral-200">
		<h1 class="text-4xl text-slate-700">admin menu</h1>
		<div>
			<p>Guilds allowed: {JSON.stringify(data.guilds_allow.guilds)}</p>
			<p>Members allowed: {JSON.stringify(data.members_allow.members)}</p>
		</div>

		<div class="grid grid-cols-2 gap-1 w-fit">
			<div class="h-fit bg-slate-400 w-fit p-5 rounded-lg">
				<h2>add guild</h2>
				<form action="?/addguild" method="POST">
					<input type="text" name="guild_id" placeholder="guild id" />
					<button type="submit">add</button>
				</form>
			</div>

			<div class="h-fit bg-slate-400 w-fit p-5 rounded-lg">
				<h2>add member</h2>
				<form action="?/addmember" method="POST">
					<input type="text" name="member_id" placeholder="member id" />
					<button type="submit">add</button>
				</form>
			</div>

			<div class="h-fit bg-slate-400 w-fit p-5 rounded-lg">
				<h2>delete guild</h2>
				<form action="?/deleteguild" method="POST">
					<input type="text" name="guild_id" placeholder="guild id" />
					<button type="submit">add</button>
				</form>
			</div>

			<div class="h-fit bg-slate-400 w-fit p-5 rounded-lg">
				<h2>delete member</h2>
				<form action="?/deletemember" method="POST">
					<input type="text" name="member_id" placeholder="member id" />
					<button type="submit">add</button>
				</form>
			</div>
		</div>

		{#if form}
			<div>
				Form data response: {JSON.stringify(form)}
			</div>
		{/if}
	</div>
{/if}
