const reviewsRouter = require('express').Router();
const {getReviews, patchReviews, getAllReviews} = require('../controllers/reviews.controller')

reviewsRouter.route('/')
.get(getAllReviews);

reviewsRouter.route('/:review_id')
.get(getReviews)
.patch(patchReviews);


module.exports = reviewsRouter;