const router = require('express').Router();

router.get('/', (req, res) => res.render('index.ejs'));
router.get('/polityka-prywatnosci', (req, res) => res.render('privacy.ejs'));
router.get('/discord', (req, res) => res.redirect(301, `https://discord.com/invite/${process.env.DISCORD_INVITE_CODE}`));

module.exports = router;
