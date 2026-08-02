const axios = require('./axios.js');

module.exports = async (token, ip) => {
	if (!token) return false;

	try {
		const { data } = await axios.post('https://challenges.cloudflare.com/turnstile/v0/siteverify', new URLSearchParams({
			secret: process.env.TURNSTILE_SECRET_KEY,
			response: token,
			remoteip: ip,
		}));

		return data.success === true;
	} catch (err) {
		console.error(err);
		return false;
	}
};
