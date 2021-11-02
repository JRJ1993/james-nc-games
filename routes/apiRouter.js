const apiRouter = require('express').Router();
const categoryRouter = require('./category.router');
const reviewsRouter = require('./reviews.router');

apiRouter.use("/categories", categoryRouter);
apiRouter.use("/reviews", reviewsRouter);

module.exports = apiRouter;