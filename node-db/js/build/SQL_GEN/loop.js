const log = require('../../fs/log');
const { ONLY } = require('./only');

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

module.exports = {
    LOOP,
    partialLoop,
    loopStart,
    loopEnd,
};
