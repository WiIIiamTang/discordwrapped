export const actions = {
	addguild: async ({ request, fetch }) => {
		const formData = await request.formData();
		const response = await fetch('/api/admin/guild_allow', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: formData.get('guild_id') })
		});
		const data = await response.json();

		return {
			type: 'addguild',
			message: formData.get('guild_id'),
			data: data
		};
	},
	addmember: async ({ request }) => {
		const formData = await request.formData();

		return {
			type: 'addmember',
			message: formData.get('member_id')
		};
	}
};
