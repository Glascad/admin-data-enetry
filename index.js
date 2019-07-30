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

const APP = express();

APP.listen(SERVER_PORT, () => {
    console.log(`glascad on port ${SERVER_PORT}`);

    if (NODE_ENV === 'development') (async () => {

        console.log('Re-seeding database');
    
        const DB_SEED = await compileSeed();
    
        const DB = new Client({
            user: 'doadmin', // DO NOT CHANGE
            password: DO_ADMIN_PASSWORD,
            host: DO_ADMIN_HOST,
            port: DO_ADMIN_PORT,
            database: DO_ADMIN_DB,
            ssl: true,
        });
    
        try {
            await DB.connect();
            console.log('Successfully connected to db');
        } catch (err) {
            console.error('Error connecting to db:');
            console.error(err);
        }
        
        try {
            // await DB.query(`DO $$ BEGIN RAISE EXCEPTION 'Current user is: %', (SELECT current_user); END; $$`);
            await DB.query(DB_SEED);
            console.log('Successfully seeded db');
        } catch (err) {
            console.error('Error seeding db:');
            console.error(err);
        }
    })();

    APP.use(cors());

    APP.use(express.static(`${__dirname}/build/`));

    APP.use(postgraphile(
        DO_GC_CONNECTION_STRING,
        [
            'gc_public',
            'gc_data',
            'gc_utils',
            'gc_protected',
            'gc_controlled',
            'gc_private',
        ],
        {
            graphiql: true,
            jwtPgTypeIdentifier: "gc_public.jwt",
            jwtSecret: JWT_SECRET,
            pgDefaultRole: 'glascad',
        },
    ));

    APP.get('*', (_, res) => res.status(200).sendFile(`${__dirname}/build/`));
});
