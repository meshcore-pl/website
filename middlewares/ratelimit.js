const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const RedisClient = require('../services/redis.js');
const RenderError = require('../utils/renderError.js');

const redisStore = prefix => new RedisStore({ sendCommand: (...args) => RedisClient.sendCommand(args), prefix });

exports.global = rateLimit({
	windowMs: 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
	store: redisStore('mcpl:ratelimit:global:'),
	handler: (req, res) => RenderError(res, 429),
});

exports.contactForm = rateLimit({
	windowMs: 60 * 60 * 1000,
	limit: 3,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
	store: redisStore('mcpl:ratelimit:contactForm:'),
	skip: req => req.method !== 'POST',
	handler: (req, res) => {
		if (req.get('accept') === 'application/json') return res.status(429).json({ errors: ['Zbyt wiele żądań. Spróbuj ponownie za chwilę.'] });
		RenderError(res, 429);
	},
});
