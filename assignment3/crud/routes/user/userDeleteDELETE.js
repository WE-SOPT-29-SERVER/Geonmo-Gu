const express = require('express');
const router = express.Router();
const users = require('../../dbMockup/user');
const util = require('../../lib/util');
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const { success } = require('../../lib/util');
const e = require('express');

module.exports = async (req, res)=>{
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
}