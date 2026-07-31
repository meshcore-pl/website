import { getPage, hasPage } from './lib/page.js';

const DOCS_PAGE = /^\/dokumentacja\/[^/]+\/[^/]+\/?$/;

const view = document.getElementById('docs-view');

let activeModules = [];
let controller = null;

const collectActiveModules = () => [...view.querySelectorAll('script[type="module"]')]
	.map(s => new URL(s.getAttribute('src'), location.href).href)
	.filter(hasPage)
	.map(url => ({ url, api: getPage(url) }));

const syncMeta = ({ title, description, canonicalUrl }) => {
	document.title = title;

	const setAttr = (selector, attr, value) => {
		const el = document.querySelector(selector);
		if (el && value != null) el.setAttribute(attr, value);
	};

	setAttr('link[rel="canonical"]', 'href', canonicalUrl);
	setAttr('meta[name="description"]', 'content', description);
	setAttr('meta[property="og:title"]', 'content', title);
	setAttr('meta[property="og:description"]', 'content', description);
	setAttr('meta[property="og:url"]', 'content', canonicalUrl);
	setAttr('meta[name="twitter:title"]', 'content', title);
	setAttr('meta[name="twitter:description"]', 'content', description);
};

const syncSchema = schema => {
	if (!schema) return;

	let script = document.querySelector('script[type="application/ld+json"][data-seo]');
	if (!script) {
		script = document.createElement('script');
		script.type = 'application/ld+json';
		script.dataset.seo = '';
		document.head.appendChild(script);
	}
	script.textContent = schema;
};

const swapView = async html => {
	activeModules.forEach(({ api }) => {
		try {
			api.destroy?.();
		} catch (err) {
			console.error('[docs-router] destroy() failed', err);
		}
	});
	activeModules = [];

	const oldSidebar = view.querySelector('#docs-sidebar');
	const sidebarScroll = oldSidebar?.scrollTop;

	const temp = document.createElement('div');
	temp.innerHTML = html;
	const scripts = [...temp.querySelectorAll('script')];
	scripts.forEach(s => s.remove());

	view.innerHTML = temp.innerHTML;

	const newSidebar = view.querySelector('#docs-sidebar');
	if (newSidebar && sidebarScroll) newSidebar.scrollTop = sidebarScroll;

	for (const old of scripts) {
		if (old.type !== 'module') continue;

		const absUrl = new URL(old.getAttribute('src'), location.href).href;
		const alreadyLoaded = hasPage(absUrl);
		if (!alreadyLoaded) await import(absUrl);
		if (hasPage(absUrl)) {
			const api = getPage(absUrl);
			if (alreadyLoaded) api.init?.();
			activeModules.push({ url: absUrl, api });
		}
	}
};

const navigate = async (href, { push = true } = {}) => {
	const url = new URL(href, location.href);
	const fallback = () => (push ? (location.href = url.href) : location.reload());

	controller?.abort();
	const ac = new AbortController();
	controller = ac;

	try {
		const res = await fetch(url.href, { signal: ac.signal, headers: { 'X-Docs-Fetch': '1' } });
		if (!res.ok || !(res.headers.get('content-type') || '').includes('application/json')) {
			fallback();
			return;
		}

		const data = await res.json();

		syncMeta(data);
		syncSchema(data.schema);
		await swapView(data.html);

		if (push) history.pushState(null, '', url.href);

		if (url.hash) {
			const target = view.querySelector(`#${CSS.escape(decodeURIComponent(url.hash.slice(1)))}`);
			if (target) target.scrollIntoView({ block: 'start' });
		}

		view.focus({ preventScroll: true });
	} catch (err) {
		if (err.name === 'AbortError') return;
		console.error('[docs-router] navigation failed, falling back to a full reload', err);
		fallback();
	} finally {
		if (controller === ac) controller = null;
	}
};

document.addEventListener('click', e => {
	if (e.defaultPrevented || e.button !== 0) return;
	if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

	const a = e.target.closest('a[href]');
	if (!a) return;
	if (a.target && a.target !== '_self') return;
	if (a.hasAttribute('download')) return;

	const url = new URL(a.href, location.href);
	if (url.origin !== location.origin || !DOCS_PAGE.test(url.pathname)) return;
	if (url.pathname === location.pathname && url.search === location.search && url.hash) return;

	e.preventDefault();
	void navigate(url.href);
});

window.addEventListener('popstate', () => {
	void navigate(location.href, { push: false });
});

activeModules = collectActiveModules();
