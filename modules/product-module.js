const mongoose = require('mongoose');
const Joi = require('joi');
const {typeSchema} = require('./type-module');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 100,
        minlength: 1,
        required: true
    },
    type: {
        type: typeSchema,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

validateProduct = (product) => {
    const shema = {
        name: Joi.string().max(100).min(1).required(),
        typeId: Joi.string().max(50).min(1).required()
    };

    return Joi.validate(product, shema);
};


module.exports.productSchema = productSchema;
module.exports.validate = validateProduct;
module.exports.Product = Product;