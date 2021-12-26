const express = require('express');
const router = express.Router();
const users = require('../../dbMockup/user');
const util = require('../../lib/util');
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const { success } = require('../../lib/util');
const e = require('express');

module.exports = async(req, res) => {
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
}