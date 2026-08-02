const form = document.getElementById('contact-form');

const buildAlert = (type, messages) => {
	const alert = document.createElement('div');
	alert.className = `contact-alert contact-alert--${type}`;

	if (type === 'success') {
		const p = document.createElement('p');
		p.textContent = 'Dziękujemy! Twoja wiadomość została wysłana. Odpowiemy najszybciej, jak to możliwe.';
		alert.append(p);
	} else {
		const ul = document.createElement('ul');
		messages.forEach(message => {
			const li = document.createElement('li');
			li.textContent = message;
			ul.append(li);
		});
		alert.append(ul);
	}

	return alert;
};

if (form) {
	const card = form.closest('#contact-card');
	const submitBtn = form.querySelector('button[type="submit"]');
	const submitLabel = submitBtn.textContent;

	form.addEventListener('submit', async event => {
		event.preventDefault();

		card.querySelector('.contact-alert')?.remove();
		submitBtn.disabled = true;
		submitBtn.textContent = 'Wysyłanie...';

		try {
			const res = await fetch(form.action, {
				method: 'POST',
				headers: { Accept: 'application/json' },
				body: new URLSearchParams(new FormData(form)),
			});

			const data = await res.json();

			if (data.sent) {
				card.replaceChildren(buildAlert('success'));
				return;
			}

			form.before(buildAlert('error', data.errors?.length ? data.errors : ['Nie udało się wysłać wiadomości. Spróbuj ponownie później.']));
			window.turnstile?.reset();
		} catch {
			form.before(buildAlert('error', ['Nie udało się wysłać wiadomości. Spróbuj ponownie później.']));
			window.turnstile?.reset();
		} finally {
			submitBtn.disabled = false;
			submitBtn.textContent = submitLabel;
		}
	});
}
