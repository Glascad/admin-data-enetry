const express = require('express');
const cors = require('cors');
const { postgraphile } = require('postgraphile');
const chalk = require('chalk');

const {
    env: {
        PORT,
        POSTGRES_USER,
        POSTGRES_PASSWORD,
        POSTGRES_DB,
        JWT_SECRET = 'sldkfjsdlkfjsldkjflksdjlfksjdlkjsdlkjsdlfksdjflk',
    },
} = process;

const CONNECTION_STRING = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db/${POSTGRES_DB}`;

console.log({ CONNECTION_STRING, JWT_SECRET, PORT });

const APP = express();

APP.use(cors());

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
