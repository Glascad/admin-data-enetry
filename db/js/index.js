require('dotenv').config();
const { Client } = require('pg');
const generateSeed = require('./seed/generate-seed');

const {
    env: {
        POSTGRES_USER,
        POSTGRES_DB,
        POSTGRES_PASSWORD,
    },
} = process;

console.log("GENERATING SEED");

const client = new Client({
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    host: 'localhost',
    port: 5432,
});

client.connect().then(() => {
    generateSeed(script => client.query(script)
        .then(() => console.log('success'))
        .catch(err => console.log(err))
    )
        .then(() => console.log('finished'))
        .catch(err => console.log(err));
});
