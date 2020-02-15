const { Client } = require('pg');
const log = require('./log');
const compileSeedFile = require('./compile-seed-file');

const {
    env: {
        NODE_ENV,
        DO_ADMIN_USERNAME,
        DO_ADMIN_PASSWORD,
        DO_ADMIN_HOST,
        DO_ADMIN_PORT,
        DO_ADMIN_DB,
        RESEED,
    },
} = process;

module.exports = async function seedDatabase(done) {

    if (NODE_ENV === 'development') {

        if (RESEED === 'true') {
            console.log(`${log.dbseed} Reseeding database`);

            const DB_SEED = await compileSeedFile();

            if (DB_SEED && RESEED === 'true') {
                const DB = new Client({
                    user: 'doadmin', // DO NOT CHANGE
                    password: DO_ADMIN_PASSWORD,
                    host: DO_ADMIN_HOST,
                    port: DO_ADMIN_PORT,
                    database: DO_ADMIN_DB,
                    ssl: true,
                });

                try {
                    console.log(`${log.seeding} Connecting to db`);

                    await DB.connect();

                    console.log(`${log.seeding} Successfully connected to db`);
                } catch (err) {
                    console.error(`${log.seeding} ${log.error('Error connecting to db:')}`);
                    console.error(err);
                }

                try {
                    console.log(`${log.seeding} Seeding db`);

                    await DB.query(DB_SEED);

                    console.log(`${log.seeding} Successfully seeded db`);
                } catch (err) {
                    if (err.message && err.message.match(/success!/i)) {
                        console.log(`${log.seeding} ${log.success(err.message)}`);
                        console.log(`${log.seeding} Awaiting completion before seeding.`);
                    } else {
                        console.error(`${log.seeding} ${log.error('Error seeding db:')}`);
                        console.error(err);
                    }
                }

                try {
                    console.log(`${log.seeding} Disconnecting from db`);

                    await DB.end();

                    console.log(`${log.seeding} Successfully disconnected from db`);
                } catch (err) {
                    console.error(`${log.seeding} ${log.error('Error disconnecting from db:')}`);
                    console.error(err);
                }
            } else {
                console.log(`${log.dbseed} Not seeding db`);
            }

            console.log(`${log.dbseed} done`);

        } else {
            console.log(`${log.dbseed} Not compiling`);
        }
    }

    done();
}
