<script>
	export let data;
</script>

<h1>app page</h1>
<p>{data.user.username}</p>

<form action="/logout" method="POST">
	<button>Log out</button>
</form>
