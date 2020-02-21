require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { postgraphile } = require('postgraphile');
const chalk = require('chalk');

const {
    env: {
        PORT = 3001,
        JWT_SECRET,
        CONNECTION_STRING,
    },
} = process;

const APP = express();

APP.use(cors());

console.log({ CONNECTION_STRING, JWT_SECRET, PORT });

APP.use(postgraphile(
    CONNECTION_STRING,
    [
        'gc_data',
        'gc_public',
        'gc_protected',
        'gc_private',
        'gc_controlled',
        'gc_utils',
    ],
    {
        graphiql: true,
        jwtPgTypeIdentifier: "gc_controlled.jwt",
        jwtSecret: JWT_SECRET,
        // exportGqlSchemaPath: `${__dirname}/../compiled/gql-schema.gql`,
        // exportJsonSchemaPath: `${__dirname}/../compiled/gql-schema.json`,
        pgDefaultRole: 'unauthorized',
        // pgDefaultRole: 'glascad',
        retryOnInitFail: true,
        watchPg: true,
    },
));

APP.listen(PORT, () => console.log(chalk`${chalk.blueBright(`[glascad]`)} listening on port ${PORT}`));
