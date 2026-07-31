const nav = document.getElementById('nav');
const updateNav = () => nav.classList.toggle('nav--scrolled', window.scrollY > 10);
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

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
