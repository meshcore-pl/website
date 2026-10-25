(() => {
	if (typeof navigator.vibrate !== 'function' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	document.addEventListener('click', e => {
		if (e.target.closest('button, a, input[type="checkbox"], input[type="radio"], input[type="range"]')) navigator.vibrate(10);
	}, { passive: true });
})();
