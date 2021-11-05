const {
    fetchAllReviewComments,
    addCommentToReview,
    removeComment
} = require('../models/comments.model');

exports.getReviewComments = (req, res, next) => {
    let id = (req.params.review_id);
    fetchAllReviewComments(id)
    .then((reviews) => {
        res.status(200).send({reviews});
    })
    .catch(next)
}

exports.postReviewComment = (req, res, next) => {
    let id = req.params.review_id;
    let username = req.body.username;
    let comment = req.body.body
    addCommentToReview(id, username,  comment)
    .then((comment) => {
        res.status(201).send({comment})
    })
    .catch(next)
}

exports.deleteComment = (req, res, next) => {
    console.log(req.params)
    let id = req.params.comment_id
    removeComment(id)
    .then(() => {
        res.status(204).send({msg: 'comment deleted'})
    })
    .catch(next)
}