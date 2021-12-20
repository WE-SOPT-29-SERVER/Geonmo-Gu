const express = require('express');
const { checkUser } = require('../../../middlewares/auth');
const uploadImage = require('../../../middlewares/uploadImage');
const router = express.Router();

router.get('/list', require('./postListGet'));
router.post('/', uploadImage, require('./postPOST'));
router.get('/:postId', checkUser, require('./postGet'));
router.put('/:postId', require('./postPUT'));
router.delete('/:postId', require('./postDELETE'));

module.exports = router;
