// for autocomplete only
// import DB from '../db-seed';
// import pfs from './promise-fs';

module.exports = async () => {
    require('dotenv').config();

    const DB = require(`${__dirname}/../../compiled/db-seed.js`);
    const pfs = require(`${__dirname}/../promise-fs`);

    const {
        SCHEMAS,
        ROLES,
        PRIVILEGES,
        INVOKER,
        GC_PUBLIC: {
            TABLES: PUB_TABLES,
            TYPES: {
                INPUT_TYPES,
                OUTPUT_TYPES,
                UTIL_TYPES,
            },
            FUNCTIONS: {
                MUTATIONS: {
                    AUTHENTICATE,
                    COPY_ELEVATION,
                    CREATE_OR_UPDATE_PROJECT,
                    DELETE_ENTIRE_ELEVATION,
                    DELETE_ENTIRE_PROJECT,
                    GET_ALL_PROJECTS,
                    REPORT_BUG,
                    UPDATE_ENTIRE_ELEVATION,
                    UPDATE_ENTIRE_SYSTEM_SET,
                },
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
            FUNCTIONS: {
                CREATE_A_USER,
                GET_BUG_REPORTS,
                UPDATE_PASSWORD,
            },
        },
        GC_PROTECTED: {
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
            FUNCTIONS: {
                UPDATE_ENTIRE_SYSTEM,
            },
            TABLES: {
                APP_DATA,
                CONFIGURATION_DATA,
            },
        },
        GC_UTILS: {
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

        const [[filename, contents]] = Object.entries(file);

        if (contents === undefined) throw new Error(`Invalid file reference: ${filename}`);

        return `${seed}${string}${contents}`;
    }, '');


    const DEFAULT_USERS = [
        process.env.USER_ONE,
        process.env.USER_TWO,
        process.env.USER_THREE,
        process.env.USER_FOUR,
        process.env.USER_FIVE,
        process.env.USER_SIX,
    ].filter(Boolean);


    const DB_SEED = create_seed`

-- SCHEMAS;
${{ SCHEMAS }}

-- TYPES;

-- GC_CONTROLLED TYPES;
${{ DEV_TYPES }}
-- GC_PUBLIC TYPES;
${{ UTIL_TYPES }}
${{ OUTPUT_TYPES }}
${{ INPUT_TYPES }}


-- TABLES;

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


-- INVOKER ROLE
${{ INVOKER }}


-- FUNCTIONS;

-- GC_UTIL FUNCTIONS;
${{ GET_REAL_ID }}
-- GC PRIVATE FUNCTIONS
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
${{ CREATE_OR_UPDATE_PROJECT }}
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


-- ROLES
${{ ROLES }}


-- PRIVILEGES;
${{ PRIVILEGES }}
GRANT gc_invoker TO glascad;
GRANT glascad TO doadmin;


-- GLASCAD USER;
DROP USER glascad;
CREATE USER glascad NOCREATEDB IN GROUP gc_admin ENCRYPTED PASSWORD '${process.env.DO_GC_PASSWORD}';


-- DEFAULT USERS;
${DEFAULT_USERS.map(user => `
SELECT * FROM create_a_user('${user.split(/,/g).join(`', '`)}');
`).join('')}

-- PROJECT FOR USER_ONE
INSERT INTO projects (name, owner_id) VALUES ('Demo Project', 1);

`;

    const SEED_FILE = DB_SEED.replace(/(\n\s*\n)/g, '\n');

    pfs.writeFile(`${__dirname}/../../compiled/db-seed.sql`, SEED_FILE);

    return SEED_FILE;
};
