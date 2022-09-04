const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(
                ` ${chalk.green("✓")} ${chalk.blue("Connected to MongoDB")}`
            );
        }
    }
);

require("./booking.model");
require("./room.model");
require("./user.model");
