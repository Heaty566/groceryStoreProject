const mongoose = require('mongoose');
const Joi = require('joi');
const {productSchema} = require('./product-module');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 100,
        minlength: 1,
        required: true 
    },
    phone: {
        type: String,
        maxlength: 100,
        minlength: 1,
        required: true 
    },
    userName: {
        type: String,
        maxlength: 20,
        minlength: 5,
        required: true
    },
    password: {
        type: String,
        maxlength: 255,
        minlength: 1,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    bags: {
        type: [productSchema]
    }
});

const User = mongoose.model('User', userSchema);



validateUser = (user) => {
    const schema = {
        name: Joi.string().min(1).max(100).required(),
        phone: Joi.string().min(1).max(100).required(),
        userName: Joi.string().min(5).max(20).required(),
        password: Joi.string().min(1).max(255).required(),
        isAdmin: Joi.boolean(),
        bags: Joi.array().items()
    }

    return Joi.validate(user, schema);
};

module.exports.validate = validateUser;
module.exports.User = User;