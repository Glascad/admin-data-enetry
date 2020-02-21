const pfs = require('../fs/promise-fs');
const { pipe, asyncPipe, asyncCompose, asyncMap, asyncTap, apply, tap } = require('../fs/pipe');
const removeComments = require('./SQL_GEN/comments');
const duplicateSQL = require('./SQL_GEN/duplicate');
const removeEmptyLines = require('./SQL_GEN/empty-lines');
const insertEnv = require('./SQL_GEN/insert-env');

const importSQL = (dirname = __dirname, run, ...paths) => asyncMap(
    paths,
    asyncCompose(
        asyncTap(path => console.log(`Importing ${path}`)),
        async path => ({
            path,
            contents: path.match(/\.sql$/i) ?
                (await pfs.readFile(`${dirname}/${path}`)).toString()
                :
                require(`${dirname}/${path}`),
        }),
        asyncTap(({ path }) => console.log(`Successfully imported ${path}, now mapping`)),
        ({ path, contents }) => asyncPipe(
            contents,
            apply(path, removeComments),
            apply(path, duplicateSQL),
            apply(path, insertEnv),
            apply(path, removeEmptyLines),
            asyncTap(() => console.log(`Successfully mapped ${path}, now running`)),
            run,
            asyncTap(() => console.log(`Successfully ran ${path}`)),
        ),
    ),
);

const createSQLImporter = (dirname, run) => apply(dirname, run, importSQL);

module.exports = createSQLImporter;
