const express = require('express');
const error = require('../middleware/error');
const types = require('../routes/type-route');
const products = require('../routes/product-route');
const user = require('../routes/user-route');
const login = require('../routes/authentication');

module.exports = (app) => {
    app.use(express.json());
    app.use('/types', types);
    app.use('/products', products);
    app.use('/users', user);
    app.use('/login', login);
    app.use(error);
};