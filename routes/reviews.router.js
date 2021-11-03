const reviewsRouter = require('express').Router();
const {getReviews, patchReviews, getAllReviews, getReviewComments} = require('../controllers/reviews.controller')

reviewsRouter.route('/')
.get(getAllReviews);

reviewsRouter.route('/:review_id')
.get(getReviews)
.patch(patchReviews);

reviewsRouter.route('/:review_id/comments')
.get(getReviewComments);


module.exports = reviewsRouter;