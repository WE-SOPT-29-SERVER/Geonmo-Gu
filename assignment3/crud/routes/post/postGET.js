const express = require('express');
const router = express.Router();
const posts = require('../../dbMockup/posts');
const util = require('../../lib/util');
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const { success } = require('../../lib/util');

module.exports = async (req, res)=>{
    const {id} = req.params;
    if(!id) {
        return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    };

    const post = posts.filter(obj=>obj.id==id)[0];
    if(!post) {
        return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_POST));
    }
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, responseMessage.READ_POST_SUCCESS, post));
}