const express = require('express');
const cors = require('cors');
const { postgraphile } = require('postgraphile');

require('dotenv').config();

const {
    env: {
        SERVER_PORT,
        CONNECTION_STRING,
        DO_GC_CONNECTION_STRING,
        JWT_SECRET,
    },
} = process;

const APP = express();

APP.use(cors());

APP.use(express.static(`${__dirname}/build/`));

APP.use(postgraphile(
    DO_GC_CONNECTION_STRING,
    [
        'gc_private',
        'gc_controlled',
        'gc_protected',
        'gc_data',
        'gc_public',
        'gc_utils',
    ],
    {
        graphiql: true,
        jwtPgTypeIdentifier: "gc_public.jwt",
        jwtSecret: JWT_SECRET,
        pgDefaultRole: 'gc_client'
    }
));

APP.get('*', (_, res) => res.status(200).sendFile(`${__dirname}/build/`));

APP.listen(SERVER_PORT, () => console.log(`glascad on port ${SERVER_PORT}`));
