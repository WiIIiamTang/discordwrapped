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
	getArchivedStats,
	getUserPreferences,
	getWords,
	getStatus,
	getStatusTimeStream,
	getVoiceState,
	getAchievementSettings
} from '$lib/server/mongo.js';
import {
	processActivities,
	processActivitiesPopular,
	processActivitiesTrends,
	ObjSortBy,
	processInteractions,
	processBotInteractions,
	processActivitiesUserTable,
	processWords,
	processStatusLogs,
	processStatusLogsRaw
} from '$lib/server/stats.js';
import { getGuildInfo, getGuildMembers } from '$lib/server/auth';
import { getLatestDeploymentDate } from '$lib/server/vercel';
import { RUNTIME_ENV } from '$env/static/private';

const pad = (n) => {
	let str = '0' + n;
	return str.slice(str.length - 2);
};

/**
 * @type {import('./$types').PageServerLoad}
 */
export async function load({ locals }) {
	if (!locals.user) {
		return {
			error: 'Unauthorized'
		};
	}

	const guild = await getGuildInfo(locals.bot_guilds[0]);

	// for archived stats
	const one_week_ago = new Date();
	one_week_ago.setDate(one_week_ago.getDate() - 6);
	const archive_week = await getArchivedStats(
		one_week_ago.getFullYear() +
			'-' +
			pad(one_week_ago.getMonth() + 1) +
			'-' +
			pad(one_week_ago.getDate())
	);

	// for activities
	const activities = await getActivities();
	const activities_sorted_total = await ObjSortBy(activities);
	const activities_non_sorted_100 = await ObjSortBy(activities, 100, false);

	// date
	const tracking_since = await getTrackingTime();
	const tracking_since_date_local = new Date(tracking_since);
	const tracking_since_date = new Date(
		Date.UTC(
			tracking_since_date_local.getFullYear(),
			tracking_since_date_local.getMonth(),
			tracking_since_date_local.getDate(),
			5
		)
	);

	// status logs
	const status_logs = await getStatusTimeStream();

	//bot
	const waifu = await getWaifu();
	const genshin = await getGenshin();
	const wolfram = await getWolfram();
	const openai = await getOpenai();
	const audio = await getAudio();

	return {
		user: locals.user,
		userPreferences: await getUserPreferences(locals.user.id),
		latestDeployment:
			RUNTIME_ENV === 'DEV' ? { date: 'local', sha: 'dev' } : await getLatestDeploymentDate(),
		bot_guilds: {
			current: {
				id: guild.id,
				name: guild.name,
				icon: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`,
				member_count: guild.approximate_member_count,
				presence_count: guild.approximate_presence_count,
				members: await getGuildMembers(guild.id)
			},
			others: []
		},
		activities: processActivities(activities_sorted_total),
		popular_activities: processActivitiesPopular(activities_non_sorted_100),
		trends_activities: processActivitiesTrends(activities_non_sorted_100, archive_week),
		table_activities: processActivitiesUserTable(activities_sorted_total),
		activities_raw: activities,
		messages: await getMessages(),
		voice: await getVoice(),
		words: await processWords(await getWords()),
		archived_stats_week_ago: archive_week,
		tracking_since: tracking_since_date,
		interactions: await processInteractions(await getInteractions()),
		botInteractions: processBotInteractions({
			waifu: waifu,
			genshin: genshin,
			wolfram: wolfram,
			openai: openai,
			audio: audio
		}),
		botInteractions_raw: {
			waifu: waifu,
			genshin: genshin,
			wolfram: wolfram,
			openai: openai,
			audio: audio
		},
		status: await getStatus(),
		status_time_stream: processStatusLogs(status_logs, tracking_since_date),
		status_logs_raw: processStatusLogsRaw(status_logs.count_by_users),
		voiceState: await getVoiceState(),
		achievementSettings: await getAchievementSettings(guild.id)
	};
}
