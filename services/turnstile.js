const axios = require('../global/services/axios.js');

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const MAX_TOKEN_LENGTH = 2048;
const REQUEST_TIMEOUT = 5000;
const ACTION = 'contact';

module.exports = async (token, ip) => {
	const secret = process.env.TURNSTILE_SECRET;
	if (!secret || typeof token !== 'string' || !token || token.length > MAX_TOKEN_LENGTH) return false;

	try {
		const { data } = await axios.post(VERIFY_URL, new URLSearchParams({
			secret,
			response: token,
			remoteip: ip,
		}), { timeout: REQUEST_TIMEOUT });

		if (data.success !== true) {
			console.warn('Turnstile siteverify rejected the token:', data['error-codes']);
			return false;
		}

		if (data.metadata?.result_with_testing_key === true) return process.env.NODE_ENV !== 'production';

		const hostname = new URL(process.env.DOMAIN).hostname;
		const valid = data.hostname === hostname && data.action === ACTION;
		if (!valid) console.warn(`Turnstile token mismatch: hostname=${data.hostname} (expected ${hostname}), action=${data.action}`);

		return valid;
	} catch (err) {
		console.error('Turnstile verification failed:', err.message);
		return false;
	}
};
