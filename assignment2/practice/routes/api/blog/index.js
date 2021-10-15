const express = require("express");
const router = express.Router();

router.get('/', (req, res)=>{
    const result = {
        status:200,
        message:"blog",
    };
    res.status(200).send(result);
});

router.use('/post', require('./post.js'))

module.exports = router;