const router = require('express').Router();
const emailValidator = require('@sefinek/email-validator');
const verifyMx = require('@sefinek/email-validator/mx');
const tcpClient = require('../services/tcpClient.js');
const sendMail = require('../services/mailer.js');

const renderForm = (req, res, status, overrides = {}) => {
	const payload = {
		errors: [],
		sent: false,
		values: { username: '', email: '', message: '' },
		...overrides,
	};

	if (req.get('accept') === 'application/json') return res.status(status).json(payload);
	res.status(status).render('contact.ejs', payload);
};

router.get('/kontakt', (req, res) => renderForm(req, res, 200));

router.post('/api/v1/kontakt', async (req, res) => {
	const username = (req.body.username || '').trim();
	const email = (req.body.email || '').trim();
	const message = (req.body.message || '').trim();
	const values = { username, email, message };

	// Honeypot
	if (req.body.website) {
		console.log('Honeypot triggered by', req.ip);
		return renderForm(req, res, 200, { sent: true });
	}

	const errors = [];
	if (username.length < 2 || username.length > 64) errors.push('Nazwa użytkownika musi mieć od 2 do 64 znaków.');
	if (!emailValidator(email)) errors.push('Podaj poprawny adres e-mail.');
	if (message.length < 10 || message.length > 4000) errors.push('Wiadomość musi mieć od 10 do 4000 znaków.');

	if (!errors.length && !(await verifyMx(email))) errors.push('Domena podanego adresu e-mail nie przyjmuje poczty.');
	if (!errors.length && (await tcpClient.checkTempEmail(email))?.blacklisted) errors.push('Tymczasowe adresy e-mail są niedozwolone.');
	if (errors.length) return renderForm(req, res, 400, { errors, values });

	try {
		const subject = 'Kontakt przez formularz MeshCore Polska';
		const adminMail = await sendMail({
			from: `MeshCore Polska <${process.env.MAILER_AUTH_USER}>`,
			replyTo: `"${username}" <${email}>`,
			to: `Sefinek <${process.env.MAILER_AUTH_USER}>`,
			subject,
			text: `// Wiadomość od ${username} (${email})\n\n${message}`,
		});

		await sendMail({
			from: `Sefinek <${process.env.MAILER_AUTH_USER}>`,
			replyTo: `Sefinek <${process.env.MAILER_AUTH_USER}>`,
			to: `"${username}" <${email}>`,
			subject,
			inReplyTo: adminMail.messageId,
			references: [adminMail.messageId],
			text: `Witaj ${username}! Pomyślnie otrzymaliśmy Twoją wiadomość. Jeśli masz coś jeszcze do dodania, możesz odpowiedzieć na tego maila. Poniżej znajduje się kopia Twojej wiadomości.\n\n${message}`,
		});

		renderForm(req, res, 200, { sent: true });
	} catch (err) {
		console.error(err);
		renderForm(req, res, 502, { errors: ['Nie udało się wysłać wiadomości. Spróbuj ponownie później.'], values });
	}
});

module.exports = router;
