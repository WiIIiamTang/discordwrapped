import { error } from '@sveltejs/kit';
import { REQ_LIMIT } from '$env/static/private';

export async function ratelimit(redis, event, limit = REQ_LIMIT) {
	const ip = event.getClientAddress();
	const get_res = await redis.get(ip);

	if (!get_res) {
		await redis.set(ip, 1);
		const expire_res = await redis.expire(ip, 60);
		if (!expire_res) {
			throw error(500, 'Redis error');
		}
	}

	const incr_res = await redis.incr(ip);

	if (incr_res > Number(limit)) {
		throw error(429, 'Too many requests');
	}

	return true;
}
