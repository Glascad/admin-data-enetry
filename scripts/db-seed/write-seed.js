const chalk = require('chalk');
const compileDbFiles = require('./compile-db-files');
const generateSeedFile = require('./generate-seed-file');
const pfs = require('../../server/utils/promise-fs');

module.exports = async function writeSeed() {
    try {
        console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]${chalk.cyan(`[compiling]`)}`)}`)} Compiling database seed`);
        console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]${chalk.cyan(`[compiling]`)}`)}`)} Reading database files from ${chalk.blue('db/')}`);

        await compileDbFiles();

        console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]${chalk.cyan(`[compiling]`)}`)}`)} Successfully read files from ${chalk.blue('db/')}`);

        const SEED_FILE = generateSeedFile();

        await pfs.writeFile(`${__dirname}/../../compiled/db-seed.sql`, SEED_FILE);

        console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]${chalk.cyan(`[compiling]`)}`)}`)} Successfully wrote database seed to ${chalk.blue('compiled/db-seed.sql')}`);

        return SEED_FILE;

    } catch (err) {
        console.error(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]${chalk.cyan(`[compiling]`)}`)}`)} ${chalk.redBright(`Error seeding db`)}`);
        console.error(err);
        throw err;
    }
}
