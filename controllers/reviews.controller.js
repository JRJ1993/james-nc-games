const {
    fetchReviews,
    updateReviews,
    fetchAllReviews,
    fetchAllReviewComments

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
    let order;
    if (req.query.order) {
        order = req.query.order.toUpperCase();
    }
    let category = req.query.category;
    fetchAllReviews(query, order, category, req.query )
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