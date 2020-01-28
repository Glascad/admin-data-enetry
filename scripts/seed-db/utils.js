const log = require('./log');

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
    if (PROTECTION <= 0) throw new Error(`<<ONLY>> depth exceeded maximum limit of 20 in ${log.errorPath(path)}`);
    else return contents.replace(
        entireOnly,
        (match, before, onlyVar, onlyVals, lastOnlyVal, onlyContents, after, offset, entireString) => {

            if (!(onlyVar in varObj)) throw new Error(`Invalid <<ONLY>> variable ${log.error(onlyVar)}, must be one of: ${Object.keys(varObj).map(v => `${log.variable(v)}`).join(', ')} in ${log.errorPath(path)}`);

            const validValues = vars.map(v => v[onlyVar]);

            const onlyValues = onlyVals.replace(/(^\s*\(\s*)|(\s*\)\s*$)/ig, '').split(/[,\s]+/g);

            onlyValues.forEach(v => {
                if (!validValues.includes(v)) throw new Error(`Invalid <<ONLY>> value ${log.error(v)}, must be one of: ${validValues.map(v => `${log.variable(v)}`).join(', ')} in ${log.errorPath(path)}`);
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
    if (PROTECTION <= 0) throw new Error(`<<LOOP>> depth exceeded maximum limit of 20 in ${log.errorPath(path)}`);
    else return contents.replace(
        entireLoop,
        (match, before, variable, lastVar, lastVal, contents, after, offset, entireString) => {

            const vars = variable.split(/\s*\)\s*/g)
                .filter(Boolean)
                .reduce((varls, varSet, i) => {

                    const [varname, ...values] = varSet.trim().split(/[(,\s]+/g);

                    if (varls.length && varls.length !== values.length) throw new Error(`<<LOOP>> variable ${log.error(varname)} must have same number of values as previous variable in ${log.path(path)}`);

                    return values.map((val, i) => ({
                        ...varls[i],
                        [varname]: val,
                    }));

                }, []);

            // console.log(log.variable(` -- Looping through variable${
            //     Object.keys(vars[0]).length > 1 ? 's' : ''
            //     } ${
            //     Object.keys(vars[0]).map(varname => `${
            //         log.variable(varname)
            //         // } (${
            //         // vars.map(v => `${
            //         //     log.variable(v[varname])
            //         //     }`).join(', ')
            //         // )
            //         }`).join(', ')
            //     } in ${
            //     log.path(path)
            //     }`));

            // working from the inside out
            return LOOP(path, `${
                before
                }${
                vars.reduce(
                    // loop through each set of variable
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
                    log.shortPath(path)
                    }`,
                )
                }${
                after
                }\n-- END LOOP in file ${
                log.shortPath(path)
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

    if (loopAttemptCount !== loopCount) throw new Error(`Invalid <<LOOP ... >> attempt in ${log.errorPath(path)}`);
    if (loopCount !== endLoopCount) throw new Error(`Unequal number of '<<LOOP ... >>'s and '<<END LOOP>'s in ${log.errorPath(path)}`);

    return LOOP(path, contents)
}

const insertEnvVars = (path, contents) => contents.replace(/<<\s*(\w*)\s*>>/g, (match, ENV_VAR) => {
    const value = process.env[ENV_VAR];
    if (!value) throw new Error(`Variable ${log.variable(ENV_VAR)} in ${log.errorPath(path)} not found in ${log.errorPath('.env')}`);
    else {
        // console.log(log.variable(` -- Inserting environment variable ${log.variable(ENV_VAR)} in ${log.path(path)}`));
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

    if (contents === undefined) throw new Error(`Invalid file reference: ${log.errorPath(path)}`);
    if (typeof contents === 'object') throw new Error(`Cannot reference directory: ${log.errorPath(path)}. Nested files include: ${Object.keys(contents).join(', ')}`)
    if (typeof contents !== 'string') throw new Error(`File empty: ${log.errorPath(path)}`);
    if (
        contents.match(/^\s*$/)
        ||
        contents.split(/\n/).every(line => line.match(/^\s*(--.*)?$/))
    ) setTimeout(() => console.warn(`${log.warning("Warning:")} File commented out: ${log.warningPath(path)}`));

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
    if (requiredPaths.includes(path)) throw new Error(`Duplicate path required: ${log.errorPath(path)}`);
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
