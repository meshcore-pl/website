const router = require('express').Router();
const RenderError = require('../utils/renderError.js');
const { getScript, ENDPOINTS, OFFLINE_HEADER } = require('../services/serviceWorker/index.js');
const pages = require('../content/pages.js');

router.get(ENDPOINTS.serviceWorker, async (req, res, next) => {
	try {
		const script = await getScript();
		res.set({
			'Content-Type': 'text/javascript; charset=utf-8',
			'Cache-Control': 'no-cache',
			'Content-Security-Policy': `default-src 'none'; connect-src 'self' ${req.app.locals.cdn} https:`,
		});
		res.send(script);
	} catch (err) {
		next(err);
	}
});

for (const { path, view } of pages) {
	if (view) router.get(path, (req, res) => res.render(view));
}

router.get(ENDPOINTS.offline, (req, res) => {
	res.set('Cache-Control', 'no-store');
	if (req.get(OFFLINE_HEADER) !== '1') return RenderError(res, 404);
	res.render('offline.ejs');
});

router.get('/discord', (req, res) => res.redirect(301, `https://discord.com/invite/${process.env.DISCORD_INVITE_CODE}`));

module.exports = router;
