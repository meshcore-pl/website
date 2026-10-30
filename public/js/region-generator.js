const MESHCORE_REGIONS = {
	commonChannels: ['#test', '#bot', '#info'],
	country: {
		scope: 'pl',
		channels: ['#polska'],
		discordUrl: 'https://discord.gg/g4W4Gx6Aw',
	},
	voivodeships: {
		ds: {
			name: 'dolnośląskie',
			scope: 'pl-ds',
			channels: ['#dolnoslaskie', '#ds-test'],
			neighbors: ['lb', 'wp', 'op'],
		},
		kp: {
			name: 'kujawsko-pomorskie',
			scope: 'pl-kp',
			channels: ['#kp'],
			neighbors: ['pm', 'wn', 'mz', 'ld', 'wp'],
		},
		lu: {
			name: 'lubelskie',
			scope: 'pl-lu',
			channels: ['#lubelskie', '#lublin'],
			neighbors: ['mz', 'pd', 'pk', 'sk'],
		},
		lb: {
			name: 'lubuskie',
			scope: 'pl-lb',
			channels: ['#lubuskie'],
			neighbors: ['zp', 'wp', 'ds'],
		},
		ld: {
			name: 'łódzkie',
			scope: 'pl-ld',
			channels: ['#lodzkie'],
			neighbors: ['kp', 'mz', 'sk', 'sl', 'op', 'wp'],
			discordUrl: 'https://discord.gg/jzrYzbBtwg',
		},
		ma: {
			name: 'małopolskie',
			scope: 'pl-ma',
			channels: ['#malopolskie', '#krakow'],
			neighbors: ['sl', 'sk', 'pk'],
		},
		mz: {
			name: 'mazowieckie',
			scope: 'pl-mz',
			channels: ['#mazowsze', '#bot'],
			neighbors: ['wn', 'pd', 'lu', 'sk', 'ld', 'kp'],
		},
		op: {
			name: 'opolskie',
			scope: 'pl-op',
			channels: ['#opolskie'],
			neighbors: ['ds', 'wp', 'ld', 'sl'],
		},
		pk: {
			name: 'podkarpackie',
			scope: 'pl-pk',
			channels: ['#podkarpackie', '#testing'],
			neighbors: ['ma', 'sk', 'lu'],
		},
		pd: {
			name: 'podlaskie',
			scope: 'pl-pd',
			channels: ['#podlaskie'],
			neighbors: ['wn', 'mz', 'lu'],
		},
		pm: {
			name: 'pomorskie',
			scope: 'pl-pm',
			channels: ['#pm'],
			neighbors: ['zp', 'wp', 'kp', 'wn'],
		},
		sl: {
			name: 'śląskie',
			scope: 'pl-sl',
			channels: ['#slaskie', '#botslaskie'],
			neighbors: ['op', 'ld', 'sk', 'ma'],
		},
		sk: {
			name: 'świętokrzyskie',
			scope: 'pl-sk',
			channels: ['#swietokrzyskie', '#kielce'],
			neighbors: ['ld', 'mz', 'lu', 'pk', 'ma', 'sl'],
			discordUrl: 'https://discord.gg/rksm5bKxDg',
		},
		wn: {
			name: 'warmińsko-mazurskie',
			scope: 'pl-wn',
			channels: ['#warminsko-mazurskie'],
			neighbors: ['pm', 'kp', 'mz', 'pd'],
		},
		wp: {
			name: 'wielkopolskie',
			scope: 'wlkp',
			channels: ['#wlkp', '#poznan', '#info', '#test', '#weather'],
			neighbors: ['zp', 'pm', 'kp', 'ld', 'op', 'ds', 'lb'],
		},
		zp: {
			name: 'zachodniopomorskie',
			scope: 'pl-zp',
			channels: ['#zachodniopomorskie'],
			neighbors: ['pm', 'wp', 'lb'],
		},
	},
	localRegions: {
		bzg: {
			name: 'Bydgoszcz',
			scope: 'bzg',
			channels: ['#bydgoszcz'],
			voivodeships: ['kp'],
		},
		waw: {
			name: 'Warszawa',
			scope: 'waw',
			channels: ['#warszawa', '#bot', '#test'],
			voivodeships: ['mz'],
		},
		rze: {
			name: 'Rzeszów',
			scope: 'pl-rze',
			channels: ['#rzeszow'],
			voivodeships: ['pk'],
		},
		wro: {
			name: 'Wrocław',
			scope: 'wro',
			channels: ['#wroclaw', '#wroc-tech'],
			voivodeships: ['ds'],
		},
		zgora: {
			name: 'Zielona Góra',
			scope: 'zgora',
			channels: [],
			voivodeships: ['lb'],
		},
		zachod: {
			name: 'Zachód Polski',
			scope: 'zachod',
			channels: ['#zachod', '#szczecin'],
			voivodeships: ['ds', 'lb', 'wp', 'zp'],
			automatic: true,
		},
		ldz: {
			name: 'Łódź',
			scope: 'ldz',
			channels: ['#lodz'],
			voivodeships: ['ld'],
		},
		gdn: {
			name: 'Trójmiasto',
			scope: 'gdn',
			channels: ['#pomorskie', '#bot'],
			voivodeships: ['pm'],
		},
	},
};

