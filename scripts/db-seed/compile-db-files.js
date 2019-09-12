const pfs = require('../../server/utils/promise-fs');
const filesToJSON = require('../../server/utils/files-to-json');
const { removeComments, cleanKeys, removeExt, getKeys } = require('./utils');

module.exports = async function compileDbFiles() {

    const filesWithComments = await filesToJSON(`${__dirname}/../../db/schemas`);

    const files = removeComments(filesWithComments);

    const json = JSON.stringify(files, null, 4);

    const cleanFiles = cleanKeys(removeExt(files));

    const js = JSON.stringify(cleanFiles, null, 4).replace(/"([A-Z_]+)":/g, '$1:');

    await pfs.writeFile(`${__dirname}/../../compiled/db-seed.json`, json);

    await pfs.writeFile(`${__dirname}/../../compiled/db-seed.js`, `module.exports = ${js}`);

    await pfs.writeFile(`${__dirname}/../../compiled/db-seed-map.json`, JSON.stringify(getKeys(cleanFiles), null, 4));

};
