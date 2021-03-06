const pfs = require('../../utils/promise-fs');
const filesToJSON = require('../../utils/files-to-json');
const { cleanKeys, removeExt, getKeys } = require('./utils');

module.exports = async function compileDbFiles() {

    const files = await filesToJSON(`${__dirname}/../../../db`);

    const json = JSON.stringify(files, null, 4);

    const cleanFiles = cleanKeys(removeExt(files));

    const js = JSON.stringify(cleanFiles, null, 4).replace(/"([A-Z_]+)":/g, '$1:');

    return Promise.all([
        pfs.writeFile(`${__dirname}/../../../compiled/db-seed.json`, json),
        pfs.writeFile(`${__dirname}/../../../compiled/db-seed.js`, `module.exports = ${js}`),
        pfs.writeFile(`${__dirname}/../../../compiled/db-seed-map.json`, JSON.stringify(getKeys(cleanFiles), null, 4)),
    ]);
};
