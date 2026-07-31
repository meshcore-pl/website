(() => {
	const canvas = document.getElementById('mesh-map');
	if (!canvas || !canvas.getContext) return;

	const ctx = canvas.getContext('2d');
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const BORDER = [
		[18.491, 54.805], [18.304, 54.868], [18.198, 54.868], [17.856, 54.860], [17.621, 54.808], [17.319, 54.784], [17.061, 54.714], [16.925, 54.627],
		[16.509, 54.567], [16.179, 54.324], [16.096, 54.292], [15.822, 54.265], [15.512, 54.187], [15.152, 54.137], [14.899, 54.065], [14.565, 54.003],
		[14.408, 53.936], [14.208, 53.941], [14.184, 53.923], [14.280, 53.795], [14.261, 53.639], [14.294, 53.642], [14.305, 53.526], [14.362, 53.466],
		[14.437, 53.259], [14.356, 53.178], [14.383, 53.121], [14.362, 53.072], [14.124, 52.949], [14.163, 52.880], [14.115, 52.845], [14.347, 52.753],
		[14.489, 52.640], [14.595, 52.627], [14.641, 52.562], [14.609, 52.543], [14.644, 52.494], [14.525, 52.391], [14.583, 52.278], [14.725, 52.233],
		[14.673, 52.198], [14.703, 52.162], [14.683, 52.097], [14.760, 52.065], [14.711, 51.973], [14.732, 51.935], [14.594, 51.843], [14.600, 51.796],
		[14.654, 51.778], [14.664, 51.715], [14.745, 51.687], [14.750, 51.593], [14.700, 51.557], [14.731, 51.524], [14.978, 51.446], [14.964, 51.347],
		[15.030, 51.261], [14.972, 51.146], [14.988, 51.087], [14.896, 50.997], [14.877, 50.933], [14.797, 50.874], [14.935, 50.851], [14.990, 50.863],
		[14.985, 50.934], [15.015, 50.955], [14.986, 51.006], [15.065, 51.021], [15.177, 50.979], [15.231, 50.993], [15.287, 50.957], [15.267, 50.892],
		[15.373, 50.827], [15.373, 50.780], [15.437, 50.799], [15.709, 50.738], [15.811, 50.754], [15.871, 50.676], [16.001, 50.677], [16.036, 50.595],
		[16.121, 50.658], [16.202, 50.632], [16.256, 50.664], [16.362, 50.656], [16.464, 50.595], [16.455, 50.563], [16.413, 50.552], [16.387, 50.501],
		[16.309, 50.486], [16.206, 50.430], [16.283, 50.357], [16.371, 50.368], [16.398, 50.323], [16.464, 50.307], [16.578, 50.210], [16.609, 50.127],
		[16.681, 50.095], [16.743, 50.094], [16.850, 50.198], [17.061, 50.226], [17.033, 50.253], [17.055, 50.273], [16.956, 50.338], [16.957, 50.387],
		[16.900, 50.402], [16.926, 50.453], [16.994, 50.421], [17.127, 50.408], [17.170, 50.377], [17.234, 50.387], [17.294, 50.323], [17.366, 50.324],
		[17.370, 50.275], [17.449, 50.279], [17.466, 50.256], [17.524, 50.283], [17.656, 50.272], [17.736, 50.331], [17.774, 50.302], [17.751, 50.252],
		[17.785, 50.242], [17.781, 50.204], [17.669, 50.188], [17.627, 50.151], [17.683, 50.118], [17.736, 50.120], [17.784, 50.034], [17.856, 49.989],
		[17.932, 49.976], [17.958, 50.004], [18.029, 50.009], [18.035, 50.040], [18.110, 50.044], [18.131, 50.011], [18.288, 49.974], [18.299, 49.929],
		[18.440, 49.947], [18.495, 49.913], [18.565, 49.933], [18.598, 49.917], [18.568, 49.904], [18.613, 49.870], [18.580, 49.828], [18.640, 49.714],
		[18.796, 49.684], [18.846, 49.528], [18.955, 49.516], [18.961, 49.395], [19.029, 49.395], [19.061, 49.421], [19.124, 49.399], [19.173, 49.410],
		[19.220, 49.517], [19.267, 49.542], [19.320, 49.534], [19.443, 49.622], [19.509, 49.575], [19.546, 49.479], [19.591, 49.446], [19.619, 49.461],
		[19.619, 49.416], [19.690, 49.380], [19.767, 49.413], [19.792, 49.275], [19.734, 49.226], [19.764, 49.190], [19.831, 49.185], [19.914, 49.233],
		[20.063, 49.168], [20.063, 49.238], [20.120, 49.301], [20.196, 49.343], [20.302, 49.352], [20.300, 49.404], [20.373, 49.395], [20.430, 49.418],
		[20.507, 49.387], [20.576, 49.388], [20.586, 49.414], [20.655, 49.401], [20.707, 49.419], [20.796, 49.336], [20.936, 49.301], [21.009, 49.355],
		[21.067, 49.359], [21.026, 49.414], [21.084, 49.434], [21.193, 49.412], [21.250, 49.466], [21.420, 49.415], [21.601, 49.452], [21.745, 49.369],
		[21.812, 49.396], [21.947, 49.348], [22.041, 49.204], [22.195, 49.182], [22.304, 49.132], [22.343, 49.149], [22.402, 49.098], [22.581, 49.096],
		[22.679, 49.037], [22.780, 49.049], [22.887, 49.011], [22.868, 49.050], [22.892, 49.097], [22.719, 49.167], [22.709, 49.243], [22.751, 49.319],
		[22.689, 49.508], [22.652, 49.511], [22.641, 49.546], [22.778, 49.694], [22.892, 49.757], [22.896, 49.786], [22.950, 49.806], [22.956, 49.853],
		[23.090, 49.933], [23.202, 50.053], [23.597, 50.284], [23.732, 50.408], [24.012, 50.434], [24.104, 50.542], [24.114, 50.677], [23.966, 50.831],
		[24.121, 50.859], [24.155, 50.891], [24.053, 50.915], [23.997, 50.954], [23.936, 51.064], [23.870, 51.109], [23.869, 51.164], [23.754, 51.225],
		[23.725, 51.282], [23.638, 51.301], [23.640, 51.352], [23.701, 51.414], [23.531, 51.607], [23.536, 51.731], [23.511, 51.737], [23.635, 51.799],
		[23.601, 51.877], [23.633, 51.895], [23.594, 51.926], [23.679, 52.007], [23.650, 52.013], [23.650, 52.071], [23.465, 52.174], [23.185, 52.221],
		[23.195, 52.321], [23.384, 52.504], [23.543, 52.590], [23.662, 52.622], [23.719, 52.611], [23.924, 52.735], [23.895, 52.857], [23.930, 52.978],
		[23.848, 53.096], [23.907, 53.173], [23.776, 53.286], [23.613, 53.575], [23.574, 53.747], [23.529, 53.772], [23.531, 53.858], [23.461, 53.994],
		[23.492, 54.092], [23.449, 54.176], [23.306, 54.262], [23.212, 54.268], [23.131, 54.315], [23.074, 54.302], [23.021, 54.320], [23.044, 54.335],
		[22.990, 54.357], [22.986, 54.385], [22.906, 54.403], [22.819, 54.399], [22.776, 54.364], [22.645, 54.355], [21.684, 54.334], [21.238, 54.344],
		[19.629, 54.479], [19.787, 54.573], [19.814, 54.621], [19.563, 54.470], [19.354, 54.402], [18.972, 54.379], [18.907, 54.405], [18.880, 54.380],
		[18.816, 54.385], [18.541, 54.477], [18.536, 54.592], [18.363, 54.772], [18.366, 54.801], [18.580, 54.758], [18.727, 54.676], [18.761, 54.618],
		[18.813, 54.626], [18.804, 54.666], [18.692, 54.739], [18.491, 54.805],
	];

	const CITIES = [
		['WAW', 21.012, 52.230], ['KRK', 19.945, 50.065], ['GDA', 18.647, 54.352],
		['WRO', 17.038, 51.108], ['POZ', 16.925, 52.406], ['LDZ', 19.456, 51.759],
		['SZC', 14.553, 53.429], ['LUB', 22.568, 51.246], ['BIA', 23.169, 53.133],
		['KAT', 19.024, 50.265], ['BYD', 18.008, 53.124], ['RZE', 22.005, 50.041],
		['OLS', 20.480, 53.778], ['KIE', 20.629, 50.866], ['ZGA', 15.506, 51.936],
		['PIL', 16.738, 53.151, true], ['WAL', 16.472, 53.272], ['TOR', 18.598, 53.014, true],
		['KAL', 18.081, 51.762], ['OPO', 17.925, 50.675], ['CZE', 19.124, 50.811],
		['GOR', 15.229, 52.737], ['KOS', 16.181, 54.190, true], ['ELB', 19.404, 54.156, true],
		['SUW', 22.930, 54.111], ['PLO', 19.700, 52.546], ['RAD', 21.147, 51.403],
		['TAR', 20.986, 50.013, true], ['ZAM', 23.252, 50.723],
	];

	const mulberry32 = a => () => {
		a |= 0; a = a + 0x6D2B79F5 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};

	const pointInPolygon = (lon, lat, poly) => {
		let inside = false;
		for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
			const [xi, yi] = poly[i];
			const [xj, yj] = poly[j];
			if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) inside = !inside;
		}
		return inside;
	};

	const COS_LAT = Math.cos(52.1 * Math.PI / 180);
	const project = (lon, lat) => [lon * COS_LAT, -lat];

	const projectedBorder = BORDER.map(([lon, lat]) => project(lon, lat));
	const xs = projectedBorder.map(p => p[0]);
	const ys = projectedBorder.map(p => p[1]);
	const minX = Math.min(...xs), maxX = Math.max(...xs);
	const minY = Math.min(...ys), maxY = Math.max(...ys);
	const spanX = maxX - minX, spanY = maxY - minY;
	const span = Math.max(spanX, spanY);
	const normalize = ([x, y]) => [(x - minX) / span + (1 - spanX / span) / 2, (y - minY) / span + (1 - spanY / span) / 2];

	const borderPath = projectedBorder.map(normalize);

	const nodes = CITIES.map(([code, lon, lat, below]) => {
		const [x, y] = normalize(project(lon, lat));
		return { x, y, lon, lat, code, city: true, below: !!below };
	});

	const distToBorder = (lon, lat) => {
		const px = lon * COS_LAT, py = lat;
		let min = Infinity;
		for (let i = 0; i < BORDER.length; i++) {
			const [alon, alat] = BORDER[i];
			const [blon, blat] = BORDER[(i + 1) % BORDER.length];
			const ax = alon * COS_LAT, ay = alat, bx = blon * COS_LAT;
			const dx = bx - ax, dy = blat - ay;
			const l2 = dx * dx + dy * dy;
			let t = l2 ? ((px - ax) * dx + (py - ay) * dy) / l2 : 0;
			t = Math.max(0, Math.min(1, t));
			min = Math.min(min, Math.hypot(px - (ax + t * dx), py - (ay + t * dy)));
		}
		return min;
	};

	const rand = mulberry32(869525);
	let attempts = 0;
	while (nodes.length < 62 && attempts < 8000) {
		attempts++;
		let lon, lat;
		if (rand() < 0.55) {
			const city = CITIES[Math.floor(rand() * CITIES.length)];
			lon = city[1] + (rand() - 0.5) * 1.9;
			lat = city[2] + (rand() - 0.5) * 1.2;
		} else {
			lon = 14.12 + rand() * 10.05;
			lat = 49.05 + rand() * 5.8;
		}
		if (!pointInPolygon(lon, lat, BORDER) || distToBorder(lon, lat) < 0.07) continue;
		const [x, y] = normalize(project(lon, lat));
		if (nodes.some(n => Math.hypot(n.x - x, n.y - y) < 0.058)) continue;
		nodes.push({ x, y, lon, lat, city: false });
	}

	const orient = (ax, ay, bx, by, cx, cy) => (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
	const segmentInside = (a, b) => {
		for (let i = 0; i < BORDER.length; i++) {
			const [c1lon, c1lat] = BORDER[i];
			const [c2lon, c2lat] = BORDER[(i + 1) % BORDER.length];
			const o1 = orient(a.lon, a.lat, b.lon, b.lat, c1lon, c1lat);
			const o2 = orient(a.lon, a.lat, b.lon, b.lat, c2lon, c2lat);
			const o3 = orient(c1lon, c1lat, c2lon, c2lat, a.lon, a.lat);
			const o4 = orient(c1lon, c1lat, c2lon, c2lat, b.lon, b.lat);
			if (o1 * o2 < 0 && o3 * o4 < 0) return false;
		}
		return true;
	};

	const edges = [];
	const edgeIndex = new Map();
	const adjacency = nodes.map(() => []);
	nodes.forEach((node, i) => {
		nodes
			.map((other, j) => ({ j, d: Math.hypot(other.x - node.x, other.y - node.y) }))
			.filter(({ j, d }) => j !== i && d < 0.2 && segmentInside(node, nodes[j]))
			.sort((a, b) => a.d - b.d)
			.slice(0, 3)
			.forEach(({ j }) => {
				const key = i < j ? `${i}-${j}` : `${j}-${i}`;
				if (edgeIndex.has(key)) return;
				edgeIndex.set(key, edges.length);
				edges.push([i < j ? i : j, i < j ? j : i]);
				adjacency[i].push(j);
				adjacency[j].push(i);
			});
	});

	const componentOf = new Int32Array(nodes.length);
	const labelComponents = () => {
		componentOf.fill(-1);
		let count = 0;
		for (let i = 0; i < nodes.length; i++) {
			if (componentOf[i] !== -1) continue;
			const queue = [i];
			componentOf[i] = count;
			while (queue.length) {
				adjacency[queue.pop()].forEach(n => {
					if (componentOf[n] === -1) {
						componentOf[n] = count;
						queue.push(n);
					}
				});
			}
			count++;
		}
		return count;
	};
	while (labelComponents() > 1) {
		let best = null, fallback = null;
		for (let i = 0; i < nodes.length; i++) {
			for (let j = i + 1; j < nodes.length; j++) {
				if (componentOf[i] === componentOf[j]) continue;
				const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
				if (!fallback || d < fallback.d) fallback = { i, j, d };
				if ((!best || d < best.d) && segmentInside(nodes[i], nodes[j])) best = { i, j, d };
			}
		}
		if (!best) best = fallback;
		edgeIndex.set(`${best.i}-${best.j}`, edges.length);
		edges.push([best.i, best.j]);
		adjacency[best.i].push(best.j);
		adjacency[best.j].push(best.i);
	}

	const edgeHeat = new Float32Array(edges.length);
	const packets = [];
	const rings = [];
	let width = 0, height = 0, scale = 1, offsetX = 0, offsetY = 0, dpr = 1;
	let staticLayer = null;

	const toPx = n => [offsetX + n.x * scale, offsetY + n.y * scale];
	const geoToPx = (lon, lat) => {
		const [nx, ny] = normalize(project(lon, lat));
		return [offsetX + nx * scale, offsetY + ny * scale];
	};

	const traceBorder = c => {
		c.beginPath();
		borderPath.forEach(([nx, ny], i) => {
			const x = offsetX + nx * scale, y = offsetY + ny * scale;
			i === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
		});
		c.closePath();
	};

	const buildStatic = () => {
		staticLayer = document.createElement('canvas');
		staticLayer.width = canvas.width;
		staticLayer.height = canvas.height;
		const s = staticLayer.getContext('2d');
		s.setTransform(dpr, 0, 0, dpr, 0, 0);

		s.save();
		traceBorder(s);
		s.clip();

		const cx = offsetX + scale * 0.5, cy = offsetY + scale * 0.5;
		const fill = s.createRadialGradient(cx, cy, scale * 0.05, cx, cy, scale * 0.72);
		fill.addColorStop(0, 'rgba(148, 166, 204, 0.05)');
		fill.addColorStop(1, 'rgba(148, 166, 204, 0.012)');
		s.fillStyle = fill;
		s.fillRect(0, 0, width, height);

		s.strokeStyle = 'rgba(148, 166, 204, 0.045)';
		s.lineWidth = 1;
		for (let lon = 15; lon <= 24; lon++) {
			const [x1, y1] = geoToPx(lon, 48.9);
			const [x2, y2] = geoToPx(lon, 55);
			s.beginPath();
			s.moveTo(x1, y1);
			s.lineTo(x2, y2);
			s.stroke();
		}
		for (let lat = 49; lat <= 55; lat++) {
			const [x1, y1] = geoToPx(14, lat);
			const [x2, y2] = geoToPx(24.3, lat);
			s.beginPath();
			s.moveTo(x1, y1);
			s.lineTo(x2, y2);
			s.stroke();
		}
		s.restore();

		s.save();
		traceBorder(s);
		s.shadowColor = 'rgba(148, 166, 204, 0.3)';
		s.shadowBlur = 10;
		s.strokeStyle = 'rgba(176, 192, 226, 0.38)';
		s.lineWidth = 1.25;
		s.lineJoin = 'round';
		s.stroke();
		s.restore();

		nodes.forEach(node => {
			if (!node.city) return;
			const [x, y] = toPx(node);
			s.beginPath();
			s.arc(x, y, 5.5, 0, Math.PI * 2);
			s.strokeStyle = 'rgba(238, 241, 248, 0.16)';
			s.lineWidth = 1;
			s.stroke();
		});

		if (width >= 330) {
			s.font = '600 10px "IBM Plex Mono", monospace';
			s.fillStyle = 'rgba(153, 161, 181, 0.72)';
			nodes.forEach(node => {
				if (!node.city) return;
				const [x, y] = toPx(node);
				const alignRight = node.x > 0.8;
				s.textAlign = alignRight ? 'right' : 'left';
				s.fillText(node.code, x + (alignRight ? -9 : 9), y + (node.below ? 16 : -8));
			});
		}
	};

	const resize = () => {
		const rect = canvas.getBoundingClientRect();
		if (!rect.width || !rect.height) return false;
		dpr = Math.min(window.devicePixelRatio || 1, 2);
		width = rect.width;
		height = rect.height;
		canvas.width = Math.round(width * dpr);
		canvas.height = Math.round(height * dpr);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		scale = Math.min(width, height) * 0.94;
		offsetX = (width - scale) / 2;
		offsetY = (height - scale) / 2;
		buildStatic();
		return true;
	};

	const spawnPacket = () => {
		const start = Math.floor(Math.random() * nodes.length);
		const path = [start];
		const visited = new Set(path);
		let current = start;
		const hops = Math.min(3 + Math.floor(Math.log(1 - Math.random()) / Math.log(0.6)), 12);
		for (let h = 0; h < hops; h++) {
			const options = adjacency[current].filter(n => !visited.has(n));
			if (!options.length) break;
			const next = options[Math.floor(Math.random() * options.length)];
			path.push(next);
			visited.add(next);
			current = next;
		}
		if (path.length > 1) packets.push({ path, seg: 0, t: 0 });
	};

	const heatUp = (a, b) => {
		const key = a < b ? `${a}-${b}` : `${b}-${a}`;
		const idx = edgeIndex.get(key);
		if (idx !== undefined) edgeHeat[idx] = 1;
	};

	const draw = time => {
		ctx.clearRect(0, 0, width, height);
		if (staticLayer) ctx.drawImage(staticLayer, 0, 0, width, height);

		edges.forEach(([a, b], i) => {
			const [ax, ay] = toPx(nodes[a]);
			const [bx, by] = toPx(nodes[b]);
			const heat = edgeHeat[i];
			ctx.beginPath();
			ctx.moveTo(ax, ay);
			ctx.lineTo(bx, by);
			ctx.strokeStyle = heat > 0.02
				? `rgba(255, 51, 82, ${0.10 + heat * 0.45})`
				: 'rgba(154, 171, 209, 0.12)';
			ctx.lineWidth = 1;
			ctx.stroke();
		});

		rings.forEach(ring => {
			ctx.beginPath();
			ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
			ctx.strokeStyle = `rgba(61, 220, 132, ${0.5 * (1 - ring.p)})`;
			ctx.lineWidth = 1.5;
			ctx.stroke();
		});

		nodes.forEach((node, i) => {
			const [x, y] = toPx(node);
			const pulse = node.city ? 0.75 + 0.25 * Math.sin(time * 0.0012 + i * 1.7) : 1;
			ctx.beginPath();
			ctx.arc(x, y, node.city ? 2.8 : 1.7, 0, Math.PI * 2);
			ctx.fillStyle = node.city
				? `rgba(238, 241, 248, ${0.9 * pulse})`
				: 'rgba(200, 210, 232, 0.42)';
			ctx.fill();
		});

		packets.forEach(packet => {
			const from = nodes[packet.path[packet.seg]];
			const to = nodes[packet.path[packet.seg + 1]];
			const [ax, ay] = toPx(from);
			const [bx, by] = toPx(to);
			const x = ax + (bx - ax) * packet.t;
			const y = ay + (by - ay) * packet.t;

			const trail = ctx.createLinearGradient(ax, ay, x, y);
			trail.addColorStop(0, 'rgba(255, 51, 82, 0)');
			trail.addColorStop(1, 'rgba(255, 51, 82, 0.55)');
			ctx.beginPath();
			ctx.moveTo(ax, ay);
			ctx.lineTo(x, y);
			ctx.strokeStyle = trail;
			ctx.lineWidth = 1.5;
			ctx.stroke();

			ctx.save();
			ctx.shadowColor = 'rgba(255, 51, 82, 0.9)';
			ctx.shadowBlur = 10;
			ctx.beginPath();
			ctx.arc(x, y, 2.4, 0, Math.PI * 2);
			ctx.fillStyle = '#ff3352';
			ctx.fill();
			ctx.restore();
		});
	};

	if (reducedMotion) {
		const render = () => resize() && draw(0);
		if (!render()) requestAnimationFrame(render);
		new ResizeObserver(render).observe(canvas);
		return;
	}

	let lastTime = 0;
	let spawnTimer = 400;

	const tick = time => {
		const dt = Math.min(time - lastTime || 16, 50);
		lastTime = time;

		spawnTimer -= dt;
		if (spawnTimer <= 0 && packets.length < 7) {
			spawnPacket();
			spawnTimer = 500 + Math.random() * 700;
		}

		for (let i = packets.length - 1; i >= 0; i--) {
			const packet = packets[i];
			const from = nodes[packet.path[packet.seg]];
			const to = nodes[packet.path[packet.seg + 1]];
			const segLen = Math.max(Math.hypot(to.x - from.x, to.y - from.y) * scale, 1);
			packet.t += (dt * 0.2) / segLen;
			if (packet.t >= 1) {
				heatUp(packet.path[packet.seg], packet.path[packet.seg + 1]);
				packet.seg++;
				packet.t = 0;
				if (packet.seg >= packet.path.length - 1) {
					const [x, y] = toPx(nodes[packet.path[packet.path.length - 1]]);
					rings.push({ x, y, r: 3, p: 0 });
					packets.splice(i, 1);
				}
			}
		}

		for (let i = rings.length - 1; i >= 0; i--) {
			rings[i].p += dt / 900;
			rings[i].r += dt * 0.022;
			if (rings[i].p >= 1) rings.splice(i, 1);
		}

		for (let i = 0; i < edgeHeat.length; i++) {
			if (edgeHeat[i] > 0) edgeHeat[i] = Math.max(0, edgeHeat[i] - dt / 2600);
		}

		draw(time);
		requestAnimationFrame(tick);
	};

	const start = () => {
		if (!resize()) {
			requestAnimationFrame(start);
			return;
		}
		requestAnimationFrame(tick);
	};

	new ResizeObserver(() => resize()).observe(canvas);
	start();
})();
