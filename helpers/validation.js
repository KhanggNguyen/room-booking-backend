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
        gender: Joi.string().valid("MALE", "FEMALE", "OTHER"),
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
            .required(),
    });

    return loginSchema.validate(data);
};

const roomValidate = (data) => {
    const createSchema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string()
            .min(10)
            .required(),
        maxOccupancy: Joi.number().min(1).required(),
        price: Joi.number().required(),
        image: Joi.string(),
        number: Joi.number().min(1),
    });

    return createSchema.validate(data);
};

const bookingValidate = (data) => {
    const createSchema = Joi.object({
        room: Joi.string().required(),
        checkin: Joi.date().required(),
        checkout: Joi.date().required(),
        totalGuests: Joi.number().required(),
        adult: Joi.number(),
        children: Joi.number(),

    });

    return createSchema.validate(data);
}

module.exports = {
    userValidate,
    userLoginValidate,
    addressesValidate,
    roomValidate,
    bookingValidate
};
