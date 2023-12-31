require('express-async-errors');
const express = require("express");
const app = express();
require('dotenv').config();

const sequelize = require('./database/db');

require('./routes/routes')(app, sequelize);

port = process.env.APP_PORT;
const server = app.listen(port, () => {
    console.log(`Library System app listening at http://localhost:${port}`);
});

module.exports = server;