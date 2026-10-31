const toastModule = import(`${document.body.dataset.cdn}/js/meshcore/toast.js`).catch(err => {
	console.error('Toast module failed to load:', err);
	return null;
});

const successMessage = 'Dziękujemy! Twoja wiadomość została wysłana. Odpowiemy najszybciej, jak to możliwe.';
const notify = async (message, type) => {
	const toast = await toastModule;
	if (toast) toast.showToast(message, type, { duration: 8000 });
	else window.alert(message);
};
const showErrors = messages => messages.forEach(message => notify(message, 'error'));

class CaptchaError extends Error {}

const TURNSTILE_LOAD_TIMEOUT_MS = 15000;
let turnstileLoader;

const loadTurnstile = () => {
	if (turnstileLoader) return turnstileLoader;
	if (window.turnstile?.render) return Promise.resolve();

	turnstileLoader = new Promise((resolve, reject) => {
		const script = document.createElement('script');
		const timer = setTimeout(() => script.onerror(), TURNSTILE_LOAD_TIMEOUT_MS);

		script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
		script.async = true;
		script.onerror = () => {
			clearTimeout(timer);
			script.remove();
			turnstileLoader = null;
			reject(new Error('Turnstile failed to load'));
		};
		script.onload = () => {
			if (!window.turnstile?.render) return script.onerror();
			clearTimeout(timer);
			resolve();
		};
		document.head.append(script);
	});

	return turnstileLoader;
};

const notifications = document.getElementById('contact-notifications');
if (notifications) {
	if (notifications.dataset.sent === '1') notify(successMessage, 'success');
	else showErrors([...notifications.content.querySelectorAll('p')].map(el => el.textContent));
}

const form = document.getElementById('contact-form');
if (form) {
	const submitBtn = form.querySelector('button[type="submit"]');
	const submitLabel = submitBtn.textContent;
	const captcha = document.getElementById('contact-turnstile');
	let widgetId = null;

	const clearCaptcha = () => {
		if (widgetId !== null) window.turnstile.remove(widgetId);
		widgetId = null;
		captcha.hidden = true;
	};

	const renderCaptcha = () => new Promise((resolve, reject) => {
		const fail = message => reject(new CaptchaError(message));

		captcha.hidden = false;
		try {
			widgetId = window.turnstile.render(captcha, {
				sitekey: captcha.dataset.sitekey,
				action: 'contact',
				retry: 'never',
				'refresh-expired': 'manual',
				'refresh-timeout': 'manual',
				callback: resolve,
				'error-callback': code => {
					console.error('Turnstile verification failed:', code);
					fail('Weryfikacja captcha nie powiodła się. Spróbuj wysłać wiadomość ponownie.');
					return true;
				},
				'expired-callback': () => fail('Weryfikacja captcha wygasła. Spróbuj wysłać wiadomość ponownie.'),
				'timeout-callback': () => fail('Upłynął czas weryfikacji captcha. Spróbuj wysłać wiadomość ponownie.'),
			});
		} catch (err) {
			console.error('Turnstile render failed', err);
			fail('Nie udało się uruchomić captchy. Odśwież stronę i spróbuj ponownie.');
		}
	});

	const verifyCaptcha = async () => {
		try {
			await loadTurnstile();
		} catch (err) {
			console.error('Turnstile load failed:', err);
			throw new CaptchaError('Nie udało się załadować captchy. Odśwież stronę i spróbuj ponownie.');
		}

		return renderCaptcha();
	};

	form.addEventListener('submit', async event => {
		event.preventDefault();
		if (submitBtn.disabled) return;

		submitBtn.disabled = true;
		submitBtn.textContent = 'Weryfikacja...';

		try {
			const token = await verifyCaptcha();
			const body = new URLSearchParams(new FormData(form));
			body.set('cf-turnstile-response', token);
			submitBtn.textContent = 'Wysyłanie...';

			const res = await fetch(form.action, {
				method: 'POST',
				headers: { Accept: 'application/json' },
				body,
			});

			if (!(res.headers.get('content-type') || '').includes('application/json')) {
				console.error('Unexpected response:', res.status, res.headers.get('content-type'));
				throw new Error('Expected a JSON response from the contact endpoint');
			}

			const data = await res.json();

			if (res.ok && data.sent) {
				form.reset();
				notify(successMessage, 'success');
				return;
			}

			console.error('Message rejected by server:', res.status);
			showErrors(data.errors?.length ? data.errors : ['Nie udało się wysłać wiadomości. Spróbuj ponownie później.']);
		} catch (err) {
			console.error('Submission failed:', err);
			showErrors([err instanceof CaptchaError ? err.message : 'Nie udało się wysłać wiadomości. Spróbuj ponownie później.']);
		} finally {
			clearCaptcha();
			submitBtn.disabled = false;
			submitBtn.textContent = submitLabel;
		}
	});
}
