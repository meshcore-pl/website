const axios = require('../global/services/axios.js');

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const MAX_TOKEN_LENGTH = 2048;
const REQUEST_TIMEOUT = 5000;

module.exports = async (token, ip) => {
	if (typeof token !== 'string' || !token || token.length > MAX_TOKEN_LENGTH) return { valid: false, reason: 'invalid' };

	try {
		const { data } = await axios.post(VERIFY_URL, new URLSearchParams({
			secret: process.env.TURNSTILE_SECRET,
			response: token,
			remoteip: ip,
		}), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: REQUEST_TIMEOUT });

		if (data.success) return { valid: true };
		const codes = data['error-codes'] || [];
		if (codes.includes('timeout-or-duplicate')) return { valid: false, reason: 'expired' };
		return { valid: false, reason: codes.includes('internal-error') ? 'unavailable' : 'invalid' };
	} catch (err) {
		console.error('Turnstile verification error:', err.message);
		return { valid: false, reason: 'unavailable' };
	}
};
