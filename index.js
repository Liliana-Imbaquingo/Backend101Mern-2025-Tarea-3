const express = require('express')

/** Db */
const mongoose = require('./db');
/** Middlewares */
const performance = require('./middlewares/performance');
/** Controllers */
const eventsV1 = require('./controllers/events');
const app = express();
app.use(express.json());
app.use(performance);

const PORT = 3030;

/** Controllers */
app.use('/api/events', eventsV1);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


