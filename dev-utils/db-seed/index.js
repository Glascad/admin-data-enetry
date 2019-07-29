
const readFiles = require(`${__dirname}/read-files`);
const writeSeed = require(`${__dirname}/write-seed`);

module.exports = async () => {
    try {
        console.log("Compiling database seed");
        console.log("Reading database files from ./db/schemas");

        await readFiles();

        console.log("Successfully read files from ./db/schemas");

        const SEED_FILE = await writeSeed();

        console.log("Successfully wrote datbase seed to ./compiled/db-seed.sql");

        return SEED_FILE;

    } catch (err) {
        console.error(err);
    }
}
