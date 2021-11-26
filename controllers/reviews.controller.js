const {
    fetchReviews,
    updateReviews,
    fetchAllReviews,
} = require('../models/reviews.model');

exports.getReviews = (req, res, next) => {
    let id = (req.params.review_id);
    fetchReviews(id)
    .then((reviews) => {
        res.status(200).send({reviews});
    })
    .catch(next)
}
exports.getAllReviews = (req, res, next) => {
    let query = req.query.order_by;
    let sort_by;
    if (req.query.order) {
        sort_by = req.query.order.toUpperCase();
    }
    let category = req.query.category;
    fetchAllReviews(query, sort_by, category, req.query )
    .then((reviews) => {
        res.status(200).send({reviews})
    })
    .catch(next)
}
exports.patchReviews = (req, res, next) => {
    let id = req.params;
    let update = req.body
    updateReviews(id, update)
    .then((reviews) => {
        res.status(200).send({reviews})
    })
    .catch(next)
}