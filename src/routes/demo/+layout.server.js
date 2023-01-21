/**
 * @type {import('./$types').PageServerLoad}
 */
export async function load() {
	console.log('loading');
	return {
		demo: true,
		user: {
			id: '123',
			username: 'demo',
			discriminator: '1234',
			avatar: '/placeholder.png',
			email: 'demo@email.com'
		},
		connectedFleet: false,
		apiVersion: '1.0.0',
		fleetNotifications: [],
		userPreferences: {
			settings: {
				activityguildtotals: true,
				activitypopular: true,
				activitytrends: true,
				activitytopusers: true,
				interactionnetwork: true,
				interactionrelationshipchart: true,
				interactionbot: true,
				interactionvoice: true,
				messageschannel: true,
				messagesuser: true,
				messagesfrequentwords: true,
				monitoruserpresence: true,
				monitoruserpresencelog: true,
				usersactivity: true,
				usersmessages: true,
				usersachieve: true,
				usersheatmap: true,
				experimental: false
			}
		},
		latestDeployment: 'demo',
		bot_guilds: {
			current: {
				id: '123',
				name: 'DEMO',
				icon: `/placeholder.png`,
				member_count: 1234,
				presence_count: 50,
				members: []
			},
			others: []
		},
		activities: {
			labels: ['1', '2', '3', '4', '5', '6', '7'],
			totals: [1, 2, 3, 4, 5, 6, 7]
		},
		popular_activities: {
			labels: ['1', '2', '3', '4', '5', '6', '7'],
			total_users: [1, 2, 3, 4, 5, 6, 7]
		},
		trends_activities: {
			labels: ['1', '2', '3', '4', '5', '6', '7'],
			diffs: [1, 2, 3, 4, 5, 6, 7]
		},
		table_activities: {
			ranks: {
				'BLeague of Legends': {
					user1: {
						rank: 1,
						percent: 70
					},
					user2: {
						rank: 2,
						percent: 30
					}
				}
			},
			data: {
				'BLeague of Legends': {
					user1: 897,
					user2: 123
				}
			}
		},
		activities_raw: {
			user1: {
				activity1: 123
			},
			demo: {
				activity1: 123,
				activity2: 456
			}
		},
		messages: {
			count_by_channel: {
				_TOTAL: -1,
				channel1: 123,
				channel2: 456
			},
			count_by_users: {
				user1: 123,
				user2: 456,
				user3: 789,
				user4: 123,
				user5: 456,
				user6: 789,
				user7: 123,
				user8: 456,
				user9: 789,
				user10: 123,
				user11: 456,
				user12: 789,
				user13: 123,
				user14: 456,
				user15: 789
			}
		},
		voice: {
			count_by_channel: {
				_TOTAL: 12345,
				channel1: 12345,
				channel2: 5689
			},
			count_by_users: {
				user1: 123
			}
		},
		words: [
			['demo', 100],
			['demoa', 60],
			['demo', 60],
			['demo', 60],
			['demo', 40],
			['demo', 40],
			['demo', 20],
			['demo', 2],
			['demo', 1],
			['demo', 1],
			['demo', 1],
			['demo', 1],
			['demo', 1],
			['demo', 1]
		],
		archived_stats_week_ago: {
			messages: {
				count_by_channel: {
					_TOTAL: -1
				},
				count_by_users: {}
			},
			voice: {
				count_by_channel: {
					_TOTAL: -1
				},
				count_by_users: {}
			}
		},
		tracking_since: new Date('2000/01/01'),
		interactions: {
			nodes: [
				{ id: 'friend1', group: 1 },
				{ id: 'friend2', group: 1 },
				{ id: 'friend3', group: 1 },
				{ id: 'othergroup1', group: 3 },
				{ id: 'othergroup2', group: 3 },
				{ id: 'othergroup3', group: 3 },
				{ id: 'loner1', group: 5 },
				{ id: 'outlier1', group: 2 },
				{ id: 'outlier2', group: 2 },
				{ id: 'outlier3', group: 2 }
			],
			links: [
				{ source: 'friend1', target: 'friend2', value: 2465 },
				{ source: 'friend1', target: 'friend3', value: 2800 },
				{ source: 'friend2', target: 'friend3', value: 2100 },
				{ source: 'othergroup1', target: 'othergroup2', value: 2465 },
				{ source: 'othergroup1', target: 'othergroup3', value: 1900 },
				{ source: 'othergroup2', target: 'othergroup3', value: 2500 },
				{ source: 'othergroup1', target: 'friend1', value: 100 },
				{ source: 'othergroup1', target: 'friend2', value: 500 },
				{ source: 'othergroup1', target: 'loner1', value: 80 },
				{ source: 'outlier1', target: 'othergroup1', value: 1000 },
				{ source: 'outlier2', target: 'othergroup1', value: 875 },
				{ source: 'outlier3', target: 'othergroup1', value: 1800 },
				{ source: 'outlier1', target: 'outlier2', value: 100 },
				{ source: 'outlier2', target: 'outlier3', value: 100 }
			]
		},
		botInteractions: {
			waifu: 50,
			genshin: 100,
			wolfram: 10,
			openai: 80,
			audio: 225
		},
		botInteractions_raw: {
			waifu: {},
			genshin: {},
			wolfram: {},
			openai: {},
			audio: {}
		},
		status: {
			count_by_channel: {
				_TOTAL: 12345,
				channel1: 12345
			},
			count_by_users: {
				demo: {
					online: 123,
					offline: 456,
					idle: 789,
					dnd: 123
				}
			}
		},
		status_time_stream: {
			'2023-01-18T00:00:00Z': {
				online: 2654,
				offline: 444,
				idle: 200,
				dnd: 300
			},
			'2023-01-18T01:00:00Z': {
				online: 1723,
				offline: 445,
				idle: 223,
				dnd: 323
			},
			'2023-01-18T02:00:00Z': {
				online: 2045,
				offline: 500,
				idle: 245,
				dnd: 245
			},
			'2023-01-18T03:00:00Z': {
				online: 1886,
				offline: 550,
				idle: 396,
				dnd: 296
			},
			'2023-01-18T04:00:00Z': {
				online: 1412,
				offline: 556,
				idle: 412,
				dnd: 212
			},
			'2023-01-18T05:00:00Z': {
				online: 1369,
				offline: 498,
				idle: 251,
				dnd: 212
			},
			'2023-01-18T06:00:00Z': {
				online: 1050,
				offline: 850,
				idle: 412,
				dnd: 100
			},
			'2023-01-18T07:00:00Z': {
				online: 800,
				offline: 480,
				idle: 456,
				dnd: 150
			},
			'2023-01-18T08:00:00Z': {
				online: 589,
				offline: 780,
				idle: 498,
				dnd: 146
			},
			'2023-01-18T09:00:00Z': {
				online: 540,
				offline: 900,
				idle: 315,
				dnd: 200
			},
			'2023-01-18T10:00:00Z': {
				online: 351,
				offline: 1400,
				idle: 400,
				dnd: 100
			},
			'2023-01-18T11:00:00Z': {
				online: 125,
				offline: 1500,
				idle: 500,
				dnd: 100
			},
			'2023-01-18T12:00:00Z': {
				online: 60,
				offline: 1561,
				idle: 420,
				dnd: 189
			},
			'2023-01-18T13:00:00Z': {
				online: 10,
				offline: 1600,
				idle: 400,
				dnd: 100
			},
			'2023-01-18T14:00:00Z': {
				online: 100,
				offline: 1500,
				idle: 100,
				dnd: 110
			}
		},
		status_logs_raw: {
			user1: [
				{ status: 'offline', time: '2023-01-02T02:00:00Z' },
				{ status: 'dnd', time: '2023-01-01T22:56:00Z' },
				{ status: 'idle', time: '2023-01-01T22:43:00Z' },
				{ status: 'online', time: '2023-01-01T20:00:00Z' },
				{ status: 'offline', time: '2023-01-01T00:00:00Z' }
			]
		},
		voiceState: {
			count_by_users: {
				demo: {
					self_mute: 123,
					self_deaf: 456
				}
			}
		},
		achievementSettings: []
	};
}
