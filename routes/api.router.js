const apiRouter = require('express').Router();
const {getApi} = require('../controllers/api.controller')

apiRouter.route('/')
.get(getApi);