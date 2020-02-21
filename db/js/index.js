require('dotenv').config();
const { Client } = require('pg');
const generateSeed = require('./seed/generate-seed');
const { asyncPipe, asyncTap } = require('./utils/pipe');

const {
    env: {
        POSTGRES_USER,
        POSTGRES_DB,
        POSTGRES_PASSWORD,
    },
} = process;

console.log("GENERATING SEED");

asyncPipe(
    new Client({
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        host: 'localhost',
        port: 5432,
    }),
    asyncTap(client => client.connect()),
    client => generateSeed(script => client.query(script)),
    () => console.log('finished'),
).catch(err => console.error(err));
