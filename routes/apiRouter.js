const apiRouter = require('express').Router();
const categoryRouter = require('./category.router')

apiRouter.use("/categories", categoryRouter);

module.exports = apiRouter;