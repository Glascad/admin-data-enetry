require('dotenv').config();

const seedDatabase = require('./scripts/db-seed');
const startServer = require('./server');

seedDatabase(startServer);
