const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const { postgraphile } = require('postgraphile');
const compileSeed = require('./dev-utils/db-seed');
const chalk = require('chalk');

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

        if (RESEED === 'true') console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]`)}`)} Re-seeding database`);
        else console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]`)}`)} Re-compililng database seed`);

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
                console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]${chalk.cyanBright(`[seeding]`)}`)}`)} Connecting to db`);

                await DB.connect();

                console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]${chalk.cyanBright(`[seeding]`)}`)}`)} Successfully connected to db`);
            } catch (err) {
                console.error(chalk`${chalk.blueBright(`[glascad]`)} ${chalk.redBright('Error connecting to db:')}`);
                console.error(err);
            }

            try {
                console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]${chalk.cyanBright(`[seeding]`)}`)}`)} Seeding db`);

                await DB.query(DB_SEED);

                console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]${chalk.cyanBright(`[seeding]`)}`)}`)} Successfully seeded db`);
            } catch (err) {
                console.error(chalk`${chalk.blueBright(`[glascad]`)} ${chalk.redBright('Error seeding db:')}`);
                console.error(err);
            }
            
            try {
                console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]${chalk.cyanBright(`[seeding]`)}`)}`)} Disconnecting from db`);
                await DB.end();
                console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]${chalk.cyanBright(`[seeding]`)}`)}`)} Successfully disconnected from db`);
            } catch (err) {
                console.error(chalk`${chalk.blueBright(`[glascad]`)} ${chalk.redBright('Error disconnecting from db:')}`);
                console.error(err);
            }
        } else {
            console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]`)}`)} Not seeding db`);
        }

        console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]`)}`)} done`);
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

    APP.listen(SERVER_PORT, () => console.log(chalk`${chalk.blueBright(`[glascad]`)} listening on port ${SERVER_PORT}`));

});
