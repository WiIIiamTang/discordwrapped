<script>
	import { createPopper } from '@popperjs/core';

	let dropdownPopoverShow = false;

	let btnDropdownRef;
	let popoverDropdownRef;

	const toggleDropdown = (event) => {
		event.preventDefault();
		if (dropdownPopoverShow) {
			dropdownPopoverShow = false;
		} else {
			dropdownPopoverShow = true;
			createPopper(btnDropdownRef, popoverDropdownRef, {
				placement: 'bottom-start'
			});
		}
	};

	export let data;
	console.log('data from profilesdropdown', data);
</script>

<div>
	<a class="text-slate-500 block" href="#f" bind:this={btnDropdownRef} on:click={toggleDropdown}>
		<div class="items-center flex">
			<span
				class="w-12 h-12 text-sm text-white bg-slate-200 inline-flex items-center justify-center rounded-full"
			/>
		</div>
	</a>
	<div
		bind:this={popoverDropdownRef}
		class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 {dropdownPopoverShow
			? 'block'
			: 'hidden'}"
	>
		<a
			href="#f"
			on:click={(e) => e.preventDefault()}
			class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
		>
			Server 1
		</a>
		<div class="h-0 my-2 border border-solid border-slate-100 flex justify-center" />
		<form method="POST" action="/logout" class="flex justify-center">
			<button
				class="bg-indigo-300 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
				type="submit"
			>
				Logout
			</button>
		</form>
	</div>
</div>
