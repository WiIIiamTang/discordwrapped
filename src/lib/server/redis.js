import { createClient } from 'redis';
import { EXTERNAL_REDIS_URL } from '$env/static/private';

export const redis = createClient({ url: EXTERNAL_REDIS_URL });
redis.connect();
