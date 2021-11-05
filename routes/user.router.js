const usersRouter = require('express').Router();
const {} = require('../controllers/user.controller');


usersRouter.route('/')
.get(getAllUsers);




module.exports = reviewsRouter;