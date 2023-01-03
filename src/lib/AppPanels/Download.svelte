<script>
	import Users from './Users.svelte';
	let archivedate = '';
	let currentcategory = 'messages';
	async function download_file() {
		// console.log('download file', window.location);
		const res = await fetch('/api/data/archive');
		const blob = await res.blob();
		let url = window.URL || window.webkitURL;
		let blobUrl = url.createObjectURL(blob);

		let a = document.createElement('a');
		a.setAttribute('download', 'data.json');
		a.setAttribute('href', blobUrl);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

	async function download_file_current() {
		// console.log('download file', window.location);
		const res = await fetch('/api/data/archive');
		const blob = await res.blob();
		let url = window.URL || window.webkitURL;
		let blobUrl = url.createObjectURL(blob);

		let a = document.createElement('a');
		a.setAttribute('download', 'data.json');
		a.setAttribute('href', blobUrl);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
</script>

<div class="pb-6">
	<div class="flex flex-wrap">
		<div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
			<div
				class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-300"
			>
				<div class="rounded-t mb-0 px-4 py-3 bg-transparent">
					<div class="flex flex-wrap items-center">
						<div class="relative w-full max-w-full flex-grow flex-1">
							<h6 class="uppercase text-black-100 mb-1 text-xs font-semibold">Download</h6>
							<h2 class="text-black text-xl font-semibold">Get stats</h2>
						</div>
					</div>
				</div>
				<div class="p-4 flex-auto">
					<div class="relative h-fit">
						<div class="w-full shadow-lg p-10 mb-5 bg-slate-400 rounded">
							<h3 class="text-xl font-bold pb-5">Stats Archive</h3>
							<div class="flex flex-row flex-wrap gap-4">
								<div>
									<input
										placeholder="Date"
										type="text"
										name="archivedate"
										bind:value={archivedate}
									/>
								</div>
								<button
									class="bg-amber-300 text-black active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
									on:click={download_file}>Download</button
								>
							</div>
						</div>
						<div class="w-full shadow-lg p-10 bg-slate-400 rounded">
							<h3 class="text-xl font-bold pb-5">Current data</h3>
							<div class="flex flex-row flex-wrap gap-4">
								<select bind:value={currentcategory}>
									<option value="messages">Messages</option>
									<option value="activities">Activities</option>
									<option value="users">Users</option>
									<option value="voice">Voice</option>
									<option value="status">Status</option>
								</select>
								<button
									class="bg-amber-300 text-black active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
									on:click={download_file_current}>Download</button
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
