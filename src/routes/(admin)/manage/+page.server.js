import { TMP_VERIFY_NAME, TMP_VERIFY_PASS } from '$env/static/private';

export const actions = {
	tmpverify: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('username');
		const pass = formData.get('password');
		if (name === TMP_VERIFY_NAME && pass === TMP_VERIFY_PASS) {
			return {
				type: 'tmpverify',
				message: `{name} {pass}`,
				data: { success: true }
			};
		}

		return {
			type: 'tmpverify',
			message: `${name} ${pass}`,
			data: { success: false }
		};
	},
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
	addmember: async ({ request, fetch }) => {
		const formData = await request.formData();
		const response = await fetch('/api/admin/member_allow', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: formData.get('member_id') })
		});
		const data = await response.json();

		return {
			type: 'addmember',
			message: formData.get('member_id'),
			data: data
		};
	},
	deletemember: async ({ request, fetch }) => {
		const formData = await request.formData();
		const response = await fetch('/api/admin/member_allow', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: formData.get('member_id') })
		});
		const data = await response.json();

		return {
			type: 'deletemember',
			message: formData.get('member_id'),
			data: data
		};
	},
	deleteguild: async ({ request, fetch }) => {
		const formData = await request.formData();
		const response = await fetch('/api/admin/guild_allow', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: formData.get('guild_id') })
		});
		const data = await response.json();

		return {
			type: 'deleteguild',
			message: formData.get('guild_id'),
			data: data
		};
	}
};
