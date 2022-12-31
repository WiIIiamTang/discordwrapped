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
	getAudio,
	getArchivedStats
} from '$lib/server/mongo.js';
import {
	processActivities,
	ObjSortByTotal,
	processInteractions,
	processBotInteractions
} from '$lib/server/stats.js';
import { getGuildInfo } from '$lib/server/auth';

const pad = (n) => {
	let str = '0' + n;
	return str.slice(str.length - 2);
};

/**
 * @type {import('./$types').PageServerLoad}
 */
export async function load({ locals }) {
	const guild = await getGuildInfo(locals.bot_guilds[0]);

	// for archived stats
	const one_week_ago = new Date();
	one_week_ago.setDate(one_week_ago.getDate() - 6);

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
		archived_stats_week_ago: await getArchivedStats(
			one_week_ago.getFullYear() +
				'-' +
				pad(one_week_ago.getMonth() + 1) +
				'-' +
				pad(one_week_ago.getDate())
		),
		tracking_since: await getTrackingTime(),
		interactions: await processInteractions(await getInteractions()),
		botInteractions: processBotInteractions({
			waifu: await getWaifu(),
			genshin: await getGenshin(),
			wolfram: await getWolfram(),
			openai: await getOpenai(),
			audio: await getAudio()
		})
	};
}
