/**
 * @type {import('./$types').PageServerLoad}
 */
export async function load({ locals }) {
	if (!locals.hasCookies) {
		return {
			login_link: '/login'
		};
	}

	return {
		login_link: '/app'
	};
}
