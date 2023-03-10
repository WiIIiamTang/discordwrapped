import { error } from '@sveltejs/kit';
import { REQ_LIMIT, RUNTIME_ENV } from '$env/static/private';

export async function ratelimit(redis, event, limit = REQ_LIMIT) {
	const ip = event.getClientAddress();
	let get_res = false;

	try {
		get_res = await redis.get(ip);
	} catch (e) {
		if (e.message === 'The client is closed') {
			if (RUNTIME_ENV !== 'PREVIEW') {
				await redis.connect();
				get_res = await redis.get(ip);
			} else {
				throw error(500, 'api not available in preview builds');
			}
		}
	}

	if (!get_res) {
		await redis.set(ip, 0);
		const expire_res = await redis.expire(ip, 60);
		if (!expire_res) {
			throw error(500, 'Redis error');
		}
	}

	const incr_res = await redis.incr(ip);

	if (incr_res > Number(limit)) {
		throw error(429, 'Too many requests');
	}

	await redis.quit();
	return true;
}
