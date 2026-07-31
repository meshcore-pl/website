const axios = require('axios');
const { name, version, homepage } = require('../package.json');

axios.defaults.headers.common['User-Agent'] = `Mozilla/5.0 (compatible; ${name}/${version}; +${homepage})`;
axios.defaults.timeout = 15000;

module.exports = axios;
