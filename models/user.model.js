const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
    },
    first_name: String,
    last_name: String,
    password: {
        type: String,
        minlength: 8,
        required: true,
    },
    email: {
        type: String,
        required: () => {
            return this.provider !== "email" ? false : true;
        },
        unique: true,
    },
    provider: {
        type: String,
        required: true,
        default: "email",
    },
    google_id: {
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

UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.mdp);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign(
        {
            _id: this._id,
            _lastname: this.last_name,
            _firstname: this.first_name,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP,
        }
    );
};

module.exports = mongoose.model("User", UserSchema);