const RG_VOIVODESHIPS = {
	ds: { name: 'dolnośląskie', neighbors: ['lb', 'wp', 'op'] },
	kp: { name: 'kujawsko-pomorskie', neighbors: ['pm', 'wn', 'mz', 'ld', 'wp'] },
	lu: { name: 'lubelskie', neighbors: ['mz', 'pd', 'pk', 'sk'] },
	lb: { name: 'lubuskie', neighbors: ['zp', 'wp', 'ds'] },
	ld: { name: 'łódzkie', neighbors: ['kp', 'mz', 'sk', 'sl', 'op', 'wp'] },
	ma: { name: 'małopolskie', neighbors: ['sl', 'sk', 'pk'] },
	mz: { name: 'mazowieckie', neighbors: ['wn', 'pd', 'lu', 'sk', 'ld', 'kp'] },
	op: { name: 'opolskie', neighbors: ['ds', 'wp', 'ld', 'sl'] },
	pk: { name: 'podkarpackie', neighbors: ['ma', 'sk', 'lu'] },
	pd: { name: 'podlaskie', neighbors: ['wn', 'mz', 'lu'] },
	pm: { name: 'pomorskie', neighbors: ['zp', 'wp', 'kp', 'wn'] },
	sl: { name: 'śląskie', neighbors: ['op', 'ld', 'sk', 'ma'] },
	sk: { name: 'świętokrzyskie', neighbors: ['ld', 'mz', 'lu', 'pk', 'ma', 'sl'] },
	wn: { name: 'warmińsko-mazurskie', neighbors: ['pm', 'kp', 'mz', 'pd'] },
	wp: { name: 'wielkopolskie', neighbors: ['zp', 'pm', 'kp', 'ld', 'op', 'ds', 'lb'] },
	zp: { name: 'zachodniopomorskie', neighbors: ['pm', 'wp', 'lb'] },
};

const RG_ALIASES = {
	wp: ['wlkp'],
};

const RG_ROOT = 'pl';
const RG_MAX_NAME_BYTES = 29;
const RG_MAX_LINE = 160;
const RG_MAX_NEIGHBORS = 2;
const RG_CLI_REPLIES = new Set(['OK', 'Err']);

let highlighterPromise = null;

const setCode = (id, text) => {
	const code = document.getElementById(id);
	code.textContent = text;
	delete code.dataset.hl;

	highlighterPromise ??= import('https://cdn.sefinek.net/js/codeBlocks.js');
	highlighterPromise
		.then(({ highlightCodeBlocks }) => {
			if (code.textContent === text) highlightCodeBlocks(code.parentElement.parentElement);
		})
		.catch(err => console.error('[region-generator] nie udało się załadować podświetlania kodu', err));
};

const rgForm = document.getElementById('rg-form');
const rcForm = document.getElementById('rc-form');

