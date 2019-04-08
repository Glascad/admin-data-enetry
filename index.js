const express = require('express');
const cors = require('cors');
const { postgraphile } = require('postgraphile');

require('dotenv').config();

const {
    SERVER_PORT,
    CONNECTION_STRING,
} = process.env;

const APP = express();

APP.use(cors());

APP.use(express.static(`${__dirname}/build/`));

APP.use(postgraphile(CONNECTION_STRING, { graphiql: true }));

APP.get('*', (_, res) => res.status(200).sendFile(`${__dirname}/build/`));

APP.listen(SERVER_PORT, () => console.log(`glascad listening on port ${SERVER_PORT}`));
