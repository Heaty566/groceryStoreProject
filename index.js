const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const types = require('./routes/type-route');
const products = require('./routes/product-route');

app.use(express.json());
app.use('/types', types);
app.use('/products', products);


mongoose.connect('mongodb://localhost/grocery', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connect to server successfuly"))
    .catch((err) => console.log("connect to server failed"));


const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
