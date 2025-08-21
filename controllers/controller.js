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

    async logout(req, res) {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    },

    async createMessage(req, res) {
        res.render('message');
    },

    async retrieveMessages(req, res) {
        try {
            const messages = await db.getMessages();
            console.log(messages)
            return messages;
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    async postMessage(req, res) {
        const {title, content} = req.body;
        const userId = req.user.id;
        try {
            await db.createMessage({ title, content, userId });
            res.redirect('/');
        } catch (err) {
            res.status(500).send("error creating message: " + err.message);
        }
    },

    async addMember(req, res) {
        const {passcode} = req.body;
        console.log(passcode);
        if (passcode === process.env.PASSCODE) {
            db.addMember(req.user.id);
            res.redirect('/');
        } else {
            res.status(403).send("Incorrect passcode");
        }
    }
}

module.exports = controller;