const pfs = require('./promise-fs');


async function readFile(path, done) {
    try {
        const results = await pfs.readFile(path);
        return done(null, results.toString());
    }
    catch (err) {
        return done(err);
    }
}


async function deleteFile(path, done) {
    try {
        const results = await pfs.removeFile(path);
        return done(null, results.toString());
    }
    catch (err) {
        return done(err);
    }
}


async function readDirectory(dir, done) {
    try {
        const results = await pfs.readdir(dir);
        return done(null, results);
    }
    catch (err) {
        try {
            const results = await readFile(dir, done);
            return done(null, results)
        }
        catch (err) {
            return done(err);
        }
    }
}


async function readContents(path, done) {
    return await readDirectory(path, (err, contents) => {
        if (err) console.error(`Error reading directory '${path}': `, err);
        else if (Array.isArray(contents)) {
            return Promise.all(contents.map(file => readContents(`${path}/${file}`, done)));
        }
        else if (contents) {
            return done(null, {
                path,
                contents
            });
        }
    });
}


async function fsToJSON(dir) {

    const json = {};

    await readContents(dir, (err, { path, contents }) => {
        if (err) console.error(`Error reading contents of file '${path}': ${err}`);
        let current = json;
        path.replace(dir, '').split('/').forEach((key, i, arr) => {
            if (key) {
                if (i === arr.length - 1) current[key] = contents;
                else {
                    if (!current[key]) current[key] = {};
                    current = current[key];
                }
            }
        });
    });

    return json;
}


async function deleteFilesWithExt(ext, dir) {
    console.log('deleting files in ' + dir);
    const deletedFiles = {};
    let filenames = await readContents(dir, (err, { path, contents }) => {
        if (err) console.error(err);
        else {
            console.log('deleting file:');
            console.log(path);
            deleteFile(path, (err, contents) => {
                console.log('deleted file ' + path);
            });
        }
    });
}


module.exports = fsToJSON;

Object.assign(module.exports, {
    deleteFilesWithExt,
});
