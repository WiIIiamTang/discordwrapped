import { createClient } from 'redis';
import { EXTERNAL_REDIS_URL, RUNTIME_ENV } from '$env/static/private';

export const redis =
	RUNTIME_ENV === 'DEV' || RUNTIME_ENV === 'PROD'
		? createClient({ url: EXTERNAL_REDIS_URL })
		: null;
if (RUNTIME_ENV !== 'PREVIEW') redis.connect();
