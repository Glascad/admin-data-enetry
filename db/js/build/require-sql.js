const pfs = require('../fs/promise-fs');
const log = require('../fs/log');
const { pipe, asyncPipe, apply, asyncTap } = require('../fs/pipe');
const removeComments = require('./SQL_GEN/comments');
const duplicateSQL = require('./SQL_GEN/duplicate');
const removeEmptyLines = require('./SQL_GEN/empty-lines');
const insertEnv = require('./SQL_GEN/insert-env');

const createSQLImporter = (dirname = __dirname) => (...paths) => asyncPipe(
    paths.map(path => asyncPipe(
        path,
        asyncTap(path => console.log(`Requiring path: ${log.path(path)}`)),
        async path => ({
            path,
            contents: path.match(/\.sql$/i) ?
                (await pfs.readFile(`${dirname}/${path}`)).toString()
                :
                require(`${dirname}/${path}`),
        }),
        ({ path, contents }) => pipe(
            contents,
            apply(path, removeComments),
            apply(path, duplicateSQL),
            apply(path, insertEnv),
            apply(path, removeEmptyLines),
        ),
    )),
    contents => contents.join('\n'),
);

module.exports = createSQLImporter;
