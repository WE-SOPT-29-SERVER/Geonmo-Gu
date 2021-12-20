const express = require('express');
const router = express.Router();

router.post('/signup', require('./authSignupPOST'));
router.post('/login/email', require('./authLoginEmailPOST'));

router.post('/refresh', require('./refresh'));
module.exports = router;
