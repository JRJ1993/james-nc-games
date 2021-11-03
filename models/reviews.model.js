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

    let currentVote = await db.query(`SELECT votes FROM reviews WHERE review_id = $1`, [id.review_id]);
    let newVotes = currentVote.rows[0].votes + updates.inc_votes;
    let queryStr = `UPDATE reviews SET votes = $1 WHERE review_id = $2 RETURNING*`

    let updateVotes = await db.query(queryStr, [newVotes, id.review_id]);

    return updateVotes.rows[0];

}

exports.fetchAllReviews = async (order_by = 'created_at', order = 'DESC', category, req) => {
    if (order !== 'ASC' && order !== 'DESC' ) {
        return Promise.reject({status:400, msg: 'Invalid order input'})
    }

    if (Object.keys(req).length !== 0 && !req.hasOwnProperty('order_by') && !req.hasOwnProperty('order') && !req.hasOwnProperty('category')) {
        return Promise.reject({status: 400, msg: 'there is nothing for that query'})
    }

    let queryStr = `SELECT * FROM reviews`
    if (category !== undefined) {
        queryStr += ` WHERE category = '${category}'`
    }
    queryStr += ` ORDER BY ${order_by} ${order}`

    let allReviews = await db.query(queryStr);

    if (allReviews.rows.length === 0) {
        return Promise.reject({status:400, msg: 'there is nothing for that query'})
    }
    for (let i = 0; i < allReviews.rows.length; i++) {
        let noComments = await db.query('SELECT COUNT(review_id) FROM comments WHERE review_id = $1', [allReviews.rows[i].review_id]);
        allReviews.rows[i].comment_count = noComments.rows[0].count;
    }

    return allReviews.rows;
}
