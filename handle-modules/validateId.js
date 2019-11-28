const Joi = require('joi');

validateId = (id) => {
    const idShema = {
        _id: id
    };

    const shema = {
        _id: Joi.objectId().required()
    };

    return Joi.validate(idShema, shema);
};

module.exports.validateId = validateId;