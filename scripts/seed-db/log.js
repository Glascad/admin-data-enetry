const chalk = require('chalk');

const glascad = chalk.blueBright(`[glascad]`);
const dbseed = `${glascad}${chalk.greenBright(`[dbseed]`)}`;
const compiling = `${dbseed}${chalk.cyan(`[compiling]`)}`;
const seeding = `${dbseed}${chalk.cyanBright(`[seeding]`)}`;

const success = chalk.green;
const warning = chalk.yellowBright;
const error = chalk.redBright;
const variable = chalk.gray;

const highlightEndOfPath = path => path.replace(/(^.*\/)?([^/]+)(\.sql$)?/, `$1${chalk.inverse('$2')}$3`);

const shortPath = path => path.replace('../../', '');

const path = path => chalk.blue(shortPath(path));

const warningPath = path => chalk.yellow(shortPath(highlightEndOfPath(path)));

const errorPath = path => chalk.red(shortPath(highlightEndOfPath(path)));

module.exports = {
    glascad,
    dbseed,
    compiling,
    seeding,
    success,
    warning,
    error,
    path,
    variable,
    shortPath,
    warningPath,
    errorPath,
};
