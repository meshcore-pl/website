const fs = require('node:fs');
const path = require('node:path');
const parseFrontmatter = require('frontmatter-md');
const groups = require('../content/docs.js');
const { marked, renderer, assignHeadingIds, getHeadingId, getTocLabel, parseDMYDate } = require('./markdown.js');

const DOCS_DIR = path.join(__dirname, '../content/docs');

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

let pages, lastModified;

const build = () => {
	pages = new Map();
	lastModified = null;
	for (const group of groups) {
		group.lastModified = null;

		for (const p of group.pages) {
			const raw = fs.readFileSync(path.join(DOCS_DIR, group.slug, `${p.slug}.md`), 'utf8');
			const { data, content } = parseFrontmatter(raw);
			const tokens = marked.lexer(content);
			assignHeadingIds(tokens);
			const toc = tokens
				.filter(t => t.type === 'heading' && t.depth >= 1 && t.depth <= 3)
				.map(t => ({ id: getHeadingId(t), text: getTocLabel(t), level: t.depth }));

			const date = parseDMYDate(data.updatedAt || data.createdAt);
			if (!group.lastModified || date > group.lastModified) group.lastModified = date;
			if (!lastModified || date > lastModified) lastModified = date;

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

		group.visiblePages = group.pages.filter(p => !p.hidden);
	}
};

const isDev = process.env.NODE_ENV !== 'production';
const ensureFresh = () => { if (isDev) build(); };

build();

const groupMap = new Map(groups.map(g => [g.slug, g]));

module.exports = {
	get groups() { ensureFresh(); return groups; },
	get lastModified() { ensureFresh(); return lastModified; },
	getGroup: slug => { ensureFresh(); return groupMap.get(slug); },
	getPage: (groupSlug, pageSlug) => { ensureFresh(); return pages.get(`${groupSlug}/${pageSlug}`); },
};
