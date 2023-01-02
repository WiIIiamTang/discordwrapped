<script>
	let navbarOpen = false;

	function setNavbarOpen() {
		navbarOpen = !navbarOpen;
	}

	function handleLoginClick() {
		location.href = '/app';
	}

	export let login_link = '/login';
</script>

<nav
	class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg"
>
	<div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
		<div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
			<a
				class="text-black text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
				href="/"
			>
				DiscordWrapped
			</a>
			<button
				class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
				type="button"
				on:click={setNavbarOpen}
			>
				<i class="text-black fas fa-bars" />
			</button>
		</div>
		<div
			class="lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none rounded shadow-lg {navbarOpen
				? 'block'
				: 'hidden'}"
			id="example-navbar-warning"
		>
			<ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
				<!-- About page -->
				<li>
					<a
						class="lg:text-slate-600 lg:hover:text-slate-800 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
						href="/about">About</a
					>
				</li>
				<li>
					<a
						class="lg:text-slate-600 lg:hover:text-slate-800 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
						href="/faq">FAQ</a
					>
				</li>
				<li>
					<a
						class="lg:text-slate-600 lg:hover:text-slate-800 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
						href="/api_info">API</a
					>
				</li>

				<li class="flex items-center">
					<a
						href={login_link}
						class="bg-indigo-300 text-slate-700 active:bg-slate-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
					>
						{login_link === '/login' ? 'Login with Discord' : 'Open app'}
					</a>
				</li>
			</ul>
		</div>
	</div>
</nav>
