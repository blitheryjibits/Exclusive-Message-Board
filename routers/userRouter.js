const { Router } = require('express');
const userRouter = Router();
const controller = require('../controllers/controller');

userRouter.get('/signup', controller.signupForm);

userRouter.post('/signup', controller.signup);

userRouter.get('/signin', controller.signinForm);

userRouter.post('/signin', controller.signin);

module.exports = userRouter;