const registry = new Map();

export const definePage = (name, api) => {
	registry.set(name, api);
	api.init?.();
};

export const getPage = name => registry.get(name);
export const hasPage = name => registry.has(name);
