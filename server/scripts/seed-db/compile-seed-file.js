const compileDbFiles = require('./compile-db-files');
const generateSeedFile = require('./generate-seed-file');
const pfs = require('../../utils/promise-fs');
const log = require('./log');

module.exports = async function compileSeed() {
    try {
        console.log(`${log.compiling} Compiling database seed`);
        console.log(`${log.compiling} Reading database files from ${log.path('db/')}`);

        await compileDbFiles();

        console.log(`${log.compiling} Successfully read files from ${log.path('db/')}`);

        const SEED_FILE = generateSeedFile();

        const OLD_SEED = null; // (await pfs.readFile(`${__dirname}/../../compiled/db-seed.sql`)).toString();

        if (SEED_FILE === OLD_SEED) {

            console.log(`${log.compiling} No changes found`);

        } else {

            await pfs.writeFile(`${__dirname}/../../../compiled/db-seed.sql`, SEED_FILE);

            console.log(`${log.compiling} Successfully wrote database seed to ${log.path('compiled/db-seed.sql')}`);

            return SEED_FILE;
        }

    } catch (err) {
        console.error(`${log.compiling} ${log.error(`Error seeding db`)}`);
        console.error(err);
    }
}
