const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    mongoose.connect('mongodb://localhost/grocery', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => winston.info("connect to server successfuly"));
};