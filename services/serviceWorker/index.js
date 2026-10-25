const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const docs = require('../docs.js');
const sitePages = require('../../content/pages.js');

const PUBLIC_DIR = path.join(__dirname, '../../public');
const TEMPLATE_PATH = path.join(__dirname, 'worker.js');
const PRECACHE_DIRS = ['css', 'js', 'images/logo', 'images/meshcore'];
const EXTRA_FILES = ['favicon.ico', 'icons.svg'];
const EXCLUDED_RE = /\.(map|md|txt)$|(^|\/)LICENSE[^/]*$|\.LICENSE$/;

const ENDPOINTS = { serviceWorker: '/service-worker.js', manifest: '/manifest.webmanifest', docsSearch: '/api/v1/dokumentacja/szukaj' };
const EXTERNAL_PRECACHE = [
	'https://cdn.sefinek.net/js/progressbar.js',
	'https://cdn.sefinek.net/js/console.js',
	'https://cdn.sefinek.net/js/codeBlocks.js',
	'https://cdn.sefinek.net/js/highlight.js',
	'https://cdn.sefinek.net/css/code-viewer.css',
	'https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.js',
];
const DOC_ASSET_RE = /(?:src|href)="(\/(?:images|pliki)\/[^"]+)"/g;
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

const collectDocs = async () => {
	const pages = new Set(['/dokumentacja']);
	const assets = new Set();
	let contentHash = crypto.createHash('sha1');

	for (const group of docs.groups) {
		pages.add(`/dokumentacja/${group.slug}`);
		if (group.icon?.startsWith('/')) assets.add(group.icon);

		for (const { slug } of group.pages) {
			const page = docs.getPage(group.slug, slug);
			pages.add(page.canonical);
			contentHash = contentHash.update(page.html);
			for (const [, asset] of page.html.matchAll(DOC_ASSET_RE)) assets.add(asset);
		}
	}

	const files = await Promise.all([...assets].map(async asset => {
		const stat = await fs.stat(path.join(PUBLIC_DIR, asset)).catch(() => null);
		return stat ? `${asset}:${stat.size}:${stat.mtimeMs}` : asset;
	}));
	contentHash = contentHash.update(files.join('\n'));

	return { pages: [...pages], assets: [...assets].map(encodeURI), hash: contentHash.digest('hex') };
};

const build = async () => {
	const [template, assets, doc] = await Promise.all([fs.readFile(TEMPLATE_PATH, 'utf8'), collectAssets(), collectDocs()]);
	const version = crypto.createHash('sha1').update(template).update(doc.hash).update(EXTERNAL_PRECACHE.join('\n')).update(assets.map(a => a.signature).join('\n')).digest('hex').slice(0, 12);

	return template
		.replace('__VERSION__', version)
		.replace('/* __ENDPOINTS__ */', JSON.stringify(ENDPOINTS).slice(1, -1))
		.replace('/* __PAGE_PATHS__ */', JSON.stringify(PAGE_PATHS).slice(1, -1))
		.replace('/* __DOC_PAGES__ */', JSON.stringify(doc.pages).slice(1, -1))
		.replace('/* __DOC_ASSETS__ */', JSON.stringify(doc.assets).slice(1, -1))
		.replace('/* __EXTERNAL_PRECACHE__ */', JSON.stringify(EXTERNAL_PRECACHE).slice(1, -1))
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

module.exports = { getScript, ENDPOINTS };
