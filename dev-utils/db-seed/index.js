const chalk = require('chalk');
const readFiles = require(`${__dirname}/read-files`);
const writeSeed = require(`${__dirname}/write-seed`);

module.exports = async () => {
    try {
        console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]${chalk.cyan(`[compiling]`)}`)}`)} Compiling database seed`);
        console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]${chalk.cyan(`[compiling]`)}`)}`)} Reading database files from ./db/schemas`);

        await readFiles();

        console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]${chalk.cyan(`[compiling]`)}`)}`)} Successfully read files from ./db/schemas`);

        const SEED_FILE = await writeSeed();

        console.log(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]${chalk.cyan(`[compiling]`)}`)}`)} Successfully wrote database seed to ./compiled/db-seed.sql`);

        return SEED_FILE;

    } catch (err) {
        console.error(chalk`${chalk.blueBright(`[glascad]${chalk.greenBright(`[dbseed]${chalk.cyan(`[compiling]`)}`)}`)} ${chalk.redBright(`Error seeding db`)}`);
        console.error(err);
        throw err;
    }
}
