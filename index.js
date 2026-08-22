process.loadEnvFile();
const express = require('express');
const helmet = require('helmet');
const { version } = require('./package.json');
const { DOMAIN, NODE_ENV, PORT } = process.env;
const isProd = NODE_ENV === 'production';

// Routes
const PagesRouter = require('./routes/Pages.js');
const DocsRouter = require('./routes/Docs.js');
const NewsRouter = require('./routes/News.js');
const ContactRouter = require('./routes/Contact.js');

// Middleware imports
const timeout = require('./middlewares/timeout.js');
const logger = require('./middlewares/morgan.js');
const limiter = require('./middlewares/ratelimit.js');

// Utils
const RenderError = require('./utils/renderError.js');
const buildSchema = require('./utils/schema.js');
const pluralizePolish = require('./utils/pluralizePolish.js');

// Create an Express app
const app = express();

// Configure the app
if (isProd) app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.locals.domain = `${DOMAIN}${isProd ? '' : `:${PORT}`}`;
app.locals.v = version;
app.locals.buildSchema = buildSchema;
app.locals.pluralizePolish = pluralizePolish;

app.use((req, res) => res.send('Prace techniczne (nowa aktualizacja). Wróć tu za 5 minut.'));

// Use middlewares
app.use(helmet({ crossOriginResourcePolicy: false, contentSecurityPolicy: false }));
app.use(express.static('public'));
app.use(logger);
if (isProd) app.use(limiter.global);
app.use(timeout());
app.use(express.urlencoded({ extended: false, limit: '8kb' }));

app.use(PagesRouter);
app.use(DocsRouter);
app.use(NewsRouter);
app.use(limiter.contactForm, ContactRouter);

// Error handling
app.use((req, res) => RenderError(res, 404));
app.use((err, req, res, _next) => RenderError(res, 500, err));

// Start the server
app.listen(PORT, () => process.send ? process.send('ready') : console.log(`Server running at ${DOMAIN}:${PORT}`));
