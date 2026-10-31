const router = require('express').Router();
const { validateFields, verifySender, deliver } = require('../services/contact.js');
const limiter = require('../middlewares/ratelimit.js');
const { getRandomTip } = require('../content/tips.js');

const EMPTY_VALUES = { username: '', email: '', message: '' };
const DEV_VALUES = { username: 'Jan Kowalski', email: 'contact@sefinek.net', message: 'Testowa wiadomość z formularza kontaktowego.\n\nSzybki brązowy lis przeskoczył nad leniwym psem.\nPchnąć w tę łódź jeża lub ośm skrzyń fig.\nZażółć gęślą jaźń.\n\nZnaki specjalne: <b>test</b> & "cudzysłów" \'apostrof\' 🚀😺' };

const SENT_MESSAGE = 'Dziękujemy! Twoja wiadomość została wysłana. Odpowiemy najszybciej, jak to możliwe.';

router.get('/kontakt', (req, res) => {
	res.render('contact.ejs', { values: process.env.NODE_ENV === 'production' ? EMPTY_VALUES : DEV_VALUES, tip: getRandomTip() });
});

router.post('/api/v1/kontakt', limiter.contactForm, async (req, res) => {
	const body = req.body ?? {};
	const fields = {
		username: (body.username || '').trim(),
		email: (body.email || '').trim(),
		message: (body.message || '').trim(),
	};

	if (body.website) {
		console.log('Honeypot triggered by', req.ip);
		return res.json({ success: true, status: 200, message: SENT_MESSAGE });
	}

	const errors = validateFields(fields);
	if (!errors.length) {
		const senderError = await verifySender({ email: fields.email, token: body['cf-turnstile-response'], ip: req.ip });
		if (senderError) errors.push(senderError);
	}
	if (errors.length) return res.status(400).json({ success: false, status: 400, message: 'Formularz zawiera błędy.', data: { errors } });

	console.log(`New contact message received from ${fields.email}`);

	try {
		await deliver(fields, req.app.locals.domain);
		res.json({ success: true, status: 200, message: SENT_MESSAGE });
	} catch (err) {
		console.error(err);
		res.status(502).json({ success: false, status: 502, message: 'Nie udało się wysłać wiadomości. Spróbuj ponownie później.' });
	}
});

module.exports = router;
