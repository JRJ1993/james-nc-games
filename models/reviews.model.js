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

exports.updateReviews = async (id, updates) => {
    if (typeof updates.inc_votes !== 'number' || !updates.hasOwnProperty('inc_votes')) {
        return Promise.reject({status:400, msg: 'this input is invalid'})
    }

    if (typeof id.review_id !== 'number' && id !== undefined) {
        const result = await db.query('SELECT * FROM reviews WHERE review_id = $1', [id.review_id]);
        if (result.rows.length === 0) {
            return Promise.reject({status:404, msg:'review not found'})
        }
    }
    console.log(id, updates)

    let currentVote = await db.query(`SELECT votes FROM reviews WHERE review_id = $1`, [id.review_id]);
    let newVotes = currentVote.rows[0].votes + updates.inc_votes;
    let queryStr = `UPDATE reviews SET votes = $1 WHERE review_id = $2 RETURNING*`

    let updateVotes = await db.query(queryStr, [newVotes, id.review_id]);

    return updateVotes.rows[0];

}