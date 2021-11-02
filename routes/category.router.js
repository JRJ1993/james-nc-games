const categoryRouter = require('express').Router();
const {getCategories} = require('../controllers/categories.controller')

categoryRouter.route('/')
.get(getCategories);

module.exports = categoryRouter