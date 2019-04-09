const fs = require('fs');

/**
 * This file simply converts `fs` methods into Promise-based functions, to allow much simpler use than the callback-based originals
 */

function readdir(dir) {
    return new Promise((resolve, reject) => (
        fs.readdir(dir, (err, files) => err ?
            reject(err)
            :
            resolve(files)
        )
    ));
}

function readFile(file) {
    return new Promise((resolve, reject) => (
        fs.readFile(file, (err, contents) => err ?
            reject(err)
            :
            resolve(contents)
        )
    ));
}

async function readdirContents(dir) {
    const filenames = await readdir(dir);
    return Promise.all(filenames.map(readFile));
}

function writeFile(path, contents) {
    return new Promise((resolve, reject) => (
        fs.writeFile(path, contents, err => err ?
            reject(err)
            :
            resolve({ path, contents })
        )
    ));
}

function removeFile(path) {
    return new Promise((resolve, reject) => (
        fs.unlink(path, err => err ?
            reject(err)
            :
            resolve(path)

        )
    ));
}

Object.assign(module.exports, {
    readdir,
    readFile,
    readdirContents,
    writeFile,
    removeFile
});
