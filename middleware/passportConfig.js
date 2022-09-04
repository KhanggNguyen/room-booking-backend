const passport = require("passport");
const JWT = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
require("../config/config");

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
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,//true if https
            maxAge: 24 * 60 * 1000 // a day
        }
    }))
    await googleAuth();
};

const googleAuth = async () => {
    try {
        passport.use(
            new GoogleStrategy(
                {
                    clientId: process.env.google.CLIENT_ID,
                    clientSecret: process.env.google.CLIENT_SECRET,
                    callbackURL: `${serverURL}/${apiURL}/${process.env.google.CALLBACK_URL}`,
                },
                function(accessToken, refreshToken, profile, cb) {
                    cb(null, profile);
                }
            )
        );
    } catch (err) {
        console.log("Google's key was missing");
    }
};
