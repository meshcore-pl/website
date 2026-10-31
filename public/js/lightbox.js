const initLightbox = () => {
	const dialog = document.createElement('dialog');
	dialog.className = 'lightbox';
	dialog.setAttribute('aria-label', 'Podgląd obrazka w powiększeniu');

	const image = document.createElement('img');
	dialog.appendChild(image);
	document.body.appendChild(dialog);

	const open = (src, source, label = '') => {
		image.src = src;
		image.alt = source?.alt || label;
		image.toggleAttribute('data-transparent', !!source?.hasAttribute('data-transparent'));
		dialog.showModal();
	};

	document.addEventListener('click', e => {
		if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

		const link = e.target.closest('a[data-lightbox]');
		if (link) {
			e.preventDefault();
			open(link.href, link.querySelector('img'), link.getAttribute('aria-label') || '');
			return;
		}

		const proseImg = e.target.closest('.prose img');
		if (proseImg && !proseImg.closest('a')) open(proseImg.currentSrc || proseImg.src, proseImg);
	});

	dialog.addEventListener('click', () => dialog.close());
	dialog.addEventListener('close', () => image.removeAttribute('src'));
};

initLightbox();
