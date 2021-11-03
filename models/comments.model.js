const db = require('../db/connection');

exports.fetchAllReviewComments = async (id) => {
    let queryArr = []
    let queryStr = `SELECT comment_id, votes, created_at, author, body FROM comments`
    if (id) {
        queryStr += ` WHERE review_id = $1`;
        queryArr.push(id)
    }

    let comments = await db.query(queryStr, queryArr);
    return comments.rows
}