const { Client } = require('pg');
const chalk = require('chalk');
const compileSeed = require('./write-seed');

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
            console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]`)}`)} Re-seeding database`);

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

        } else {
            console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]`)}`)} Not compiling`);
        }
    }

    done();
}