const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { TOKEN_EXPIRED, TOKEN_INVALID } = require('../../../constants/jwt');
const jwtHandlers = require('../../../lib/jwtHandlers');
const { userDB } = require('../../../db');

module.exports = async (req, res) => {
  console.log('refresh');
  const { accesstoken, refreshtoken } = req.headers;
  let client;
  try {
    client = await db.connect(req);
    const decodedToken = jwtHandlers.verify(accesstoken);
    if (decodedToken === null) {
      console.log('여기?');
      res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.TOKEN_INVALID));
    }

    const decodedRefreshToken = jwtHandlers.refreshVerify(refreshtoken);
    if (decodedToken === TOKEN_EXPIRED) {
      if (decodedRefreshToken === TOKEN_EXPIRED) {
        // access token, refresh token 둘 다 만료 => 다시 로그인
        res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.TOKEN_EXPIRED));
      } else {
        // access token만 만료, refresh token 생존 => access token 재발급
        const userId = decodedRefreshToken.id;
        console.log(decodedRefreshToken);
        if (!userId) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.TOKEN_INVALID));

        const user = await userDB.getUserById(client, userId);

        if (!user) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.NO_USER));

        const newAccessToken = jwtHandlers.sign(user).accesstoken;

        res.status(statusCode.OK).send(util.success(statusCode.OK, 'Access token refresh', { accesstoken: newAccessToken, refreshtoken }));
      }
    } else {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, 'Access token is already valid'));
    }
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
