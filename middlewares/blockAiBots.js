const path = require('node:path');

const AI_USER_AGENT = /\b(?:claude-user|claude-code|codex(?:[_-][a-z0-9]+)*|chatgpt-user|perplexity-user)\b/i;
const LLMS_PATH = path.join(__dirname, '../public/llms.txt');

module.exports = (req, res, next) => {
	if (!AI_USER_AGENT.test(req.get('User-Agent') || '')) return next();

	res.set('Cache-Control', 'no-store');
	return res.status(403).sendFile(LLMS_PATH, { cacheControl: false });
};
