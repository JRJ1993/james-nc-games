const reviewsRouter = require('express').Router();
const {getReviews, patchReviews} = require('../controllers/reviews.controller')

reviewsRouter.route('/')
.get(getReviews);

reviewsRouter.route('/:review_id')
.get(getReviews)
.patch(patchReviews);


module.exports = reviewsRouter;