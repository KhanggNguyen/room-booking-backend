const jwt = require("jsonwebtoken");

module.exports.verifyJwtToken = async (req, res, next) => {
    try {
        if (!req.headers.autorization)
            return res
                .status(500)
                .send({ auth: false, message: "No token found." });

        const token =
            (await jwt.decode(req.headers.autorization.split(" ")[1])) ||
            req.headers.autorization;

        if (!token)
            return res
                .status(403)
                .send({ auth: false, message: "No token provided." });

        return token;
    } catch (err) {
        console.error(
            "Error while verifying JWT token : " +
                JSON.stringify(err, undefined, 2)
        );
        return res
            .status(500)
            .send({ auth: false, message: "Token authentication failed." });
    }
};

const ROLES = {
    Admin: "ROLE_ADMIN",
    Customer: "ROLE_MEMBER",
    Manager: "ROLE_MANAGER",
};

const checkRole =
    (...roles) =>
    (req, res, next) => {
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

module.exports = role;
