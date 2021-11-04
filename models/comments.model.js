const db = require('../db/connection');

exports.fetchAllReviewComments = async (id) => {
    console.log(isNaN(id))
    if(isNaN(id)) {
        return Promise.reject({status:400, msg:'review input must be in the form of a valid number'})
    }
    let queryArr = []
    let queryStr = `SELECT comment_id, votes, created_at, author, body FROM comments`
    if (id) {
        queryStr += ` WHERE review_id = $1`;
        queryArr.push(id)
    }

    let comments = await db.query(queryStr, queryArr);
    console.log(comments.rows, id)

    if (comments.rows.length === 0 && id !== undefined) {
        const result = await db.query('SELECT comment_id, votes, created_at, author, body FROM comments WHERE review_id = $1', [id])
        if (result.rows.length === 0) {
            return Promise.reject({status:404, msg:'review input must be a valid number'})
        }
    }
    return comments.rows
}

exports.addCommentToReview = async (id, username, comment) => {
    console.log(id, username, comment)
    let addComment  = await db.query('INSERT INTO comments (author, body, review_id) VALUES ($1, $2, $3) RETURNING*;', [username, comment, id])
    return addComment
}