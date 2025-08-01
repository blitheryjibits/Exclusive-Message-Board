require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Database connection
const pool = require('./database/pool');

// Routers
const userRouter = require('./routers/userRouter');
app.use('/user', userRouter);

// Auth and Sessions
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'session'
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
})

app.get('/', (req, res) => {
    res.render('index', { user: req.user });
});


app.listen(process.env.PORT, () => {
    console.log('server running on port ' + process.env.PORT);
});