const parseCurrentRegions = text => {
	const lines = text.split(/\r?\n/).filter(line => !line.trim().startsWith('>'));
	// Repeater ucina wynik `region` do 159 bajtów, więc przy długim wyniku ostatnia linia może być niepełna (próg z zapasem na zgubione wcięcia)
	if (new TextEncoder().encode(lines.join('\n').trim()).length >= RG_MAX_LINE - 10) {
		while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
		lines.pop();
	}

	const names = [];
	for (const raw of lines) {
		const line = raw.trim();
		if (!line) continue;

		const name = line.split(/\s+/)[0].replace(/\^$/, '');
		if (name === '*' || RG_CLI_REPLIES.has(name) || !(/^[$#\p{L}\p{N}_-]+$/u).test(name) || names.includes(name)) continue;
		names.push(name);
	}

	return names.reverse();
};

const regionLabel = code => [`pl-${code}`, ...(RG_ALIASES[code] || [])].join(' + ');

const aliasRegions = code => (RG_ALIASES[code] || []).map(name => ({ name, children: [] }));

const buildTree = (home, city, neighbors) => {
	const homeRegion = { name: `pl-${home}`, children: city ? [{ name: `pl-${city}`, children: [] }] : [] };
	return {
		name: RG_ROOT,
		children: [
			homeRegion,
			...aliasRegions(home),
			...neighbors.flatMap(code => [{ name: `pl-${code}`, children: [] }, ...aliasRegions(code)]),
		],
	};
};

const flattenTree = (node, parent = null, depth = 1, out = []) => {
	out.push({ name: node.name, parent, depth });
	node.children.forEach(child => flattenTree(child, node.name, depth + 1, out));
	return out;
};

const buildDefCommand = tree => {
	const tokens = [tree.name];
	tree.children.forEach((branch, i) => {
		const isLastBranch = i === tree.children.length - 1;
		const chain = [branch.name, ...branch.children.map(child => child.name)];
		chain.forEach((name, j) => tokens.push(j === chain.length - 1 && !isLastBranch ? `${name}|${tree.name}` : name));
	});
	return `region def ${tokens.join(' ')}`;
};

const buildCommands = ({ tree, firmware, setDefault }) => {
	const lines = [];
	const defLine = buildDefCommand(tree);

	if (firmware === '116' && defLine.length <= RG_MAX_LINE) {
		lines.push(defLine);
	} else {
		flattenTree(tree).forEach(({ name, parent }) => {
			lines.push(parent ? `region put ${name} ${parent}` : `region put ${name}`);
			if (firmware === 'old') lines.push(`region allowf ${name}`);
		});
	}

	lines.push('region save');
	if (setDefault) lines.push(`region default ${RG_ROOT}`);
	lines.push('region');
	return lines;
};

const buildTreePreview = tree => ['*^ F', ...flattenTree(tree).map(({ name, depth }) => `${' '.repeat(depth)}${name} F`)].join('\n');

const buildChannels = (home, city, neighbors) => [
	{ channel: 'Public', scope: null },
	{ channel: '#test', scope: null },
	{ channel: '#bot', scope: null },
	{ channel: '#info', scope: null },
	{ channel: '#polska', scope: RG_ROOT },
	{ channel: `#${home}`, scope: `pl-${home}` },
	...(city ? [{ channel: `#${city}`, scope: `pl-${city}` }] : []),
	...neighbors.map(code => ({ channel: `#${code}`, scope: `pl-${code}` })),
];

const validateCity = city => {
	if (!city) return [];

	const errors = [];
	if (!(/^[a-z0-9]+(-[a-z0-9]+)*$/).test(city)) errors.push('Kod miasta może zawierać tylko małe litery, cyfry i myślniki (nie na początku ani na końcu).');
	if (new TextEncoder().encode(`pl-${city}`).length > RG_MAX_NAME_BYTES) errors.push(`Nazwa regionu może mieć maksymalnie ${RG_MAX_NAME_BYTES} bajtów.`);
	if (RG_VOIVODESHIPS[city]) errors.push(`Kod „${city}” jest już zajęty przez województwo ${RG_VOIVODESHIPS[city].name}.`);
	return errors;
};

const limitNeighbors = () => {
	const inputs = [...document.querySelectorAll('#rg-neighbors input')];
	const limitReached = inputs.filter(input => input.checked).length >= RG_MAX_NEIGHBORS;
	inputs.forEach(input => {
		input.disabled = limitReached && !input.checked;
	});
};

const renderNeighbors = home => {
	const container = document.getElementById('rg-neighbors');
	const checked = new Set([...container.querySelectorAll('input:checked')].map(input => input.value));
	container.replaceChildren(...RG_VOIVODESHIPS[home].neighbors.map(code => {
		const label = document.createElement('label');
		label.className = 'rg-check';

		const input = document.createElement('input');
		input.type = 'checkbox';
		input.value = code;
		input.checked = checked.has(code);

		const text = document.createElement('span');
		text.textContent = `${RG_VOIVODESHIPS[code].name} (${regionLabel(code)})`;

		label.append(input, text);
		return label;
	}));
	limitNeighbors();
};

const renderOutput = () => {
	const home = document.getElementById('rg-home').value;
	const city = document.getElementById('rg-city').value.trim().toLowerCase();
	const firmware = document.getElementById('rg-fw').value;
	const defaultInput = document.getElementById('rg-default');
	defaultInput.disabled = firmware === 'old';
	const setDefault = defaultInput.checked && !defaultInput.disabled;
	const neighbors = [...document.querySelectorAll('#rg-neighbors input:checked')].map(input => input.value);

	const errors = validateCity(city);
	const errorsBox = document.getElementById('rg-errors');
	const result = document.getElementById('rg-result');
	errorsBox.hidden = !errors.length;
	result.hidden = errors.length > 0;
	document.getElementById('rg-output').hidden = false;

	if (errors.length) {
		document.getElementById('rg-errors-list').replaceChildren(...errors.map(message => {
			const li = document.createElement('li');
			li.textContent = message;
			return li;
		}));
		return;
	}

	const tree = buildTree(home, city, neighbors);
	setCode('rg-commands', buildCommands({ tree, firmware, setDefault }).join('\n'));
	document.getElementById('rg-tree').textContent = buildTreePreview(tree);
	document.getElementById('rg-channels').replaceChildren(...buildChannels(home, city, neighbors).map(({ channel, scope }) => {
		const tr = document.createElement('tr');
		[channel, scope].forEach(value => {
			const td = document.createElement('td');
			if (value === null) {
				td.textContent = channel === 'Public' ? 'Bez regionu (kanał domyślny, dostępny od razu)' : 'Bez regionu';
			} else {
				const code = document.createElement('code');
				code.textContent = value;
				td.append(code);
			}
			tr.append(td);
		});
		return tr;
	}));
};

if (rgForm) {
	const homeSelect = document.getElementById('rg-home');
	homeSelect.append(...Object.entries(RG_VOIVODESHIPS).map(([code, { name }]) => new Option(`${name} (${regionLabel(code)})`, code)));

	homeSelect.addEventListener('change', () => {
		renderNeighbors(homeSelect.value);
		renderOutput();
	});
	rgForm.addEventListener('input', () => {
		limitNeighbors();
		renderOutput();
	});
	rgForm.addEventListener('submit', event => event.preventDefault());

	renderNeighbors(homeSelect.value);
	renderOutput();
}

if (rcForm) {
	const renderCleanup = () => {
		const text = document.getElementById('rc-current').value;
		const names = parseCurrentRegions(text);
		document.getElementById('rc-empty').hidden = !text.trim() || names.length > 0;
		document.getElementById('rc-output').hidden = !names.length;
		if (names.length) setCode('rc-commands', [...names.map(name => `region remove ${name}`), 'region save', 'region'].join('\n'));
	};

	rcForm.addEventListener('input', renderCleanup);
	rcForm.addEventListener('submit', event => event.preventDefault());
	renderCleanup();
}
