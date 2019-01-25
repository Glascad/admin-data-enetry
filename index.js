// POSTGRAPHILE
const express = require('express');
const cors = require('cors');
const { postgraphile } = require('postgraphile');
require('dotenv').config();
const {
    SERVER_PORT,
    CONNECTION_STRING
} = process.env;

const APP = express();

APP.use(cors());
APP.use(postgraphile(CONNECTION_STRING, { graphiql: true }));

APP.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));
