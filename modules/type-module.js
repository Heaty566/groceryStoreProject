const mongoose = require('mongoose');
const Joi = require('joi');

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 100,
        minlength: 1,
        required: true
    }
});

const Type = mongoose.model('Types', typeSchema);

validateType = (type) => {
    const shema = {
        name: Joi.string().max(100).min(1).required()
    };

    return Joi.validate(type, shema);
};

module.exports.typeSchema = typeSchema;
module.exports.validate = validateType;
module.exports.Type = Type;