const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
require("./config");

const User = mongoose.model("User");
const secret = process.env.JWT_SECRET;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

passport.use(
    new JwtStrategy(opts, (payload, done) => {
        User.findById(payload.id)
            .then((user) => {
                if (user) return done(null, user);

                return done(null, false);
            })
            .catch((err) => {
                return done(err, false);
            });
    })
);

module.exports = async (app) => {
    app.use(passport.initialize());

    await googleAuth();
};

const googleAuth = async () => {
    try {
        passport.use(
            new GoogleStrategy({
                clientId: process.env.google.CLIENT_ID,
                clientSecret: process.env.google.CLIENT_SECRET,
                callbackURL: `${serverURL}/${apiURL}/${process.env.google.CALLBACK_URL}`,
            })
        );
    } catch (err) {
        console.log("Google's key was missing");
    }
};
