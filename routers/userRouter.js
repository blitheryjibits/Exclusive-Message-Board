const { Router } = require('express');
const userRouter = Router();
const controller = require('../controllers/controller');
const passport = require('passport');

userRouter.get('/signup', controller.signupForm);

userRouter.post('/signup', controller.signup);

userRouter.get('/signin', controller.signinForm);

userRouter.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/signin'
    // failureFlash: true
}));

userRouter.get('/logout', controller.logout);

userRouter.get('/create_message', controller.createMessage);

userRouter.post('/create_message', controller.postMessage);

userRouter.get('/join', (req, res) => {res.render('member-status')});
userRouter.post('/join', controller.addMember);

module.exports = userRouter;