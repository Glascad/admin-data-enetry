const _ = require('lodash');
const pfs = require('../server/utils/promise-fs');
const filesToJSON = require('./fs-to-json');
const oldParts = require('../parts.json');

const partsFolder = `.part-svgs`;

const manufacturersFolder = `manufacturers`;

const partsJSONFileName = `parts.json`;

const relativePathToPartSvgs = `${partsFolder}/${manufacturersFolder}`;

const pathToPartSvgs = `${__dirname}/${relativePathToPartSvgs}`;

const pathToPartsFolder = `${__dirname}/${partsFolder}`;

(async () => {

    console.log(`compiling all files in ${pathToPartSvgs}`);

    console.log('');
    console.log('...');
    let interval = setInterval(() => console.log('...'), 500);

    // read all manufacturer parts and convert them to JSON
    const newParts = await filesToJSON(pathToPartSvgs);

    clearInterval(interval);

    console.log('');
    console.log(`finished compiling files in ${pathToPartSvgs}`);

    console.log('');
    console.log('old files:');
    for (let mnfg in oldParts) {
        console.log(`${relativePathToPartSvgs}/${mnfg}/`);
        for (let part in newParts[mnfg]) {
            console.log(`${relativePathToPartSvgs}/${mnfg}/${part}`);
        }
    }

    console.log('');
    console.log('new files:');
    for (let mnfg in newParts) {
        console.log(`${relativePathToPartSvgs}/${mnfg}/`);
        for (let part in newParts[mnfg]) {
            console.log(`${relativePathToPartSvgs}/${mnfg}/${part}`);
        }
    }

    // merge newParts into oldParts in order to keep all parts whose SVG files have been deleted
    const allParts = _.merge(oldParts, newParts);

    // remove unnecessary whitespace from JSON
    const partsJSON = JSON.stringify(allParts).replace(/\\n|\\r/g, '').replace(/\\'/g, "'");

    try {
        // rewriete the parts.json file
        await pfs.writeFile(`${pathToPartsFolder}/${partsJSONFileName}`, partsJSON);

        try {
            // delete all SVGs from manufacturers folder
            await filesToJSON.deleteFilesWithExt('svg', pathToPartSvgs);

            console.log('');
            console.log('done');

        } catch (err) {
            console.log('');
            console.log('Error deleting files: ', err);
        }
    }
    catch (err) {
        console.log('');
        console.error('Error writing file: ', err);
    }

})();
