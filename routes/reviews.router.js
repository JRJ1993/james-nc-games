const reviewsRouter = require('express').Router();
const {getReviews, patchReviews, getAllReviews} = require('../controllers/reviews.controller');
const {getReviewComments, postReviewComment} = require('../controllers/comments.controller')

reviewsRouter.route('/')
.get(getAllReviews);

reviewsRouter.route('/:review_id')
.get(getReviews)
.patch(patchReviews);

reviewsRouter.route('/:review_id/comments')
.get(getReviewComments)
.post(postReviewComment);


module.exports = reviewsRouter;