const VERSION = '__VERSION__';
const PRECACHE = new Set([/* __PRECACHE__ */]);

const STATIC_CACHE = `static-${VERSION}`;
const PAGES_CACHE = 'pages';
const API_CACHE = 'api';
const FILES_CACHE = 'files';
const EXTERNAL_CACHE = 'external';
const KEEP_CACHES = [STATIC_CACHE, PAGES_CACHE, API_CACHE, FILES_CACHE, EXTERNAL_CACHE];

const PAGE_PATHS = new Set([/* __PAGE_PATHS__ */]);
const ENDPOINTS = {/* __ENDPOINTS__ */};
const DOC_PAGES = [/* __DOC_PAGES__ */];
const DOC_ASSETS = [/* __DOC_ASSETS__ */];
const APP_PAGES = [...PAGE_PATHS, ...DOC_PAGES, ENDPOINTS.manifest];
const NETWORK_TIMEOUT_MS = 5000;
const MAX_FILES = 300;
const MAX_EXTERNAL = 150;
const MAX_API = 60;
const EXTERNAL_DESTINATIONS = new Set(['style', 'script', 'font', 'image']);
const FILE_PATH_RE = /^\/(images|pliki)\//;
const UNCACHED_HOSTS = new Set();
const PASSTHROUGH_PATHS = new Set([ENDPOINTS.serviceWorker, '/robots.txt', '/sitemap.xml', '/llms.txt', '/discord']);

const isCacheable = response => response.ok || response.type === 'opaque';

const trimCache = async (cache, maxEntries) => {
	const keys = await cache.keys();
	await Promise.all(keys.slice(0, Math.max(0, keys.length - maxEntries)).map(key => cache.delete(key)));
};

const store = async (cacheName, request, response, maxEntries) => {
	const cache = await caches.open(cacheName);
	await cache.put(request, response);
	if (maxEntries) await trimCache(cache, maxEntries);
};

const fetchWithTimeout = (request, timeoutMs) => {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);
	return fetch(request, { signal: controller.signal }).finally(() => clearTimeout(timer));
};

const cacheFirst = async (event, request, cacheName, maxEntries) => {
	const cached = await caches.match(request, { cacheName });
	if (cached) return cached;

	const response = await fetch(request);
	if (isCacheable(response)) event.waitUntil(store(cacheName, request, response.clone(), maxEntries));
	return response;
};

const networkFirst = async (event, request, cacheName, maxEntries) => {
	try {
		const response = await fetchWithTimeout(request, NETWORK_TIMEOUT_MS);
		if (response.ok) {
			event.waitUntil(store(cacheName, request, response.clone(), maxEntries));
			return response;
		}

		return await caches.match(request, { cacheName }) ?? response;
	} catch (err) {
		const cached = await caches.match(request, { cacheName });
		if (cached) return cached;
		throw err;
	}
};

const staleWhileRevalidate = async (event, request, cacheName, maxEntries) => {
	const cached = await caches.match(request, { cacheName });
	const refresh = fetch(request).then(response => {
		if (isCacheable(response)) event.waitUntil(store(cacheName, request, response.clone(), maxEntries));
		return response;
	});

	if (!cached) return refresh;
	event.waitUntil(refresh.catch(() => null));
	return cached;
};

const pageKey = url => new Request(url.origin + url.pathname);

const cachedPage = async url => {
	const shell = PAGE_PATHS.has(url.pathname) ? url.pathname : '/';
	return await caches.match(pageKey(url), { cacheName: PAGES_CACHE })
		?? caches.match(new Request(url.origin + shell), { cacheName: PAGES_CACHE });
};

const handleNavigation = async (event, request, url) => {
	const network = fetch(request).then(response => {
		if (response.ok) event.waitUntil(store(PAGES_CACHE, pageKey(url), response.clone()));
		return response;
	});
	event.waitUntil(network.catch(() => null));

	let timer;
	const timeout = new Promise(resolve => {
		timer = setTimeout(resolve, NETWORK_TIMEOUT_MS);
	});

	try {
		const response = await Promise.race([network, timeout]);
		if (response && response.status < 500) return response;
		return await cachedPage(url) ?? response ?? await network;
	} catch {
		return await cachedPage(url) ?? new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
	} finally {
		clearTimeout(timer);
	}
};

self.addEventListener('install', event => {
	event.waitUntil((async () => {
		const staticCache = await caches.open(STATIC_CACHE);
		await staticCache.addAll([...PRECACHE].map(path => new Request(path, { cache: 'reload' })));

		const pagesCache = await caches.open(PAGES_CACHE);
		await Promise.all(APP_PAGES.map(async page => {
			try {
				const response = await fetch(page, { cache: 'reload' });
				if (response.ok) await pagesCache.put(page, response);
			} catch (err) {
				console.warn('Could not precache page', page, err);
			}
		}));

		const filesCache = await caches.open(FILES_CACHE);
		await Promise.all(DOC_ASSETS.map(async asset => {
			try {
				const response = await fetch(asset);
				if (response.ok) await filesCache.put(asset, response);
			} catch (err) {
				console.warn('Could not precache asset', asset, err);
			}
		}));

		try {
			const response = await fetch(ENDPOINTS.docsSearch, { cache: 'reload' });
			if (response.ok) await (await caches.open(API_CACHE)).put(ENDPOINTS.docsSearch, response);
		} catch (err) {
			console.warn('Could not precache docs search index', err);
		}

		await self.skipWaiting();
	})());
});

self.addEventListener('activate', event => {
	event.waitUntil((async () => {
		for (const name of await caches.keys()) {
			if (!KEEP_CACHES.includes(name)) await caches.delete(name);
		}
		await self.clients.claim();
	})());
});

self.addEventListener('fetch', event => {
	const { request } = event;
	if (request.method !== 'GET') return;

	const url = new URL(request.url);
	const respond = handler => event.respondWith(handler().catch(() => Response.error()));

	if (url.origin !== self.location.origin) {
		if (url.protocol === 'https:' && !UNCACHED_HOSTS.has(url.hostname) && EXTERNAL_DESTINATIONS.has(request.destination)) {
			respond(() => staleWhileRevalidate(event, request, EXTERNAL_CACHE, MAX_EXTERNAL));
		}
		return;
	}

	if (PASSTHROUGH_PATHS.has(url.pathname)) return;

	if (url.pathname === ENDPOINTS.manifest) respond(() => networkFirst(event, request, PAGES_CACHE));
	else if (FILE_PATH_RE.test(url.pathname)) respond(() => cacheFirst(event, request, FILES_CACHE, MAX_FILES));
	else if (url.pathname.startsWith('/api/')) respond(() => networkFirst(event, request, API_CACHE, MAX_API));
	else if (request.mode === 'navigate' || PAGE_PATHS.has(url.pathname)) respond(() => handleNavigation(event, request, url));
	else if (PRECACHE.has(url.pathname)) respond(() => cacheFirst(event, request, STATIC_CACHE));
});
