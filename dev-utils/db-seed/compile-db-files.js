const pfs = require('../promise-fs');
const filesToJSON = require('../files-to-json');

module.exports = async function compileDbFiles() {
    
    const filesWithComments = await filesToJSON(`${__dirname}/../../db/schemas`);

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

    const files = removeComments(filesWithComments);

    // console.log({ __dirname });

    const json = JSON.stringify(files, null, 4);

    await pfs.writeFile(`${__dirname}/../../compiled/db-seed.json`, json);

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

    const cleanFiles = cleanKeys(removeExt(files));

    const js = JSON.stringify(cleanFiles, null, 4).replace(/"([A-Z_]+)":/g, '$1:');

    await pfs.writeFile(`${__dirname}/../../compiled/db-seed.js`, `module.exports = ${js}`);

    const getKeys = obj => typeof obj === 'object' ?
        Object.entries(obj).reduce((all, [key, value]) => ({
            ...all,
            [key]: getKeys(value)
        }), {})
        :
        "";

    await pfs.writeFile(`${__dirname}/../../compiled/db-seed-map.json`, JSON.stringify(getKeys(cleanFiles), null, 4));

};
