const db = require("../database/query");
const bcrypt = require('bcrypt');

const controller = {

    async signup(req, res) {
         const { username: username, 'first-name': firstName, 'last-name': lastName, email: email, password: password } = req.body;
         const hashedPassword = await bcrypt.hash(password, 10);
         console.log(hashedPassword);
        await db.signup({ username, firstName, lastName, email, hashedPassword })
        res.redirect('/');
    },

    async signupForm(req, res) {
        res.render('signup', { user: req.user });
    },

    async signinForm(req, res) {
        res.render('signin');
    },

    async signin(req, res) {
        const {username, password} = req.body;
        res.redirect('/');
    }
}

module.exports = controller;