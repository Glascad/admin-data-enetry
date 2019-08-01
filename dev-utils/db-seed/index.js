
const readFiles = require(`${__dirname}/read-files`);
const writeSeed = require(`${__dirname}/write-seed`);

module.exports = async () => {
    try {
        console.log("[ glascad:dbseed ] Compiling database seed");
        console.log("[ glascad:dbseed ] Reading database files from ./db/schemas");

        await readFiles();

        console.log("[ glascad:dbseed ] Successfully read files from ./db/schemas");

        const SEED_FILE = await writeSeed();

        console.log("[ glascad:dbseed ] Successfully wrote datbase seed to ./compiled/db-seed.sql");

        return SEED_FILE;

    } catch (err) {
        console.error("[ glascad:dbseed ] Error seedgin db");
        console.error(err);
    }
}
