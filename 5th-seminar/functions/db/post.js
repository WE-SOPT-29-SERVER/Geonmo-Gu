const _ = require('lodash');
const convertSnakeToCamel = require('../lib/converSnakeToCamel');

const getAllPost = async (client) => {
    const {rows} = await client.query(
        `
        SELECT * FROM "post" p
        WHERE is_deleted = FALSE
        `
    );

    return convertSnakeToCamel.keysToCamel(rows);
}

const getPostById = async (client, postId) => {
    const {rows} = await client.query(
        `
        SELECT * FROM "post" p
        WHERE id=$1
        AND is_deleted = FALSE
        `,
        [postId],
    );

    return convertSnakeToCamel.keysToCamel(rows[0]);
}

const updatePost = async (client, postId, title, content) => {
    const {rows:existingRows} = await client.query(
        `
        SELECT * FROM "post" p
        WHERE id = $1
        AND is_deleted = FALSE
        `,
        [postId]
    );

    const data = _.merge({}, convertSnakeToCamel.keysToCamel(existingRows[0]), {title, content});
    
    const {rows} = await client.query(
        `
        UPDATE "post" p
        SET title=$1, content=$2, updated_at=now()
        WHERE id=$3
        RETURNING *
        `,
        [data.title, data.content, postId],
    );

    return convertSnakeToCamel.keysToCamel(rows[0]);
}

const deletePost = async (client, postId) => {
    const {rows} = await client.query(
        `
        UPDATE "post" p
        SET is_deleted=TRUE, updated_at=now()
        WHERE id=$1
        RETURNING *
        `,
        [postId],
    );

    return convertSnakeToCamel.keysToCamel(rows[0]);
}

const createPost = async (client, title, content, userId) => {
    const {rows} = await client.query(
        `
        INSERT INTO "post" (user_id, title, content, created_at, updated_at)
        VALUES ($1, $2, $3, now(), now())
        RETURNING *
        `,
        [userId, title, content]
    );

    return convertSnakeToCamel.keysToCamel(rows);
}

module.exports = {getAllPost, getPostById, updatePost, deletePost, createPost}