const RG_ROOT = MESHCORE_REGIONS.country.scope;
const RG_MAX_NAME_BYTES = 29;
const RG_MAX_LINE = 160;
const RG_MAX_NEIGHBORS = 2;
const RG_CLI_REPLIES = new Set(['OK', 'Err']);
const RG_SETTINGS_KEY = 'meshcore.regionGenerator.settings';
const RG_CUSTOM_SCOPE = '__custom__';

let highlighterPromise = null;

const highlightCode = root => {
	highlighterPromise ??= import(`${document.body.dataset.cdn}/js/codeBlocks.js`);
	highlighterPromise
		.then(({ highlightCodeBlocks }) => highlightCodeBlocks(root))
		.catch(err => console.error('Failed to load codeBlocks.js from the CDN', err));
};

const setCode = (id, text) => {
	const code = document.getElementById(id);
	if (code.textContent === text) return;

	code.textContent = text;
	delete code.dataset.hl;

	highlightCode(code.parentElement.parentElement);
};

const setCommands = lines => {
	const container = document.getElementById('rg-commands');
	const text = lines.join('\n');
	if (container.dataset.commands === text) return;

	container.replaceChildren(...lines.map(line => {
		const pre = document.createElement('pre');
		const code = document.createElement('code');
		code.className = 'language-mccli';
		code.textContent = line;
		pre.append(code);
		return pre;
	}));
	container.dataset.commands = text;
	highlightCode(container);
};

const rgForm = document.getElementById('rg-form'), rcForm = document.getElementById('rc-form');

