const mongoose = require('mongoose');

const Joi = require('joi');

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 100,
        minlength: 1,
        required: true,
        unique: true
    }
});

const Type = mongoose.model('Types', typeSchema);

validateType = (type) => {
    const shema = {
        name: Joi.string(100).max(100).min(1).required()
    };

    return Joi.validate(type, name);
};

module.exports.Type = Type;