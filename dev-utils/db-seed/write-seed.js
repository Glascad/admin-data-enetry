const _require = require;

module.exports = async () => {
    const insertEnvVars = (path, contents) => contents.replace(/<<(.*?)>>/g, (match, ENV_VAR) => {
        const value = process.env[ENV_VAR];
        if (!value) throw new Error(`Variable ${ENV_VAR} not found in \`.env\``);
        else {
            console.log(`Inserting environment variable ${chalk.green(ENV_VAR)} in file ${chalk.cyan(path)}`);
            return value;
        }
    });

    const getDbContents = path => {
        const contents = path
            .replace('../../db/schemas/', '')
            .replace(/-/, '_')
            .replace(/\.sql/, '')
            .split(/\//)
            .reduce((obj, filename) => obj[filename.toUpperCase()], DB);

        if (contents === undefined) throw new Error(`Invalid file reference: ${path}`);
        if (typeof contents === 'object') throw new Error(`Cannot reference directory: ${path}. Nested files include: ${Object.keys(contents).join(', ')}`)
        if (!contents || contents.match(/^\s*$/)) throw new Error(`File empty: ${path}`);
        if (contents.split(/\n/).every(line => line.match(/^\s*(--.*)?$/))) console.warn(`${chalk.yellow`File commented out:`} ${chalk.yellowBright(path)}`);

        return insertEnvVars(path, contents);
    }

    const requiredPaths = [];

    const require = path => {
        if (requiredPaths.includes(path)) throw new Error(`Duplicate path required: ${path}`);
        else {
            requiredPaths.push(path);
            return path.match(/\/|\./) ?
                path.startsWith('../../db/schemas/') ?
                    getDbContents(path)
                    :
                    _require(`${__dirname}/${path}`)
                :
                _require(path);
        }
    }
    require('dotenv').config();

    const chalk = require('chalk');

    const DB = require('../../compiled/db-seed.js');
    const pfs = require('../promise-fs');

    const DEFAULT_USERS = [
        process.env.USER_ONE,
        process.env.USER_TWO,
        process.env.USER_THREE,
        process.env.USER_FOUR,
        process.env.USER_FIVE,
        process.env.USER_SIX,
    ].filter(Boolean);

    const DB_SEED = `

DO $seed$ BEGIN

-- SCHEMAS;
${require('../../db/schemas/schemas.sql')}

-- TYPES;

-- GC_CONTROLLED TYPES;
${require('../../db/schemas/gc_controlled/types.sql')}

-- GC_PUBLIC TYPES;
${require('../../db/schemas/gc_public/types/util-types.sql')}
-- OUTPUT_TYPES
${require('../../db/schemas/gc_public/types/input-types.sql')}

-- GC_DATA TYPES
${require('../../db/schemas/gc_data/types.sql')}

-- TABLES;

-- GC_CONTROLLED TABLES;
${require('../../db/schemas/gc_controlled/tables.sql')}

-- GC_DATA TABLES;
${require('../../db/schemas/gc_data/tables/app_data.sql')}
-- CONFIGURATION_DATA

-- GC_PRIVATE TABLES;
${require('../../db/schemas/gc_private/tables.sql')}

-- GC_PUBLIC TABLES;
${require('../../db/schemas/gc_public/tables.sql')}

-- GC_PROTECTED TABLES;
${require('../../db/schemas/gc_protected/tables/system.sql')}
-- SYSTEM_SET
${require('../../db/schemas/gc_protected/tables/elevation.sql')}


-- INVOKER ROLE
${require('../../db/schemas/invoker.sql')}


-- FUNCTIONS;

-- GC_UTIL FUNCTIONS;
${require('../../db/schemas/gc_utils/functions/get_real_id.sql')}

-- GC PRIVATE FUNCTIONS
${require('../../db/schemas/gc_private/functions/create_a_user.sql')}
${require('../../db/schemas/gc_private/functions/get_bug_reports.sql')}
${require('../../db/schemas/gc_private/functions/update_password.sql')}

-- GC_PROTECTED FUNCTIONS;
-- ELEVATION
${require('../../db/schemas/gc_protected/functions/elevation/create_or_update_elevation_container.sql')}
${require('../../db/schemas/gc_protected/functions/elevation/create_or_update_container_detail.sql')}
${require('../../db/schemas/gc_protected/functions/elevation/create_or_update_elevation.sql')}
-- SYSTEM
${require('../../db/schemas/gc_protected/functions/system/create_or_update_system_option.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_system_option_value.sql')}
${require('../../db/schemas/gc_protected/functions/system/update_entire_system_option_value.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_system_detail_type.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_detail_option.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_detail_option_value.sql')}
${require('../../db/schemas/gc_protected/functions/system/update_entire_detail_option_value.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_system_configuration_type.sql')}
-- DELETE_ENTIRE_CONFIGURATION_OPTION
-- DELETE_ENTIRE_SYSTEM_CONFIGURATION_TYPE
${require('../../db/schemas/gc_protected/functions/system/update_entire_system_option.sql')}
${require('../../db/schemas/gc_protected/functions/system/update_entire_detail_option.sql')}
${require('../../db/schemas/gc_protected/functions/system/update_entire_configuration_option.sql')}
${require('../../db/schemas/gc_protected/functions/system/create_or_update_system.sql')}
-- CREATE_OR_UPDATE_SYSTEM_SET
-- CREATE_OR_UPDATE_OPTION_VALUE
-- CREATE_OR_UPDATE_SYSTEM_OPTION
-- UPDATE_ENTIRE_SYSTEM_CONFIGURATION_OVERRIDE
-- UPDATE_ENTIRE_SYSTEM_OPTION

-- GC_DATA FUNCTIONS;
${require('../../db/schemas/gc_data/functions/update_entire_system.sql')}

-- GC_PUBLIC MUTATIONS;
${require('../../db/schemas/gc_public/functions/mutations/authenticate.sql')}
${require('../../db/schemas/gc_public/functions/mutations/copy_elevation.sql')}
${require('../../db/schemas/gc_public/functions/mutations/create_or_update_project.sql')}
${require('../../db/schemas/gc_public/functions/mutations/delete_entire_elevation.sql')}
${require('../../db/schemas/gc_public/functions/mutations/delete_entire_project.sql')}
${require('../../db/schemas/gc_public/functions/mutations/get_all_projects.sql')}
${require('../../db/schemas/gc_public/functions/mutations/report_bug.sql')}
${require('../../db/schemas/gc_public/functions/mutations/update_entire_elevation.sql')}
-- UPDATE_ENTIRE_SYSTEM_SET

-- GC_PUBLIC QUERIES;
${require('../../db/schemas/gc_public/functions/queries/get_current_user.sql')}
${require('../../db/schemas/gc_public/functions/queries/get_current_user_id.sql')}
-- SELECT_SYSTEM
-- SELECT_SYSTEM_SET
-- SELECT_SYSTEM_TYPE


-- INSERTIONS
${require('../../db/schemas/gc_controlled/values.sql')}


-- ROLES
${require('../../db/schemas/roles.sql')}


-- PRIVILEGES;
${require('../../db/schemas/privileges.sql')}
GRANT gc_invoker TO glascad;
GRANT glascad TO doadmin;


DO $users$ DECLARE ___ INTEGER; BEGIN

-- DEFAULT USERS;
${DEFAULT_USERS.map(user => `
SELECT 1 FROM create_a_user('${user.split(/,/g).join(`', '`)}') INTO ___;
`).join('')}

END $users$;

-- SEED DATA;
${require('../../db/schemas/seed_data.sql')}

-- POLICIES;
${require('../../db/schemas/policies.sql')}

END $seed$;
`;

    const SEED_FILE = DB_SEED.replace(/(\n\s*\n)/g, '\n');

    pfs.writeFile(`${__dirname}/../../compiled/db-seed.sql`, SEED_FILE);

    return SEED_FILE;
};
