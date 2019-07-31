const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const { postgraphile } = require('postgraphile');
const compileSeed = require('./dev-utils/db-seed');

require('dotenv').config();

const {
    env: {
        NODE_ENV,
        SERVER_PORT,
        CONNECTION_STRING,
        DO_GC_CONNECTION_STRING,
        JWT_SECRET,
        DO_ADMIN_USERNAME,
        DO_ADMIN_PASSWORD,
        DO_ADMIN_HOST,
        DO_ADMIN_PORT,
        DO_ADMIN_DB,
    },
} = process;


async function seedDatabase(reseed) {

    if (NODE_ENV === 'development') {

        if (reseed) console.log('Re-seeding database');
        else console.log('Re-compililng database seed');

        const DB_SEED = await compileSeed();

        if (reseed) {
            const DB = new Client({
                user: 'doadmin', // DO NOT CHANGE
                password: DO_ADMIN_PASSWORD,
                host: DO_ADMIN_HOST,
                port: DO_ADMIN_PORT,
                database: DO_ADMIN_DB,
                ssl: true,
            });

            try {
                console.log('Connecting to db');
                await DB.connect();
                console.log('Successfully connected to db');
            } catch (err) {
                console.error('Error connecting to db:');
                console.error(err);
            }

            try {
                console.log('Seeding db');
                await DB.query(DB_SEED);
                console.log('Successfully seeded db');
            } catch (err) {
                console.error('Error seeding db:');
                console.error(err);
            }
        } else {
            console.log('Not seeding db');
        }

        console.log('done');
    }
}

seedDatabase(true).then(() => setTimeout(() => {

    const APP = express();

    APP.use(cors());

    APP.use(express.static(`${__dirname}/build/`));

    APP.use(postgraphile(
        DO_GC_CONNECTION_STRING,
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
            jwtPgTypeIdentifier: "gc_public.jwt",
            jwtSecret: JWT_SECRET,
            exportGqlSchemaPath: `${__dirname}/compiled/gql-schema.gql`,
            pgDefaultRole: 'unauthorized',
            // pgDefaultRole: 'glascad',
        },
    ));

    APP.get('*', (_, res) => res.status(200).sendFile(`${__dirname}/build/`));

    APP.listen(SERVER_PORT, () => console.log(`glascad on port ${SERVER_PORT}`));

}, 2500));
