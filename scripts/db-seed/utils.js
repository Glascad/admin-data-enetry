const chalk = require('chalk');

const highlightEndOfPath = path => path.replace(/(^.*\/)?([^/]+)(\.sql$)?/, `$1${chalk.inverse('$2')}$3`);

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

const entireOnly = /([\s\S]*)<<\s*ONLY\s*(\S+)\s*(\(\S+(,\s*\S+)*\))\s*>>([\s\S]*?)<<\s*END\s*ONLY\s*>>([\s\S]*)/ig;

const ONLY = (path, contents, vars, varObj, PROTECTION = 20) => {
    if (PROTECTION <= 0) throw new Error(`<<ONLY>> depth exceeded maximum limit of 20 in ${logErrorPath(path)}`);
    else return contents.replace(
        entireOnly,
        (match, before, onlyVar, onlyVals, lastOnlyVal, onlyContents, after, offset, entireString) => {

            if (!(onlyVar in varObj)) throw new Error(`Invalid <<ONLY>> variable ${chalk.redBright(onlyVar)}, must be one of: ${Object.keys(varObj).map(v => `${chalk.gray(v)}`).join(', ')} in ${logErrorPath(path)}`);

            const validValues = vars.map(v => v[onlyVar]);

            const onlyValues = onlyVals.replace(/(^\s*\(\s*)|(\s*\)\s*$)/ig, '').split(/[,\s]+/g);

            onlyValues.forEach(v => {
                if (!validValues.includes(v)) throw new Error(`Invalid <<ONLY>> value ${chalk.redBright(v)}, must be one of: ${validValues.map(v => `${chalk.gray(v)}`).join(', ')} in ${logErrorPath(path)}`);
            });

            // working from the inside out
            return ONLY(path, `${
                before
                }${
                onlyValues.includes(varObj[onlyVar]) ?
                    onlyContents
                    :
                    ''
                }${
                after
                }`, vars, varObj, PROTECTION - 1);
        }
    );
}

const partialLoop = /<<\s*LOOP/ig;
const loopStart = /<<\s*LOOP\s*((\S+\s*\(\s*\S+(,\s*\S+)*\s*\)\s*)+)>>/ig;
const loopEnd = /<<\s*END\s*LOOP\s*>>/ig;
const entireLoop = /([\s\S]*)\s*<<\s*LOOP\s*((\S+\s*\(\s*\S+(,\s*\S+)*\s*\)\s*)+)>>([\s\S]*?)<<\s*END\s*LOOP\s*>>([\s\S]*)/ig;

const LOOP = (path, contents, PROTECTION = 20) => {
    if (PROTECTION <= 0) throw new Error(`<<LOOP>> depth exceeded maximum limit of 20 in ${logErrorPath(path)}`);
    else return contents.replace(
        entireLoop,
        (match, before, variables, lastVar, lastVal, contents, after, offset, entireString) => {

            const vars = variables.split(/\s*\)\s*/g)
                .filter(Boolean)
                .reduce((varls, varSet, i) => {

                    const [varname, ...values] = varSet.trim().split(/[(,\s]+/g);

                    if (varls.length && varls.length !== values.length) throw new Error(`<<LOOP>> variable ${chalk.redBright(varname)} must have same number of values as previous variables in ${logPath(path)}`);

                    return values.map((val, i) => ({
                        ...varls[i],
                        [varname]: val,
                    }));

                }, []);

            // console.log(chalk.gray(` -- Looping through variable${
            //     Object.keys(vars[0]).length > 1 ? 's' : ''
            //     } ${
            //     Object.keys(vars[0]).map(varname => `${
            //         chalk.white(varname)
            //         // } (${
            //         // vars.map(v => `${
            //         //     chalk.gray(v[varname])
            //         //     }`).join(', ')
            //         // )
            //         }`).join(', ')
            //     } in ${
            //     logPath(path)
            //     }`));

            // working from the inside out
            return LOOP(path, `${
                before
                }${
                vars.reduce(
                    // loop through each set of variables
                    (generated, varObj) => `${
                        // accumulate generated sql
                        generated
                        }\n${
                        // for each key value pair of each variable set
                        Object.entries(varObj)
                            .reduce(
                                // replace the variable with its value
                                (generated, [key, value]) => generated.replace(new RegExp(`<<\s*${key}\s*>>`, 'g'), value),
                                // after removing all non-applicable items
                                ONLY(path, contents, vars, varObj)
                            )
                        }`,
                    `\n-- LOOP in file ${
                    shortenPath(path)
                    }`,
                )
                }${
                after
                }\n-- END LOOP in file ${
                shortenPath(path)
                }`, PROTECTION - 1);
        }
    );
}

const duplicateSQL = (path, contents) => {

    const loopAttempts = contents.match(partialLoop);
    const loopMatches = contents.match(loopStart);
    const endLoopMatches = contents.match(loopEnd);
    const loopAttemptCount = (loopAttempts || []).length;
    const loopCount = (loopMatches || []).length;
    const endLoopCount = (endLoopMatches || []).length;

    if (loopAttemptCount !== loopCount) throw new Error(`Invalid <<LOOP ... >> attempt in ${logErrorPath(path)}`);
    if (loopCount !== endLoopCount) throw new Error(`Unequal number of '<<LOOP ... >>'s and '<<END LOOP>'s in ${logErrorPath(path)}`);

    return LOOP(path, contents)
}

const insertEnvVars = (path, contents) => contents.replace(/<<\s*(\w*)\s*>>/g, (match, ENV_VAR) => {
    const value = process.env[ENV_VAR];
    if (!value) throw new Error(`Variable ${chalk.gray(ENV_VAR)} in ${logErrorPath(path)} not found in ${logErrorPath('.env')}`);
    else {
        // console.log(chalk.gray(` -- Inserting environment variable ${chalk.white(ENV_VAR)} in ${logPath(path)}`));
        return value;
    }
});

const removeComments = (path, contents) => contents.replace(/--.*\n/g, '\n');

const removeEmptyLines = (path, contents) => contents.replace(/(\n\s*\n)/g, '\n');

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
    removeEmptyLines,
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

module.exports = {
    removeComments,
    removeExt,
    cleanKeys,
    getKeys,
    _require,
    duplicateSQL,
};
