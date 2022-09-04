const Joi = require("joi");

const addressesValidate = (addresses) => {
    const zipcodePattern = "(^d{5}$)|(^d{9}$)|(^d{5}-d{4}$)";

    const addressSchema = Joi.object().keys({
        number: Joi.number().required(),
        street: Joi.string().required(),
        city: Joi.string().required(),
        zipcode: Joi.string()
            .regex(zipcodePattern)
            .required(),
        country: Joi.string().required(),
    });

    addressesSchema = Joi.array().items(addressSchema);

    return addressesSchema.validate(addresses);
};

const userValidate = (data) => {
    const userSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        userName: Joi.string()
            .min(8)
            .required(),
        email: Joi.string()
            .email()
            .lowercase()
            .required(),
        password: Joi.string()
            .min(8)
            .max(40)
            .required(),
        dateOfBirth: Joi.date(),
        gender: Joi.string().valid("MALE", "FEMALE", "OTHER")
    });

    return userSchema.validate(data);
};

const userLoginValidate = (data) => {

    const loginSchema = Joi.object({
        email: Joi.string()
            .email()
            .lowercase()
            .required(),
        password: Joi.string()
            .min(8)
            .max(40)
            .required()
    });

    return loginSchema.validate(data);
}

module.exports = {
    userValidate,
    userLoginValidate,
    addressesValidate,
};