const parseCurrentRegions = text => {
	const names = new Set();

	for (const raw of text.split(/\r?\n/)) {
		const line = raw.trim();
		if (!line || line.startsWith('>')) continue;

		const match = (/^([$#\p{L}\p{N}_-]+)\^?(?:\s+F)?$/u).exec(line);
		if (!match || RG_CLI_REPLIES.has(match[1])) continue;

		names.add(match[1]);
	}

	return [...names].reverse();
};

const getVoivodeshipScope = code => MESHCORE_REGIONS.voivodeships[code].scope;

const getAutomaticRegions = codes => Object.values(MESHCORE_REGIONS.localRegions)
	.filter(region => region.automatic && codes.some(code => region.voivodeships.includes(code)));

const getLocalScopes = codes => getAutomaticRegions(codes).map(region => region.scope);

const buildTree = (home, city, neighbors) => {
	const codes = [...new Set([home, ...neighbors])];
	const localScopes = getLocalScopes(codes);
	const configuredScopes = new Set([RG_ROOT, ...codes.map(getVoivodeshipScope), ...localScopes]);
	const homeRegion = { name: getVoivodeshipScope(home), children: city && !configuredScopes.has(city) ? [{ name: city, children: [] }] : [] };
	return {
		name: RG_ROOT,
		children: [
			homeRegion,
			...codes.slice(1).map(code => ({ name: getVoivodeshipScope(code), children: [] })),
			...localScopes.map(name => ({ name, children: [] })),
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

const channelsForScope = scope => {
	const region = [MESHCORE_REGIONS.country, ...Object.values(MESHCORE_REGIONS.voivodeships), ...Object.values(MESHCORE_REGIONS.localRegions)]
		.find(config => config.scope === scope);
	const channels = region?.channels;
	return (channels?.length ? channels : ['Brak danych']).map(channel => ({ channel, scope }));
};

const buildChannels = (home, city, neighbors) => {
	const codes = [...new Set([home, ...neighbors])];
	const scopes = [...new Set([RG_ROOT, ...codes.map(getVoivodeshipScope), ...getLocalScopes(codes), ...(city ? [city] : [])])];
	const channels = scopes.flatMap(channelsForScope);
	const commonChannels = MESHCORE_REGIONS.commonChannels.map(channel => {
		const regional = channels.findLast(row => row.channel === channel);
		return regional || { channel, scope: null };
	});

	const regionalChannels = channels.filter(({ channel }) => !MESHCORE_REGIONS.commonChannels.includes(channel));

	return [
		{ channel: 'Public', scope: RG_ROOT },
		...commonChannels,
		...regionalChannels,
	];
};

const validateLocalScope = (city, home) => {
	if (!city) return [];

	const errors = [];
	if (!(/^[a-z0-9]+(-[a-z0-9]+)*$/).test(city)) errors.push('Nazwa regionu może zawierać tylko małe litery, cyfry i myślniki (nie na początku ani na końcu).');
	if (new TextEncoder().encode(city).length > RG_MAX_NAME_BYTES) errors.push(`Nazwa regionu może mieć maksymalnie ${RG_MAX_NAME_BYTES} bajtów.`);

	const voivodeship = Object.values(MESHCORE_REGIONS.voivodeships).find(config => config.scope === city);

	if (city === RG_ROOT) {
		errors.push(`Nazwa „${city}” jest zarezerwowana dla regionu krajowego.`);
	} else if (voivodeship) {
		errors.push(`Nazwa „${city}” jest już zajęta przez województwo ${voivodeship.name}.`);
	}

	const region = Object.values(MESHCORE_REGIONS.localRegions).find(config => config.scope === city);
	if (region && !region.voivodeships.includes(home)) errors.push(`Region „${region.name}” nie należy do wybranego województwa.`);

	return errors;
};

const getSelectedLocalScope = () => {
	const selected = document.getElementById('rg-city').value;
	return selected === RG_CUSTOM_SCOPE ? document.getElementById('rg-custom-scope').value.trim().toLowerCase() : selected;
};

const updateCustomRegionField = () => {
	const custom = document.getElementById('rg-city').value === RG_CUSTOM_SCOPE;
	document.getElementById('rg-custom-region').hidden = !custom;
	document.getElementById('rg-custom-scope').disabled = !custom;
};

const renderLocalRegions = (home, scope = '') => {
	const select = document.getElementById('rg-city');
	const customInput = document.getElementById('rg-custom-scope');
	const hintElement = document.getElementById('rg-local-hint');

	const regions = Object.values(MESHCORE_REGIONS.localRegions)
		.filter(region => !region.automatic && region.voivodeships.includes(home));

	select.replaceChildren(
		new Option('Brak dodatkowego regionu', ''),
		...regions.map(({ name, scope: value }) => new Option(`${name} (${value})`, value)),
		new Option('Własny region...', RG_CUSTOM_SCOPE)
	);

	const validScope = !validateLocalScope(scope, home).length ? scope : '';
	const known = regions.some(region => region.scope === validScope);
	const automaticRegions = getAutomaticRegions([home]);
	const automatic = automaticRegions.some(region => region.scope === validScope);

	if (known) {
		select.value = validScope;
	} else if (validScope && !automatic) {
		select.value = RG_CUSTOM_SCOPE;
	} else {
		select.value = '';
	}

	customInput.value = select.value === RG_CUSTOM_SCOPE ? validScope : '';

	const hint = regions.length
		? 'Lista zawiera niektóre regiony lokalne. Możesz podać też własny region.'
		: 'Brak znanych regionów lokalnych dla tego województwa. W razie potrzeby wybierz „Własny region”.';
	const automaticNames = automaticRegions.map(region => region.name);

	hintElement.textContent = automaticNames.length
		? `${hint} Dodawane automatycznie: ${automaticNames.join(', ')}.`
		: hint;

	updateCustomRegionField();
};

const loadSettings = () => {
	try {
		const settings = JSON.parse(localStorage.getItem(RG_SETTINGS_KEY));
		if (!settings || typeof settings !== 'object' || Array.isArray(settings)) return null;

		const home = typeof settings.home === 'string' && Object.hasOwn(MESHCORE_REGIONS.voivodeships, settings.home)
			? settings.home : Object.keys(MESHCORE_REGIONS.voivodeships)[0];
		const city = typeof settings.city === 'string' ? settings.city.trim().toLowerCase() : '';
		const neighbors = Array.isArray(settings.neighbors) ? settings.neighbors : [];
		return {
			home,
			firmware: ['116', '115', 'old'].includes(settings.firmware) ? settings.firmware : '116',
			city: validateLocalScope(city, home).length ? '' : city,
			neighbors: [...new Set(neighbors.filter(code => MESHCORE_REGIONS.voivodeships[home].neighbors.includes(code)))].slice(0, RG_MAX_NEIGHBORS),
			setDefault: settings.setDefault === true,
		};
	} catch (err) {
		console.warn('Failed to read the settings', err);
		return null;
	}
};

const saveSettings = () => {
	try {
		localStorage.setItem(RG_SETTINGS_KEY, JSON.stringify({
			home: document.getElementById('rg-home').value,
			firmware: document.getElementById('rg-fw').value,
			city: getSelectedLocalScope(),
			neighbors: [...document.querySelectorAll('#rg-neighbors input:checked')].map(input => input.value),
			setDefault: document.getElementById('rg-default').checked,
		}));
	} catch (err) {
		console.warn('Failed to save the settings', err);
	}
};

const limitNeighbors = () => {
	const inputs = [...document.querySelectorAll('#rg-neighbors input')];
	const limitReached = inputs.filter(input => input.checked).length >= RG_MAX_NEIGHBORS;
	inputs.forEach(input => {
		input.disabled = limitReached && !input.checked;
	});
};

const renderNeighbors = (home, selected = null) => {
	const container = document.getElementById('rg-neighbors');
	const checked = new Set(selected ?? [...container.querySelectorAll('input:checked')].map(input => input.value));
	container.replaceChildren(...MESHCORE_REGIONS.voivodeships[home].neighbors.map(code => {
		const label = document.createElement('label');
		label.className = 'rg-check';

		const input = document.createElement('input');
		input.type = 'checkbox';
		input.value = code;
		input.checked = checked.has(code);

		const text = document.createElement('span');
		text.textContent = `${MESHCORE_REGIONS.voivodeships[code].name} (${getVoivodeshipScope(code)})`;

		label.append(input, text);
		return label;
	}));
};

const renderOutput = () => {
	const home = document.getElementById('rg-home').value;
	const city = getSelectedLocalScope();
	const firmware = document.getElementById('rg-fw').value;
	document.getElementById('rg-fw-warning').hidden = firmware === '116';
	const defaultInput = document.getElementById('rg-default');
	defaultInput.disabled = firmware === 'old';
	const setDefault = defaultInput.checked && !defaultInput.disabled;
	const neighbors = [...document.querySelectorAll('#rg-neighbors input:checked')].map(input => input.value);

	const errors = validateLocalScope(city, home);
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
	setCommands(buildCommands({ tree, firmware, setDefault }));
	document.getElementById('rg-tree').textContent = buildTreePreview(tree);
	document.getElementById('rg-channels').replaceChildren(...buildChannels(home, city, neighbors).map(({ channel, scope }) => {
		const tr = document.createElement('tr');
		const optionalScope = channel === 'Public' || MESHCORE_REGIONS.commonChannels.includes(channel);
		[channel, scope].forEach((value, index) => {
			const td = document.createElement('td');
			if (value === 'Brak danych') {
				td.textContent = value;
			} else if (value === null) {
				td.textContent = 'Bez regionu';
			} else {
				const code = document.createElement('code');
				code.textContent = value;
				if (index === 1 && optionalScope) td.append('Bez regionu lub ');
				td.append(code);
			}

			if (index === 1 && channel === 'Public') td.append(' (kanał domyślny, dostępny od razu)');

			tr.append(td);
		});
		return tr;
	}));
	document.getElementById('rg-community-groups').replaceChildren(...[RG_ROOT, home, ...neighbors].map(code => {
		const tr = document.createElement('tr');
		const region = document.createElement('td');
		const config = code === RG_ROOT ? MESHCORE_REGIONS.country : MESHCORE_REGIONS.voivodeships[code];
		const name = code === RG_ROOT ? 'Polska (region krajowy)' : config.name;
		region.textContent = name.charAt(0).toUpperCase() + name.slice(1);
		const server = document.createElement('td');
		const url = config.discordUrl;
		if (url) {
			const link = document.createElement('a');
			link.href = url;
			link.target = '_blank';
			link.rel = 'noopener';
			link.textContent = 'Dołącz teraz';
			server.append(link);
		} else {
			server.textContent = 'Brak znanego serwera';
		}
		tr.append(region, server);
		return tr;
	}));
};

if (rgForm && !rgForm.closest('[inert]')) {
	const homeSelect = document.getElementById('rg-home');
	homeSelect.append(...Object.entries(MESHCORE_REGIONS.voivodeships).map(([code, { name, scope }]) => new Option(`${name} (${scope})`, code)));

	rgForm.addEventListener('input', event => {
		if (event.target === homeSelect) {
			renderNeighbors(homeSelect.value);
			renderLocalRegions(homeSelect.value);
		}
		if (event.target === document.getElementById('rg-city')) updateCustomRegionField();
		limitNeighbors();
		renderOutput();
		saveSettings();
	});
	rgForm.addEventListener('submit', event => event.preventDefault());

	const settings = loadSettings();
	if (settings) {
		homeSelect.value = settings.home;
		document.getElementById('rg-fw').value = settings.firmware;
		document.getElementById('rg-default').checked = settings.setDefault;
	}
	renderNeighbors(homeSelect.value, settings?.neighbors);
	renderLocalRegions(homeSelect.value, settings?.city);
	limitNeighbors();
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
