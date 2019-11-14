const parts = require('./parts.json');

module.exports = `${
    [1, 2].map(manufacturerId => `${
        parts.map(({ partNumber, paths }) => `INSERT INTO parts (manufacturer_id, part_number, paths) VALUES (${
            manufacturerId
            }, '${
            partNumber
            }', ARRAY[${
            paths.map(({ commands }) => `ROW(ARRAY[${
                commands.map(({ command, arguments: args }) => `('${
                    command
                    }', ${
                    args ?
                        `ARRAY[${
                        args.join(',')
                        }]`
                        :
                        'NULL'
                    })`).join(',')
                }]::SVG_PATH_COMMAND[])`).join(',')
            }]::SVG_PATH[])`).join(';\n')
        }`).join(';\n')
    };\n`;
