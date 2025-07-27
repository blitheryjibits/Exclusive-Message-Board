require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Database connection
const pool = require('./database/pool');

// Routers

// Auth and Sessions
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    })
);
app.use(passport.session());


app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

app.get('/sign-up', (req, res) => {
    res.render('signup')
})

app.post('/sign-up', async (req,res) => {
    const { username, first, last, email, password } = req.body;
    res.render('index');
    })

app.listen(process.env.PORT, () => {
    console.log('server running on port ' + process.env.PORT);
});