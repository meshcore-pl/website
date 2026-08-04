const fs = require('node:fs');
const path = require('node:path');
const { marked } = require('marked');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const getPngSize = buf => ({ width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) });

const getJpegSize = buf => {
	let i = 2;
	while (i < buf.length - 9) {
		if (buf[i] !== 0xFF) {
			i++;
			continue;
		}
		const marker = buf[i + 1];
		if (marker === 0xD8 || marker === 0x01 || (marker >= 0xD0 && marker <= 0xD9)) {
			i += 2;
			continue;
		}
		const len = buf.readUInt16BE(i + 2);
		if ((marker >= 0xC0 && marker <= 0xC3) || (marker >= 0xC5 && marker <= 0xC7) || (marker >= 0xC9 && marker <= 0xCB) || (marker >= 0xCD && marker <= 0xCF)) {
			return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
		}
		i += 2 + len;
	}
	return null;
};

const getLocalImageSize = href => {
	if (!href || href[0] !== '/' || href[1] === '/') return null;

	const clean = href.split(/[?#]/)[0];
	const ext = path.extname(clean).toLowerCase();
	if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') return null;

	try {
		const buf = fs.readFileSync(path.join(PUBLIC_DIR, decodeURIComponent(clean)));
		return ext === '.png' ? getPngSize(buf) : getJpegSize(buf);
	} catch {
		return null;
	}
};

const DIACRITICS = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };
const slugify = text => text.toLowerCase()
	.replace(/[ąćęłńóśźż]/g, c => DIACRITICS[c] || c)
	.replace(/[^\w\s-]/g, '')
	.replace(/[\s_]+/g, '-')
	.replace(/(^-|-$)/g, '');

const TOC_LABEL_RE = /\s*\{toc:\s*([^}]+)\}\s*$/;
const tocLabels = new WeakMap();

const headingIds = new WeakMap();
const assignHeadingIds = tokens => {
	const seen = new Map();
	for (const t of tokens) {
		if (t.type !== 'heading') continue;

		const tocMatch = TOC_LABEL_RE.exec(t.text);
		if (tocMatch) {
			tocLabels.set(t, tocMatch[1].trim());
			t.text = t.text.slice(0, tocMatch.index);
		}

		const base = slugify(t.text);
		const count = seen.get(base) || 0;
		seen.set(base, count + 1);
		headingIds.set(t, count === 0 ? base : `${base}-${count + 1}`);
	}
};

const renderer = new marked.Renderer();
renderer.heading = token => `<h${token.depth} id="${headingIds.get(token) || slugify(token.text)}">${token.text}</h${token.depth}>\n`;

const EXTERNAL_LINK_RE = /^https?:\/\/(?!(www\.)?meshcorepolska\.org(\/|$))/i;
const baseLink = renderer.link.bind(renderer);
renderer.link = function(token) {
	const html = baseLink(token);
	return EXTERNAL_LINK_RE.test(token.href) ? html.replace('>', ' target="_blank" rel="noopener nofollow">') : html;
};

const baseTable = renderer.table.bind(renderer);
renderer.table = token => `<div class="docs-table">\n${baseTable(token)}</div>\n`;

const baseImage = renderer.image.bind(renderer);
renderer.image = function(token) {
	const html = baseImage(token);
	const size = getLocalImageSize(token.href);
	return size ? html.replace('>', ` width="${size.width}" height="${size.height}">`) : html;
};

const ALERTS = [
	{ type: 'note', label: 'Informacja' },
	{ type: 'tip', label: 'Wskazówka' },
	{ type: 'important', label: 'Ważne' },
	{ type: 'warning', label: 'Ostrzeżenie' },
	{ type: 'caution', label: 'Uwaga' },
];
const ALERT_BY_TYPE = new Map(ALERTS.map(alert => [alert.type, alert]));
const ALERT_RE = new RegExp(`^\\[!\\s*(${ALERTS.map(alert => alert.type).join('|')})\\s*]\\s*\\n+`, 'i');

const baseBlockquote = renderer.blockquote.bind(renderer);
renderer.blockquote = token => {
	const match = ALERT_RE.exec(token.text);
	if (!match) return baseBlockquote(token);

	const alert = ALERT_BY_TYPE.get(match[1].toLowerCase());
	const body = marked.parser(marked.lexer(token.text.slice(match[0].length)), { renderer });
	return `<div class="docs-alert docs-alert--${alert.type}">\n<svg class="docs-alert__icon" aria-hidden="true"><use href="/icons.svg#alert-${alert.type}"></use></svg>\n<div class="docs-alert__body">\n<p class="docs-alert__title">${alert.label}</p>\n${body}</div>\n</div>\n`;
};

const parseDMYDate = str => {
	const [day, month, year] = str.split('.').map(Number);
	return new Date(Date.UTC(year, month - 1, day));
};

const getHeadingId = token => headingIds.get(token) || slugify(token.text);
const getTocLabel = token => tocLabels.get(token) || token.text;

module.exports = { marked, renderer, slugify, assignHeadingIds, getHeadingId, getTocLabel, parseDMYDate };
