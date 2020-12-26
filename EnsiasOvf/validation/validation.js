/**
 *! Register Validation with JOI
 */

const Joi = require('@hapi/joi');
const registerVal = data =>{
    const schema= {
        email : Joi.string().min(6).max(255).required().email(),
        password : Joi.string().min(6).required()
    }
    return Joi.validate(data, schema);
};
const LoginVal = data =>{
    const schema= {
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(6).required()
    }
    return Joi.validate(data, schema);
};


module.exports.registerVal = registerVal;
module.exports.LoginVal = LoginVal;


