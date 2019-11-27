const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Joi = require('joi');
Joi.objectId = require('joi-objectid');
const types = require('./routes/type-route');

app.use(express.json());
app.use('/types', types);

mongoose.connect('mongodb://localhost', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connect to server successfuly"))
    .catch((err) => console.log("connect to server failed"));


const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
