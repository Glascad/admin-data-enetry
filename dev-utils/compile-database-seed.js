const pfs = require('./promise-fs');
const filesToJSON = require('./files-to-json');

; (async () => {
    const files = await filesToJSON(`${__dirname}/../db`);

    console.log({ __dirname });

    const compileSQL = (existingContents, [fileName, contents]) => (typeof contents === 'object') ?
        Object.entries(contents).reduce(compileSQL, '')
        :
        `${existingContents}\n\n-- ${fileName}\n-- Automatically generated in /dev-utils/compile-database-seed.js \n\n${contents}`;

    Object.entries(files)
        .forEach(([fileName, contents]) => {
            const compiled = compileSQL('', [fileName, contents]);

            pfs.writeFile(`${__dirname}/../db/compiled/${fileName}.sql`, `-- ${fileName.toUpperCase()}\n\n${compiled}`)
        });
})();
