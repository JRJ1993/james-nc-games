const apiRouter = require('express').Router();
const categoryRouter = require('./category.router');
const reviewsRouter = require('./reviews.router');
const commentsRouter = require('./comments.router');
const {getApi} = require('../controllers/api.controller')

apiRouter.route("/").get(getApi);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;