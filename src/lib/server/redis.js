import { createClient } from 'redis';
import { EXTERNAL_REDIS_URL, RUNTIME_ENV, EXTERNAL_REDIS_URL2 } from '$env/static/private';
import { error } from '@sveltejs/kit';

let rurl = EXTERNAL_REDIS_URL;
export const redis =
	RUNTIME_ENV === 'DEV' || RUNTIME_ENV === 'PROD'
		? createClient({
				url: rurl,
				retry_strategy: function (options) {
					if (options.attempt > 5) {
						rurl = EXTERNAL_REDIS_URL2;
					} else if (options.attempt > 10) {
						error(500, 'REDIS CONNECTION FAILED');
					}
					return options.attempt * 100;
				}
		  })
		: null;
if (RUNTIME_ENV !== 'PREVIEW') {
	redis.connect();
	redis.on('error', (err) => {
		console.log('REDIS ERROR', err);
	});
}
