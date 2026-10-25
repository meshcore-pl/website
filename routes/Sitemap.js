const router = require('express').Router();
const docs = require('../services/docs.js');
const news = require('../services/news.js');
const pages = require('../content/pages.js');

const isProd = process.env.NODE_ENV === 'production';

const LASTMOD = {
	'/dokumentacja': () => docs.lastModified,
	'/aktualnosci': () => news.lastModified,
};

const escapeXml = str => str.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&apos;' })[c]);

const buildSitemap = domain => {
	const entries = [
		...pages.map(({ path }) => ({ loc: path, lastmod: LASTMOD[path]?.() ?? null })),
		...docs.groups.map(group => ({ loc: `/dokumentacja/${group.slug}`, lastmod: group.lastModified })),
		...news.tags.map(tag => ({ loc: `/aktualnosci/${tag.slug}`, lastmod: tag.posts.reduce((acc, p) => (p.date > acc ? p.date : acc), tag.posts[0].date) })),
		...news.posts.map(post => ({ loc: post.canonical, lastmod: post.date })),
		...docs.groups.flatMap(group => group.visiblePages.map(page => ({ loc: `/dokumentacja/${group.slug}/${page.slug}`, lastmod: page.date }))),
	];

	const urls = entries.map(({ loc, lastmod }) => {
		const lastmodTag = lastmod ? `<lastmod>${lastmod.toISOString()}</lastmod>` : '';
		return `<url><loc>${escapeXml(domain + loc)}</loc>${lastmodTag}</url>`;
	});

	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
};

let cached;
const getSitemap = domain => {
	if (!isProd) return buildSitemap(domain);
	return cached ??= buildSitemap(domain);
};

router.get('/sitemap.xml', (req, res) => {
	res.set({
		'Content-Type': 'application/xml; charset=utf-8',
		'Cache-Control': 'public, max-age=3600',
		'Content-Security-Policy': 'default-src \'none\'; style-src \'unsafe-inline\'; script-src \'unsafe-inline\'',
	});
	res.send(getSitemap(req.app.locals.domain));
});

module.exports = router;
