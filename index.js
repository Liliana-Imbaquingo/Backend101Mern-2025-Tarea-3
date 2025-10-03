require('dotenv').config();
const express = require('express')
const session = require('express-session');
const cors = require('cors');

/** Db */
const mongoose = require('./db');
/** Middlewares */
const performance = require('./middlewares/performance');
/** Controllers */
const eventsV1 = require('./controllers/events');
const usersV1 = require('./controllers/users');
const authsV1 = require('./controllers/auths');


const app = express();
app.use(express.json());
app.use(performance);
//const apiKeyMiddleware = require('./middlewares/apiKey');
//app.use(apiKeyMiddleware);

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,   
    cookie: {
        name: 'sess:id',
        maxAge: 8 * 60 * 60 * 1000, // 8h
        secure: false
    }
}));


const PORT = 3001;

/** Controllers */
app.use('/api', eventsV1);
app.use('/api', usersV1);
app.use('/api/auths', authsV1);

app.get('/api', (req, res) => {
    req.session.counter = req.counter;
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

