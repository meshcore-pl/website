const router = require('express').Router();

router.get('/', (req, res) => res.render('index.ejs'));
router.get('/discord', (req, res) => res.redirect(301, req.app.locals.discordInviteUrl));

module.exports = router;
