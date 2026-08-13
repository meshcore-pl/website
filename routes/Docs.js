const router = require('express').Router();
const RenderError = require('../utils/renderError.js');
const docs = require('../services/docs.js');
const buildSchema = require('../utils/schema.js');

router.get('/dokumentacja', (req, res) => res.render('docs/index.ejs', { groups: docs.groups }));

router.get('/api/v1/dokumentacja/szukaj', (req, res) => {
	res.set('Cache-Control', 'no-cache');
	res.json(docs.searchIndex);
});

router.get('/dokumentacja/:group', (req, res) => {
	const group = docs.getGroup(req.params.group);
	if (!group) return RenderError(res, 404);

	res.set('Last-Modified', group.lastModified.toUTCString());
	res.set('Cache-Control', 'no-cache');
	res.render('docs/group.ejs', { groups: docs.groups, group });
});

router.get('/dokumentacja/:group/:slug', (req, res) => {
	const group = docs.getGroup(req.params.group);
	if (!group) return RenderError(res, 404);

	const page = docs.getPage(req.params.group, req.params.slug);
	if (!page) return RenderError(res, 404);

	res.set('Last-Modified', page.date.toUTCString());
	res.set('Cache-Control', 'no-cache');

	const locals = {
		title: `${page.title} | MeshCore Polska`,
		description: page.description || `${page.title} - dokumentacja MeshCore Polska.`,
		canonical: page.canonical,
		groups: docs.groups,
		group,
		page,
		breadcrumbs: [
			{ name: 'Strona główna', url: '/' },
			{ name: 'Dokumentacja', url: '/dokumentacja' },
			{ name: group.title, url: `/dokumentacja/${group.slug}` },
			{ name: page.title, url: page.canonical },
		],
	};

	if (req.get('X-Docs-Fetch') !== '1') return res.render('docs/page.ejs', locals);

	res.render('docs/_page-content.ejs', locals, (err, html) => {
		if (err) return res.status(500).end();

		const schema = buildSchema({
			domain: req.app.locals.domain,
			discordInviteUrl: req.app.locals.discordInviteUrl,
			breadcrumbs: locals.breadcrumbs,
			article: {
				title: locals.title,
				description: locals.description,
				datePublished: page.publishedAt.toISOString().slice(0, 10),
				dateModified: page.date.toISOString().slice(0, 10),
				url: page.canonical,
			},
			faq: page.faq,
		});

		res.json({
			title: locals.title,
			description: locals.description,
			canonicalUrl: `${req.app.locals.domain}${page.canonical}`,
			schema: JSON.stringify(schema),
			html,
		});
	});
});

module.exports = router;
