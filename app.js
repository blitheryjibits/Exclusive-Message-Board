require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));


// Database connection
const pool = require('./database/pool');

// Routers
const userRouter = require('./routers/userRouter');

// Auth and Sessions
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const controller = require('./controllers/controller');
require('./config/passport');

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
    res.locals.user = req.user;
    next();
})

// Routes 

app.get('/', async (req, res) => {
    const messages = await controller.retrieveMessages(req, res);
    console.log(messages);
    res.render('index', {messages: messages});
});

app.use('/user', userRouter);

app.listen(process.env.PORT, () => {
    console.log('server running on port ' + process.env.PORT);
});