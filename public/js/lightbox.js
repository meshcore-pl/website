const initLightbox = () => {
	const dialog = document.createElement('dialog');
	dialog.className = 'lightbox';
	dialog.setAttribute('aria-label', 'Podgląd obrazka w powiększeniu');

	const image = document.createElement('img');
	dialog.appendChild(image);
	document.body.appendChild(dialog);

	const open = (src, source) => {
		image.src = src;
		image.alt = source?.alt || '';
		image.toggleAttribute('data-transparent', !!source?.hasAttribute('data-transparent'));
		dialog.showModal();
	};

	document.addEventListener('click', e => {
		const link = e.target.closest('a[data-lightbox]');
		if (link) {
			e.preventDefault();
			open(link.href, link.querySelector('img'));
			return;
		}

		const proseImg = e.target.closest('.prose img');
		if (proseImg && !proseImg.closest('a')) open(proseImg.currentSrc || proseImg.src, proseImg);
	});

	dialog.addEventListener('click', () => dialog.close());
	dialog.addEventListener('close', () => image.removeAttribute('src'));
};

initLightbox();
