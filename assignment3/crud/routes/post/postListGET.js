const express = require('express');
const router = express.Router();
const posts = require('../../dbMockup/posts');
const util = require('../../lib/util');
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");
const { success } = require('../../lib/util');

module.exports = async (req, res)=>{
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, responseMessage.READ_POST_LIST_SUCCESS, posts));
}