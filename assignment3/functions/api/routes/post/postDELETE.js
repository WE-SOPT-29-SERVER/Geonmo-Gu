const posts = require('../../../dbMockup/posts');
const util = require('../../../lib/util');
const responseMessage = require("../../../constants/responseMessage");
const statusCode = require("../../../constants/statusCode");


module.exports = async (req, res)=>{
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
}