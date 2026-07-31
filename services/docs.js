const fs = require('node:fs');
const path = require('node:path');
const { marked } = require('marked');
const parseFrontmatter = require('frontmatter-md');
const groups = require('../content/docs.js');

const DOCS_DIR = path.join(__dirname, '../content/docs');

const DIACRITICS = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' }; // TODO: Nie lepiej w stringu?
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

const baseTable = renderer.table.bind(renderer);
renderer.table = token => `<div class="docs-table">\n${baseTable(token)}</div>\n`;

const ALERTS = [
	{ type: 'note', keyword: 'informacja', label: 'Informacja' },
	{ type: 'tip', keyword: 'wskazówka', label: 'Wskazówka' },
	{ type: 'important', keyword: 'ważne', label: 'Ważne' },
	{ type: 'warning', keyword: 'ostrzeżenie', label: 'Ostrzeżenie' },
	{ type: 'caution', keyword: 'uwaga', label: 'Uwaga' },
];
const ALERT_BY_KEYWORD = new Map(ALERTS.map(alert => [alert.keyword, alert]));
const ALERT_RE = new RegExp(`^\\[!\\s*(${ALERTS.map(alert => alert.keyword).join('|')})\\s*]\\s*\\n+`, 'i');

const baseBlockquote = renderer.blockquote.bind(renderer);
renderer.blockquote = token => {
	const match = ALERT_RE.exec(token.text);
	if (!match) return baseBlockquote(token);

	const alert = ALERT_BY_KEYWORD.get(match[1].toLowerCase());
	const body = marked.parser(marked.lexer(token.text.slice(match[0].length)), { renderer });
	return `<div class="docs-alert docs-alert--${alert.type}">\n<svg class="docs-alert__icon" aria-hidden="true"><use href="/icons.svg#alert-${alert.type}"></use></svg>\n<div class="docs-alert__body">\n<p class="docs-alert__title">${alert.label}</p>\n${body}</div>\n</div>\n`;
};

const parseDMYDate = str => {
	const [day, month, year] = str.split('.').map(Number);
	return new Date(Date.UTC(year, month - 1, day));
};

const extractFaq = tokens => {
	const faq = [];
	for (let i = 0; i < tokens.length; i++) {
		const heading = tokens[i];
		if (heading.type !== 'heading' || heading.depth !== 2 || !heading.text.trim().endsWith('?')) continue;

		const answerTokens = [];
		for (let j = i + 1; j < tokens.length && !(tokens[j].type === 'heading' && tokens[j].depth <= 2); j++) {
			answerTokens.push(tokens[j]);
		}

		faq.push({ question: heading.text, answerHtml: marked.parser(answerTokens, { renderer }) });
	}
	return faq;
};

const pages = new Map();
let lastModified = null;
for (const group of groups) {
	group.lastModified = null;
	for (const p of group.pages) {
		const raw = fs.readFileSync(path.join(DOCS_DIR, group.slug, `${p.slug}.md`), 'utf8');
		const { data, content } = parseFrontmatter(raw);
		const tokens = marked.lexer(content);
		assignHeadingIds(tokens);
		const toc = tokens
			.filter(t => t.type === 'heading' && t.depth >= 1 && t.depth <= 3)
			.map(t => ({ id: headingIds.get(t), text: t.text, level: t.depth }));

		const date = parseDMYDate(data.updatedAt || data.createdAt);
		if (!group.lastModified || date > group.lastModified) group.lastModified = date;
		if (!lastModified || date > lastModified) lastModified = date;

		p.title = data.title || p.title;
		p.description = data.description || '';
		p.createdAt = data.createdAt || null;
		p.updatedAt = data.updatedAt || null;
		p.date = date;

		pages.set(`${group.slug}/${p.slug}`, {
			slug: p.slug,
			title: data.title || p.title,
			description: data.description || '',
			canonical: data.canonical,
			createdAt: data.createdAt || null,
			updatedAt: data.updatedAt || null,
			publishedAt: parseDMYDate(data.createdAt),
			date,
			html: marked.parser(tokens, { renderer }),
			toc,
			faq: extractFaq(tokens),
			group,
		});
	}
}

const groupMap = new Map(groups.map(g => [g.slug, g]));

module.exports = {
	groups,
	lastModified,
	getGroup: slug => groupMap.get(slug),
	getPage: (groupSlug, pageSlug) => pages.get(`${groupSlug}/${pageSlug}`),
};
