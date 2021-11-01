const categoryRouter = require('express').Router();
const {getCategories} = require('../controllers/getCategories')

categoryRouter.route('/')
.get(getCategories);

module.exports = categoryRouter