import { updateUserPreferences } from '$lib/server/mongo.js';

/** @type {import('./$types').Actions} */
export const actions = {
	settingssave: async ({ request, locals }) => {
		const data = await request.formData();
		const settings = {
			activityguildtotals: data.get('activityguildtotals'),
			activitypopular: data.get('activitypopular'),
			activitytrends: data.get('activitytrends'),
			activitytopusers: data.get('activitytopusers'),
			interactionnetwork: data.get('interactionnetwork'),
			interactionrelationshipchart: data.get('interactionrelationshipchart'),
			interactionbot: data.get('interactionbot'),
			interactionvoice: data.get('interactionvoice'),
			experimental: data.get('experimental')
		};

		const update_response = await updateUserPreferences(locals.user.id, settings);
		settings.saved = update_response;
		return settings;
	}
};
