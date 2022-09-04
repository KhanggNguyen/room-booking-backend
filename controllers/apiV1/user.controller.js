const createError = require("http-errors");

//models & helpers
const User = require("../../models/user.model");
const { userValidate, userLoginValidate, addressesValidate } = require("../../helpers/validation");

module.exports.register = async (req, res, next) => {
    try {
        const { userName, firstName, lastName, password, email } = req.body;

        const { error } = userValidate(req.body);

        if (error) {
            throw createError(error);
        }

        const isExist = await User.findOne({ email });

        if (isExist) {
            throw createError.Conflict(`${email} has been registered !`);
        }

        const user = new User({
            userName,
            firstName,
            lastName,
            email,
            password,
        });

        const savedUser = await user.save();

        return res.json({
            status: "success",
            elements: savedUser,
        });
    } catch (error) {
        if (error.isJoi === true) error.status = 422;
        next(error);
    }
};

module.exports.login = async (req, res, next) => {
    try{
        const { email, password } = req.body; 

        const { error } = userLoginValidate(req.body);
        if(error){
            throw createError(error);
        }

        const user = await User.findOne({ email });
        if(!user){
            throw createError.NotFound('User is not registered.');
        }

        const match = await user.verifyPassword(password);
        if(!match){
            throw createError.Unauthorized();
        }
        
        return res.json(user);

    }catch(error){
        next(error)
    }
};

module.exports.getAddress = async (req, res, next) => {};

module.exports.getAddresses = async (req, res, next) => {};

module.exports.addAddress = async (req, res, next) => {};

module.exports.updateAddress = async (req, res, next) => {};

module.exports.deleteAddress = async (req, res, next) => {};
