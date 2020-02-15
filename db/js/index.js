const { Client } = require('pg');
const log = require('./log');
const generateSeed = require('./seed');
// const generateMigrations = require('./migrations');

async function createDb() {
    const SEED = await generateSeed();
    // const MIGRATIONS = await generateMigrations();

    const DB = new Client({
        
    });
}

createDb();
