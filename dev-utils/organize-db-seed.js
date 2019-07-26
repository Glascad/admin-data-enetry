// for autocomplete only
// import DB from '../db-seed';
// import pfs from './promise-fs';

(async () => {
    require('dotenv').config();

    await require(`${__dirname}/compile-db-seed`);

    const DB = require(`${__dirname}/../compiled/db-seed.js`);
    const pfs = require(`${__dirname}/promise-fs`);

    const {
        SCHEMAS,
        PRIVILEGES,
        GC_PUBLIC: {
            TABLES: PUB_TABLES,
            // TYPES: PUB_TYPES,
            TYPES: {
                INPUT_TYPES,
                OUTPUT_TYPES,
                UTIL_TYPES,
            },
            FUNCTIONS: {
                // MUTATIONS: PUB_MUTATIONS,
                MUTATIONS: {
                    AUTHENTICATE,
                    COPY_ELEVATION,
                    CREATE_A_PROJECT,
                    DELETE_ENTIRE_ELEVATION,
                    DELETE_ENTIRE_PROJECT,
                    GET_ALL_PROJECTS,
                    REPORT_BUG,
                    UPDATE_ENTIRE_ELEVATION,
                    UPDATE_ENTIRE_SYSTEM_SET,
                },
                // QUERIES: PUB_QUERIES,
                QUERIES: {
                    GET_CURRENT_USER,
                    GET_CURRENT_USER_ID,
                    SELECT_SYSTEM,
                    SELECT_SYSTEM_SET,
                    SELECT_SYSTEM_TYPE,
                },
            },
        },
        GC_CONTROLLED: {
            TABLES: DEV_TABLES,
            TYPES: DEV_TYPES,
        },
        GC_PRIVATE: {
            TABLES: PRIV_TABLES,
            // FUNCTIONS: PRIV_FUNCTIONS,
            FUNCTIONS: {
                CREATE_A_USER,
                GET_BUG_REPORTS,
                UPDATE_PASSWORD,
            },
        },
        GC_PROTECTED: {
            // FUNCTIONS: PROT_FUNCTIONS,
            FUNCTIONS: {
                CREATE_OR_UPDATE_SYSTEM_SET,
                CREATE_OR_UPDATE_CONTAINER_DETAIL,
                CREATE_OR_UPDATE_ELEVATION,
                CREATE_OR_UPDATE_ELEVATION_CONTAINER,
                CREATE_OR_UPDATE_OPTION_VALUE,
                CREATE_OR_UPDATE_SYSTEM,
                CREATE_OR_UPDATE_SYSTEM_OPTION,
                UPDATE_ENTIRE_SYSTEM_OPTION,
            },
            TABLES: {
                ELEVATION,
                SYSTEM,
                SYSTEM_SET,
            },
        },
        GC_DATA: {
            // FUNCTIONS:DATA_FUNCTIONS,
            FUNCTIONS: {
                UPDATE_ENTIRE_SYSTEM,
            },
            TABLES: {
                APP_DATA,
                CONFIGURATION_DATA,
            },
        },
        GC_UTILS: {
            // FUNCTIONS: UTIL_FUNCTIONS,
            FUNCTIONS: {
                GET_REAL_ID,
            },
        },
    } = DB;



    const create_seed = (strings, ...files) => strings.reduce((seed, string, i) => {
        const file = files[i];

        if (
            !file
            ||
            (typeof file === 'string')
        ) {
            return `${seed}${string}${file || ''}`;
        }

        console.log(Object.keys(file));

        const [[filename, contents]] = Object.entries(file);

        if (contents === undefined) throw new Error(`Invalid file reference: ${filename}`);

        return `${seed}${string}${contents}`;
    }, '');



    const DB_SEED = create_seed`

-- SCHEMAS;
${{ SCHEMAS }}


-- TYPES

-- GC_CONTROLLED TYPES;
${{ DEV_TYPES }}
-- GC_PUBLIC TYPES;
${{ UTIL_TYPES }}
${{ OUTPUT_TYPES }}
${{ INPUT_TYPES }}


-- TABLES

-- GC_CONTROLLED TABLES;
${{ DEV_TABLES }}
-- GC_DATA TABLES;
${{ APP_DATA }}
${{ CONFIGURATION_DATA }}
-- GC_PRIVATE TABLES;
${{ PRIV_TABLES }}
-- GC_PUBLIC TABLES;
${{ PUB_TABLES }}
-- GC_PROTECTED TABLES;
${{ SYSTEM }}
${{ SYSTEM_SET }}
${{ ELEVATION }}


-- FUNCTIONS

-- GC_UTIL FUNCTIONS;
${{ GET_REAL_ID }}
-- GC_CONTROLLED FUNCTIONS;
${{ CREATE_A_USER }}
${{ GET_BUG_REPORTS }}
${{ UPDATE_PASSWORD }}
-- GC_PROTECTED FUNCTIONS;
${{ CREATE_OR_UPDATE_SYSTEM_SET }}
${{ CREATE_OR_UPDATE_CONTAINER_DETAIL }}
${{ CREATE_OR_UPDATE_ELEVATION }}
${{ CREATE_OR_UPDATE_ELEVATION_CONTAINER }}
${{ CREATE_OR_UPDATE_OPTION_VALUE }}
${{ CREATE_OR_UPDATE_SYSTEM }}
${{ CREATE_OR_UPDATE_SYSTEM_OPTION }}
${{ UPDATE_ENTIRE_SYSTEM_OPTION }}
-- GC_DATA FUNCTIONS;
${{ UPDATE_ENTIRE_SYSTEM }}
-- GC_PUBLIC MUTATIONS;
${{ AUTHENTICATE }}
${{ COPY_ELEVATION }}
${{ CREATE_A_PROJECT }}
${{ DELETE_ENTIRE_ELEVATION }}
${{ DELETE_ENTIRE_PROJECT }}
${{ GET_ALL_PROJECTS }}
${{ REPORT_BUG }}
${{ UPDATE_ENTIRE_ELEVATION }}
${{ UPDATE_ENTIRE_SYSTEM_SET }}
-- GC_PUBLIC QUERIES;
${{ GET_CURRENT_USER }}
${{ GET_CURRENT_USER_ID }}
${{ SELECT_SYSTEM }}
${{ SELECT_SYSTEM_SET }}
${{ SELECT_SYSTEM_TYPE }}


-- PRIVILEGES;
${{ PRIVILEGES }}

-- GLASCAD USER;
DROP USER glascad;
CREATE USER glascad NOCREATEDB IN GROUP gc_admin ENCRYPTED PASSWORD '${process.env.DO_GC_PASSWORD}';
GRANT glascad TO doadmin;

`;

    pfs.writeFile(
        `${__dirname}/../compiled/db-seed.sql`,
        DB_SEED.replace(/(\n\s*\n)/g, '\n')
        // .split(/;/)
        // .map(line => line.replace(/\s+/g, ' ').trim())
        // .join(';\n')
    );

})();
