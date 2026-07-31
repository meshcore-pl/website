const animateCount = (el, target) => {
	const duration = 900;
	const start = performance.now();

	const tick = now => {
		const progress = Math.min((now - start) / duration, 1);
		el.textContent = Math.round(target * progress).toLocaleString('pl-PL');
		if (progress < 1) requestAnimationFrame(tick);
	};

	requestAnimationFrame(tick);
};

const setStat = (id, value) => {
	const el = document.getElementById(id);
	if (el && typeof value === 'number') animateCount(el, value);
};

const setSegment = (id, pct) => {
	const el = document.getElementById(id);
	if (el) el.style.flexBasis = `${pct}%`;
};

const RELATIVE_TIME_UNITS = [
	['year', 31536000],
	['month', 2592000],
	['week', 604800],
	['day', 86400],
	['hour', 3600],
	['minute', 60],
];

const relativeTimeFormatter = new Intl.RelativeTimeFormat('pl', { numeric: 'auto' });

const formatRelativeTime = isoString => {
	const diffSec = (new Date(isoString).getTime() - Date.now()) / 1000;

	for (const [unit, secondsInUnit] of RELATIVE_TIME_UNITS) {
		if (Math.abs(diffSec) >= secondsInUnit) return relativeTimeFormatter.format(Math.round(diffSec / secondsInUnit), unit);
	}

	return relativeTimeFormatter.format(Math.round(diffSec), 'second');
};

const setLastUpdated = isoString => {
	const wrapper = document.getElementById('network-stats-updated');
	const timeEl = document.getElementById('ns-updated');
	if (!wrapper || !timeEl) return;

	if (!isoString) {
		wrapper.hidden = true;
		return;
	}

	timeEl.dateTime = isoString;
	timeEl.textContent = formatRelativeTime(isoString);
	wrapper.hidden = false;
};

const loadRepeaterStats = async () => {
	const totalEl = document.getElementById('stat-repeaters');
	const activeEl = document.getElementById('stat-active');
	if (!totalEl || !activeEl) return;

	const hideStats = () => {
		totalEl.closest('.stat').hidden = true;
		activeEl.closest('.stat').hidden = true;
	};

	const res = await fetch(`${window.MAP_DOMAIN}/api/v1/repeater-stats`).catch(() => null);
	if (!res) return hideStats();

	const body = await res.json().catch(() => null);
	if (!body || !body.success || typeof body.data.total !== 'number' || typeof body.data.active !== 'number') return hideStats();

	const { total, active, nodes, types, status, lastRefreshedAt } = body.data;

	animateCount(totalEl, total);
	animateCount(activeEl, active);
	setLastUpdated(lastRefreshedAt);

	setStat('ns-nodes', nodes);
	setStat('ns-repeaters', types?.repeater);
	setStat('ns-clients', types?.client);
	setStat('ns-roomservers', types?.roomServer);
	setStat('ns-recent', status?.recent);
	setStat('ns-stale', status?.stale);
	setStat('ns-old', status?.old);
	setStat('ns-extinct', status?.extinct);
	setStat('ns-none', status?.none);

	if (status && total > 0) {
		setSegment('seg-recent', (status.recent / total) * 100);
		setSegment('seg-stale', (status.stale / total) * 100);
		setSegment('seg-old', (status.old / total) * 100);
		setSegment('seg-extinct', (status.extinct / total) * 100);
		setSegment('seg-none', (status.none / total) * 100);
	}
};

void loadRepeaterStats();
