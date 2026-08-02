const fs = require('node:fs');
const path = require('node:path');
const parseFrontmatter = require('frontmatter-md');
const { marked, renderer, assignHeadingIds, slugify, parseDMYDate } = require('./markdown.js');

const NEWS_DIR = path.join(__dirname, '../content/news');

const SOURCES = {
	oficjalne: { slug: 'oficjalne', label: 'blog.meshcore.io', description: 'Oficjalny blog projektu MeshCore.' },
	spolecznosc: { slug: 'spolecznosc', label: 'MeshCore Polska', description: 'Treść przygotowana przez społeczność MeshCore Polska.' },
};

const posts = [];
const postMap = new Map();
const tagMap = new Map();

for (const dir of fs.readdirSync(NEWS_DIR, { withFileTypes: true })) {
	if (!dir.isDirectory()) continue;

	const source = SOURCES[dir.name];
	if (!source) throw new Error(`Nieznane źródło newsów: ${dir.name}`);

	for (const file of fs.readdirSync(path.join(NEWS_DIR, dir.name))) {
		if (!file.endsWith('.md')) continue;

		const slug = file.slice(0, -3);
		const raw = fs.readFileSync(path.join(NEWS_DIR, dir.name, file), 'utf8');
		const { data, content } = parseFrontmatter(raw);
		const tokens = marked.lexer(content);
		assignHeadingIds(tokens);

		const tags = (data.tags || []).map(label => ({ label, slug: slugify(label) }));
		const date = parseDMYDate(data.updatedAt || data.createdAt);
		const tagSlug = tags.length ? tags[0].slug : null;

		const post = {
			slug,
			title: data.title,
			description: data.description || '',
			source,
			tagSlug,
			canonical: tagSlug ? `/aktualnosci/${tagSlug}/${slug}` : `/aktualnosci/${slug}`,
			createdAt: data.createdAt || null,
			updatedAt: data.updatedAt || null,
			publishedAt: parseDMYDate(data.createdAt),
			date,
			tags,
			html: marked.parser(tokens, { renderer }),
		};

		posts.push(post);
		postMap.set(slug, post);

		for (const tag of tags) {
			if (!tagMap.has(tag.slug)) tagMap.set(tag.slug, { slug: tag.slug, label: tag.label, posts: [] });
			tagMap.get(tag.slug).posts.push(post);
		}
	}
}

posts.sort((a, b) => b.date - a.date);
for (const tag of tagMap.values()) tag.posts.sort((a, b) => b.date - a.date);

const tags = [...tagMap.values()].sort((a, b) => b.posts.length - a.posts.length || a.label.localeCompare(b.label, 'pl'));
const lastModified = posts.reduce((acc, p) => (!acc || p.date > acc ? p.date : acc), null);

module.exports = {
	posts,
	tags,
	lastModified,
	getPost: slug => postMap.get(slug),
	getTag: slug => tagMap.get(slug),
};
