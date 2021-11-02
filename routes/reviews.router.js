const reviewsRouter = require('express').Router();
const {getReviews} = require('../controllers/reviews.controller')

reviewsRouter.route('/')
.get(getReviews);

reviewsRouter.route('/:review_id')
.get(getReviews);

module.exports = reviewsRouter;