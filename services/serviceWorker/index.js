const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const sitePages = require('../../content/pages.js');

const PUBLIC_DIR = path.join(__dirname, '../../public');
const TEMPLATE_PATH = path.join(__dirname, 'worker.js');
const PRECACHE_DIRS = ['css', 'js', 'images/logo', 'images/meshcore'];
const EXTRA_FILES = ['favicon.ico', 'icons.svg'];
const EXCLUDED_RE = /\.(map|md|txt)$|(^|\/)LICENSE[^/]*$|\.LICENSE$/;

const ENDPOINTS = { serviceWorker: '/service-worker.js', manifest: '/manifest.webmanifest', offline: '/offline' };
// Strona offline jest serwowana wyłącznie żądaniu workera z tym nagłówkiem, bezpośrednie wejście daje 404
const OFFLINE_HEADER = 'X-Offline-Precache';
const PAGE_PATHS = sitePages.map(page => page.path);

const isProd = process.env.NODE_ENV === 'production';

const walk = async dir => {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const nested = await Promise.all(entries.map(entry => {
		const fullPath = path.join(dir, entry.name);
		return entry.isDirectory() ? walk(fullPath) : [fullPath];
	}));
	return nested.flat();
};

const collectAssets = async () => {
	const files = [
		...(await Promise.all(PRECACHE_DIRS.map(dir => walk(path.join(PUBLIC_DIR, dir))))).flat(),
		...EXTRA_FILES.map(file => path.join(PUBLIC_DIR, file)),
	].filter(file => !EXCLUDED_RE.test(file.replaceAll('\\', '/')));

	const assets = await Promise.all(files.map(async file => {
		const { size, mtimeMs } = await fs.stat(file);
		const urlPath = '/' + path.relative(PUBLIC_DIR, file).replaceAll('\\', '/');
		return { urlPath: encodeURI(urlPath), signature: `${urlPath}:${size}:${mtimeMs}` };
	}));

	assets.sort((a, b) => a.urlPath.localeCompare(b.urlPath));
	return assets;
};

const build = async () => {
	const [template, assets] = await Promise.all([fs.readFile(TEMPLATE_PATH, 'utf8'), collectAssets()]);
	const version = crypto.createHash('sha1').update(template).update(assets.map(a => a.signature).join('\n')).digest('hex').slice(0, 12);

	return template
		.replace('__VERSION__', version)
		.replace('__OFFLINE_HEADER__', OFFLINE_HEADER)
		.replace('/* __ENDPOINTS__ */', JSON.stringify(ENDPOINTS).slice(1, -1))
		.replace('/* __PAGE_PATHS__ */', JSON.stringify(PAGE_PATHS).slice(1, -1))
		.replace('/* __PRECACHE__ */', JSON.stringify(assets.map(a => a.urlPath)).slice(1, -1));
};

let cached;

const getScript = () => {
	if (!isProd) return build();
	return cached ??= build().catch(err => {
		cached = null;
		throw err;
	});
};

module.exports = { getScript, ENDPOINTS, OFFLINE_HEADER };
