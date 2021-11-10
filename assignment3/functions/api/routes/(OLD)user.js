const express = require('express');
const router = express.Router();
const users = require('./../dbMockup/user');
const util = require('../lib/util');
const responseMessage = require("../constants/responseMessage");
const statusCode = require("../constants/statusCode");
const { success } = require('../lib/util');
const e = require('express');

router.post('/signup', (req, res)=>{
    const { email, name, password} = req.body;

    if (!email || !name || !password) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    const alreadyUser = users.filter(obj => obj.email === email).length > 0;
    if(alreadyUser) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_EMAIL));
    }



    const newUser = {id:users.length+1, name, email, password};
    
    res.status(statusCode.OK).send(success(statusCode.OK, responseMessage.CREATED_USER, newUser));
});

router.post('/login', (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(statusCode.BAD_REQUEST)
        .send(util
            .fail(
                statusCode.BAD_REQUEST, 
                responseMessage.NULL_VALUE
            )
        );
    }
    const existUser = users.filter(obj => obj.email === email).length > 0;
    if (!existUser) {
        return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }
    const authenticateUser = users.filter(obj=>obj.email===email).filter(obj=>obj.password === password)[0];
    if (!authenticateUser) {
        return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
    }
    const loginUser = {id:authenticateUser.id, name:authenticateUser.name, email:authenticateUser.email};
    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, loginUser)) 
})

router.get("/profile/:id", async (req, res) => {
    const id = req.params.id;
    const existUser = users.filter(obj => obj.id == id)[0]
    if (!existUser) {
        return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }
    const user = {name:existUser.name, email:existUser.email};
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, responseMessage.READ_PROFILE_SUCCESS, user));
})

router.put("/:id", async (req,res)=>{
    const {id} = req.params;
    const {newName} = req.body;

    if(!id || !newName) {
        return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    };
    const existUser = users.filter(obj=>obj.id==id)[0];

    if (!existUser) {
        return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    };

    const updateUser = {...existUser, name: newName};
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, responseMessage.USER_UPDATE_SUCCESS, updateUser));
});

router.delete("/:id", async (req, res)=>{
    const {id} = req.params;

    if (!id) {
        return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    };
    const existUser = users.filter(obj=>obj.id == id)[0];
    if(!existUser) {
        return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));

    };

    const newUsers = users.filter(obj => obj.id != id);

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, responseMessage.DELETE_USER, newUsers));
});

module.exports = router;
