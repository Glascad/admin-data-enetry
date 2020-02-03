(async () => {
    const fs = require(`${__dirname}/promise-fs`);
    const fsToJSON = require(`${__dirname}/files-to-json`);
    const db = await fsToJSON(`${__dirname}/../db`);

    console.log('database seed');
    console.log(db);

    const keys = obj => typeof obj === 'object' ?
        Object.entries(obj)
            .reduce((acc, [key, value]) => ({
                ...acc,
                [
                    key
                        .replace(/\.sql/, '')
                ]: keys(value),
            }), {})
        :
        typeof obj === 'string' ?
            obj
                .replace(/--[^\n]*/g, '')
                .split(';')
                .map(str => str.match(/CREATE /) && !str.match(/CREATE (SCHEMA)|(ROLE)|(EXTENSION)/) ? (
                    str
                        .replace(
                            /(((CREATE TABLE( IF NOT EXISTS){0,1})|(CREATE TYPE)|(CREATE (OR REPLACE ){0,1}FUNCTION))+\s+([\w.]*)(.|\s)*?)/g,
                            ' $8 '
                        )
                        .replace(/\s+/g, ' ')
                        .replace(/^\s*(\S+)\s+(.|\s)*?$/, '$1')
                ) : '')
                .filter(Boolean)
            :
            null;

    const __NOTE__ = "This file was automatically generated in `/server/map-schemas.js`";

    const dbTree = {
        __NOTE__,
        ...keys(db),
    };

    console.log(dbTree);

    await fs.writeFile(`${__dirname}/../compiled/db-schemas.json`, JSON.stringify(dbTree, null, 4));

    return dbTree;
})();