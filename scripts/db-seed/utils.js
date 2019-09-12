const chalk = require('chalk');
require('dotenv').config();


// Compile Utils

const removeComments = obj => typeof obj === 'object' ?
    Object.entries(obj).reduce((all, [key, value]) => ({
        ...all,
        [key]: removeComments(value)
    }), {})
    :
    typeof obj === 'string'
        ?
        obj.replace(/--.*\n/g, '\n')
        :
        obj;


const removeExt = obj => typeof obj === 'object' ?
    Object.entries(obj).reduce((all, [key, value]) => ({
        ...all,
        [key.replace(/\.sql/, '')]: removeExt(value),
    }), {})
    :
    obj;

const cleanKeys = obj => typeof obj === 'object' ?
    Object.entries(obj).reduce((all, [key, value]) => ({
        ...all,
        [key.replace(/\W+/, '_').toUpperCase()]: cleanKeys(value)
    }), {})
    :
    obj;

const getKeys = obj => typeof obj === 'object' ?
    Object.entries(obj).reduce((all, [key, value]) => ({
        ...all,
        [key]: getKeys(value)
    }), {})
    :
    "";

// Write Utils

const insertEnvVars = (path, contents) => contents.replace(/<<(.*?)>>/g, (match, ENV_VAR) => {
    const value = process.env[ENV_VAR];
    if (!value) throw new Error(`Variable ${ENV_VAR} not found in \`.env\``);
    else {
        console.log(`Inserting environment variable ${chalk.green(ENV_VAR)} in file ${chalk.cyan(path)}`);
        return value;
    }
});

const getDbContents = path => {
    const DB = require('../../compiled/db-seed.js');

    const contents = path
        .replace('../../db/schemas/', '')
        .replace(/-/, '_')
        .replace(/\.sql/, '')
        .split(/\//)
        .reduce((obj, filename) => obj[filename.toUpperCase()], DB);

    if (contents === undefined) throw new Error(`Invalid file reference: ${path}`);
    if (typeof contents === 'object') throw new Error(`Cannot reference directory: ${path}. Nested files include: ${Object.keys(contents).join(', ')}`)
    if (!contents || contents.match(/^\s*$/)) throw new Error(`File empty: ${path}`);
    if (contents.split(/\n/).every(line => line.match(/^\s*(--.*)?$/))) console.warn(`${chalk.yellow`File commented out:`} ${chalk.yellowBright(path)}`);

    return insertEnvVars(path, contents);
}

const requiredPaths = [];

// const limit = Infinity
// var finished = false;

const _require = path => {
    // if (finished) return '';
    if (requiredPaths.includes(path)) throw new Error(`Duplicate path required: ${path}`);
    else {
        // if (requiredPaths.length === limit) {
        //     finished = true;
        //     console.log(`Last path: ${path}`);
        // }
        requiredPaths.push(path);
        return path.match(/\/|\./) ?
            path.startsWith('../../db/schemas/') ?
                getDbContents(path)
                :
                require(`${__dirname}/${path}`)
            :
            require(path);
    }
}

const removeEmptyLines = sql => sql.replace(/(\n\s*\n)/g, '\n');

const DEFAULT_USERS = [
    process.env.USER_ONE,
    process.env.USER_TWO,
    process.env.USER_THREE,
    process.env.USER_FOUR,
    process.env.USER_FIVE,
    process.env.USER_SIX,
].filter(Boolean);

module.exports = {
    removeComments,
    removeExt,
    cleanKeys,
    getKeys,
    _require,
    removeEmptyLines,
    DEFAULT_USERS,
};
