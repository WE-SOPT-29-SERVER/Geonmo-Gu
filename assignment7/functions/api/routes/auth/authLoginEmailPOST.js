const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');

const jwtHandlers = require('../../../lib/jwtHandlers');
const { signInWithEmailAndPassword } = require('@firebase/auth');
const { firebaseAuth } = require('../../../config/firebaseClient');
const { userDB, tokenDB } = require('../../../db');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));

  let client;

  try {
    client = await db.connect(req);

    const userFirebase = await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((user) => user)
      .catch((e) => {
        console.log(e);
        return { err: true, error: e };
      });

    if (userFirebase.err) {
      if (userFirebase.error.code === 'auth/user-not-found') {
        return res.status(statusCode.NOT_FOUND).json(util.fail(statusCode.NOT_FOUND, responseMessage.NO_USER));
      } else if (userFirebase.error.code === 'auth/invalid-email') {
        return res.status(statusCode.NOT_FOUND).json(util.fail(statusCode.NOT_FOUND, responseMessage.INVALID_EMAIL));
      } else if (userFirebase.error.code === 'auth/wrong-password') {
        return res.status(statusCode.NOT_FOUND).json(util.fail(statusCode.NOT_FOUND, responseMessage.MISS_MATCH_PW));
      } else {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
      }
    }

    const {
      user: { uid: idFirebase },
    } = userFirebase;

    const user = await userDB.getUserByIdFirebase(client, idFirebase);

    const { accesstoken } = jwtHandlers.sign(user);
    const { refreshtoken } = jwtHandlers.refresh(user);
    console.log(jwtHandlers.refreshtoken);
    const userId = user.id;
    const token = await tokenDB.AddRefreshtoken(client, userId, refreshtoken);

    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, { user, accesstoken, refreshtoken }));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
