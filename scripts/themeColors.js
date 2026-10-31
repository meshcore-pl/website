process.loadEnvFile();

const fs = require('node:fs');
const path = require('node:path');
const parseFrontmatter = require('frontmatter-md');
const { marked, extractFirstImage } = require('../services/markdown.js');
const tcpClient = require('../global/services/tcpClient.js');
const { homepage } = require('../package.json');

const ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const CONTENT_DIRS = ['content/docs', 'content/news'].map(dir => path.join(ROOT, dir));
const HEX_RE = /^#[0-9a-f]{6}$/i;
const FRONTMATTER_RE = /^---(\r?\n)([\s\S]*?)\r?\n---/;
const THEME_LINE_RE = /^themeColor:/;
const ANCHOR_RE = /^(createdAt|updatedAt):/;

const args = new Set(process.argv.slice(2));
const force = args.has('--force');
const dryRun = args.has('--dry');

const listMarkdown = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
	const full = path.join(dir, entry.name);
	if (entry.isDirectory()) return listMarkdown(full);
	return entry.name.endsWith('.md') ? [full] : [];
});

const waitForConnection = async () => {
	for (let i = 0; i < 50 && !tcpClient.isClientConnected(); i++) await new Promise(resolve => setTimeout(resolve, 200));
	return tcpClient.isClientConnected();
};

const candidatesFor = src => {
	if ((/^https?:\/\//i).test(src)) return [src];
	return [`${homepage.replace(/\/$/, '')}${src}`, path.join(PUBLIC_DIR, decodeURIComponent(src.split(/[?#]/)[0]))];
};

const resolveColor = async src => {
	let reason = 'no response from TCP service';
	for (const candidate of candidatesFor(src)) {
		const result = await tcpClient.getDominantColors(candidate);
		if (HEX_RE.test(result?.dominant)) return { color: result.dominant.toLowerCase() };
		if (result) reason = result.error || 'invalid response';
	}
	return { reason };
};

const writeColor = (raw, color) => {
	const line = `themeColor: '${color}'`;
	const match = FRONTMATTER_RE.exec(raw);
	const [, eol, body] = match;
	const lines = body.split(/\r?\n/).filter(l => !THEME_LINE_RE.test(l));
	const anchor = lines.findLastIndex(l => ANCHOR_RE.test(l));
	lines.splice(anchor === -1 ? lines.length : anchor + 1, 0, line);
	return `---${eol}${lines.join(eol)}${raw.slice(match[0].length - eol.length - 3)}`;
};

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code, text) => (useColor ? `\x1b[${code}m${text}\x1b[0m` : text);
const swatch = hex => {
	if (!useColor) return '';
	const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
	return `\x1b[48;2;${r};${g};${b}m  \x1b[0m `;
};

const STATUS = {
	ok: paint(32, 'OK   '),
	dry: paint(36, 'DRY  '),
	fail: paint(31, 'FAIL '),
	skip: paint(90, 'SKIP '),
};

const displayPath = file => path.relative(path.join(ROOT, 'content'), file).split(path.sep).join('/');

(async () => {
	if (!await waitForConnection()) {
		console.error(paint(31, 'Could not connect to the TCP service (check TCPDATA_HOST/TCPDATA_PORT).'));
		process.exit(1);
	}

	const files = CONTENT_DIRS.flatMap(listMarkdown);
	const width = Math.max(...files.map(file => displayPath(file).length));
	const counterWidth = String(files.length).length;
	const stats = { updated: 0, skipped: 0, noImage: 0, failed: 0 };

	console.log(`${paint(1, 'Theme colors')} ${paint(90, `(${files.length} files${dryRun ? ', dry run' : ''}${force ? ', force' : ''})`)}\n`);

	for (const [index, file] of files.entries()) {
		const raw = fs.readFileSync(file, 'utf8');
		const { data, content } = parseFrontmatter(raw);
		const image = extractFirstImage(marked.lexer(content));

		if (!image) {
			stats.noImage++;
			continue;
		}

		const label = `${paint(90, `${String(index + 1).padStart(counterWidth)}/${files.length}`)} ${displayPath(file).padEnd(width)}`;

		if (data.themeColor && !force) {
			console.log(`${STATUS.skip} ${label}  ${swatch(data.themeColor)}${data.themeColor}`);
			stats.skipped++;
			continue;
		}

		const { color, reason } = await resolveColor(image.src);
		if (!color) {
			console.log(`${STATUS.fail} ${label}  ${paint(31, reason)}`);
			console.log(`${' '.repeat(6 + counterWidth * 2 + 2)}${paint(90, image.src)}`);
			stats.failed++;
			continue;
		}

		console.log(`${dryRun ? STATUS.dry : STATUS.ok} ${label}  ${swatch(color)}${color}`);
		if (!dryRun) fs.writeFileSync(file, writeColor(raw, color));
		stats.updated++;
	}

	const summary = [
		paint(32, `${stats.updated} ${dryRun ? 'to update' : 'updated'}`),
		paint(90, `${stats.skipped} skipped`),
		paint(90, `${stats.noImage} without image`),
		stats.failed ? paint(31, `${stats.failed} failed`) : paint(90, '0 failed'),
	];
	console.log(`\n${summary.join(paint(90, ' | '))}`);
	process.exit(stats.failed ? 1 : 0);
})();
