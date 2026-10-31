const emailValidator = require('@sefinek/email-validator');
const verifyMx = require('@sefinek/email-validator/mx');
const tcpClient = require('../global/services/tcpClient.js');
const sendMail = require('./mail/mailer.js');
const confirmationMail = require('./mail/confirmation.js');
const verifyTurnstile = require('./turnstile.js');

const SUBJECT = 'Kontakt przez formularz MeshCore Polska';

exports.validateFields = ({ username, email, message }) => {
	const errors = [];
	if (username.length < 2 || username.length > 64) errors.push('Nazwa użytkownika musi mieć od 2 do 64 znaków.');
	if (!emailValidator(email)) errors.push('Podaj poprawny adres e-mail.');
	if (message.length < 10 || message.length > 4000) errors.push('Wiadomość musi mieć od 10 do 4000 znaków.');
	return errors;
};

exports.verifySender = async ({ email, token, ip }) => {
	if (!await verifyTurnstile(token, ip)) return 'Weryfikacja captcha Cloudflare Turnstile nie powiodła się. Odśwież stronę i spróbuj ponownie.';
	if (!await verifyMx(email)) return 'Domena podanego adresu e-mail nie przyjmuje poczty.';
	if ((await tcpClient.checkTempEmail(email))?.blacklisted) return 'Tymczasowe adresy e-mail są niedozwolone.';
	return null;
};

exports.deliver = async ({ username, email, message }, domain) => {
	const adminMail = await sendMail({
		from: `MeshCore Polska <${process.env.MAILER_AUTH_USER}>`,
		replyTo: { name: username, address: email },
		to: `Sefinek <${process.env.MAILER_AUTH_USER}>`,
		subject: SUBJECT,
		text: `// Wiadomość od ${username} (${email})\n\n${message}`,
	});

	await sendMail({
		from: `Sefinek <${process.env.MAILER_AUTH_USER}>`,
		replyTo: `Sefinek <${process.env.MAILER_AUTH_USER}>`,
		to: { name: username, address: email },
		subject: SUBJECT,
		inReplyTo: adminMail.messageId,
		references: [adminMail.messageId],
		...confirmationMail(username, domain),
	});
};
