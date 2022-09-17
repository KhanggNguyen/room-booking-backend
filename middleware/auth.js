const passport = require("passport");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const auth = passport.authenticate("jwt", { session: false });

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = { userId };
        const secret = process.env.JWT_ACCESSTOKEN_SECRET;
        const options = {
            expiresIn: process.env.JWT_ACCESSTOKEN_EXP,
        };

        jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
};

const signRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = { userId };
        const secret = process.env.JWT_REFRESHTOKEN_SECRET;
        const options = {
            expiresIn: process.env.JWT_REFRESHTOKEN_EXP,
        };

        jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
};



const verifyJwtToken = async (req, res, next) => {
    try {
        if (!req.headers["authorization"]) {
            return next(createError(400, 'Authorization missing.'));
        }

        const authHeader = req.headers["authorization"];
        const bearerToken = authHeader.split(" ")[1];

        jwt.verify(bearerToken, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                if(err.name === 'JsonWebTokenError'){
                    return next(createError.Unauthorized());
                }
                return next(createError(400, 'Token is not valid.'));
            }

            req.payload = payload;
            next();
        });
    } catch (err) {
        next(err);
    }
};

const verifyRefreshToken = async (refreshToken) => {
    return new Promise( (resolve, reject) => {
        jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN_SECRET, (err, payload) => {
            if(err) return reject(err);

            resolve(payload);
        })
    })
}

const ROLES = {
    Admin: "ROLE_ADMIN",
    Customer: "ROLE_MEMBER",
    Manager: "ROLE_MANAGER",
};

const checkRole = (...roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).send("Unauthorized");
    }

    const hasRole = roles.find((role) => req.user.role === role);
    if (!hasRole) {
        return res
            .status(403)
            .send("You are not allowed to make this request.");
    }

    return next();
};

const role = { ROLES, checkRole };

module.exports = { auth, signAccessToken, signRefreshToken, verifyJwtToken, verifyRefreshToken, role };
