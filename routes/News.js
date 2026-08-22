const router = require('express').Router();
const RenderError = require('../utils/renderError.js');
const news = require('../services/news.js');
const { getRandomTip } = require('../content/tips.js');

router.get('/aktualnosci', (req, res) => res.render('news/index.ejs', { posts: news.posts, tags: news.tags, tip: getRandomTip() }));

router.get('/aktualnosci/:tag', (req, res) => {
	const tag = news.getTag(req.params.tag);
	if (!tag) return RenderError(res, 404);

	res.render('news/tag.ejs', { tag, tags: news.tags });
});

router.get('/aktualnosci/:tag/:title', (req, res) => {
	const post = news.getPost(req.params.title);
	if (!post) return RenderError(res, 404);
	if (req.params.tag !== post.tagSlug) return res.redirect(301, post.canonical);

	res.set('Last-Modified', post.date.toUTCString());
	res.set('Cache-Control', 'no-cache');

	res.render('news/post.ejs', {
		title: `${post.title} - Aktualności MeshCore Polska`,
		description: post.description || `${post.title} - aktualności MeshCore Polska.`,
		canonical: post.canonical,
		post,
		breadcrumbs: [
			{ name: 'Strona główna', url: '/' },
			{ name: 'Aktualności', url: '/aktualnosci' },
			...(post.tagSlug ? [{ name: post.tags[0].label, url: `/aktualnosci/${post.tagSlug}` }] : []),
			{ name: post.title, url: post.canonical },
		],
	});
});

module.exports = router;
