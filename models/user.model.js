const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addressSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
})

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: () => {
            return this.provider !== "email" ? false : true;
        },
        unique: true,
    },
    dateOfBirth: {
        type: Date,
        default: null,
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE', 'OTHER'],
        default: 'OTHER'
    },
    addresses: [addressSchema],
    provider: {
        type: String,
        required: true,
        default: "email",
    },
    googleId: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        default: "ROLE_MEMBER",
        enum: ["ROLE_MEMBER", "ROLE_ADMIN", "ROLE_MANAGER"],
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    updated: Date,
    created: {
        type: Date,
        default: Date.now,
    },
});

//event listener
UserSchema.pre("save", function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err)
            console.error(
                "Error while generating salt : " +
                    JSON.stringify(err, undefined, 2)
            );

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err)
                console.error(
                    "Error while hasing password : " +
                        JSON.stringify(err, undefined, 2)
                );

            this.password = hash;
            next();
        });
    });
});

UserSchema.methods.verifyPassword = async function (password) {
    try{
        return await bcrypt.compare(password, this.password);
    }catch(error){
        throw new Error(error);
    }
};

module.exports = mongoose.model("User", UserSchema);
