const pfs = require('./fs/promise-fs');
const generateSeed = require('./seed');

async function createDb() {
    const SEED = await generateSeed();

    const result = await pfs.writeFile('/db-seed/db-seed.sql', SEED);

    console.log({ result });

    console.log("UP");
}

createDb();
