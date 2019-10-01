const chalk = require('chalk');
require('dotenv').config();


// Compile Utils


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
        [key.replace(/-/, '_').toUpperCase()]: cleanKeys(value)
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

const loopStart = /<<\s*LOOP\s*((\S+\s*\(\s*\S+(,\s*\S+)*\s*\)\s*)+)>>/ig;
const loopEnd = /<<\s*END\s*LOOP\s*>>/ig;

const loopCountEqualsEndLoopCount = (path, contents) => {
    const loopMatches = contents.match(loopStart);
    const endLoopMatches = contents.match(loopEnd);
    const loopCount = (loopMatches || []).length;
    const endLoopCount = (endLoopMatches || []).length;
    if (endLoopCount > loopCount) {
        console.log(chalk.blueBright(contents));
        console.error({
            loopMatches,
            endLoopMatches,
            loopCount,
            endLoopCount,
        })
        throw new Error(`More '<<END LOOP>>'s than '<<LOOP (...)>>'s in file ${chalk.red(path.replace('../../', ''))}`);
    }
    if (loopCount - endLoopCount > 1) throw new Error(`Must END LOOP before starting new LOOP in file ${chalk.red(path.replace('../../', ''))}`);
    return loopCount === endLoopCount;
}

const duplicateSQL = (path, contents) => `${contents}${loopCountEqualsEndLoopCount(path, contents) ? '' : '\n<<END LOOP>>'}`.replace(
    /\s*<<\s*LOOP\s*((\S+\s*\(\s*\S+(,\s*\S+)*\s*\)\s*)+)>>([\s\S]*?)(<<\s*END\s*LOOP\s*>>)/ig,
    (match, variables, lastVar, lastVal, contents, ...rest) => {
        const vars = variables.split(/\s*\)\s*/g).filter(Boolean).reduce((vars, varSet, i) => {
            const [varname, ...values] = varSet.trim().split(/[(,\s]+/g);
            if (vars.length && vars.length !== values.length) throw new Error(`Variable ${chalk.green(varname)} must have same number of values as previous variables in file ${chalk.cyan(path.replace('../../', ''))}`);
            return values.map((val, i) => ({
                ...vars[i],
                [varname]: val,
            }));
        }, []);
        console.log(`Looping through variable${Object.keys(vars[0]).length > 1 ? 's' : ''} ${Object.keys(vars[0]).map(varname => `${chalk.green(varname)} (${vars.map(v => `${chalk.gray(v[varname])}`).join(', ')})`).join(' ')} in file ${chalk.cyan(path.replace('../../', ''))}`);
        return vars.reduce((generated, varObj) => `${
            generated
            }\n${
            Object.entries(varObj).reduce((generated, [key, value]) => (
                generated.replace(new RegExp(`<<${key}>>`, 'g'), value)
            ), contents)
            }`, '');
    }
);


const insertEnvVars = (path, contents) => contents.replace(/<<(.*?)>>/g, (match, ENV_VAR) => {
    const value = process.env[ENV_VAR];
    if (!value) throw new Error(`Variable ${ENV_VAR} not found in \`.env\``);
    else {
        console.log(`Inserting environment variable ${chalk.green(ENV_VAR)} in file ${chalk.cyan(path.replace('../../', ''))}`);
        return value;
    }
});

const removeComments = (path, contents) => contents.replace(/--.*\n/g, '\n');

const getDbContents = path => {
    const DB = require('../../compiled/db-seed.js');

    const contents = path
        .replace('../../db/', '')
        .replace(/-/, '_')
        .replace(/\.sql/, '')
        .split(/\//)
        .reduce((obj, filename) => obj[filename.toUpperCase()], DB);

    if (contents === undefined) throw new Error(`Invalid file reference: ${chalk.red(path)}`);
    if (typeof contents === 'object') throw new Error(`Cannot reference directory: ${chalk.red(path)}. Nested files include: ${Object.keys(contents).join(', ')}`)
    if (typeof contents !== 'string') throw new Error(`File empty: ${chalk.red(path)}`);
    if (
        contents.match(/^\s*$/)
        ||
        contents.split(/\n/).every(line => line.match(/^\s*(--.*)?$/))
    ) console.warn(`${chalk.yellowBright`Warning:`} File commented out: ${chalk.yellow(path.replace('../../', ''))}`);

    return contents;
}

const requiredPaths = [];

const sqlPipe = [
    removeComments,
    duplicateSQL,
    insertEnvVars,
];

const _require = path => {
    if (requiredPaths.includes(path)) throw new Error(`Duplicate path required: ${chalk.red(path)}`);
    else {
        requiredPaths.push(path);
        return path.match(/\/|\./) ?
            path.startsWith('../../db/') ?
                sqlPipe.reduce((contents, cb) => cb(path, contents), getDbContents(path))
                :
                require(`${__dirname}/${path}`)
            :
            require(path);
    }
}

const removeEmptyLines = str => str.replace(/(\n\s*\n)/g, '\n');

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
    duplicateSQL,
    DEFAULT_USERS,
};
