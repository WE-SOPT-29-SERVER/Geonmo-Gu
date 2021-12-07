const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { postDB } = require('../../../db');

module.exports = async (req, res) => {
  
  let client;
 
  try {
    client = await db.connect(req);
    const posts = await postDB.getAllPost(client);
 
    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_ALL_POSTS_SUCCESS, posts));

  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    
    // 그리고 역시 response 객체를 보내줍니다.
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    
    // finally문은 try문이 끝나든 catch문이 끝나든 반드시 실행되는 블록입니다.
    // 여기서는 db.connect(req)를 통해 빌려온 connection을 connection pool에 되돌려줍니다.
    // connection을 되돌려주는 작업은 반드시 이루어져야 합니다.
    // 그렇지 않으면 요청의 양이 일정 수준을 넘어갈 경우 쌓이기만 하고 해결되지 않는 문제가 발생합니다.
  } finally {
    client.release();
  }
};