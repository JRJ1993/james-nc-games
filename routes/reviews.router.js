const reviewsRouter = require('express').Router();
const {getReviews} = require('../controllers/getReviews.controller')

reviewsRouter.route('/:review_id')
.get(getReviews);

module.exports = reviewsRouter;