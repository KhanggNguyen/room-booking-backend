const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const createError = require("http-errors");
const app = express();

const PORT = process.env.PORT || 3000;

require("./config/config");
require("./models/db");
require("./middleware/passportConfig");
const router = require("./routes/index.router");

app.use(bodyParser.json());
app.use(cors());
app.use(router);
app.use((req, res, next) => {
    next(createError.NotFound("This route does not exists."));
});

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message,
    });
});

app.listen(PORT, (error) => {
    if (error) {
        console.error("Error starting", error);
    } else {
        console.log(`Starting server on port ${PORT}`);
    }
});
