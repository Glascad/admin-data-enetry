const express = require('express');
const cors = require('cors');
const { postgraphile } = require('postgraphile');

require('dotenv').config();

const {
    env: {
        SERVER_PORT,
        CONNECTION_STRING,
        JWT_SECRET,
    },
} = process;

const APP = express();

APP.use(cors());

APP.use(express.static(`${__dirname}/build/`));

APP.use(postgraphile(CONNECTION_STRING, {
    graphiql: true,
    jwtPgTypeIdentifier: "users.jwt",
    jwtSecret: JWT_SECRET,
}));

APP.get('*', (_, res) => res.status(200).sendFile(`${__dirname}/build/`));

APP.listen(SERVER_PORT, () => console.log(`glascad on port ${SERVER_PORT}`));
