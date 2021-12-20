const _ = require('lodash');
const convertSnakeToCamel = require('../lib/converSnakeToCamel');

const getAllUsers = async (client) => {
  const { rows } = await client.query(
    `
    SELECT * FROM "user" u
    WHERE is_deleted = FALSE
    `,
  );
  return convertSnakeToCamel.keysToCamel(rows);
};

const getUserById = async (client, userId) => {
  const { rows } = await client.query(
    `
    SELECT * FROM "user" u
    WHERE id=$1
    AND is_deleted = FALSE
    `,
    [userId],
  );

  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const updateUser = async (client, userId, username, phone) => {
  const { rows: existingRows } = await client.query(
    `
    SELECT * FROM "user" u
    WHERE id = $1
    AND is_deleted = FALSE
    `,
    [userId],
  );
  if (!existingRows.length === 0) return false;

  const data = _.merge({}, convertSnakeToCamel.keysToCamel(existingRows[0]), { username, phone });

  const { rows } = await client.query(
    `
    UPDATE "user" u
    SET username = $1, phone = $2, updated_at = now()
    WHERE id = $3
    RETURNING *
    `,
    [data.username, data.phone, userId],
  );

  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const deleteUser = async (client, userId) => {
  const { rows } = await client.query(
    `
    UPDATE "user" u
    SET is_deleted=TRUE, updated_at = now()
    WHERE id = $1 
    RETURNING *
    `,
    [userId],
  );

  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const addUser = async (client, email, username, phone, idFirebase) => {
  const { rows } = await client.query(
    `
    INSERT INTO "user"
    (email, username, phone, id_firebase)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *
    `,

    [email, username, phone, idFirebase],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const getUserByIdFirebase = async (client, idFirebase) => {
  const { rows } = await client.query(
    `
    SELECT * FROM "user" u
    WHERE id_firebase = $1
      AND is_deleted = FALSE
    `,
    [idFirebase],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser, addUser, getUserByIdFirebase };
