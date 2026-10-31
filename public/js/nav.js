const nav = document.getElementById('nav');
const SCROLL_RANGE = 250;
let navFrame = 0;
const updateNav = () => {
	navFrame = 0;
	const t = Math.min(Math.max(window.scrollY / SCROLL_RANGE, 0), 1);
	const progress = t * t * (3 - 2 * t);
	nav.style.setProperty('--nav-p', progress.toFixed(3));
};
updateNav();
window.addEventListener('scroll', () => {
	if (!navFrame) navFrame = requestAnimationFrame(updateNav);
}, { passive: true });

const syncNavHeight = () => document.documentElement.style.setProperty('--nav-h-live', `${nav.offsetHeight}px`);
syncNavHeight();
window.addEventListener('resize', syncNavHeight, { passive: true });

const navToggle = document.getElementById('nav__toggle');
if (navToggle) {
	const closeMenu = () => {
		nav.classList.remove('nav--open');
		navToggle.setAttribute('aria-expanded', 'false');
	};

	navToggle.addEventListener('click', () => {
		const open = nav.classList.toggle('nav--open');
		navToggle.setAttribute('aria-expanded', String(open));
	});

	document.querySelectorAll('#nav-menu a').forEach(link => link.addEventListener('click', closeMenu));
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape') closeMenu();
	});
}
