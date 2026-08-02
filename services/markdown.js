const { marked } = require('marked');

const DIACRITICS = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };
const slugify = text => text.toLowerCase()
	.replace(/[ąćęłńóśźż]/g, c => DIACRITICS[c] || c)
	.replace(/[^\w\s-]/g, '')
	.replace(/[\s_]+/g, '-')
	.replace(/(^-|-$)/g, '');

const headingIds = new WeakMap();
const assignHeadingIds = tokens => {
	const seen = new Map();
	for (const t of tokens) {
		if (t.type !== 'heading') continue;

		const base = slugify(t.text);
		const count = seen.get(base) || 0;
		seen.set(base, count + 1);
		headingIds.set(t, count === 0 ? base : `${base}-${count + 1}`);
	}
};

const renderer = new marked.Renderer();
renderer.heading = token => `<h${token.depth} id="${headingIds.get(token) || slugify(token.text)}">${token.text}</h${token.depth}>\n`;

const EXTERNAL_LINK_RE = /^https?:\/\/(?!(www\.)?meshcorepolska\.org(\/|$))/i;
const baseLink = renderer.link.bind(renderer);
renderer.link = function(token) {
	const html = baseLink(token);
	return EXTERNAL_LINK_RE.test(token.href) ? html.replace('>', ' target="_blank" rel="noopener nofollow">') : html;
};

const baseTable = renderer.table.bind(renderer);
renderer.table = token => `<div class="docs-table">\n${baseTable(token)}</div>\n`;

const ALERTS = [
	{ type: 'note', label: 'Informacja' },
	{ type: 'tip', label: 'Wskazówka' },
	{ type: 'important', label: 'Ważne' },
	{ type: 'warning', label: 'Ostrzeżenie' },
	{ type: 'caution', label: 'Uwaga' },
];
const ALERT_BY_TYPE = new Map(ALERTS.map(alert => [alert.type, alert]));
const ALERT_RE = new RegExp(`^\\[!\\s*(${ALERTS.map(alert => alert.type).join('|')})\\s*]\\s*\\n+`, 'i');

const baseBlockquote = renderer.blockquote.bind(renderer);
renderer.blockquote = token => {
	const match = ALERT_RE.exec(token.text);
	if (!match) return baseBlockquote(token);

	const alert = ALERT_BY_TYPE.get(match[1].toLowerCase());
	const body = marked.parser(marked.lexer(token.text.slice(match[0].length)), { renderer });
	return `<div class="docs-alert docs-alert--${alert.type}">\n<svg class="docs-alert__icon" aria-hidden="true"><use href="/icons.svg#alert-${alert.type}"></use></svg>\n<div class="docs-alert__body">\n<p class="docs-alert__title">${alert.label}</p>\n${body}</div>\n</div>\n`;
};

const parseDMYDate = str => {
	const [day, month, year] = str.split('.').map(Number);
	return new Date(Date.UTC(year, month - 1, day));
};

const getHeadingId = token => headingIds.get(token) || slugify(token.text);

module.exports = { marked, renderer, slugify, assignHeadingIds, getHeadingId, parseDMYDate };
