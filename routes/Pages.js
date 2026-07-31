const router = require('express').Router();

router.get('/', (req, res) => res.render('index.ejs'));
router.get('/discord', (req, res) => res.redirect(`https://discord.com/invite/${process.env.DISCORD_INVITE_CODE}`));

module.exports = router;
