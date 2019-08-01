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
        RESEED,
    },
} = process;


async function seedDatabase() {

    if (NODE_ENV === 'development') {

        if (RESEED === 'true') console.log('[ glascad ] Re-seeding database');
        else console.log('[ glascad ] Re-compililng database seed');

        const DB_SEED = await compileSeed();

        if (RESEED === 'true') {
            const DB = new Client({
                user: 'doadmin', // DO NOT CHANGE
                password: DO_ADMIN_PASSWORD,
                host: DO_ADMIN_HOST,
                port: DO_ADMIN_PORT,
                database: DO_ADMIN_DB,
                ssl: true,
            });

            try {
                console.log('[ glascad ] Connecting to db');
                await DB.connect();
                console.log('[ glascad ] Successfully connected to db');
            } catch (err) {
                console.error('[ glascad ] Error connecting to db:');
                console.error(err);
            }

            try {
                console.log('[ glascad ] Seeding db');
                await DB.query(DB_SEED);
                console.log('[ glascad ] Successfully seeded db');
            } catch (err) {
                console.error('[ glascad ] Error seeding db:');
                console.error(err);
            }
        } else {
            console.log('[ glascad ] Not seeding db');
        }

        console.log('[ glascad ] done');
    }
}


seedDatabase().then(() => {

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

    APP.listen(SERVER_PORT, () => console.log(`[ glascad ] listening on port ${SERVER_PORT}`));

});
