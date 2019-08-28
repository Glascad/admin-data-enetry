(async () => {
    const fs = require(`${__dirname}/promise-fs`);
    const fsToJSON = require(`${__dirname}/files-to-json`);
    const src = await fsToJSON(`${__dirname}/../src`);

    const keys = obj => typeof obj === 'object' ?
        Object.entries(obj).reduce((acc, [key, value]) => {
            const filename = key.replace(/\..*/, '');
            const prevcontents = acc[filename];
            const filecontents = typeof value === 'string' ?
                `${prevcontents ? `${prevcontents}, ` : ''}${key.replace(/.*?\./, '')}`
                :
                value;
            return {
                ...acc,
                [filename]: keys(filecontents),
            };
        }, {})
        :
        typeof obj === 'string' ?
            obj
            :
            '';

    const __NOTE__ = "This file was automatically generated in `/dev-utils/map-src-files.js`";

    const srcTree = {
        __NOTE__,
        ...keys(src),
    };

    console.log(srcTree);

    await fs.writeFile(`${__dirname}/../compiled/src-files.json`, JSON.stringify(srcTree, null, 4));

    return srcTree;
})();