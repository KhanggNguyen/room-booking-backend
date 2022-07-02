

const express = require("express");
const cors = require("cors");
const passport = require('passport');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

require('./config/config');
require('./config/passportConfig');
require('./models/db');


app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`);
});
