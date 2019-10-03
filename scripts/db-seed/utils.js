const chalk = require('chalk');
require('dotenv').config();

const highlightEndOfPath = path => path.replace(/(^.*\/)([^/]+)(\.sql$)/, `$1${chalk.inverse('$2')}$3`);

const shortenPath = path => path.replace('../../', '');

const linkPath = shortenPath; // path => path.replace('../..', `file://${__dirname.replace(/scripts\/.*/, '')}`);

const logPath = path => chalk.blue(shortenPath(path));

const logWarningPath = path => chalk.yellow(linkPath(highlightEndOfPath(path)));

const logErrorPath = path => chalk.red(linkPath(highlightEndOfPath(path)));


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

const duplicateSQL = (path, contents) => {

    const loopMatches = contents.match(loopStart);
    const endLoopMatches = contents.match(loopEnd);
    const loopCount = (loopMatches || []).length;
    const endLoopCount = (endLoopMatches || []).length;

    if (loopCount !== endLoopCount) throw new Error(`Unequal number of '<<LOOP ... >>'s and '<<END LOOP>'s in ${logErrorPath(path)}`);

    return contents.replace(
        /\s*<<\s*LOOP\s*((\S+\s*\(\s*\S+(,\s*\S+)*\s*\)\s*)+)>>([\s\S]*?)(<<\s*END\s*LOOP\s*>>)/ig,
        (match, variables, lastVar, lastVal, contents, ...rest) => {

            const vars = variables.split(/\s*\)\s*/g).filter(Boolean).reduce((vars, varSet, i) => {

                const [varname, ...values] = varSet.trim().split(/[(,\s]+/g);

                if (vars.length && vars.length !== values.length) throw new Error(`<<LOOP>> variable ${chalk.redBright(varname)} must have same number of values as previous variables in ${logPath(path)}`);

                return values.map((val, i) => ({
                    ...vars[i],
                    [varname]: val,
                }));

            }, []);

            console.log(chalk.gray(` -- Looping through variable${
                Object.keys(vars[0]).length > 1 ? 's' : ''
                } ${
                Object.keys(vars[0]).map(varname => `${
                    chalk.white(varname)
                    // } (${
                    // vars.map(v => `${
                    //     chalk.gray(v[varname])
                    //     }`).join(', ')
                    // )
                    }`).join(', ')
                } in ${
                logPath(path)
                }`));

            return vars.reduce((generated, varObj) => `${
                generated
                }\n${
                Object.entries(varObj).reduce((generated, [key, value]) => (
                    generated.replace(new RegExp(`<<${key}>>`, 'g'), value)
                ), contents.replace(
                    /<<\s*ONLY\s*(\S+)\s*(\(\S+(,\s*\S+)*\))\s*>>([\s\S]*?)<<\s*END\s*ONLY\s*>>/ig,
                    (match, onlyVar, onlyVals, lastOnlyVal, onlyContents, ...args) => {

                        if (!(onlyVar in varObj)) throw new Error(`Invalid <<ONLY>> variable ${chalk.redBright(onlyVar)}, must be one of: ${Object.keys(varObj).map(v => `${chalk.gray(v)}`).join(', ')} in ${logErrorPath(path)}`);

                        const validValues = vars.map(v => v[onlyVar]);

                        const onlyValues = onlyVals.replace(/(^\s*\(\s*)|(\s*\)\s*$)/ig, '').split(/[,\s]+/g);

                        onlyValues.forEach(v => {
                            if (!validValues.includes(v)) throw new Error(`Invalid <<ONLY>> value ${chalk.redBright(v)}, must be one of: ${validValues.map(v => `${chalk.gray(v)}`).join(', ')} in ${logErrorPath(path)}`);
                        });

                        return onlyValues.includes(varObj[onlyVar]) ?
                            onlyContents
                            :
                            '';
                    }
                ))
                }`, '');
        }
    );
}

const insertEnvVars = (path, contents) => contents.replace(/<<(.*?)>>/g, (match, ENV_VAR) => {
    const value = process.env[ENV_VAR];
    if (!value) throw new Error(`Variable ${ENV_VAR} not found in \`.env\``);
    else {
        console.log(chalk.gray(` -- Inserting environment variable ${chalk.white(ENV_VAR)} in ${logPath(path)}`));
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

    if (contents === undefined) throw new Error(`Invalid file reference: ${logErrorPath(path)}`);
    if (typeof contents === 'object') throw new Error(`Cannot reference directory: ${logErrorPath(path)}. Nested files include: ${Object.keys(contents).join(', ')}`)
    if (typeof contents !== 'string') throw new Error(`File empty: ${logErrorPath(path)}`);
    if (
        contents.match(/^\s*$/)
        ||
        contents.split(/\n/).every(line => line.match(/^\s*(--.*)?$/))
    ) setTimeout(() => console.warn(`${chalk.yellowBright`Warning:`} File commented out: ${logWarningPath(path)}`));

    return contents;
}

const requiredPaths = [];

const sqlPipe = [
    removeComments,
    duplicateSQL,
    insertEnvVars,
];

const _require = path => {
    if (requiredPaths.includes(path)) throw new Error(`Duplicate path required: ${logErrorPath(path)}`);
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
