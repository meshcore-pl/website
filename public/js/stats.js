/* global Chart */
const REGION = 'pl';
const DEFAULT_DAYS = 90;
const RANGE_STORAGE_KEY = 'statsRangeSelected';

const SERIES = [
	{ key: 'nodes', label: 'Łącznie urządzeń', color: '#58a6ff' },
	{ key: 'types.repeater', label: 'Repeatery', color: '#ff3352' },
	{ key: 'types.roomServer', label: 'Room serwery', color: '#d29922' },
	{ key: 'types.client', label: 'Companiony', color: '#3ddc84' },
];

let chart = null;
let liveStats = null;

const formatDateLabel = dateStr => {
	const d = new Date(`${dateStr}T00:00:00`);
	return d.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' });
};

const getByPath = (obj, path) => path.split('.').reduce((acc, key) => acc?.[key], obj);

const setTile = (id, value) => {
	const el = document.getElementById(id);
	if (el) el.textContent = typeof value === 'number' ? value.toLocaleString('pl-PL') : '-';
};

const chartDatasets = history => SERIES.map(series => ({
	label: series.label,
	data: history.map(entry => getByPath(entry, series.key) || 0),
	borderColor: series.color,
	backgroundColor: series.color,
	borderWidth: 2,
	tension: 0.25,
	pointRadius: 0,
}));

const renderChart = history => {
	const ctx = document.getElementById('stats-chart');
	if (!ctx || typeof Chart === 'undefined') return;

	const labels = history.map(entry => formatDateLabel(entry.date));
	const datasets = chartDatasets(history);

	if (chart) {
		chart.data.labels = labels;
		chart.data.datasets = datasets;
		chart.update();
		return;
	}

	chart = new Chart(ctx, {
		type: 'line',
		data: { labels, datasets },
		options: {
			responsive: true,
			maintainAspectRatio: false,
			interaction: { mode: 'index', intersect: false },
			plugins: {
				legend: { labels: { color: '#99a1b5', font: { family: 'IBM Plex Mono, monospace', size: 12 } } },
				tooltip: {
					backgroundColor: '#0e1118',
					borderColor: 'rgba(148, 166, 204, 0.24)',
					borderWidth: 1,
					titleColor: '#eef1f8',
					bodyColor: '#99a1b5',
				},
			},
			scales: {
				x: {
					grid: { color: 'rgba(148, 166, 204, 0.08)' },
					ticks: { color: '#99a1b5', maxRotation: 0, autoSkip: true, maxTicksLimit: 12 },
				},
				y: {
					beginAtZero: true,
					grid: { color: 'rgba(148, 166, 204, 0.08)' },
					ticks: { color: '#99a1b5', precision: 0 },
				},
			},
		},
	});
};

const fetchLiveTotals = async () => {
	try {
		const res = await fetch(`${window.MAP_DOMAIN}/api/v1/repeater-stats`, { signal: AbortSignal.timeout(8000) });
		if (!res.ok) return null;

		const body = await res.json();
		return body?.success ? body.data : null;
	} catch {
		return null;
	}
};

const fetchHistory = async days => {
	let res;
	try {
		res = await fetch(`${window.MAP_DOMAIN}/api/v1/stats/history?region=${REGION}&days=${days}`, { signal: AbortSignal.timeout(8000) });
	} catch (err) {
		throw new Error(err.name === 'TimeoutError' ? 'Serwer mapy nie odpowiedział na czas. Zgłoś nam ten problem.' : 'Nie udało się połączyć z API serwera mapy (mapa.meshcorepolska.org). Jeśli problem nie ustępuje, zgłoś go nam.', { cause: err });
	}

	if (!res.ok) throw new Error(`Serwer mapy zwrócił błąd ${res.status}${res.statusText ? ` (${res.statusText})` : ''}.`);

	const body = await res.json().catch(() => null);
	if (!body?.success || !Array.isArray(body.data)) throw new Error('Serwer mapy zwrócił nieprawidłową odpowiedź.');

	return body.data;
};

const updateTiles = history => {
	const summary = document.getElementById('stats-summary');
	const latest = history[history.length - 1];

	setTile('stats-nodes-latest', liveStats?.nodes ?? latest.nodes);
	setTile('stats-repeaters-latest', liveStats?.types?.repeater ?? latest.types.repeater);
	setTile('stats-roomservers-latest', liveStats?.types?.roomServer ?? latest.types.roomServer);
	setTile('stats-companions-latest', liveStats?.types?.client ?? latest.types.client);
	if (summary) summary.hidden = false;
};

const showState = ({ error, empty } = {}) => {
	const chartWrap = document.getElementById('stats-chart-wrap');
	const emptyEl = document.getElementById('stats-empty');
	const errorEl = document.getElementById('stats-error');
	const errorDetail = document.getElementById('stats-error-detail');

	if (chartWrap) chartWrap.hidden = Boolean(error || empty);
	if (emptyEl) emptyEl.hidden = !empty;
	if (errorEl) errorEl.hidden = !error;
	if (error && errorDetail) errorDetail.textContent = error;
};

const loadRange = async days => {
	let history;
	try {
		history = await fetchHistory(days);
	} catch (err) {
		showState({ error: err.message });
		return;
	}

	if (!history.length) {
		showState({ empty: true });
		return;
	}

	showState();
	renderChart(history);
	updateTiles(history);
};

const setupRangeButtons = () => {
	const container = document.getElementById('stats-range');
	if (!container) return;

	container.addEventListener('click', event => {
		const btn = event.target.closest('button[data-days]');
		if (!btn || btn.classList.contains('is-active')) return;

		container.querySelectorAll('button').forEach(b => b.classList.remove('is-active'));
		btn.classList.add('is-active');
		localStorage.setItem(RANGE_STORAGE_KEY, btn.dataset.days);
		void loadRange(btn.dataset.days);
	});
};

const getInitialRange = () => {
	const container = document.getElementById('stats-range');
	const stored = localStorage.getItem(RANGE_STORAGE_KEY);
	const storedBtn = stored && container?.querySelector(`button[data-days="${stored}"]`);
	if (!storedBtn) return DEFAULT_DAYS;

	container.querySelectorAll('button').forEach(b => b.classList.remove('is-active'));
	storedBtn.classList.add('is-active');
	return stored;
};

const init = async () => {
	setupRangeButtons();
	liveStats = await fetchLiveTotals();
	await loadRange(getInitialRange());
};

void init();
