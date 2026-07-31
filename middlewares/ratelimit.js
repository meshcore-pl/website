const rateLimit = require('express-rate-limit');
const RenderError = require('../utils/renderError.js');

exports.global = rateLimit({
	windowMs: 40 * 1000,
	limit: 52,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
	handler: (req, res) => RenderError(res, 429),
});

exports.contactForm = rateLimit({
	windowMs: 4 * 60 * 60 * 1000,
	limit: 2,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
	skip: req => req.method !== 'POST',
	handler: (req, res) => {
		if (req.get('accept') === 'application/json') return res.status(429).json({ errors: ['Zbyt wiele żądań. Spróbuj ponownie za chwilę.'] });
		RenderError(res, 429);
	},
});