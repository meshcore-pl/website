import { definePage } from './lib/page.js';

const MAX_RESULTS = 8;

let indexPromise = null;
const loadIndex = () => {
	if (!indexPromise) {
		indexPromise = fetch('/api/v1/dokumentacja/szukaj')
			.then(res => (res.ok ? res.json() : []))
			.catch(() => []);
	}
	return indexPromise;
};

const search = (index, query) => {
	const q = query.trim().toLowerCase();
	if (!q) return [];

	const results = [];
	for (const page of index) {
		if (results.length >= MAX_RESULTS) break;

		if (page.title.toLowerCase().includes(q) || page.group.toLowerCase().includes(q)) {
			results.push({ url: page.url, title: page.title, group: page.group, heading: null });
		}

		for (const heading of page.headings) {
			if (results.length >= MAX_RESULTS) break;
			if (heading.text.toLowerCase().includes(q)) results.push({ url: `${page.url}#${heading.id}`, title: page.title, group: page.group, heading: heading.text });
		}
	}

	return results.slice(0, MAX_RESULTS);
};

let onInput = null;
let onKeydown = null;
let onDocClick = null;
let onFocusOut = null;

const destroy = () => {
	const input = document.getElementById('docs-search-input');
	if (input) {
		if (onInput) input.removeEventListener('input', onInput);
		if (onKeydown) input.removeEventListener('keydown', onKeydown);
	}
	onInput = null;
	onKeydown = null;

	const wrapper = document.getElementById('docs-search');
	if (wrapper && onFocusOut) wrapper.removeEventListener('focusout', onFocusOut);
	onFocusOut = null;

	if (onDocClick) document.removeEventListener('click', onDocClick);
	onDocClick = null;
};

const init = () => {
	destroy();

	const wrapper = document.getElementById('docs-search');
	const input = document.getElementById('docs-search-input');
	const results = document.getElementById('docs-search-results');
	const status = document.getElementById('docs-search__status');
	if (!wrapper || !input || !results) return;

	let index = [];
	loadIndex().then(data => { index = data; });

	let activeIndex = -1;

	const close = () => {
		results.hidden = true;
		input.setAttribute('aria-expanded', 'false');
		input.removeAttribute('aria-activedescendant');
	};

	const setActive = i => {
		const els = [...results.querySelectorAll('.docs-search__result')];
		if (!els.length) {
			activeIndex = -1;
			input.removeAttribute('aria-activedescendant');
			return;
		}

		activeIndex = (i + els.length) % els.length;
		els.forEach((el, idx) => el.classList.toggle('docs-search__result--active', idx === activeIndex));
		els[activeIndex].scrollIntoView({ block: 'nearest' });
		input.setAttribute('aria-activedescendant', els[activeIndex].id);
	};

	onInput = () => {
		results.replaceChildren();
		activeIndex = -1;

		const query = input.value.trim();
		wrapper.classList.toggle('has-value', query.length > 0);
		if (!query) {
			close();
			if (status) status.textContent = '';
			return;
		}

		const items = search(index, query);
		if (!items.length) {
			const empty = document.createElement('p');
			empty.id = 'docs-search__empty';
			empty.textContent = 'Brak wyników.';
			results.append(empty);
			results.hidden = false;
			input.setAttribute('aria-expanded', 'true');
			if (status) status.textContent = 'Brak wyników.';
			return;
		}

		items.forEach((item, i) => {
			const a = document.createElement('a');
			a.href = item.url;
			a.id = `docs-search-result-${i}`;
			a.className = 'docs-search__result';
			a.setAttribute('role', 'option');

			const title = document.createElement('span');
			title.className = 'docs-search__result-title';
			title.textContent = item.heading || item.title;

			const meta = document.createElement('span');
			meta.className = 'docs-search__result-meta';
			meta.textContent = item.heading ? `${item.group} › ${item.title}` : item.group;

			a.append(title, meta);
			results.append(a);
		});
		results.hidden = false;
		input.setAttribute('aria-expanded', 'true');
		if (status) status.textContent = `Znaleziono wyników: ${items.length}.`;
		setActive(0);
	};
	input.addEventListener('input', onInput);

	onKeydown = e => {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (!results.hidden) setActive(activeIndex + 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (!results.hidden) setActive(activeIndex - 1);
		} else if (e.key === 'Escape') {
			input.value = '';
			wrapper.classList.remove('has-value');
			results.replaceChildren();
			close();
			if (status) status.textContent = '';
			input.blur();
		} else if (e.key === 'Enter') {
			const els = [...results.querySelectorAll('.docs-search__result')];
			const target = els[activeIndex] || els[0];
			if (target) {
				e.preventDefault();
				target.click();
			}
		}
	};
	input.addEventListener('keydown', onKeydown);

	onFocusOut = e => {
		if (!wrapper.contains(e.relatedTarget)) close();
	};
	wrapper.addEventListener('focusout', onFocusOut);

	onDocClick = e => {
		if (!e.target.closest('#docs-search')) close();
	};
	document.addEventListener('click', onDocClick);
};

definePage(import.meta.url, { init, destroy });
