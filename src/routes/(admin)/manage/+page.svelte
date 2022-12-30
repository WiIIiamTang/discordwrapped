<script>
	export let data;
</script>

<div class="h-screen w-full bg-neutral-200">
	<h1 class="text-4xl text-slate-700">admin menu</h1>
	<div>
		<p>Guilds allowed: {JSON.stringify(data.guilds_allow.guilds)}</p>
		<p>Members allowed: {JSON.stringify(data.members_allow.members)}</p>
	</div>
</div>
