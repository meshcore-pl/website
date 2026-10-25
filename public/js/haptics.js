(() => {
	const canVibrate = typeof navigator.vibrate === 'function' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const vibrate = pattern => { if (canVibrate) navigator.vibrate(pattern); };

	window.haptics = {
		tap: () => vibrate(10),
		success: () => vibrate([15, 40, 15]),
		error: () => vibrate([40, 60, 40]),
	};

	document.addEventListener('click', e => {
		if (e.target.closest('[data-haptic]')) window.haptics.tap();
	});
})();
