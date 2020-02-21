const log = require('../../utils/log');

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

module.exports = {
    entireOnly,
    ONLY,
};
