const router = require('express').Router();
const { getStats, formatWarsawDate } = require('../global/services/nodeCache.js');
const StatsDaily = require('../global/database/models/statsDaily.model.js');

const MAX_HISTORY_DAYS = 365;
const DEFAULT_HISTORY_DAYS = 90;

router.get('/api/v1/repeater-stats', async (req, res) => {
	try {
		const region = req.query.region === 'all' ? 'all' : 'pl';
		const stats = await getStats(region);
		if (!stats) return res.status(503).json({ success: false, status: 503, message: 'Dane węzłów nie są obecnie dostępne.' });

		res.set('Cache-Control', 'public, max-age=60');
		res.json({ success: true, status: 200, message: 'OK', data: stats });
	} catch (err) {
		console.error(err);
		res.status(500).json({ success: false, status: 500, message: 'Wewnętrzny błąd serwera.' });
	}
});

router.get('/api/v1/stats/history', async (req, res) => {
	try {
		const region = req.query.region === 'all' ? 'all' : 'pl';
		const query = { region };

		if (req.query.days !== 'all') {
			const days = Math.min(Math.max(parseInt(req.query.days, 10) || DEFAULT_HISTORY_DAYS, 1), MAX_HISTORY_DAYS);

			const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
			query.date = { $gte: formatWarsawDate(cutoff) };
		}

		const history = await StatsDaily.find(query, '-_id -region')
			.sort({ date: 1 })
			.lean();

		res.set('Cache-Control', 'public, max-age=300');
		res.json({ success: true, status: 200, message: 'OK', data: history });
	} catch (err) {
		console.error(err);
		res.status(500).json({ success: false, status: 500, message: 'Wewnętrzny błąd serwera.' });
	}
});

module.exports = router;
