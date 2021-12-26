const _ = require('lodash');
const convertSnakeToCamel = require('../lib/converSnakeToCamel');

const AddRefreshtoken = async (client, userId, token) => {
  const { rows: existRows } = await client.query(
    `
    SELECT * FROM token
    WHERE user_id =$1
    `,
    [userId],
  );
  console.log(existRows);
  if (existRows.length === 0) {
    console.log(token);
    const { insertRow } = await client.query(
      `
          INSERT INTO token
          (refresh_token, user_id)
          VALUES ($1, $2)
          RETURNING *
          `,
      [token, userId],
    );

    return convertSnakeToCamel.keysToCamel(insertRow);
  } else {
    const data = _.merge({}, convertSnakeToCamel.keysToCamel(existRows[0]), { token });
    const { updateRow } = await client.query(
      `
          UPDATE token
          SET refresh_token=$1
          WHERE user_id = $2
          RETURNING *
          `,
      [data.token, userId],
    );

    return convertSnakeToCamel.keysToCamel(updateRow);
  }
};

module.exports = { AddRefreshtoken };
