const express = require('express');
const router = express.Router();
const posts = require('../../dbMockup/posts');
const util = require('../../lib/util');
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const { success } = require('../../lib/util');

module.exports = async (req, res)=>{
    const {id} = req.params;
    const {newContent} = req.body;
    const updated_at = new Date();

    if (!id || !newContent) {
        return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    const existPost = posts.filter(obj=>obj.id == id)[0];

    if(!existPost) {
        return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_POST));
    };

    const newPost = {...existPost, content:newContent, updated_at};

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, responseMessage.POST_UPDATE_SUCCESS, newPost));
}