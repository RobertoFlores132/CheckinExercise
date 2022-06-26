const express = require('express');

const { registrationsRouter } = require('./routes/registration')

const { db } = require('./utils/database');

const app = express();

app.use('/api/v1/registrations', registrationsRouter);

app.use(express.json());

db.authenticate()
.then(() => console.log("Db connected!"))
.catch(err => console.log(err));

db.sync()
.then(() => console.log("Db synced!"))
.catch(err => console.log(err));

app.listen(3000, () => {
    console.log('Express App Running!');
});
