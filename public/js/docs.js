import { definePage } from './lib/page.js';
import { highlightCodeBlocks } from 'https://cdn.sefinek.net/js/codeBlocks.js';

let scrollEl = null;
let onScroll = null;
let onAnchorClick = null;
let onToggleClick = null;
let onBackdropClick = null;
let onSidebarClick = null;
let onKeydown = null;

const destroy = () => {
	if (scrollEl && onScroll) scrollEl.removeEventListener('scroll', onScroll);
	scrollEl = null;
	onScroll = null;

	if (onAnchorClick) document.removeEventListener('click', onAnchorClick);
	onAnchorClick = null;

	const toggleBtn = document.getElementById('docs-mobile-toc-btn');
	if (toggleBtn && onToggleClick) toggleBtn.removeEventListener('click', onToggleClick);
	onToggleClick = null;

	const backdrop = document.getElementById('docs-mobile-toc-backdrop');
	if (backdrop && onBackdropClick) backdrop.removeEventListener('click', onBackdropClick);
	onBackdropClick = null;

	const sidebar = document.getElementById('docs-sidebar');
	if (sidebar && onSidebarClick) sidebar.removeEventListener('click', onSidebarClick);
	onSidebarClick = null;

	if (onKeydown) document.removeEventListener('keydown', onKeydown);
	onKeydown = null;
};

const init = () => {
	destroy();

	const content = document.getElementById('docs-content');
	if (!content) return;

	highlightCodeBlocks(content);

	const targetFor = href => href && href[0] === '#' && href.length > 1
		? content.querySelector(`#${CSS.escape(decodeURIComponent(href.slice(1)))}`)
		: null;

	const headings = [...content.querySelectorAll('h1[id], h2[id], h3[id]')];
	const tocLinks = [...document.querySelectorAll('#docs-toc a, #docs-sidebar__toc a')];

	const setActive = id => {
		const sel = `#${id}`;
		tocLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === sel));
	};

	const update = () => {
		if (!headings.length) return;

		let activeId = headings[0].id;
		if (content.scrollTop + content.clientHeight >= content.scrollHeight - 4) {
			activeId = headings[headings.length - 1].id;
		} else {
			const top = content.getBoundingClientRect().top;
			for (const heading of headings) {
				if (heading.getBoundingClientRect().top - top <= 120) activeId = heading.id;
				else break;
			}
		}
		setActive(activeId);
	};

	let ticking = false;
	onScroll = () => {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(() => {
			update();
			ticking = false;
		});
	};
	scrollEl = content;
	content.addEventListener('scroll', onScroll, { passive: true });

	onAnchorClick = e => {
		if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		const a = e.target.closest('a[href]');
		if (!a) return;
		const target = targetFor(a.getAttribute('href'));
		if (!target) return;
		e.preventDefault();
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		history.replaceState(history.state, '', a.getAttribute('href'));
		setActive(target.id);
	};
	document.addEventListener('click', onAnchorClick);

	const initial = targetFor(location.hash);
	if (initial) requestAnimationFrame(() => initial.scrollIntoView({ block: 'start' }));
	update();

	const toggleBtn = document.getElementById('docs-mobile-toc-btn');
	const backdrop = document.getElementById('docs-mobile-toc-backdrop');
	const sidebar = document.getElementById('docs-sidebar');
	if (toggleBtn && backdrop && sidebar) {
		const closeDrawer = () => {
			sidebar.classList.remove('is-open');
			backdrop.hidden = true;
			toggleBtn.setAttribute('aria-expanded', 'false');
		};

		onToggleClick = () => {
			const open = sidebar.classList.toggle('is-open');
			backdrop.hidden = !open;
			toggleBtn.setAttribute('aria-expanded', String(open));
		};
		toggleBtn.addEventListener('click', onToggleClick);

		onBackdropClick = closeDrawer;
		backdrop.addEventListener('click', onBackdropClick);

		onSidebarClick = e => {
			if (e.target.closest('a')) closeDrawer();
		};
		sidebar.addEventListener('click', onSidebarClick);

		onKeydown = e => {
			if (e.key === 'Escape') closeDrawer();
		};
		document.addEventListener('keydown', onKeydown);
	}
};

definePage(import.meta.url, { init, destroy });
