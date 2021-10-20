const express = require("express");
const router = express.Router();

router.get('/', (req, res)=>{
    const result = {
        status:200,
        message:"users",
    };
    res.status(200).send(result);
});

router.use('/login', require('./login.js'))
router.use('/signup', require('./signup.js'))

module.exports = router;