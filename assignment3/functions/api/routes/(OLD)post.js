const express = require('express');
const router = express.Router();
const util = require('../lib/util');
const responseMessage = require("../constants/responseMessage");
const statusCode = require("../constants/statusCode");
const { success } = require('../lib/util');
const posts = require('../dbMockup/posts');

router.get("/", (req, res)=>{
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, responseMessage.READ_POST_LIST_SUCCESS, posts));
})

router.get("/:id", (req, res)=>{
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
});

router.post("/", (req, res)=>{
    const {title, content, user} = req.body;
    const updated_at = new Date();
    if (!title || !content || !user) {
        return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    const newPost = {id: posts.length+1, title, content, user, updated_at};

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, responseMessage.CREATED_POST, newPost));
})

router.put("/:id", (req, res)=>{
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
})

router.delete("/:id", (req, res)=>{
    const {id} = req.params;

    if (!id) {
        return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    };

    const existPost = posts.filter(obj=>obj.id == id)[0];
    if(!existPost) {
        return res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_POST));
    };

    const newPosts = posts.filter(obj=>obj.id != id);

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, responseMessage.DELETE_POST, newPosts));
})

module.exports = router;