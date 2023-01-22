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
import { connectUsertoService, getApiVersion, getUserNotifications } from '$lib/server/fleet';
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

	//////////////////////////////////////
	// things we have to resolve first
	// try not to put too many things here, as this is blocking

	// get archived stats
	const one_week_ago = new Date();
	one_week_ago.setDate(one_week_ago.getDate() - 6);
	const archive_week = await getArchivedStats(
		one_week_ago.getFullYear() +
			'-' +
			pad(one_week_ago.getMonth() + 1) +
			'-' +
			pad(one_week_ago.getDate())
	);

	// get activities
	const activities = await getActivities();
	const activities_sorted_total = await ObjSortBy(activities);
	const activities_non_sorted_100 = await ObjSortBy(activities, 100, false);

	// get date tracking_since
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

	//////////////////////////////////////////////////
	// promise wrappers

	const connectedFleetPromise = async () => {
		return await connectUsertoService(locals.user.id, locals.user.username);
	};

	const apiVersionPromise = async () => {
		return await getApiVersion();
	};

	const userNotificationsPromise = async () => {
		return await getUserNotifications(locals.user.id);
	};

	const userPreferencesPromise = async () => {
		return await getUserPreferences(locals.user.id);
	};

	const latestDeploymentPromise = async () => {
		return RUNTIME_ENV === 'DEV' ? { date: 'local', sha: 'dev' } : await getLatestDeploymentDate();
	};

	const botGuildsInfoPromise = async () => {
		const guild = await getGuildInfo(locals.bot_guilds[0]);
		return {
			current: {
				id: guild.id,
				name: guild.name,
				icon: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`,
				member_count: guild.approximate_member_count,
				presence_count: guild.approximate_presence_count,
				members: await getGuildMembers(guild.id)
			},
			others: []
		};
	};

	// For activities, there are so many different things depending on it, better to resolve the base objects first.

	const activitiesPromise = async () => {
		return await processActivities(activities_sorted_total);
	};

	const popularActivitiesPromise = async () => {
		return await processActivitiesPopular(activities_non_sorted_100);
	};

	const trendsActivitiesPromise = async () => {
		return await processActivitiesTrends(activities_non_sorted_100, archive_week);
	};

	const tableActivitiesPromise = async () => {
		return await processActivitiesUserTable(activities_sorted_total);
	};

	const messagesPromise = async () => {
		return await getMessages();
	};

	const voicePromise = async () => {
		return await getVoice();
	};

	const wordsPromise = async () => {
		const w = await getWords();
		return await processWords(w);
	};

	const interactionsPromise = async () => {
		const i = await getInteractions();
		return await processInteractions(i);
	};

	const botInteractionsPromise = async () => {
		const waifu = await getWaifu();
		const genshin = await getGenshin();
		const wolfram = await getWolfram();
		const openai = await getOpenai();
		const audio = await getAudio();
		const data = {
			waifu: waifu,
			genshin: genshin,
			wolfram: wolfram,
			openai: openai,
			audio: audio
		};
		return await processBotInteractions(data);
	};

	const botInteractionsRawPromise = async () => {
		// This might be more faster than waiting for all of them to fetch first?
		// Only making 5 more requests
		const waifu = await getWaifu();
		const genshin = await getGenshin();
		const wolfram = await getWolfram();
		const openai = await getOpenai();
		const audio = await getAudio();
		const data = {
			waifu: waifu,
			genshin: genshin,
			wolfram: wolfram,
			openai: openai,
			audio: audio
		};
		return data;
	};

	const statusPromise = async () => {
		return await getStatus();
	};

	const statusTimeStreamPromise = async () => {
		const status_logs = await getStatusTimeStream();
		return await processStatusLogs(status_logs, tracking_since_date);
	};

	const statusLogsRawPromise = async () => {
		const status_logs = await getStatusTimeStream();
		return await processStatusLogsRaw(status_logs.count_by_users);
	};

	const voiceStatePromise = async () => {
		return await getVoiceState();
	};

	const achievementSettingsPromise = async () => {
		// This might be more faster than waiting for a guild to be fetched first?
		// botGuildsInfo and achievementSettings can run in parallel.
		const guild = await getGuildInfo(locals.bot_guilds[0]);
		return await getAchievementSettings(guild.id);
	};

	// We should try to return promises as much as possible.
	// hooks already adds a slight delay since it needs to connect to the discord api.
	// Note that only top-level promises will be unwrapped.
	return {
		user: locals.user,
		connectedFleet: connectedFleetPromise(),
		apiVersion: apiVersionPromise(),
		fleetNotifications: userNotificationsPromise(),
		userPreferences: userPreferencesPromise(),
		latestDeployment: latestDeploymentPromise(),
		bot_guilds: botGuildsInfoPromise(),
		activities: activitiesPromise(),
		popular_activities: popularActivitiesPromise(),
		trends_activities: trendsActivitiesPromise(),
		table_activities: tableActivitiesPromise(),
		activities_raw: activities,
		messages: messagesPromise(),
		voice: voicePromise(),
		words: wordsPromise(),
		archived_stats_week_ago: archive_week,
		tracking_since: tracking_since_date,
		interactions: interactionsPromise(),
		botInteractions: botInteractionsPromise(),
		botInteractions_raw: botInteractionsRawPromise(),
		status: statusPromise(),
		status_time_stream: statusTimeStreamPromise(),
		status_logs_raw: statusLogsRawPromise(),
		voiceState: voiceStatePromise(),
		achievementSettings: achievementSettingsPromise()
	};
}
