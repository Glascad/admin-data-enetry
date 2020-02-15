const log = require('../../fs/log');

const insertEnv = (path, contents) => contents.replace(/<<\s*(\w*)\s*>>/g, (match, ENV_VAR) => {
    const value = process.env[ENV_VAR];
    return value || match;
    // if (!value) throw new Error(`Variable ${log.variable(ENV_VAR)} in ${log.errorPath(path)} not found in ${log.errorPath('.env')}`);
    // else {
    //     // console.log(log.variable(` -- Inserting environment variable ${log.variable(ENV_VAR)} in ${log.path(path)}`));
    //     return value;
    // }
});

module.exports = insertEnv;
