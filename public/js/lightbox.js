const initLightbox = () => {
	const overlay = document.createElement('div');
	overlay.className = 'lightbox';
	overlay.hidden = true;

	const image = document.createElement('img');
	overlay.appendChild(image);
	document.body.appendChild(overlay);

	const close = () => overlay.hidden = true;

	const open = (src, alt) => {
		image.src = src;
		image.alt = alt;
		overlay.hidden = false;
	};

	document.addEventListener('click', e => {
		const link = e.target.closest('a[data-lightbox]');
		if (link) {
			e.preventDefault();
			const thumb = link.querySelector('img');
			open(link.href, thumb ? thumb.alt : '');
			return;
		}

		const proseImg = e.target.closest('.prose img');
		if (proseImg && !proseImg.closest('a')) open(proseImg.currentSrc || proseImg.src, proseImg.alt);
	});

	overlay.addEventListener('click', close);
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && !overlay.hidden) close();
	});
};

initLightbox();
