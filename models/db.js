const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    (err) => {
        if (err)
            console.log(
                `Error while connecting to MongoDB ` +
                    JSON.stringify(err, undefined, 2)
            );

        console.log(` ${chalk.green('✓')} ${chalk.blue('Connected to MongoDB')}`);
    }
);

require("./booking.model");
require("./room.model");
require("./user.model");
