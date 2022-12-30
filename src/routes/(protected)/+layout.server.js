import {
	getActivities,
	getMessages,
	getVoice,
	getTrackingTime,
	getInteractions,
	getWaifu,
	getGenshin,
	getWolfram,
	getOpenai,
	getAudio
} from '$lib/server/mongo.js';
import { processActivities, ObjSortByTotal, processInteractions } from '$lib/server/stats.js';
import { getGuildInfo } from '$lib/server/auth';

/**
 * @type {import('./$types').PageServerLoad}
 */
export async function load({ locals }) {
	const guild = await getGuildInfo(locals.bot_guilds[0]);

	return {
		user: locals.user,
		bot_guilds: {
			current: {
				id: guild.id,
				name: guild.name,
				icon: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`,
				member_count: guild.approximate_member_count,
				presence_count: guild.approximate_presence_count
			},
			others: []
		},
		activities: await processActivities(await ObjSortByTotal(await getActivities())),
		messages: await getMessages(),
		voice: await getVoice(),
		tracking_since: await getTrackingTime(),
		interactions: await processInteractions(await getInteractions()),
		waifu: await getWaifu(),
		genshin: await getGenshin(),
		wolfram: await getWolfram(),
		openai: await getOpenai(),
		audio: await getAudio()
	};
}
