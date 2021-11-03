const {
    fetchAllReviewComments
} = require('../models/comments.model');

exports.getReviewComments = (req, res, next) => {
    let id = (req.params.review_id);
    fetchAllReviewComments(id)
    .then((reviews) => {
        res.status(200).send({reviews});
    })
    .catch(next)
}