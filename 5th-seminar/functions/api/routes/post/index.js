const express = require('express');
const router = express.Router();

router.get('/list', require('./postListGet'));
router.get('/:postId', require('./postGet'));

router.put('/:postId', require('./postPUT'));
router.delete('/:postId', require('./postDELETE'));
router.post('/', require('./postPOST'));

module.exports = router;
