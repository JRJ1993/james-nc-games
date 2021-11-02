const {
    fetchReviews,
    updateReviews

} = require('../models/reviews.model');


exports.getReviews = (req, res, next) => {
    let id = (req.params.review_id);
    fetchReviews(id)
    .then((reviews) => {
        res.status(200).send({reviews});
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