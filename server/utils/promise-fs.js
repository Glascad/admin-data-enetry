const fs = require('fs');

/**
 * This file simply converts `fs` methods into Promise-based functions, to allow much simpler use than the callback-based originals
 */

const readdir = dir => new Promise((resolve, reject) => fs.readdir(dir, (err, files) => err ?
    reject(err)
    :
    resolve(files)
));

const readFile = file => new Promise((resolve, reject) => fs.readFile(file, (err, contents) => err ?
    reject(err)
    :
    resolve(contents)
));

const readdirContents = async  dir => Promise.all((await readdir(dir)).map(readFile));

const writeFile = (path, contents) => new Promise((resolve, reject) => fs.writeFile(path, contents, err => err ?
    reject(err)
    :
    resolve({ path, contents })
));

const removeFile = path => new Promise((resolve, reject) => fs.unlink(path, err => err ?
    reject(err)
    :
    resolve(path)
));

Object.assign(module.exports, {
    readdir,
    readFile,
    readdirContents,
    writeFile,
    removeFile
});
