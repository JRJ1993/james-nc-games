const db = require('../db/connection')

exports.fetchReviews = (id) => {
    return db.query('SELECT * FROM reviews WHERE review_id = $1;', [id])
    .then(({rows}) => {
        return rows
    })
}