const express = require('express');
const router = express.Router();
const posts = require('../../dbMockup/posts');
const util = require('../../lib/util');
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const { success } = require('../../lib/util');

module.exports = async (req, res)=>{
    const {title, content, user} = req.body;
    const updated_at = new Date();
    if (!title || !content || !user) {
        return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    const newPost = {id: posts.length+1, title, content, user, updated_at};

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, responseMessage.CREATED_POST, newPost));
}