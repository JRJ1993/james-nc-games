const db = require('../db/connection')

exports.fetchReviews = async (id) => {
    let queryStr = `SELECT * FROM reviews`;
    let queryArr = []
    let noComments = await db.query('SELECT COUNT(review_id) FROM comments WHERE review_id = $1', [id])
        
    if (id) {
        queryStr += ` WHERE review_id = $1`
        queryArr.push(id);

    }
        
    let review = await db.query(queryStr, queryArr)

    if (review.rows.length === 0 && id !== undefined) {
        const result = await db.query('SELECT * FROM reviews WHERE review_id = $1', [id])
        if (result.rows.length === 0) {
            return Promise.reject({status:404, msg:'review not found'})
        }
    }

    review.rows[0].comment_count = noComments.rows[0].count
    return review.rows
}